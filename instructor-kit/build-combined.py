#!/usr/bin/env python3
"""
Assemble the three combined instructor-kit books from the per-session source docs.

Kit:    React + TypeScript: Build a Modern Web App (the whole course, Modules 1 to 11), 26 sessions x 3 hours = 78 h,
        in three parts that can each run as their own block:
          Part 1 "TypeScript and React Foundations" (Sessions 1 to 9, Modules 1 to 3) ends with the Part 1 project
            check-in and assessment (Session 9; the course close when Part 1 runs alone);
          Part 2 "Data, State and Routing" (Sessions 10 to 17, Modules 4 to 6) opens with a Part 1 refresher and the
            catch-up code (downloads/lesson-13-start + shoreline-api), and ends with the Part 2 project check-in and
            assessment (Session 17);
          Part 3 "Production React" (Sessions 18 to 26, Modules 7 to 11) opens with a Parts 1-2 refresher and
            catch-up (downloads/lesson-24-start), and ends with the final project showcase and final assessment
            (Session 26).
Reads:  source/module-NN/{facilitator-guide,participant-workbook,answer-key}.html   (NN = 01 ... 26)
        ../course-config.json   (lesson titles, so the contents page always matches the course)
Writes: ./participant-workbook.html, ./facilitator-guide.html, ./answer-key.html
        (the hand-out documents: a cover, a contents page, a divider before each part, then one chapter per session)

A "module" folder is one 3-hour SESSION of the kit (not a course module): module-07 = Session 7.
Sessions 9, 17 and 26 teach no new lesson (project check-ins and assessments); Sessions 4, 13 and 21 hold the
three 30-minute checkpoints (CHECKPOINTS below).

A session whose source doc is missing (or has no sheet/foot) is skipped with a warning, so a
partly written kit still builds. The exit code is 0 when every session was found, 1 otherwise;
add --strict to stop at the first missing doc instead.

Links: a source doc sits two folders below the kit root, a book sits in the root, so every
href="../../..." or src="../../..." in a source doc is rewritten (the leading "../../" is dropped). Course
screenshots are referenced, not copied: src="../../../images/lesson_NN/x.png" in a source doc becomes
src="../images/lesson_NN/x.png" in a book (the kit folder stays inside the course folder).

After editing a session's source doc, run this again, then render the PDFs
(python3 ~/projects/_kit_tools/typescript/render_pdfs_rts.py, or each book's Print button).

Usage:  python3 build-combined.py [--strict]      (works from any folder)
"""
import json
import re
import sys
from pathlib import Path

KIT = Path(__file__).resolve().parent
COURSE = "React + TypeScript: Build a Modern Web App"   # the course on the site (rays-typescript.netlify.app)
KIT_TITLE = "React + TypeScript: Build a Modern Web App"  # this kit's name: masthead foot lines and book covers
KIT_KEY = ""                   # one kit: the instructor-kit/ folder itself
AUTHOR = "Ray de la Paz"
SESSIONS = 26
HOURS = 78
FORMAT_CHIP = "26 sessions × 3 h · 78 h"
LESSON_CHIP = "35 lessons"
SCOPE = "Modules 1 to 11, in three parts"

