# Resume maintenance guide

Point a prompt at this file with the change you want. It documents what every
file is, which ones to edit, how to rebuild the PDF, and the conventions that
every number and sentence in the resume already follows.

Example prompts:

> @README.md Away peak headcount was 26, not 30+
> @README.md add a bullet to Modern Age about the EHR migration
> @README.md the Fête role should say 6 people, not 5

State the fact that changed. Do not scope the request to one file. The whole
point of this document is that the agent works out which files are affected.

---

## File map

```
/Users/jack/Development/resume/
├── jack-chu-resume.html          SOURCE. The 3-page resume. Edit this.
├── Jack Chu Resume - Formatted.pdf   GENERATED from the html. Never edit.
├── linkedin-copy.md              SOURCE. Paste-ready LinkedIn text. Edit this.
├── jack-chu-resume-full.html.bak STALE. See below. Do not edit or trust.
└── README.md                     This file.
```

Job postings, application screenshots and past applications live in
`~/Downloads/jobs` and are not part of this project.

**Two files are edited by hand: `jack-chu-resume.html` and `linkedin-copy.md`.**
Most content changes touch both. The PDF is always regenerated, never edited.

`jack-chu-resume-full.html.bak` is a 6-page long-form version abandoned in
August 2026. It has the SRE and model-name corrections but none of the budget
work, the current headline, or the corrected headcounts. It is wrong in ways
that look authoritative. Either delete it or rename it to something obviously
dead. Do not sync it back up without being asked.

### What each source is for

**`jack-chu-resume.html`** is the 3-page PDF resume. Space-constrained. Bullets
are condensed and the oldest roles are collapsed into an "Earlier" block. This
is what gets sent to people.

**`linkedin-copy.md`** is the full-length version for pasting into LinkedIn
fields. Not page-limited, so it restores detail the PDF cuts. Holds the
headline, About, all 12 role descriptions, Education, and paste notes. It is
also the best long-form record of the career history.

---

## Change protocol

1. Make the edit in `jack-chu-resume.html` and `linkedin-copy.md`. Keep the
   facts identical; the wording differs because the PDF is tighter.
2. Re-render the PDF.
3. Confirm it is still **3 pages**. If it is 4, tighten copy until it is 3.
4. Render pages to PNG and look at them. Text extraction alone will not catch
   a line that wrapped badly or a scope block that overflowed.
5. Check LinkedIn character counts if you touched a role description.
6. Report what changed and flag anything you guessed at.

Never edit the PDF. Never assume a change is done because the source changed;
the PDF is what gets sent, so it is only done once it is re-rendered and looked at.

---

## Build and verify

### Render the PDF

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw --virtual-time-budget=3000 \
  --print-to-pdf="/Users/jack/Development/resume/Jack Chu Resume - Formatted.pdf" \
  "file:///Users/jack/Development/resume/jack-chu-resume.html"
```

### Check page count and look at the pages

```bash
rm -rf /tmp/resume_png
/tmp/pdf2png "/Users/jack/Development/resume/Jack Chu Resume - Formatted.pdf" /tmp/resume_png 1.0
```

Writes `page-01.png`, `page-02.png`, `page-03.png`. Read the images. Must be 3 files.

### Extract text to diff wording

```bash
/tmp/pdftext "/Users/jack/Development/resume/Jack Chu Resume - Formatted.pdf"
```

PDF text extraction inserts line breaks mid-sentence. Pipe through
`tr '\n' ' ' | tr -s ' '` before grepping for a phrase.

### Check LinkedIn character limits

Caps: headline 220, About 2,600, each role description 2,000.

```python
import re
s = open("/Users/jack/Development/resume/linkedin-copy.md", encoding="utf-8").read()
for t in ["Away — VP of Engineering", "Modern Age — Chief Technology Officer",
          "International Masters Publishers — Software Engineer"]:
    b = s.split("## " + t + "\n", 1)[1].split("\n---")[0]
    b = re.sub(r'^`.*?`\s*$', '', b, flags=re.M).strip()
    print(f"{t}: {len(b)}")
