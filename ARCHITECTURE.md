# Architecture

A short technical rundown of how Baby Coach works, for anyone picking up the code.

## Overview

A static, client-side web app: plain HTML, CSS and vanilla JavaScript. No backend, no build step, no dependencies, no framework. It takes a date, works out which week the user is at, and renders that week's guidance.

**Constraints / non-goals (by design):**
- No server, no database, no API.
- No build tooling (open `index.html` and it runs).
- No data collection. The only stored state is the user's date, kept in their own browser.

## Files

| File | Role |
|------|------|
| `index.html` | Page shell: the setup form (mode toggle + date input) and the empty roadmap containers. |
| `styles.css` | Styling, themed with CSS variables. |
| `data.js` | The content. One `TIMELINE` array; each entry is one week. |
| `app.js` | The logic. Wrapped in an IIFE so nothing leaks to global scope. |

## Data model (`data.js`)

`TIMELINE` is an array of week entries:

```js
{
  phase: "pregnancy" | "newborn",
  week: 30,                 // pregnancy: gestational week. newborn: WEEK OF LIFE (week 1 = days 0-6).
  label: "30 weeks pregnant",
  milestone: "…",           // optional; if present, this week appears in "coming up next"
  summary: "…",             // optional one-liner
  do:   [ "…" ],            // bullet lists
  watch:[ "…" ],
  note: [ "…" ],
  focus: { title, intro, list: [ "…" ] },  // optional "this week's focus" mini-guide
  links: [ { label, url } ]                 // optional further reading
}
```

Reusable link objects (`L`) and repeated watch bullets (`W`) are defined once at the top and referenced by the entries.

## The core mechanism: one shared axis

Everything hangs off a single number line where **40 = the due-date / birth boundary**:

- Pregnancy week `w` maps to `w` (30..40).
- Newborn is counted as **week of life** (week 1 = days 0-6) and sits just after the boundary: newborn week `W` maps to `40 + (W - 1)`, i.e. 40..45.

Three functions do the work:

- **`sortIndex(entry)`** puts any entry on that axis.
- **`currentIndex(mode, date, today)`** converts the user's real date into a position on the same axis:
  - pregnant: `40 - (dueDate - today) / week`
  - born: `40 + (today - birthDate) / week` (measured from the actual birth date; the `40` is just the shared origin, not a due-date dependency).
- **`pickCurrent(list, nowIndex, mode)`** returns the latest entry you have reached **within your current phase**. Filtering by phase is what stops pregnancy mode ever showing newborn content, and vice versa. Returns `null` if you are earlier than the whole roadmap.

"Coming up next" is **`upcoming()`**: the next few entries that carry a `milestone` (so it shows significant events, not every sequential week).

`relativeLabel()` turns the gap between an entry and now into "in about 3 weeks" etc.

## State and privacy

Two `localStorage` keys hold everything: the mode (`pregnancy` / `born`) and the date. There is no server round-trip and no analytics. A one-time migration reads an older `dueDate`-only key if present.

## Rendering and safety

The roadmap is built as HTML strings and injected with `innerHTML`. All dynamic text passes through `escapeHtml`, link `href`s go through `encodeURI`, and outbound links use `target="_blank" rel="noopener noreferrer"`. The only user input (the date) is validated and never rendered as HTML, so there is no injection surface.

## Hosting and deploy

Served by **GitHub Pages** from the `main` branch root. Deploy is `git push` (Pages rebuilds automatically).

Asset URLs in `index.html` carry a `?v=` query string (e.g. `app.js?v=4`) that is bumped on each release, so browsers and the CDN never serve a stale script or stylesheet after an update.

## Changing content

Because content lives in a plain data file, adding or editing a week is just editing `data.js`. No rebuild, no API, no database. Content is NHS-informed; provenance and the validation pass are documented in the project notes (`content-draft.md`, `TRUST.md`).
