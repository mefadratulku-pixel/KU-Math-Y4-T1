# Fix report — KU PYQ Solutions (t4y1) runtime defects

Date: 2026-10-27. Scope: source fixes only, inside `~/workspace/t4y1`.
No deploy, no push to GitHub, nothing outside this repo touched.

Reproduction tool (re-runnable verifier): `scripts/check-katex.mjs`
— evaluates the real data modules and renders every `$...$` / `$$...$$`
segment with the project's own KaTeX (`throwOnError: true`).
One-shot fixer used: `scripts/fix-data-corruption.py` (NOT idempotent —
its assertions expect the broken state, so do not re-run it blindly).

## KaTeX pass/fail counts (10,591 math segments total)

| Course | Before (failed / tested) | After (failed / tested) |
|---|---|---|
| math-modeling | 23 / 2025 | 0 / 2025 |
| hydrodynamics (Math-4101) | 25 / 2780 | 0 / 2780 |
| differential-geometry | 37 / 4415 | 0 / 4415 |
| topology | 1 / 1242 | 0 / 1242 |
| hydrodynamics-notes (was also id `hydrodynamics`) | 0 / 129 | 0 / 129 |
| **Total** | **86 / 10591** | **0 / 10591** |

The live inspection's "49 errors" (~23 + ~25 + ~1) match the
math-modeling + 4101-hydrodynamics + topology counts exactly; the
differential-geometry 37 are the same corruption class and were fixed too.

## Defect 1 — KaTeX parse errors (86)

Root cause, one family: backslashes were lost or mangled when the data was
authored/converted, in three forms. All fixed mechanically inside string
literals only (code untouched), by `scripts/fix-data-corruption.py`:

- **Raw control bytes in `src/data/courses.ts`** (29 fixed): 26× `0x07`
  where `\approx` belongs (e.g. math-modeling 2024-2025 §B Q7 solution,
  `… \x07pprox …`), 2× `0x08` where `\bar` belongs (4101 2022-2023 §B
  Q6a solution, `d\x08ar{z}`), 1× `0x0C` where `\frac` belongs
  (differential-geometry 2022-2023 §A Q3a solution). Replaced with the
  proper double-backslash command in file form (`\\approx`, `\\bar`,
  `\\frac`), so the runtime string carries a single backslash again.
- **Lone single-backslash commands in `"..."` question strings**
  (445 doubled): JS string escapes ate them — `\f` became a formfeed
  (32 errors, e.g. `$\frac{dx}{dt}…` in math-modeling 2023-2024 §A Q2),
  `\b` became a backspace (6 errors, e.g. `$\beta(s)$` in
  differential-geometry 2023-2024 §A Q3b/Q4b), and other commands lost
  the backslash silently (`\mathbf` → `mathbf`, `\alpha` → `alpha`,
  `\phi` → `phi`, `\sigma`, `\kappa`, `\tau`, `\rho`, `\mathbb`,
  `\mathcal`, `\left` …). Every lone backslash inside a math segment
  was doubled; already-correct `\\` pairs untouched.
- **Quoted plus `'+'` inside math** (99 replaced with `+`): 28 of the
  errors were KaTeX "Double superscript" from strings like
  `x^2 '+' y^2`, `x=t^3-2t^2'+'1`, `2z = ax^2 '+' 2hxy '+' by^2`
  (the `'` after a superscript reads as a prime). The rest were silent
  misrenders. All `'+'` inside math segments became `+`.
- **Multiple `\tag`** (2 blocks): math-modeling 2017-2018 §A Q3a
  (Richardson arms race) and §B Q6 (Lotka-Volterra) each had one
  `aligned` block carrying both `\tag{1}` and `\tag{2}`; KaTeX allows
  one tag per block. Both tag tokens were removed from those two
  blocks (nothing in the surrounding text references (1) or (2)).
  Lone `\tag{2}` blocks elsewhere (3 of them) are valid and were kept.

## Defect 2 — Differential-geometry "Unicode math italic" corruption

Finding: a codepoint scan of `src/` found **zero** Mathematical
Alphanumeric Symbols (U+1D400–U+1D7FF) in any source file, so there
were no literal Unicode characters to restore. What the inspection saw
was the same backslash stripping as Defect 1: commands such as
`\mathbf`, `\alpha`, `\phi` reached KaTeX as bare words (`mathbf`,
`alpha`, `phi`), which KaTeX renders letter-by-letter in math italic —
e.g. a differential-geometry question rendered as italic letter-soup
instead of bold vectors / Greek letters. Fixed by the same 445
backslash restorations (differential-geometry questions included);
those questions now render as proper symbols. No source string needed
rewriting beyond that.

## Defect 3 — 6 session cards without titles

Cause: `src/components/CourseTabsView.tsx` renders
`{yearData.session}` as the card title, and the year page header
renders `SESSION: {yearData.session}` — both blank when `session` is
missing. Six years had no `session` field. Fixed in
`src/data/courses.ts` by adding `session` verbatim from the year
string (no invented labels):

- math-modeling: `2018-2019`, `2022-2023`
- hydrodynamics (4101): `2017-2018 (Special)`, `2019-2020`,
  `2020-2021`, `2024-2025(22)` (kept verbatim, including the odd
  `(22)` suffix, rather than guessing what it means)

## Defect 4 — Homepage "41XX HYDRODYNAMICS" card links to the 4101 page

