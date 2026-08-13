/*
 * Baby Coach — timeline content.
 *
 * Each entry is one point on the roadmap.
 *   phase: "pregnancy" | "newborn"
 *   week:  gestational week (pregnancy) or week-since-birth (newborn)
 *   label: what to show as the heading
 *   do / watch / note: bullet lists (Do this / Watch for / Worth noting)
 *
 * ⚠️ v1 SCAFFOLD CONTENT IS PLACEHOLDER. Real, NHS-grounded content lands on Day 34.
 *   Anything marked PLACEHOLDER must not be trusted yet.
 */
const TIMELINE = [
  {
    phase: "pregnancy", week: 31,
    label: "31 weeks pregnant",
    do:    ["PLACEHOLDER — rough out birth-plan preferences before the next midwife appointment"],
    watch: ["PLACEHOLDER — start noticing baby's normal pattern of movements"],
    note:  ["PLACEHOLDER — any questions to raise with the midwife"],
  },
  {
    phase: "pregnancy", week: 34,
    label: "34 weeks pregnant",
    do:    ["PLACEHOLDER — pack / start the hospital bag"],
    watch: ["PLACEHOLDER — signs to call the midwife about"],
    note:  ["PLACEHOLDER"],
  },
  {
    phase: "pregnancy", week: 37,
    label: "37 weeks — full term is close",
    do:    ["PLACEHOLDER — finalise birth plan; fit the car seat"],
    watch: ["PLACEHOLDER — early signs of labour"],
    note:  ["PLACEHOLDER"],
  },
  {
    phase: "pregnancy", week: 40,
    label: "40 weeks — due date",
    do:    ["PLACEHOLDER — what to do if baby's not here yet"],
    watch: ["PLACEHOLDER — when to go in"],
    note:  ["PLACEHOLDER"],
  },
  {
    phase: "newborn", week: 1,
    label: "Week 1 with your baby",
    do:    ["PLACEHOLDER — feeding little and often; safe sleep basics"],
    watch: ["PLACEHOLDER — jaundice, wet/dirty nappies, feeding red flags"],
    note:  ["PLACEHOLDER — track feeds and nappies"],
  },
  {
    phase: "newborn", week: 2,
    label: "Week 2 with your baby",
    do:    ["PLACEHOLDER — day-5 heel-prick / weight check follow-ups"],
    watch: ["PLACEHOLDER — signs baby's back to birth weight"],
    note:  ["PLACEHOLDER"],
  },
  {
    phase: "newborn", week: 6,
    label: "Week 6 — the 6-week checks",
    do:    ["PLACEHOLDER — book baby's 6-8 week check and your postnatal check"],
    watch: ["PLACEHOLDER — first immunisations due around 8 weeks"],
    note:  ["PLACEHOLDER"],
  },
];
