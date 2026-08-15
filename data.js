/*
 * Baby Coach — timeline content.
 *
 * Each entry is one point on the roadmap.
 *   phase: "pregnancy" | "newborn"
 *   week:  gestational week (pregnancy) or week-since-birth (newborn)
 *   label: what to show as the heading
 *   do / watch / note: bullet lists (Do this / Watch for / Worth noting)
 *
 * Coverage is WEEKLY so the "this week" heading always matches the person's
 * actual stage (no gaps where a 5-week-old shows "week 2").
 *
 * ⚠️ v1 SCAFFOLD CONTENT IS PLACEHOLDER. Real, NHS-grounded content lands on Day 34.
 *   Anything marked PLACEHOLDER must not be trusted yet.
 */
const TIMELINE = [
  // --- Pregnancy (weekly, third trimester into term) ---
  { phase: "pregnancy", week: 30, label: "30 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 31, label: "31 weeks pregnant",
    do: ["PLACEHOLDER — rough out birth-plan preferences before the next midwife appointment"],
    watch: ["PLACEHOLDER — start noticing baby's normal pattern of movements"],
    note: ["PLACEHOLDER — questions to raise with the midwife"] },
  { phase: "pregnancy", week: 32, label: "32 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 33, label: "33 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 34, label: "34 weeks pregnant",
    do: ["PLACEHOLDER — start / pack the hospital bag"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 35, label: "35 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 36, label: "36 weeks pregnant",
    do: ["PLACEHOLDER — fit the car seat"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 37, label: "37 weeks — full term is close",
    do: ["PLACEHOLDER — finalise the birth plan"], watch: ["PLACEHOLDER — early signs of labour"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 38, label: "38 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 39, label: "39 weeks pregnant",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "pregnancy", week: 40, label: "40 weeks — due date",
    do: ["PLACEHOLDER — what happens if baby's not here yet"], watch: ["PLACEHOLDER — when to go in"], note: ["PLACEHOLDER"] },

  // --- Newborn / fourth trimester (weekly) ---
  { phase: "newborn", week: 0, label: "The first few days",
    do: ["PLACEHOLDER — skin-to-skin; first feeds; register the birth"],
    watch: ["PLACEHOLDER — meconium then wet/dirty nappies; feeding cues"],
    note: ["PLACEHOLDER — birth weight; what the midwife said"] },
  { phase: "newborn", week: 1, label: "Week 1 with your baby",
    do: ["PLACEHOLDER — feeding little and often; safe sleep basics"],
    watch: ["PLACEHOLDER — jaundice; wet/dirty nappies; feeding red flags"],
    note: ["PLACEHOLDER — track feeds and nappies"] },
  { phase: "newborn", week: 2, label: "Week 2 with your baby",
    do: ["PLACEHOLDER — day-5 heel-prick / weight-check follow-ups"],
    watch: ["PLACEHOLDER — back to birth weight yet?"], note: ["PLACEHOLDER"] },
  { phase: "newborn", week: 3, label: "Week 3 with your baby",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "newborn", week: 4, label: "Week 4 with your baby",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "newborn", week: 5, label: "Week 5 with your baby",
    do: ["PLACEHOLDER"], watch: ["PLACEHOLDER"], note: ["PLACEHOLDER"] },
  { phase: "newborn", week: 6, label: "Week 6 — the 6-week checks",
    do: ["PLACEHOLDER — book baby's 6–8 week check and your postnatal check"],
    watch: ["PLACEHOLDER — first immunisations due around 8 weeks"], note: ["PLACEHOLDER"] },
];