# (session number, session title, the lesson ids taught in it). Lesson TITLES are read from
# ../course-config.json when the script runs; do not type them here. Sessions 9, 17 and 26 teach no new lesson.
MODULES = [
    (1, "Why React + TypeScript and Your Workspace", ["1.1", "1.2"]),
    (2, "Types, Inference and Shaping Data", ["2.1", "2.2"]),
    (3, "Functions, Generics and Typing Real Data", ["2.3", "2.4"]),
    (4, "Components and TSX", ["3.1"]),
    (5, "Props, Children and Composition", ["3.2"]),
    (6, "Lists, Conditional Rendering, State and Events", ["3.3", "3.4"]),
    (7, "Forms and Actions", ["3.5"]),
    (8, "Styling and Accessible Components", ["3.6"]),
    (9, "Part 1 Project Check-in and Assessment", []),
    (10, "Effects and Fetching", ["4.1"]),
    (11, "Custom Hooks, Refs and the DOM", ["4.2", "4.3"]),
    (12, "Suspense and Error Boundaries, and useReducer", ["4.4", "5.1"]),
    (13, "Typed Context", ["5.2"]),
    (14, "Rendering Performance and Component Patterns", ["5.3", "5.4"]),
    (15, "React Router 8, Search Params and Nested Routes", ["6.1", "6.2"]),
    (16, "Data Loading and Protected Routes", ["6.3"]),
    (17, "Part 2 Project Check-in and Assessment", []),
    (18, "TanStack Query", ["7.1"]),
    (19, "Mutations and Client State", ["7.2", "7.3"]),
    (20, "React Hook Form + Zod and Complex Forms", ["8.1", "8.2"]),
    (21, "Testing Components", ["9.1"]),
    (22, "Interactions, Async, End-to-End and Accessibility Tests", ["9.2", "9.3"]),
    (23, "Performance and the Build", ["10.1"]),
    (24, "Deploying", ["10.2"]),
    (25, "Final Project Workshop and Next Steps", ["11.1", "11.2"]),
    (26, "Final Project Showcase and Final Assessment", []),
]

# (part number, title, first session, last session, one-line description). The books put a divider page
# before each part; check_kit_rts.py and gen_syllabus_rts.py read this list too.
PARTS = [
    (1, "Part 1: TypeScript and React Foundations", 1, 9,
     "Modules 1 to 3: why React and TypeScript belong together and a working local workspace (Node LTS, VS Code, "
     "the shoreline-api mock back end, a Vite react-ts app), the TypeScript you need before React (types and "
     "inference, object types and unions, functions and generics, typing real API data), then React in TypeScript "
     "from the first component to props, lists, state and events, forms with actions, styling and accessible "
     "components. Runs on its own as a short course and ends with the Part 1 project check-in and assessment."),
    (2, "Part 2: Data, State and Routing", 10, 17,
     "Modules 4 to 6: Shoreline Crew HQ talks to its API: effects and fetching, custom hooks, refs and the DOM, "
     "Suspense and error boundaries, useReducer with discriminated unions, typed context, rendering performance and "
     "component patterns, then React Router 8 with search params, nested routes, loaders, actions and protected "
     "routes. Opens with a Part 1 refresher and the catch-up code, and ends with the Part 2 project check-in and "
     "assessment."),
    (3, "Part 3: Production React", 18, 26,
     "Modules 7 to 11: server state with TanStack Query and mutations, client state with Zustand, forms at scale "
     "with React Hook Form and Zod, testing with Vitest, Testing Library, MSW and Playwright, performance and the "
     "build, a free deployment with CI, then the final project and next steps. Opens with a Parts 1 and 2 refresher "
     "and catch-up, and ends with the final project showcase and final assessment."),
]
CHECKPOINTS = {4: "Checkpoint 1", 13: "Checkpoint 2", 21: "Checkpoint 3"}   # session -> its 30-minute checkpoint row
FINAL_SESSIONS = (8, 9, 16, 17, 25, 26)       # sessions that use final-assessment.html (part projects + final)


def part_of(num):
    return next(p for p in PARTS if p[2] <= num <= p[3])

