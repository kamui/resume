/**
 * Renders the 3-page PDF resume as HTML.
 *
 * Layout is a left rail of dates and locations against an indented content
 * column. The CSS lives in style.css and is injected verbatim, so visual
 * changes are made there rather than here.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { Bullet, Education, Job, Resume, Role } from "./types.ts";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Escape text for HTML. Runs before **bold** is expanded. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape, then turn **bold** into <b>. */
function inline(s: string): string {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

/** Resume-visible bullets, in resume order. */
export function resumeBullets(role: Role): Bullet[] {
  return role.bullets
    .filter((b) => b.resume !== undefined)
    .map((b, i) => ({ b, i }))
    .sort((x, y) => (x.b.resumeOrder ?? x.i) - (y.b.resumeOrder ?? y.i))
    .map(({ b }) => b);
}

function metaRail(role: Role, showRange = true): string {
  const { range, duration, location } = role.time;
  const parts: string[] = [];
  if (showRange) parts.push(`<span class="range">${esc(range)}</span>`);
  if (duration) parts.push(`<span class="dur">(${esc(duration)})</span>`);
  if (location) parts.push(`<span class="loc">${esc(location)}</span>`);
  return `<div class="rail meta sans">${parts.join("")}</div>`;
}

function scopeBlock(role: Role): string {
  if (!role.scope?.length && !role.note) return "";
  const lines = (role.scope ?? []).map(inline).join("<br>");
  const note = role.note
    ? `<span class="why">${esc(role.note)}</span>`
    : "";
  return `\n        <div class="scope">${lines}${note}</div>`;
}

function bulletList(role: Role, indent: string): string {
  const items = resumeBullets(role)
    .map((b) => `${indent}    <li>${inline(b.resume!)}</li>`)
    .join("\n");
  if (!items) return "";
  return [
    `${indent}<div class="job-body indent">`,
    `${indent}  <ul class="pts">`,
    items,
    `${indent}  </ul>`,
    `${indent}</div>`,
  ].join("\n");
}

function companyLine(job: Job): string {
  const desc = job.descriptor
    ? `<span class="desc">${esc(job.descriptor)}</span>`
    : "";
  return `<div class="company">${esc(job.company)}${desc}</div>`;
}

/** A company with exactly one role. */
function singleRoleJob(job: Job, role: Role): string {
  return `<div class="job">
  <div class="row job-head">
    ${metaRail(role)}
    <div class="col">
      ${companyLine(job)}
      <div class="role sans">${esc(role.title)}</div>${scopeBlock(role)}
    </div>
  </div>
${bulletList(role, "  ")}
</div>`;
}

/** A company holding several roles, e.g. Bonobos. */
function multiRoleJob(job: Job): string {
  const head = `<div class="job">
  <div class="row job-head">
    <div class="rail meta sans"><span class="dur">${esc(job.totalDuration ?? "")}</span></div>
    <div class="col">
      ${companyLine(job)}
    </div>
  </div>`;

  const roles = job.roles.map((role) => {
    const scope = scopeBlock(role).replace(/\n {8}/, "\n          ");
    return `
  <div class="subrole">
    <div class="row job-head role-head">
      ${metaRail(role)}
      <div class="col">
        <div class="role sans">${esc(role.title)}</div>${scope}
      </div>
    </div>
${bulletList(role, "    ")}
  </div>`;
  });

  return `${head}\n${roles.join("\n")}\n</div>`;
}

function sectionRule(label: string): string {
  return `<div class="row section">
  <div class="rail sans">${esc(label)}</div>
  <div class="col"></div>
</div>`;
}

function earlierBlock(r: Resume): string {
  const rows = r.jobs
    .flatMap((j) => j.roles.filter((role) => role.resumeMode === "earlier"))
    .map((role) => role.earlier!)
    .map(
      (e) => `  <div class="early-row">
    <div class="rail">${esc(e.years)}</div>
    <div class="col"><span class="co">${esc(e.company)}</span><span class="ti">${esc(e.title)}</span></div>
  </div>`,
    )
    .join("\n");

  return `<div class="early">
  <p class="indent lede">${inline(r.earlierLede)}</p>

${rows}
</div>`;
}

function educationBlock(entries: Education[]): string {
  const items = entries
    .map((e) => {
      const school = e.division ? `${e.school} - ${e.division}` : e.school;
      return `  <div class="edu">
    <div class="school">${esc(school)}</div>
    <div class="degree">${esc(e.degree)} · (${esc(e.years)})</div>
  </div>`;
    })
    .join("\n");
  return `<div class="indent">\n${items}\n</div>`;
}

export function renderHtml(r: Resume): string {
  const css = readFileSync(join(HERE, "style.css"), "utf8").trimEnd();
  const cssIndented = css
    .split("\n")
    .map((l) => (l ? `  ${l}` : l))
    .join("\n");

  const headline = r.headline
    .map(esc)
    .join('<span class="sep">·</span>');

  const contacts = r.contacts
    .map((c) =>
      c.note
        ? `<span>${esc(c.text)} <em>${esc(c.note)}</em></span>`
        : `<span>${esc(c.text)}</span>`,
    )
    .join("");

  const jobs = r.jobs
    .filter((j) => j.roles.some((role) => role.resumeMode === "full"))
    .map((job) => {
      const full = job.roles.filter((role) => role.resumeMode === "full");
      return full.length === 1 && !job.totalDuration
        ? singleRoleJob(job, full[0]!)
        : multiRoleJob({ ...job, roles: full });
    })
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(r.name)} — Resume</title>
<style>
${cssIndented}
</style>
</head>
<body>

<header>
  <div class="row">
    <div class="rail"></div>
    <div class="col">
      <h1 class="name">${esc(r.name)}</h1>
      <div class="headline">${headline}</div>
      <div class="place sans">${esc(r.location)}</div>
      <div class="contact sans">
        ${contacts}
      </div>
    </div>
  </div>
</header>

${sectionRule("Summary")}

<div class="indent summary">
  <p>${inline(r.summary)}</p>
</div>

${sectionRule("Experience")}

${jobs}

${sectionRule("Earlier")}

${earlierBlock(r)}

${sectionRule("Education")}

${educationBlock(r.education)}

</body>
</html>
`;
}
