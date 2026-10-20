/**
 * Build entry point.
 *
 *   node src/build.ts            validate, write dist/, render the PDF
 *   node src/build.ts --check    validate only, write nothing
 *   node src/build.ts --no-pdf   write dist/ but skip Chrome
 *
 * The PDF must come out at EXPECTED_PAGES. A resume that quietly grows to four
 * pages is the failure this is here to catch, so it exits non-zero.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { delimiter, dirname, isAbsolute, join } from "node:path";

import { resume } from "./content/index.ts";
import { renderHtml } from "./render-html.ts";
import { renderLinkedin } from "./render-linkedin.ts";
import { validate, report } from "./validate.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const HTML_OUT = join(DIST, "jack-chu-resume.html");
const MD_OUT = join(DIST, "linkedin-copy.md");
const PDF_PREFIX = "jack-chu_resume-";

/**
 * Hashes the HTML rather than the PDF: Chrome stamps a creation date into
 * every PDF, so only the HTML (CSS inlined) gives the same name for the same
 * resume.
 */
function pdfPathFor(html: string): string {
  const hash = createHash("sha256").update(html).digest("hex").slice(0, 8);
  return join(DIST, `${PDF_PREFIX}${hash}.pdf`);
}

function removeStalePdfs(keep: string): void {
  for (const name of readdirSync(DIST)) {
    const path = join(DIST, name);
    if (name.startsWith(PDF_PREFIX) && name.endsWith(".pdf") && path !== keep) {
      rmSync(path);
    }
  }
}

const CHROME_CANDIDATES: Partial<Record<NodeJS.Platform, string[]>> = {
  darwin: ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"],
  linux: ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ],
};

function onPath(name: string): string | undefined {
  return (process.env.PATH ?? "")
    .split(delimiter)
    .map((dir) => join(dir, name))
    .find((p) => existsSync(p));
}

function findChrome(): string {
  const override = process.env.CHROME_PATH;
  if (override) return override;
  for (const c of CHROME_CANDIDATES[process.platform] ?? []) {
    const found = isAbsolute(c) ? (existsSync(c) ? c : undefined) : onPath(c);
    if (found) return found;
  }
  throw new Error(
    "Chrome not found. Install Google Chrome or Chromium, or set CHROME_PATH " +
      "to its executable. Use `npm run html` to skip the PDF.",
  );
}

export const EXPECTED_PAGES = 3;

/** Page count straight from the PDF's page tree. */
function pdfPageCount(path: string): number {
  const raw = readFileSync(path).toString("latin1");
  const counts = [...raw.matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  if (counts.length) return Math.max(...counts);
  return (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

function renderPdf(htmlPath: string, pdfPath: string): void {
  execFileSync(
    findChrome(),
    [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=3000",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "pipe" },
  );
}

export type BuildResult = {
  ok: boolean;
  problems: ReturnType<typeof validate>;
  pdf?: string;
  pages?: number;
  error?: string;
};

/**
 * Validate and render. Never throws, so a watcher can keep running and show
 * the problem rather than dying on a typo.
 */
export async function runBuild(
  opts: { pdf?: boolean } = {},
): Promise<BuildResult> {
  const { resume } = await import(`./content/index.ts?v=${Date.now()}`);
  const problems = validate(resume);
  if (problems.some((p) => p.level === "error")) {
    return { ok: false, problems };
  }

  try {
    mkdirSync(DIST, { recursive: true });
    const html = renderHtml(resume);
    writeFileSync(HTML_OUT, html, "utf8");
    writeFileSync(MD_OUT, renderLinkedin(resume), "utf8");
    if (opts.pdf === false) return { ok: true, problems };

    const pdf = pdfPathFor(html);
    renderPdf(HTML_OUT, pdf);
    removeStalePdfs(pdf);
    return { ok: true, problems, pdf, pages: pdfPageCount(pdf) };
  } catch (e) {
    return { ok: false, problems, error: (e as Error).message };
  }
}

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2));
  const checkOnly = args.has("--check");
  const skipPdf = args.has("--no-pdf");

  console.log("validating...");
  if (!report(validate(resume))) process.exit(1);
  if (checkOnly) {
    console.log("content is valid.");
    return;
  }

  const result = await runBuild({ pdf: !skipPdf });
  if (result.error) {
    console.error(`\nERROR: ${result.error}`);
    process.exit(1);
  }
  const rel = (p: string) => p.replace(ROOT + "/", "");
  console.log(`  wrote ${rel(HTML_OUT)}`);
  console.log(`  wrote ${rel(MD_OUT)}`);
  if (skipPdf) return;

  console.log(`  wrote ${rel(result.pdf!)} (${result.pages} pages)`);
  if (result.pages !== EXPECTED_PAGES) {
    console.error(
      `\nERROR: expected ${EXPECTED_PAGES} pages, got ${result.pages}. ` +
        `Tighten the copy, or change EXPECTED_PAGES if this is intended.`,
    );
    process.exit(1);
  }
  console.log("done.");
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop()!)) {
  await main();
}
