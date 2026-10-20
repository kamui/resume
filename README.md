# Resume generator

Generates a 3-page PDF resume and paste-ready LinkedIn copy from one source.

Point a prompt at this file with the change you want:

> @README.md Away peak headcount was 26, not 30+
> @README.md add a bullet to Modern Age about the EHR migration
> @README.md the Fête role should say 6 people, not 5

State the fact that changed. Do not name a file. Facts live in one place, and
the build works out where they surface.

```bash
npm run build      # validate, write dist/, render the PDF, assert 3 pages
npm run preview    # live preview on localhost:4321, rebuilds as you edit
npm run check      # validate only, writes nothing
npm run html       # write dist/ but skip Chrome
```

No dependencies. Node 23.6+ runs the TypeScript directly.

---

## Layout

```
src/
├── content/            THE SOURCE. Edit here.
│   ├── index.ts        assembles the resume, sets the order of jobs
│   ├── profile.ts      name, headline, contacts, summary, About, education
│   ├── fete.ts         one file per company
│   ├── legacy.ts
│   ├── modern-age.ts
│   ├── away.ts
│   ├── bonobos.ts      all three Bonobos roles
│   └── ...             six older roles, LinkedIn only
├── types.ts            the content model, with the rules documented on it
├── style.css           all resume styling
├── render-html.ts      content -> resume HTML
├── render-linkedin.ts  content -> LinkedIn markdown
├── validate.ts         writing rules and LinkedIn limits, enforced
└── build.ts            orchestration

tools/preview.ts        live preview server

dist/                   BUILD OUTPUT. Gitignored. Never edit.
├── jack-chu-resume.html
├── linkedin-copy.md            paste into LinkedIn from here
└── jack-chu-resume.pdf          the file you send
```

Editing Away means opening `src/content/away.ts` and nothing else.

---

## The two outputs are written differently

This is the thing to understand before changing wording.

The PDF is space-constrained and compressed. LinkedIn has no page limit but caps
each role at 2,000 characters, so it carries more detail. The same achievement is
written twice, and they are not the same sentence truncated:

```ts
{
  resume:   "Stood up BI (Metabase, Equals), pipelines (Segment), and product
             analytics (PostHog) so we could answer revenue and product
             questions and read A/B results without guessing",
  linkedin: "Stood up real BI tooling (Metabase, Equals), data pipelines
             (Segment) and product analytics (PostHog) so we could measure site
             and revenue performance, answer business and product questions
             quickly, and read the results of A/B experiments without guessing",
}
```

Of 29 resume bullets, 2 are identical to their LinkedIn wording and 26 are
rewritten. **A bullet with no `resume` key appears only on LinkedIn.** That is
how the PDF stays at three pages while LinkedIn carries all 89 bullets.

Changing a *fact* means changing both wordings. They sit adjacent so you cannot
miss one.

### Fields worth knowing

| Field | Effect |
|---|---|
| `bullets[].resume` | omit to keep a bullet off the PDF |
| `bullets[].resumeOrder` | only when the resume orders bullets differently from LinkedIn; currently just Modern Age |
| `bullets[].heading` | prose line above a bullet on LinkedIn, e.g. "On the Ford dealership app:" |
| `scope` | the ruled block under a role on the PDF, supports `**bold**` |
| `note` | italic footnote on the PDF, e.g. why a role ended |
| `linkedinIntro` | opening paragraph carrying reporting line, team size, budget |
| `linkedinNotes` / `linkedinOutro` | paragraphs before the first bullet / after the last |
| `resumeMode` | `full`, `earlier` (one line in the Earlier block), or `omit` |

---

## What the build enforces

`npm run build` fails, non-zero, on any of these:

- an em dash anywhere in content
- a bullet ending in a period, except one ending `etc.`
- a LinkedIn headline over 220, About over 2,600, or a description over 2,000
- `resumeOrder` set on some but not all resume bullets in a role
- `resumeMode: "earlier"` without an `earlier` line
- **a PDF that is not exactly 3 pages**

It warns, without failing, on:

- a description within 3% of the 2,000 cap. Away sits at 1,982 and Modern Age at
  1,954, so adding a sentence to either will break them
- jobs listed out of reverse-chronological order
- a role shown on the resume with no resume bullets

The page-count assertion is the important one. A resume that quietly grows to
four pages is the failure this exists to catch.

### Rules the build cannot check

- **Verb-led, past tense.** "Built", "Led", "Cut". Not "Responsible for".
- **Keep the voice.** Deliberately plain and slightly rough. Phrases like "no pun
  intended" and "novelty checks" are his and stay. Do not smooth them into
  corporate register, and do not add superlatives.
- **No "Top Skills" section.** LinkedIn auto-populated noise, removed on purpose.

