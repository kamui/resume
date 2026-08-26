/**
 * Build-time enforcement of the writing rules and LinkedIn's hard limits.
 *
 * These used to live in README.md as instructions to remember. Here they fail
 * the build instead, which is the only version that actually holds.
 */

import type { Resume } from "./types.ts";
import { LINKEDIN_LIMITS } from "./types.ts";
import { descriptionText, aboutText, headlineText } from "./render-linkedin.ts";
import { resumeBullets } from "./render-html.ts";

export type Problem = { level: "error" | "warn"; where: string; message: string };

/** Bullets end without a period. "etc." is the one legitimate exception. */
function endsBadly(text: string): boolean {
  return text.endsWith(".") && !text.endsWith("etc.");
}

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Best-effort start date of a range like "November 2025 - May 2026" or
 * "2000 - 2006", as a sortable number. Returns undefined when unparseable,
 * which is treated as "cannot judge" rather than an error.
 */
function startKey(range: string): number | undefined {
  const m = range.match(/^\s*(?:([A-Za-z]+)\s+)?(\d{4})/);
  if (!m) return undefined;
  const year = Number(m[2]);
  const month = m[1] ? MONTHS.indexOf(m[1].toLowerCase()) : 0;
  if (month < 0) return undefined;
  return year * 12 + month;
}

export function validate(r: Resume): Problem[] {
  const problems: Problem[] = [];
  const err = (where: string, message: string) =>
    problems.push({ level: "error", where, message });
  const warn = (where: string, message: string) =>
    problems.push({ level: "warn", where, message });

  // ---- job order is explicit in content/index.ts, so only warn when it stops
  // looking reverse-chronological. Jobs are keyed on their most recent role.
  const keyed = r.jobs.map((j) => ({
    company: j.company,
    key: Math.max(
      ...j.roles.map((role) => startKey(role.time.range) ?? -Infinity),
    ),
  }));
  for (let i = 1; i < keyed.length; i++) {
    const prev = keyed[i - 1]!;
    const cur = keyed[i]!;
    if (Number.isFinite(prev.key) && Number.isFinite(cur.key) && cur.key > prev.key)
      warn(
        "job order",
        `${cur.company} starts after ${prev.company} but is listed below it; ` +
          `check the order in content/index.ts`,
      );
  }

  // ---- em dashes, anywhere in content
  const walk = (where: string, text: string | undefined) => {
    if (text && text.includes("—")) err(where, `em dash: "${text.slice(0, 60)}..."`);
  };
  walk("summary", r.summary);
  r.about.forEach((p, i) => walk(`about[${i}]`, p));
  r.headline.forEach((h, i) => walk(`headline[${i}]`, h));

  for (const job of r.jobs) {
    for (const role of job.roles) {
      const at = `${job.company} / ${role.title}`;
      walk(`${at} intro`, role.linkedinIntro);
      role.scope?.forEach((s) => walk(`${at} scope`, s));
      walk(`${at} note`, role.note);
      role.linkedinNotes?.forEach((n) => walk(`${at} note`, n));

      for (const b of role.bullets) {
        walk(`${at} bullet`, b.resume);
        walk(`${at} bullet`, b.linkedin);
        if (endsBadly(b.linkedin))
          err(at, `LinkedIn bullet ends with a period: "...${b.linkedin.slice(-45)}"`);
        if (b.resume && endsBadly(b.resume))
          err(at, `resume bullet ends with a period: "...${b.resume.slice(-45)}"`);
      }

      // resumeOrder is all-or-nothing within a role
      const visible = role.bullets.filter((b) => b.resume !== undefined);
      const ordered = visible.filter((b) => b.resumeOrder !== undefined);
      if (ordered.length && ordered.length !== visible.length)
        err(at, `resumeOrder set on ${ordered.length} of ${visible.length} resume bullets; set all or none`);

      if (role.resumeMode === "earlier" && !role.earlier)
        err(at, 'resumeMode "earlier" requires an earlier line');
      if (role.resumeMode === "full" && resumeBullets(role).length === 0)
        warn(at, "shown on the resume but has no resume bullets");
    }
  }

  // ---- LinkedIn hard limits
  const headline = headlineText(r);
  if (headline.length > LINKEDIN_LIMITS.headline)
    err("headline", `${headline.length} chars, over the ${LINKEDIN_LIMITS.headline} cap`);

  const about = aboutText(r);
  if (about.length > LINKEDIN_LIMITS.about)
    err("about", `${about.length} chars, over the ${LINKEDIN_LIMITS.about} cap`);

  for (const job of r.jobs) {
    for (const role of job.roles) {
      const at = `${job.company} / ${role.title}`;
      const len = descriptionText(role).length;
      if (len > LINKEDIN_LIMITS.description)
        err(at, `description ${len} chars, over the ${LINKEDIN_LIMITS.description} cap`);
      else if (len > LINKEDIN_LIMITS.description * 0.97)
        warn(at, `description ${len} chars, within 3% of the ${LINKEDIN_LIMITS.description} cap`);
    }
  }

  return problems;
}

export function report(problems: Problem[]): boolean {
  const errors = problems.filter((p) => p.level === "error");
  const warns = problems.filter((p) => p.level === "warn");
  for (const w of warns) console.warn(`  warn  ${w.where}: ${w.message}`);
  for (const e of errors) console.error(`  ERROR ${e.where}: ${e.message}`);
  if (errors.length) console.error(`\n${errors.length} error(s).`);
  return errors.length === 0;
}
