/**
 * Live preview server.
 *
 *   npm run preview            http://localhost:4321
 *   npm run preview -- --port 5000
 *
 * Watches src/, rebuilds on save, and reloads the browser.
 *
 * It shows the rendered PDF rather than the HTML on purpose. This resume has
 * to fit on two pages, and an HTML preview in a browser is unpaginated, so
 * it would hide the single constraint most likely to break. What you see here
 * is the same artifact that gets sent.
 *
 * Validation errors are shown in the page instead of killing the server.
 */

import { createServer, type ServerResponse } from "node:http";
import { readFileSync, watch } from "node:fs";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { runBuild, EXPECTED_PAGES } from "../src/build.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");

const args = process.argv.slice(2);
const portArg = args.indexOf("--port");
const PORT = portArg >= 0 ? Number(args[portArg + 1]) : 4321;

let version = 0;
let pdfPath: string | undefined;
let status = { ok: true, pages: 0, messages: [] as string[] };
const clients = new Set<ServerResponse>();

function broadcast(): void {
  const payload = JSON.stringify({ version, ...status });
  for (const res of clients) res.write(`data: ${payload}\n\n`);
}

async function rebuild(reason: string): Promise<void> {
  const started = Date.now();
  const result = await runBuild();
  version++;
  if (result.pdf) pdfPath = result.pdf;

  if (result.error) {
    status = { ok: false, pages: 0, messages: [result.error] };
  } else if (!result.ok) {
    status = {
      ok: false,
      pages: 0,
      messages: result.problems
        .filter((p) => p.level === "error")
        .map((p) => `${p.where}: ${p.message}`),
    };
  } else {
    const warns = result.problems
      .filter((p) => p.level === "warn")
      .map((p) => `${p.where}: ${p.message}`);
    const wrongPages =
      result.pages !== EXPECTED_PAGES
        ? [`expected ${EXPECTED_PAGES} pages, got ${result.pages}`]
        : [];
    status = {
      ok: wrongPages.length === 0,
      pages: result.pages ?? 0,
      messages: [...wrongPages, ...warns],
    };
  }

  const ms = Date.now() - started;
  const state = status.ok ? `${status.pages} pages` : "FAILED";
  console.log(`  ${reason} -> ${state} (${ms}ms)`);
  broadcast();
}

const SHELL = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Resume preview</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; height: 100vh; display: flex; flex-direction: column;
    font: 13px/1.45 "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: #23292f; color: #e8ecef;
  }
  #bar {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 14px; background: #1d4356; border-bottom: 1px solid #0d1f28;
  }
  #dot { width: 9px; height: 9px; border-radius: 50%; background: #67c18b; flex: none; }
  #dot.bad { background: #e0685f; }
  #state { font-weight: 600; letter-spacing: 0.01em; }
  #msgs { margin-left: auto; color: #9fb0ba; font-size: 12px; text-align: right; }
  #errors {
    display: none; padding: 14px 18px; background: #3a2222;
    border-bottom: 1px solid #5a3030; color: #f0c9c4;
    font-family: ui-monospace, Menlo, monospace; font-size: 12px; white-space: pre-wrap;
  }
  iframe { flex: 1; width: 100%; border: 0; background: #444; }
</style>
</head>
<body>
  <div id="bar">
    <span id="dot"></span>
    <span id="state">starting</span>
    <span id="msgs"></span>
  </div>
  <pre id="errors"></pre>
  <iframe id="doc" src="/resume.pdf"></iframe>
<script>
  const dot = document.getElementById("dot");
  const state = document.getElementById("state");
  const msgs = document.getElementById("msgs");
  const errors = document.getElementById("errors");
  const doc = document.getElementById("doc");

  new EventSource("/events").onmessage = (e) => {
    const s = JSON.parse(e.data);
    dot.className = s.ok ? "" : "bad";
    state.textContent = s.ok ? s.pages + " pages" : "build failed";
    const warns = s.ok ? s.messages : [];
    msgs.textContent = warns.join("  |  ");
    if (s.ok) {
      errors.style.display = "none";
      doc.src = "/resume.pdf?v=" + s.version;
    } else {
      errors.style.display = "block";
      errors.textContent = s.messages.join("\\n");
    }
  };
</script>
</body>
</html>`;

const server = createServer((req, res) => {
  const url = (req.url ?? "/").split("?")[0];

  if (url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");
    clients.add(res);
    res.write(`data: ${JSON.stringify({ version, ...status })}\n\n`);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (url === "/resume.pdf") {
    try {
      if (!pdfPath) throw new Error("not built yet");
      const pdf = readFileSync(pdfPath);
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
      });
      res.end(pdf);
    } catch {
      res.writeHead(404).end("not built yet");
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(SHELL);
});

// fs.watch fires several times per save; collapse them
let pending: NodeJS.Timeout | undefined;
watch(SRC, { recursive: true }, (_event, file) => {
  if (!file || (!file.endsWith(".ts") && !file.endsWith(".css"))) return;
  clearTimeout(pending);
  pending = setTimeout(() => void rebuild(file), 120);
});

server.listen(PORT, async () => {
  const url = `http://localhost:${PORT}`;
  console.log(`preview  ${url}`);
  console.log(`watching src/, Ctrl-C to stop\n`);
  await rebuild("initial build");
  execFile("open", [url], () => {});
});