DOCS = {
    "participant-workbook": dict(
        base="participant-workbook.html", role="Participant Workbook",
        eyebrow=f"Instructor Kit · {KIT_TITLE} · Complete Workbook",
        sub=f"Your working notebook for all {SESSIONS} sessions of {KIT_TITLE}. Read the key ideas, study the worked examples, do the guided labs, predict before you run, and check yourself with the self-check quizzes.",
        chips=[f'<span class="chip"><b>{SESSIONS}</b> sessions · {LESSON_CHIP}</span>', '<span class="chip">Write-in exercises &amp; self-checks</span>', '<span class="chip">Name: ____________________</span>'],
        toolbar=("Student workbook —", "write in it · bring it to every session")),
    "facilitator-guide": dict(
        base="facilitator-guide.html", role="Facilitator Guide",
        eyebrow=f"Instructor Kit · {KIT_TITLE} · Complete Facilitator Guide",
        sub=f"The full teaching manual for the {SESSIONS}-session {KIT_TITLE} kit ({SCOPE}; one 3-hour session, two lessons each). Timing, live-demo scripts, the mistakes to pre-empt, lab facilitation, and checks for understanding, for every session.",
        chips=[f'<span class="chip"><b>{SESSIONS}</b> sessions · {LESSON_CHIP}</span>', f'<span class="chip">{FORMAT_CHIP}</span>', '<span class="chip">Instructor copy · not for students</span>'],
        toolbar=("Instructor copy —", "contains answers &amp; timing · not for students")),
    "answer-key": dict(
        base="answer-key.html", role="Answer Key",
        eyebrow=f"Instructor Kit · {KIT_TITLE} · Complete Answer Key",
        sub=f"Every self-check item answered and explained, plus reference notes for each lab, for all {SESSIONS} sessions. Use for grading and reteaching. Confidential instructor material.",
        chips=[f'<span class="chip"><b>{SESSIONS}</b> sessions</span>', f'<span class="chip">{SESSIONS * 12} self-check items + lab solutions</span>', '<span class="chip">Confidential · do not distribute</span>'],
        toolbar=("Instructor copy —", "answers &amp; solutions · not for students")),
}

SHEET_OPEN = '<div class="sheet">'
FOOT_OPEN = '<div class="foot">'


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def folder(num):
    """Session 7 -> 'module-07'."""
    return f"module-{num:02d}"