---

## Job order

`src/content/index.ts` lists jobs in the order they appear. It is explicit, not
sorted by date, because the date fields are display strings in mixed formats
("2000 - 2006" has no months) and sorting on them would let a typo silently
reorder the resume. `validate.ts` warns if the list stops being reverse
chronological.

To add a job: create `src/content/<company>.ts`, export a `Job`, then import it
into `index.ts` and put it in the right position.

---

## Data conventions

### Budgets are comp-inclusive

Every budget figure means **the full annual org budget: salaries, contractors,
software and services.** All figures must stay on this basis or the progression
across roles reads wrong.

- **Include his own compensation.** He owned the budget; his line is in it.
  Leaving it out understates by the largest single salary.
- **Load base salary by 1.28x** for payroll tax, benefits and equipment. This is
  a convention, not a measured figure. Every derived number moves if it changes.
- **Figures are conservative floors, marked `+`.** Before writing one, compute
  the break-even: what would average compensation have to be for the claim to
  fail? If that number is implausibly low, the figure is safe.
- **Documented beats remembered.** Where a real budget line exists, use it.

Standard phrasing: `$5M+ budget across comp, software and services`

### Headcount

Distinguish **planned** from **filled**. Budget and license-estimation
spreadsheets show planned seats and overstate the real org. Modern Age planned 26
and filled 21. Always establish which a number is before using it.

---

## Hard constraints

- **Do not state Legacy revenue.** Roughly $5-10M, under NDA.
- **Do not state Away revenue.** Roughly $200M, flagged as possibly under NDA.
- **Bonobos $150M is cleared** and is used in the company descriptor.
- **Never put salary figures in either output.** Compensation numbers are for
  computing budget totals only.

Headcount, budget and scope carry the seniority story without the revenue risk.

---

## Current claims

| Role | Dates | Scope | Budget |
|---|---|---|---|
| Fête, CTO | Nov 2025 - May 2026 | Team of 6 | none |
| Legacy, VP Technology | Jan 2024 - Jun 2025 | 4 in-house engineers and a consultant | $2M+ |
| Modern Age, CTO | Sep 2021 - Dec 2022 | Zero to 21, including 4 consultants | $5M+ |
| Away, VP Engineering | Oct 2018 - Mar 2021 | Inherited 3 consultants plus ecomm/project/product mgmt, built past 30 | $9M+ |
| Bonobos, Director | Mar 2018 - Oct 2018 | 17 in-house across 2 product teams and a 3-person SRE team, plus 2 offshore QA | none |
| Bonobos, Eng Manager | Aug 2016 - Mar 2018 | Team of 5 engineers, with a UX designer and a PM | none |
| Bonobos, Principal Eng II | Jan 2015 - Aug 2016 | individual contributor | none |
| Earlier | 2000 - 2014 | collapsed block, full detail on LinkedIn | none |

Bonobos has no budget line on purpose: it is the oldest leadership role and the
one figure that cannot be substantiated. Headcount carries it.

### Where the budget figures come from

**Legacy.** In-house salaries 190/180/130/75K, his own 275K, one consultant at
$110/hr. The separate $800K technology budget was non-comp only. Total ~$2.1M.

**Modern Age.** Software $54,980 + $556,072 = $611,052. Contractors $962,000.
17 FTE filled (6 Product Engineering, 1 Data, 3 Product Management, 1 IT,
3 Product Design, 2 Creative, 1 TPM) plus 4 contractors = 21. His comp $300K.
Break-even for the $5M claim is $140K average base across the 17; conservative
role-by-role estimates give $148K.

**Away.** FY2020 account 67300 Information Technology & Software $3.39M, plus
account 66200 Web Design & Development $615K, so $4.005M non-comp. Do not use
the 2021 figures: ecommerce and product management had moved to a VP of Product
and a team was laid off during COVID. Represent peak scope, not the final year.

The Away org was fluid across the period and reached at least 30 people at peak,
including consultants. "Built it past 30" describes that peak, which is the
right thing for a resume to state, and is what the $9M+ figure rests on.

---

## Open questions

1. **Away account 67300 is claimed in full.** If part sat in another cost centre
   the figure drops, though it still clears $8M even at 60% ownership.
2. **The 1.28x load factor is a convention.** Every budget figure moves with it.

---

## Requirements

- Node 23.6 or newer, for native TypeScript execution
- Google Chrome or Chromium, used headless for the PDF. Found at the standard
  macOS/Windows install path or as `google-chrome`/`chromium` on `PATH`; set
  `CHROME_PATH` to use another executable

Types are checked by your editor, not by the build: Node strips them without
checking. `validate.ts` covers the structural cases at runtime.
