# Baby Coach

A simple, stage-aware roadmap for expecting and new parents. Enter your due date (or your baby's birth date) and it shows what to focus on this week: things to do, things to watch for, and things worth noting, plus the milestones coming up. The idea is that you always know what's just around the corner, so nothing catches you off guard.

**Live:** https://clemmercer-pm.github.io/baby-coach/

Built as a first vibe-coded, deployed project: plain HTML, CSS and JavaScript, with no build step.

## Run it
Open the live link above, or open `index.html` in any browser. No install, no server.

## How it works
- `index.html`: the page.
- `styles.css`: the look.
- `data.js`: the week-by-week content (one entry per stage), NHS-informed.
- `app.js`: works out your stage from the date you enter and shows it.

Your date is stored only in your own browser (localStorage). Nothing is sent anywhere.

## A note on the content
Guidance is general and NHS-informed. It assumes a straightforward pregnancy and is not a substitute for a midwife, health visitor or GP. Last reviewed August 2026.