Cause: two courses shared `id: "hydrodynamics"` — the 4101 course in
`src/data/courses.ts` and the notes course in
`src/data/hydrodynamics.ts`. The homepage links by id, and the course
page uses `find(c => c.id === courseId)`, so the first match (4101)
won for both cards. Fixed in `src/data/hydrodynamics.ts` (line 4):
`id: "hydrodynamics"` → `id: "hydrodynamics-notes"`. The 41XX card
now links to `/courses/hydrodynamics-notes`; the 4101 card keeps
`/courses/hydrodynamics`. No other code references the old id.

## Defect 5 — "MATH-4105" session under hydrodynamics

`src/data/courses.ts`, hydrodynamics (4101) year `2024-2025`:
`session: "2024-2025 (Term I) - Math-4105"` → `"2024-2025 (Term I)"`.
Verified as mislabeling, not misplacement: the year's questions are
hydrodynamics (streamline/pathline, etc.). Math-4105 is Topology's
code, so the suffix was stray.

## Defect 6 — Raw diagrams and garbled prose in math-modeling solutions

Three blocks replaced with short prose (information preserved; the
surrounding bullets already describe the same content):

- Bifurcation solution (Q 3. (a), pitchfork): a fenced ```text ASCII
  diagram whose lower branches carried doubled backslashes (`\\`
  rendered literally) → "In words, the diagram is the pitchfork
  described below: one branch before μ = 0, three after."
- Phase-plane solution (Q 7. (b)): a fenced ```text slash-art diagram
  → "In words: parabolas y = Kx², curving toward the x-axis and
  entering the origin tangentially along it."
- Modeling-process solution (Q 1. (a)): a fenced ```mermaid block
  (ReactMarkdown has no mermaid renderer, so the raw syntax showed)
  → "Flow: Real-World Problem → Mathematical Model → Mathematical
  Conclusions → Real-World Predictions → back to the Real-World
  Problem for validation (and back to the model if invalid)."

On "space-stripped garbled prose": scans for long spaceless tokens,
missing spaces after periods, and camel-joins in solution prose found
nothing of that form. The garbled-looking text was the Defect 1/2
backslash stripping (letter-soup math) plus the doubled-backslash
ASCII art above — both fixed. The two legitimate markdown tables in
math-modeling solutions were left alone (they render correctly).

## Defect 7 — Homepage nav HOME / COURSES / ABOUT not clickable

`src/app/page.tsx`: the three items were plain `<div>`s. Changed to
real links with identical styling, and added the anchors they point
to — no new content invented:

- HOME → `<Link href="/">` (site root)
- COURSES → `<a href="#courses">`, with `id="courses"` on the courses
  grid
- ABOUT → `<a href="#about">`, with `id="about"` on the hero header
  (the title + "prepared by Mefad" intro block; there is no separate
  About section on the page, so the hero is the honest target)

CONTACT (WhatsApp link) was already working and is untouched.

## Defect 8 — Differential-geometry advanced-search tab unresponsive

Diagnosis (from code reading, no refactor): `CourseAdvancedSearch`
renders **every** filtered question at once (156 for
differential-geometry) with no pagination or virtualization, and each
`QuestionCard` mounted with its solution **expanded**, so all 156
solutions went through full ReactMarkdown + remark-math + KaTeX
rendering synchronously on the main thread, plus each card's
`useProgress` effect fires a `setState` on mount (a second render of
every card). That synchronous wall of KaTeX work is what froze the tab.

Small safe fix applied (no behavior change on session pages):

- `src/components/QuestionCard.tsx`: new optional prop
  `defaultExpanded` (default `true`, preserving current behavior).
- `src/components/CourseAdvancedSearch.tsx`: passes
  `defaultExpanded={false}`, so advanced-search results mount as
  question headers only and each solution renders on demand when its
  card is expanded. The session page (`[year]/page.tsx`) still uses
  the default (expanded).

Residual note: 156 question headers still mount at once (cheap text +
short question math). If the tab still feels slow on a low-end device,
the next step would be pagination or list virtualization — not done
here, per the no-big-refactor instruction.

## Verification

- `node scripts/check-katex.mjs`: 0 failures / 10,591 segments
  (was 86). Same totals before and after, so no math was lost.
- `npm run build`: passes (compiled + TypeScript + 6 pages generated).
  Only pre-existing warning remains: `metadataBase` not set (social
  images resolve against `http://localhost:3000`).
- `npx eslint .`: unchanged at 19 problems (7 errors, 12 warnings) —
  the pre-existing set, not touched: `require()` in the helper scripts
  `fix-latex.js` / `freq-check.js`, `setState` in an effect in
  `CourseAdvancedSearch.tsx` (line 18) and `useProgress.ts` (line 18),
  unused `node` vars / `img` vs `next/image` / missing alt text in
  `MathRenderer.tsx`, unused `Question` import in `utils/faq.ts`.
  None of these are in the fixed data, and none block the build.

## Left unresolved / observed but out of scope

- Not deployed, not pushed (per task). The live site still serves the
  old data until a deploy happens.
- Missing FAQ/footer content was not fabricated (per task).
- Differential-geometry has three years sharing `year: "2020-2021"`
  (Term I, Term II, Special Term); `CourseTabsView` uses the year as
  the React key, so those keys collide. First render shows all three
  cards; left as is (pre-existing, harmless on first paint, and
  renaming a year slug would change URLs).
- `scripts/fix-data-corruption.py` is one-shot, not idempotent; the
  re-runnable check is `scripts/check-katex.mjs`.
