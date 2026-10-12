# Book App Web

This is the canonical sample app for the GitHub Copilot app for Beginners course.

It is intentionally small so learners can focus on app workflows instead of backend setup. The app uses Vite, React, TypeScript, and Vitest.

## Run the app

Use the current Node.js LTS.

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Validate changes

```bash
npm test -- --run
npm run build
```

## Course scenarios

The app starts in a stable state. Tests should pass by default.

The course still needs predictable issue and PR practice, so seeded scenario text lives in:

- `../app-course-issues.md`
- `../app-course-pr-scenarios.md`

Those files describe bugs learners can introduce or fix in a branch without making the default sample fail.

## Visual polish practice

Book cards use three columns on desktop, two at 820px and below, and one at 560px
and below. Titles wrap without truncation, favorite badges keep their shape, and
reading status stays visible as text. Filters have visible keyboard focus.

When comparing visual changes, check a narrow mobile viewport (320px or 375px)
and both sides of each breakpoint, including the longest title and both reading
statuses.