```

Three descriptions run close to the 2,000 cap: **Away (~1,982), Modern Age
(~1,960), International Masters Publishers (1,912)**. Adding a sentence to any
of them can push it over. If LinkedIn rejects one, drop its last bullet; in all
three the final bullet is the most general.

---

## Rebuilding the tools

`pdf2png` and `pdftext` live in `/tmp` and **will disappear on reboot**. Both
are small Swift programs. If they are missing, write these files and compile:

```bash
swiftc -O /tmp/pdf2png.swift -o /tmp/pdf2png
swiftc -O /tmp/pdftext.swift -o /tmp/pdftext
```

Moving them somewhere permanent like `~/bin` is a good idea; update the paths
here if you do.

### `pdf2png.swift`

```swift
import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else { print("usage: pdf2png <in.pdf> <outdir> [scale]"); exit(1) }
let url = URL(fileURLWithPath: args[1])
let outDir = args[2]
let scale: CGFloat = args.count > 3 ? CGFloat(Double(args[3]) ?? 1.5) : 1.5

guard let doc = PDFDocument(url: url) else { print("cannot open"); exit(1) }
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
    let img = NSImage(size: size)
    img.lockFocus()
    NSColor.white.setFill()
    NSRect(origin: .zero, size: size).fill()
    if let ctx = NSGraphicsContext.current?.cgContext {
        ctx.saveGState()
        ctx.scaleBy(x: scale, y: scale)
        page.draw(with: .mediaBox, to: ctx)
        ctx.restoreGState()
    }
    img.unlockFocus()
    if let tiff = img.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff),
       let png = rep.representation(using: .png, properties: [:]) {
        let p = "\(outDir)/page-\(String(format: "%02d", i+1)).png"
        try? png.write(to: URL(fileURLWithPath: p))
        print(p)
    }
}
```

### `pdftext.swift`

```swift
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count >= 2, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
    FileHandle.standardError.write("bad pdf\n".data(using: .utf8)!); exit(1)
}
var out = ""
for i in 0..<doc.pageCount {
    out += doc.page(at: i)?.string ?? ""
    out += "\n"
}
print(out)
```

---

## Writing rules

These are already applied everywhere. Do not break them.

- **No em dashes** in any resume or pasteable text, in either file. Use a colon
  for a list, a comma for an aside, a semicolon to join, or rewrite the
  sentence. The `## Company — Role` section headers in `linkedin-copy.md` are
  the one exception: they are structure, not content, and are never pasted.
- **No trailing periods on bullets.** The only exception is a bullet ending in
  `etc.`. Company and scope paragraphs in `linkedin-copy.md` do take periods.
- **Verb-led, past tense.** "Built", "Led", "Cut", "Replaced". Not "Responsible
  for" and not present tense.
- **Bullet character in `linkedin-copy.md` is `•`.** It pastes into LinkedIn
  cleanly. LinkedIn does not render Markdown, so `**bold**` would show as
  literal asterisks in anything pasted into a description field.
- **Keep the voice.** It is deliberately plain and slightly rough. Phrases like
  "no pun intended" and "novelty checks" are his and stay. Do not smooth them
  into corporate register, and do not add superlatives.
- **No "Top Skills" section.** It was LinkedIn auto-populated noise and was
  removed on purpose.

---

## Data conventions

### Budgets are comp-inclusive

Every budget figure means **the full annual org budget: salaries, contractors,
software and services**. This was a deliberate switch away from an earlier
non-comp basis. All three figures must stay on the same basis or the career
progression reads wrong.

Rules:

- **Include his own compensation.** He owned the budget, his line is in it.
  Leaving it out understates by the largest single salary.
- **Load base salary by 1.28x** for payroll tax, benefits and equipment. This
  is a convention, not a measured figure. Every derived number depends on it.
- **Figures are conservative floors, marked with `+`.** Do not state a number
  the evidence cannot carry. Before writing one, compute the break-even: what
  would average compensation have to be for the claim to fail? If the answer is
  implausibly low, the number is safe.
- **Documented beats remembered.** Where an actual budget line exists, use it.
  Where headcount is recalled rather than recorded, say so and pick the floor.

Standard phrasing: `$5M+ budget across comp, software and services`

### Headcount

