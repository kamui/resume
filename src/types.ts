/**
 * Content model for the resume generator.
 *
 * One source of facts, two outputs. The PDF resume is space-constrained and
 * uses compressed wording; the LinkedIn copy has no page limit and restores
 * detail. Those are different sentences, not the same sentence truncated, so
 * both wordings live here side by side. Editing a fact means seeing both.
 *
 * Inline emphasis is written as **bold**. The HTML renderer turns it into <b>,
 * the LinkedIn renderer strips it, because LinkedIn renders Markdown as
 * literal asterisks.
 */

/** A single achievement. */
export type Bullet = {
  /** Compressed wording for the PDF. Omit to keep this bullet off the resume. */
  resume?: string;
  /** Full wording for LinkedIn. Always required; LinkedIn carries everything. */
  linkedin: string;
  /**
   * Position within the resume, when it differs from the LinkedIn order.
   *
   * Array order is LinkedIn order. Usually the resume shows the same bullets
   * in the same sequence, but Modern Age presents the EHR work before the
   * assessment products while LinkedIn does the reverse. Set this on every
   * resume-visible bullet in a role, or on none of them.
   */
  resumeOrder?: number;
  /**
   * Prose line emitted immediately above this bullet on LinkedIn, used to
   * group a list, e.g. "On the Ford dealership app:". LinkedIn only.
   */
  heading?: string;
};

/** Dates and place, as shown in each output. */
export type Timeframe = {
  /** e.g. "November 2025 - May 2026" */
  range: string;
  /** e.g. "7 months". Rendered as "(7 months)" on the resume. */
  duration?: string;
  /** e.g. "New York, NY". Omitted for the oldest roles. */
  location?: string;
};

/**
 * How a role appears in the PDF.
 *  - "full"    : full entry with scope block and bullets
 *  - "earlier" : one line in the collapsed Earlier block
 *  - "omit"    : LinkedIn only
 */
export type ResumeMode = "full" | "earlier" | "omit";

/** The one-line form used in the resume's Earlier block. */
export type EarlierLine = {
  /** Short year label, e.g. "2012 - 2013" rather than "June 2012 - March 2013". */
  years: string;
  /** Short company name, e.g. "Big Fuel Communications" without the "LLC". */
  company: string;
  title: string;
};

export type Role = {
  title: string;
  time: Timeframe;
  resumeMode: ResumeMode;
  /** Required when resumeMode is "earlier". */
  earlier?: EarlierLine;

  /**
   * Scope lines for the resume, rendered stacked inside the ruled block.
   * Supports **bold**.
   */
  scope?: string[];
  /** Italic footnote under the scope block, e.g. why a role ended. */
  note?: string;

  /**
   * The opening paragraph of the LinkedIn entry, carrying company context,
   * reporting line, team size and budget. LinkedIn has no separate field for
   * scope, so it has to live in the description.
   */
  linkedinIntro: string;
  /** Paragraphs after the intro and before the first bullet. */
  linkedinNotes?: string[];
  /** Paragraphs after the last bullet. */
  linkedinOutro?: string[];

  bullets: Bullet[];
};

export type Job = {
  company: string;
  /** Short descriptor beside the company name, e.g. "DTC luggage brand, ~170 people". */
  descriptor?: string;
  /** Shown on the resume when a company holds several roles, e.g. "3 years 10 months". */
  totalDuration?: string;
  roles: Role[];
};

export type Education = {
  school: string;
  /** Faculty or school within the institution, e.g. "Zicklin School of Business". */
  division?: string;
  degree: string;
  /** e.g. "2004 - 2007". The resume parenthesises it, LinkedIn does not. */
  years: string;
};

export type Contact = {
  text: string;
  /** Parenthetical label, e.g. "(LinkedIn)". */
  note?: string;
};

export type Resume = {
  name: string;
  /** Headline segments, joined with "·". */
  headline: string[];
  location: string;
  contacts: Contact[];

  /** Resume summary paragraph. */
  summary: string;
  /** LinkedIn About, which is longer and differently structured. */
  about: string[];

  jobs: Job[];

  /** Lede paragraph above the Earlier block on the resume. */
  earlierLede: string;

  education: Education[];
};

/** LinkedIn's hard limits, enforced at build time. */
export const LINKEDIN_LIMITS = {
  headline: 220,
  about: 2600,
  description: 2000,
} as const;
