/*
 * Baby Coach — timeline content.
 *
 * Each entry is one week on the roadmap:
 *   phase   "pregnancy" | "newborn"
 *   week    gestational week (pregnancy) or week-since-birth (newborn)
 *   label   heading shown for the week
 *   summary one plain line orienting the week (optional)
 *   do / watch / note   short bullet lists
 *   focus   { title, intro, list:[...] }  a "this week's focus" mini-guide (optional)
 *   links   [ {label, url} ]  trusted further reading (optional)
 *
 * Coverage is weekly so the heading always matches the person's actual stage.
 * Content is NHS-informed (+ NCT / Tommy's for checklists). Sources are logged in
 * ../../project/artefacts/content-draft.md. It is general information, not a
 * substitute for a midwife/health visitor/GP — the app says so on every screen.
 */

// Reused links
var L = {
  movements:   { label: "NHS: your baby's movements", url: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" },
  birthPlan:   { label: "NHS: how to make a birth plan", url: "https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/how-to-make-a-birth-plan/" },
  painRelief:  { label: "NHS: pain relief in labour", url: "https://www.nhs.uk/pregnancy/labour-and-birth/pain-relief-in-labour/" },
  whereBirth:  { label: "NHS: where to give birth — the options", url: "https://www.nhs.uk/pregnancy/labour-and-birth/where-to-give-birth-the-options/" },
  packBag:     { label: "NHS: pack your bag for labour", url: "https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/pack-your-bag-for-labour/" },
  nctBag:      { label: "NCT: hospital bag checklist", url: "https://www.nct.org.uk/information/labour-birth/planning-birth/hospital-bag-checklist-what-do-i-need" },
  signsLabour: { label: "NHS: signs that labour has begun", url: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/signs-that-labour-has-begun/" },
  safeSleep:   { label: "NHS: reduce the risk of SIDS (safe sleep)", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/reduce-the-risk-of-sudden-infant-death-syndrome/" },
  jaundice:    { label: "NHS: jaundice in babies", url: "https://www.nhs.uk/conditions/jaundice-in-babies/" },
  bloodSpot:   { label: "NHS: newborn blood spot test", url: "https://www.nhs.uk/baby/newborn-screening/blood-spot-test/" },
  vaccine6in1: { label: "NHS: the 6-in-1 vaccine", url: "https://www.nhs.uk/vaccinations/6-in-1-vaccine/" }
};

const TIMELINE = [
  // ---------------- Pregnancy ----------------
  {
    phase: "pregnancy", week: 30, label: "30 weeks pregnant",
    summary: "Third trimester proper. Nothing urgent — start turning your attention to the birth.",
    do: ["Get to know your baby's usual pattern of movements — you'll rely on it in the coming weeks."],
    watch: ["There's no 'normal' number of movements — it's about what's normal for your baby."],
    note: ["Start a running list of questions for your midwife appointments."],
    links: [L.movements]
  },
  {
    phase: "pregnancy", week: 31, label: "31 weeks pregnant",
    summary: "A good week to start forming birth preferences — you don't need the finished plan yet.",
    do: ["Start talking birth preferences with your partner: opinions to react to, not final decisions."],
    watch: ["Movements: if they slow, stop, or change, call your midwife straight away — day or night, don't wait until morning."],
    note: ["Anything from antenatal classes worth following up."],
    links: [L.movements, L.birthPlan]
  },
  {
    phase: "pregnancy", week: 32, label: "32 weeks pregnant",
    summary: "This week's focus: get properly informed for your birth plan.",
    do: ["Read up on your options so the plan is an informed one, then talk them through with your midwife."],
    watch: ["Movements — call immediately if they change."],
    note: ["Jot the questions your reading raises for the next appointment."],
    focus: {
      title: "Your birth plan — what to actually decide",
      intro: "A birth plan is your preferences, not a contract — you can change your mind at any time. Think through:",
      list: [
        "Where to give birth — home, a midwife-led unit, or a hospital labour ward.",
        "Pain relief — from breathing/TENS, to gas and air, to an epidural. Know the pros and cons of each.",
        "Positions and environment — what keeps you calm: moving around, water, lighting, music.",
        "Assisted birth — your wishes if forceps or ventouse (vacuum) become needed.",
        "Your birth partner — what role you want them to play.",
        "Just after birth — skin-to-skin, delayed cord clamping, vitamin K for baby, and how you plan to feed."
      ]
    },
    links: [L.birthPlan, L.painRelief, L.whereBirth]
  },
  {
    phase: "pregnancy", week: 33, label: "33 weeks pregnant",
    summary: "This week's focus: draft your hospital bag list so you can pack calmly next week.",
    do: ["Make your list now — the NHS suggests being ready to grab it from 37 weeks."],
    watch: ["Movements — call immediately if they change."],
    note: ["What you still need to buy or borrow before you can pack."],
    focus: {
      title: "Hospital bag — what people actually pack",
      intro: "NCT suggests three bags: one for labour, one for your postnatal stay, one for your birth partner. The essentials:",
      list: [
        "Your maternity notes (the one genuinely essential item) and birth plan.",
        "For labour: loose comfy clothing, snacks and drinks for you both, something to pass the time, lip balm, hair ties.",
        "For after: maternity/super sanitary pads (not tampons), 5–6 pairs of old or paper knickers, 2–3 supportive/nursing bras, going-home clothes (still bump-sized).",
        "Washbag: toothbrush, toiletries, flannel, deodorant.",
        "For baby: vests, sleepsuits and a hat (2–3 each), nappies, cotton wool, a going-home outfit.",
        "The car seat — essential if you're driving home."
      ]
    },
    links: [L.packBag, L.nctBag]
  },
  {
    phase: "pregnancy", week: 34, label: "34 weeks pregnant",
    summary: "Pack the bag this week so it's done early.",
    do: ["Pack the hospital bag(s) and put them somewhere you can grab them fast."],
    watch: ["Movements — call immediately if they change."],
    note: ["You'll usually have a midwife appointment around now — bring your questions."],
    links: [L.packBag, L.movements]
  },
  {
    phase: "pregnancy", week: 35, label: "35 weeks pregnant",
    summary: "Sort the car seat while you've got time and energy.",
    do: ["Buy or borrow the car seat and read how to fit it properly."],
    watch: ["Movements — call immediately if they change."],
    note: ["Agree a birth-partner back-up plan in case yours can't make it."],
    links: [L.movements]
  },
  {
    phase: "pregnancy", week: 36, label: "36 weeks pregnant",
    summary: "Home stretch prep: car seat fitted, baby clothes washed.",
    do: ["Fit the car seat and do a practice run; wash and sort baby's first clothes."],
    watch: ["Movements; and start learning the signs of labour so you'll recognise them."],
    note: ["Save your maternity unit's number where you can find it in a hurry."],
    links: [L.signsLabour, L.movements]
  },
  {
    phase: "pregnancy", week: 37, label: "37 weeks — full term is close",
    summary: "This week's focus: know exactly when to call, and finalise the plan.",
    do: ["Finalise the birth plan and make sure your birth partner knows it inside out."],
    watch: ["Signs of labour (below). Keep tracking movements right up to and during labour."],
    note: ["Keep the bag and documents by the door."],
    focus: {
      title: "Signs labour has begun — and when to call",
      intro: "Early signs: regular contractions or tightenings, a 'show' (mucus plug), backache, or your waters breaking. Call your midwife or maternity unit if:",
      list: [
        "Your contractions are regular and coming roughly every 5 minutes.",
        "Your waters break (note the time, colour and smell).",
        "You have any vaginal bleeding.",
        "Your baby's movements slow, stop, or change — don't wait.",
        "You're under 37 weeks and think you might be in labour.",
        "If you can't reach your midwife, call 111; if baby feels like it's coming right now, call 999."
      ]
    },
    links: [L.signsLabour, L.movements]
  },
  {
    phase: "pregnancy", week: 38, label: "38 weeks pregnant",
    summary: "Rest and bank sleep where you can.",
    do: ["Slow down; keep the bag and plan ready."],
    watch: ["Signs of labour; movements — call immediately if they change."],
    note: ["Final questions for the midwife."],
    links: [L.signsLabour]
  },
  {
    phase: "pregnancy", week: 39, label: "39 weeks pregnant",
    summary: "Any day now — but most first babies arrive after the due date.",
    do: ["Confirm your route and plan for getting to the unit."],
    watch: ["Signs of labour; reduced movements still matter right to the end — call if anything changes."],
    note: ["Anything still outstanding on the plan."],
    links: [L.signsLabour, L.movements]
  },
  {
    phase: "pregnancy", week: 40, label: "40 weeks — due date",
    summary: "Baby not here? Completely normal — talk to your midwife about what's next.",
    do: ["Ask your midwife about next steps — a membrane sweep or induction may be offered around now."],
    watch: ["When to go in: regular contractions ~5 min apart, waters breaking, any bleeding, or reduced movements → call."],
    note: ["Keep tracking movements while you wait."],
    links: [L.signsLabour, L.movements]
  },

  // ---------------- Newborn / fourth trimester ----------------
  {
    phase: "newborn", week: 0, label: "The first few days",
    summary: "The fourth trimester begins. Feeding, sleep, and a lot of watching.",
    do: ["Lots of skin-to-skin and frequent feeds.", "Follow safe sleep from the very first night (below)."],
    watch: ["Jaundice usually appears around day 2–3. If it shows in the first 24 hours, or baby feeds poorly or is very sleepy, get same-day advice.", "Wet and dirty nappies — roughly, what goes in comes out."],
    note: ["Birth weight, and anything the midwife flags."],
    focus: {
      title: "Safe sleep — every sleep, from night one",
      intro: "The NHS safe-sleep basics that reduce the risk of SIDS:",
      list: [
        "Always on the back, never front or side.",
        "In a clear, separate cot or Moses basket — no pillows, bumpers, or loose bedding.",
        "'Feet to foot' — baby's feet at the end of the cot so they can't wriggle under covers.",
        "In your room for the first 6 months.",
        "Room at 16–20°C; don't let baby overheat.",
        "Smoke-free, and never sleep with baby on a sofa or armchair."
      ]
    },
    links: [L.safeSleep, L.jaundice]
  },
  {
    phase: "newborn", week: 1, label: "Week 1 with your baby",
    summary: "Feeding round the clock, and the day-5 screening test.",
    do: ["Feed little and often (on demand); keep to safe sleep every sleep.", "The newborn blood-spot (heel-prick) test is offered around day 5 — it screens for 10 rare but serious conditions."],
    watch: ["Jaundice, feeding, and nappies. Contact your midwife straight away if jaundice worsens or baby becomes very reluctant to feed."],
    note: ["A light feed/nappy tally helps you and the midwife catch problems early."],
    links: [L.bloodSpot, L.jaundice, L.safeSleep]
  },
  {
    phase: "newborn", week: 2, label: "Week 2 with your baby",
    summary: "Back to birth weight, and care hands over to your health visitor.",
    do: ["Expect baby to be back to birth weight around now; your care usually moves from midwife to health visitor.", "Register the birth (in England, within 42 days)."],
    watch: ["Jaundice lasting beyond 2 weeks should be checked — contact your midwife, health visitor or GP."],
    note: ["Write down anything you want to raise with the health visitor."],
    links: [L.jaundice]
  },
  {
    phase: "newborn", week: 3, label: "Week 3 with your baby",
    summary: "Often the peak of crying — usually normal, but trust your instincts.",
    do: ["Keep feeding on demand; get outside a little — it helps you as much as baby."],
    watch: ["Fever, poor feeding, or an unusually floppy/listless baby always warrants a call to 111 or your GP."],
    note: ["How you're both doing — flag low mood to your health visitor; the fourth trimester is hard."],
    links: []
  },
  {
    phase: "newborn", week: 4, label: "Week 4 with your baby",
    summary: "You'll start to read baby's own rhythms.",
    do: ["Keep safe sleep and feeding going; notice patterns emerging."],
    watch: ["Same red flags — fever, poor feeding, fewer wet nappies, unusual drowsiness → seek advice."],
    note: ["Anything you want to raise at the 6–8 week review."],
    links: [L.safeSleep]
  },
  {
    phase: "newborn", week: 5, label: "Week 5 with your baby",
    summary: "The 6–8 week reviews are coming — get them booked.",
    do: ["Look out for the health visitor's letter about the 6–8 week review; book baby's first vaccinations if not already."],
    watch: ["Same newborn red flags."],
    note: ["Book your own 6-week postnatal check with the GP too."],
    links: [L.vaccine6in1]
  },
  {
    phase: "newborn", week: 6, label: "Week 6 — the 6-week checks",
    summary: "This week's focus: the reviews and first vaccinations.",
    do: ["Attend baby's 6–8 week review (a health-visitor review plus a GP physical check)."],
    watch: ["Raise any feeding, sleep, or development worries at the review — that's what it's for."],
    note: ["Have your own postnatal check too — how you're feeling counts, not just the physical."],
    focus: {
      title: "What's happening around now",
      intro: "Two things land close together:",
      list: [
        "The 6–8 week review — a developmental check for baby and a chance to talk about how you're both doing.",
        "The 6-in-1 vaccine — baby's first jabs are due at 8 weeks (then 12 and 16 weeks). Book it with your GP."
      ]
    },
    links: [L.vaccine6in1]
  }
];
