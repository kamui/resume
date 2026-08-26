/**
 * Renders linkedin-copy.md: paste-ready text for every LinkedIn field.
 *
 * Not page-limited, so this carries every bullet at full length. LinkedIn does
 * not render Markdown, so **bold** is stripped from anything destined for a
 * description field; the bold that survives is only in this file's own
 * headings, which are never pasted.
 */

import type { Resume, Role } from "./types.ts";
import { LINKEDIN_LIMITS } from "./types.ts";

/** LinkedIn shows literal asterisks, so emphasis markers come out. */
function plain(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1");
}

/**
 * The exact text pasted into one LinkedIn description field.
 *
 * Ordered: intro, notes, then bullets, where a bullet carrying a heading emits
 * that prose line above itself, then any closing paragraphs.
 */
export function descriptionText(role: Role): string {
  // Not every role has a scope paragraph; some open straight onto bullets.
  const parts = [
    ...(role.linkedinIntro ? [plain(role.linkedinIntro)] : []),
    ...(role.linkedinNotes ?? []).map(plain),
  ];
  for (const b of role.bullets) {
    if (b.heading) parts.push(plain(b.heading));
    parts.push(`• ${plain(b.linkedin)}`);
  }
  parts.push(...(role.linkedinOutro ?? []).map(plain));
  return parts.join("\n\n");
}

export function aboutText(r: Resume): string {
  return r.about.map(plain).join("\n\n");
}

export function headlineText(r: Resume): string {
  return r.headline.join(" · ");
}

export function renderLinkedin(r: Resume): string {
  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines);

  push(
    `# LinkedIn copy — ${r.name}`,
    "",
    "Paste-ready text for every LinkedIn field. Not page-limited; this restores the",
    "detail that was cut from the 3-page resume PDF.",
    "",
    "Generated from `src/content.ts`. Edit the content, not this file.",
    "",
    "**Conventions used throughout** (kept consistent with the resume):",
    "",
    "- No em dashes",
    "- No trailing periods on bullets",
    "- Verb-led, past tense",
    "- Bullet character is `•`, which pastes into LinkedIn cleanly",
    "",
    `**LinkedIn character limits:** headline ${LINKEDIN_LIMITS.headline}, ` +
      `About ${LINKEDIN_LIMITS.about.toLocaleString("en-US")}, each job description`,
    `${LINKEDIN_LIMITS.description.toLocaleString("en-US")}.`,
    "",
    "---",
    "",
    "## Headline",
    "",
    "```",
    headlineText(r),
    "```",
    "",
    "---",
    "",
    "## About",
    "",
    aboutText(r),
    "",
    "---",
    "",
    "# Experience",
    "",
  );

  for (const job of r.jobs) {
    for (const role of job.roles) {
      const meta = [role.time.range, role.time.location]
        .filter(Boolean)
        .join(" · ");
      push(
        `## ${job.company} — ${role.title}`,
        "",
        `\`${meta}\``,
        "",
        descriptionText(role),
        "",
        "---",
        "",
      );
    }
  }

  push("# Education", "");
  for (const e of r.education) {
    const school = e.division ? `${e.school}, ${e.division}` : e.school;
    push(`**${school}**`, `${e.degree} · ${e.years}`, "");
  }
  push("---", "");

  // Which descriptions are close enough to the cap to be worth warning about
  const tight = r.jobs
    .flatMap((job) =>
      job.roles.map((role) => ({
        label: `${job.company} (${role.title})`,
        len: descriptionText(role).length,
      })),
    )
    .filter((x) => x.len > LINKEDIN_LIMITS.description * 0.9)
    .sort((a, b) => b.len - a.len);

  push(
    "# Notes before you paste",
    "",
    "**Formatting.** LinkedIn does not render Markdown. The `•` characters and line",
    "breaks above paste through fine. The bold in this file is only in the headers",
    "and the Education block, which you would not be pasting into a description",
    "field anyway.",
    "",
    "**Blank lines between bullets.** LinkedIn collapses some whitespace depending on",
    "where you paste from. If the bullets come out cramped, paste into a plain text",
    "editor first, then copy from there.",
    "",
  );

  if (tight.length) {
    const list = tight
      .map((x) => `${x.label} ${x.len.toLocaleString("en-US")}`)
      .join(", ");
    push(
      `**Descriptions close to the ${LINKEDIN_LIMITS.description.toLocaleString("en-US")} cap.** ${list}.`,
      "If LinkedIn rejects one, drop its last bullet; in each case the final bullet",
      "is the most general and the least missed.",
      "",
    );
  }

  push(
    "**Company descriptions.** The opening paragraph of each job holds the scope",
    "detail: who you reported to, team size, budget. LinkedIn has no separate field",
    "for this, so it needs to live in the description.",
    "",
    "**Away and Legacy revenue figures are deliberately absent.** Legacy is under",
    "NDA. Away you flagged as possibly under NDA. Headcount and budget carry the",
    "scope without the risk.",
    "",
  );

  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}