Distinguish **planned** from **filled**. A budget or license-estimation
spreadsheet shows planned seats and will overstate the real org, sometimes by a
lot. Modern Age planned 26 and actually filled 21. Always ask which one a
number is before using it.

---

## Hard constraints

- **Do not state Legacy revenue.** Roughly $5-10M, under NDA.
- **Do not state Away revenue.** Roughly $200M, flagged as possibly under NDA.
- **Bonobos $150M is cleared** and is used in the company descriptor.
- **Never put salary figures in either file.** Compensation numbers are for
  computing budget totals only.

Headcount, budget and scope carry the seniority story without the revenue risk.

---

## Current claims

Verify against the files before relying on this table; it is a snapshot.

| Role | Dates | Scope | Budget |
|---|---|---|---|
| Fête, CTO | Nov 2025 - May 2026 | Team of 5, reported CEO then President, exec team | none |
| Legacy, VP Technology | Jan 2024 - Jun 2025 | 4 in-house engineers and a consultant | $2M+ |
| Modern Age, CTO | Sep 2021 - Dec 2022 | Zero to 21, including 4 consultants | $5M+ |
| Away, VP Engineering | Oct 2018 - Mar 2021 | Inherited 3 consultants plus ecomm/project/product mgmt, built past 30 | $9M+ |
| Bonobos, Director | Mar 2018 - Oct 2018 | 17 in-house across 2 product eng teams and a 3-person SRE team, plus 2 offshore QA | none |
| Bonobos, Eng Manager | Aug 2016 - Mar 2018 | Team of 5 engineers, with a UX designer and a PM | none |
| Bonobos, Principal Eng II | Jan 2015 - Aug 2016 | individual contributor | none |
| Earlier | 2000 - 2014 | collapsed block | none |

Headline: `CTO / VP Engineering · 0-1 through 30+ · E-commerce, health, physical retail`

Bonobos has no budget line on purpose. It is the oldest leadership role and the
one figure that cannot be substantiated, so headcount carries it.

### Supporting figures

**Legacy.** In-house salaries 190/180/130/75K, his own 275K, one consultant at
$110/hr. The separate $800K technology budget was non-comp only; total lands
near $2.1M.

**Modern Age.** Software $54,980 + $556,072 = $611,052. Contractors $962,000.
Filled headcount 17 FTE (6 Product Engineering, 1 Data, 3 Product Management,
1 IT, 3 Product Design, 2 Creative, 1 TPM) plus 4 contractors = 21. His comp
$300K. Break-even for the $5M claim is $140K average base across the 17;
conservative role-by-role estimates give $148K.

**Away.** FY2020 account 67300 Information Technology & Software $3.39M, plus
account 66200 Web Design & Development $615K, so $4.005M non-comp. The 2021
figures are much lower and should not be used: ecommerce and product management
had moved to a VP of Product and one team was laid off during COVID. Represent
peak scope, not the final year.

---

## Open questions

1. **Fête says "Team of 5" then lists six people**: Head of Product, lead
   Product Designer, offshore PM, 3 offshore engineers. One of the two is
   wrong. Unresolved.
2. **Away peak headcount is recalled, not documented.** It carries $5.4M of the
   $9M+ claim. The figure holds down to roughly 28 people. Worth pinning down
   from an FY2019 or original FY2020 budget.
3. **Away account 67300 is claimed in full.** If part of it sat in another cost
   center, the number drops, though it still clears $8M even at 60% ownership.
4. **The 1.28x load factor is a convention.** Every budget figure moves if it
   is wrong.

---

## Worked example

> @README.md Away peak was 26 people, not 30+

The agent should:

1. Recompute. 26 heads at ~$180K loaded is $4.68M, plus $4.005M non-comp is
   $8.69M, so `$9M+` no longer holds and `$8M+` becomes the floor.
2. Edit `jack-chu-resume.html`: the Away scope line, both the headcount and the
   budget figure.
3. Edit `linkedin-copy.md`: the Away company paragraph, and the About section
   line reading `owned technology budgets up to $9M`.
4. Re-render the PDF, confirm 3 pages, view the PNGs.
5. Re-check the Away LinkedIn character count, which sits near the cap.
6. Report the change and say plainly that the budget floor moved because the
   headcount did.