def lesson_titles():
    """{'1.1': 'Why React + TypeScript', ...} from the course's course-config.json."""
    for cfg in (KIT.parent / "course-config.json", KIT.parent.parent / "course-config.json", KIT / "course-config.json"):
        if cfg.is_file():
            break
    try:
        data = json.loads(cfg.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        raise SystemExit(f"Cannot read lesson titles from {cfg}: {e}")
    return {les["id"]: les["title"] for mod in data["modules"] for les in mod["lessons"]}


def lessons_for(num, titles=None):
    """[('1.1', 'Why React + TypeScript'), ('1.2', 'Your Workspace')] for a session (used by the checker too); [] for Sessions 9, 17, 26."""
    titles = titles or lesson_titles()
    ids = next(ids for n, _, ids in MODULES if n == num)
    missing = [i for i in ids if i not in titles]
    if missing:
        raise SystemExit(f"Lesson id(s) {missing} are not in course-config.json")
    return [(i, titles[i]) for i in ids]


def extract_body(path):
    """Inner content of .sheet minus the trailing .foot block; None (with a reason) if it cannot be cut."""
    try:
        html = path.read_text(encoding="utf-8")
    except OSError:
        return None, "file not found"
    if html.count(SHEET_OPEN) != 1 or html.count(FOOT_OPEN) != 1:
        return None, f'needs exactly one {SHEET_OPEN} and one {FOOT_OPEN}'
    i = html.index(SHEET_OPEN) + len(SHEET_OPEN)
    j = html.index(FOOT_OPEN)
    if j < i:
        return None, "the foot comes before the sheet"
    body = html[i:j].strip()
    body = re.sub(r'\b(href|src)="\.\./\.\./', r'\1="', body)    # ../../../images/... -> ../images/...
    return body, ""


def build(key, titles, strict=False):
    d = DOCS[key]
    toc_rows, chapters, skipped = [], [], []
    for num, title, _ in MODULES:
        part = part_of(num)
        if num == part[2]:
            toc_rows.append(f'<li class="part">{esc(part[1])} · Sessions {part[2]} to {part[3]}</li>')
            chapters.append(f'<section class="part-divider">\n  <div class="kit-eyebrow">{esc(KIT_TITLE)} · {d["role"]}</div>\n'
                            f'  <h2>{esc(part[1])}</h2>\n  <p class="sub">Sessions {part[2]} to {part[3]}. {esc(part[4])}</p>\n</section>')
        path = KIT / "source" / folder(num) / d["base"]
        body, why = extract_body(path)
        if body is None:
            if strict:
                raise SystemExit(f"Session {num:02d}: {path.relative_to(KIT)}: {why}")
            if why != "file not found":       # a doc that exists but cannot be cut deserves its own line
                print(f"WARNING: Session {num:02d} skipped in {d['base']}: {path.relative_to(KIT)}: {why}")
            skipped.append(num)
            toc_rows.append(f'<li class="mod missing"><span class="mnum">S{num:02d}</span>{esc(title)} (not written yet)</li>')
            continue
        cp = f' · {CHECKPOINTS[num]}' if num in CHECKPOINTS else ''
        toc_rows.append(f'<li class="mod"><span class="mnum">S{num:02d}</span>{esc(title)}{cp}</li>')
        for lc, lt in lessons_for(num, titles):
            toc_rows.append(f'<li class="les"><span class="lc">{lc}</span><span>{esc(lt)}</span></li>')
        chapters.append(f'<section class="modwrap">\n{body}\n</section>')
    toc = "\n        ".join(toc_rows)
    mods = "\n\n".join(chapters)
    n_done = sum(1 for ch in chapters if ch.startswith('<section class="modwrap">'))
    scope = f"all {SESSIONS} sessions" if not skipped else f"{n_done} of {SESSIONS} sessions (draft)"

    out = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{d['role']} | {KIT_TITLE}</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@500;600&display=swap">
<link rel="stylesheet" href="kit.css">
</head>
<body>

<div class="toolbar">
  <span class="lbl">{d['toolbar'][0]}</span>
  <button type="button" onclick="window.print()">🖨 Print / Save as PDF</button>
  <span class="hint">{d['toolbar'][1]}</span>
</div>

<div class="sheet">

  <header class="cover">
    <div class="kit-eyebrow">{d['eyebrow']}</div>
    <h1>{KIT_TITLE}</h1>
    <p class="sub">{d['sub']}</p>
    <div class="meta-row">{''.join(d['chips'])}</div>
  </header>

  <nav class="toc">
    <h2>Contents</h2>
    <ol>
        {toc}
    </ol>
  </nav>

{mods}

  <div class="foot">
    <div class="who"><span class="bio">{KIT_TITLE} · {d['role']}</span></div>
    <div class="ver">Complete {d['role']} · {scope} · v1.0 · &copy; 2026 {AUTHOR}</div>
  </div>

</div>
</body>
</html>
"""
    (KIT / d["base"]).write_text(out, encoding="utf-8")
    if skipped:
        print(f"WARNING: {d['base']}: {len(skipped)} session(s) skipped (source doc missing or not cuttable): "
              + ", ".join(f"{n:02d}" for n in skipped))
    print(f"wrote {d['base']}  ({len(out) // 1024} KB, {n_done} of {len(MODULES)} sessions)")
    return skipped


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if any(a in ("-h", "--help") for a in argv):
        print(__doc__)
        return 0
    strict = "--strict" in argv
    if not (KIT / "source").is_dir():
        raise SystemExit(f"source/ folder not found next to {Path(__file__).name}")
    titles = lesson_titles()
    for num, _, _ in MODULES:
        lessons_for(num, titles)          # fail early on a lesson id that left the course
    skipped = set()
    for k in DOCS:
        skipped |= set(build(k, titles, strict))
    if skipped:
        print(f"Built with {len(skipped)} session(s) missing at least one doc: "
              + ", ".join(f"{n:02d}" for n in sorted(skipped)))
        return 1
    print(f"Done: all {SESSIONS} sessions in all three books. Now render the PDFs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
