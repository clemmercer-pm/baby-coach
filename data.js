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
 * Content is NHS-informed (+ NCT / Tommy's / RoSPA for checklists). Sources are
 * logged in ../../project/artefacts/content-draft.md. General information, not a
 * substitute for a midwife/health visitor/GP — the app says so on every screen.
 */

// Reused links
var L = {
  movements:   { label: "NHS: your baby's movements", url: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" },
  preeclampsia:{ label: "NHS: pre-eclampsia", url: "https://www.nhs.uk/conditions/pre-eclampsia/" },
  birthPlan:   { label: "NHS: how to make a birth plan", url: "https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/how-to-make-a-birth-plan/" },
  painRelief:  { label: "NHS: pain relief in labour", url: "https://www.nhs.uk/pregnancy/labour-and-birth/pain-relief-in-labour/" },
  whereBirth:  { label: "NHS: where to give birth — the options", url: "https://www.nhs.uk/pregnancy/labour-and-birth/where-to-give-birth-the-options/" },
  packBag:     { label: "NHS: pack your bag for labour", url: "https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/pack-your-bag-for-labour/" },
  nctBag:      { label: "NCT: hospital bag checklist", url: "https://www.nct.org.uk/information/labour-birth/planning-birth/hospital-bag-checklist-what-do-i-need" },
  carSeat:     { label: "NHS: choosing a baby car seat", url: "https://www.nhs.uk/baby/first-aid-and-safety/safety/choosing-a-baby-car-seat/" },
  rospaCarSeat:{ label: "RoSPA: car seat safety", url: "https://www.rospa.com/Policy/road-safety/Advice/Vehicles/Car-seats" },
  signsLabour: { label: "NHS: signs that labour has begun", url: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-of-labour/signs-that-labour-has-begun/" },
  induction:   { label: "NHS: inducing labour", url: "https://www.nhs.uk/pregnancy/labour-and-birth/inducing-labour/" },
  safeSleep:   { label: "NHS: reduce the risk of SIDS (safe sleep)", url: "https://www.nhs.uk/conditions/baby/caring-for-a-newborn/reduce-the-risk-of-sudden-infant-death-syndrome/" },
  jaundice:    { label: "NHS: jaundice in babies", url: "https://www.nhs.uk/conditions/jaundice-in-babies/" },
  feedFirst:   { label: "NHS: breastfeeding — the first few days", url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding/the-first-few-days/" },
  newborn:     { label: "NHS: getting to know your newborn", url: "https://www.nhs.uk/pregnancy/labour-and-birth/getting-to-know-your-newborn/" },
  bloodSpot:   { label: "NHS: newborn blood spot test", url: "https://www.nhs.uk/baby/newborn-screening/blood-spot-test/" },
  soothing:    { label: "NHS: soothing a crying baby", url: "https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/" },
  colic:       { label: "NHS: colic", url: "https://www.nhs.uk/conditions/colic/" },
  pnd:         { label: "NHS: postnatal depression", url: "https://www.nhs.uk/mental-health/conditions/postnatal-depression/" },
  vaccine6in1: { label: "NHS: the 6-in-1 vaccine", url: "https://www.nhs.uk/vaccinations/6-in-1-vaccine/" }
};

// Reused watch bullets
var W = {
  movements:   "Movements: if they slow, stop, or change from their usual pattern, call your midwife or maternity unit immediately — day or night, don't wait until morning.",
  preeclampsia:"Pre-eclampsia: call your maternity unit (or 111) if you get a severe headache, vision changes, sudden swelling of face/hands/feet, or pain just below your ribs."
};

const TIMELINE = [
  // ---------------- Pregnancy ----------------
  {
    phase: "pregnancy", week: 30, label: "30 weeks pregnant",
    summary: "Third trimester proper. Nothing urgent — start turning your attention to the birth, and learn a couple of warning signs.",
    do: ["Get to know your baby's usual pattern of movements — you'll rely on it in the coming weeks."],
    watch: [W.movements, W.preeclampsia],
    note: ["Start a running list of questions for your midwife appointments."],
    focus: {
      title: "Warning signs worth knowing now",
      intro: "Pre-eclampsia can develop from around 20 weeks. Routine blood-pressure and urine checks catch most cases, but get checked immediately (maternity unit or 111) if you notice:",
      list: [
        "A severe headache that won't ease.",
        "Vision problems — blurring or flashing lights.",
        "Pain just below the ribs.",
        "Sudden swelling of the face, hands or feet.",
        "Vomiting later in pregnancy.",
        "These need same-day checking — don't wait for your next appointment."
      ]
    },
    links: [L.movements, L.preeclampsia]
  },
  {
    phase: "pregnancy", week: 31, label: "31 weeks pregnant",
    summary: "A good week to start forming birth preferences — you don't need the finished plan yet.",
    do: ["Start talking birth preferences with your partner: opinions to react to, not final decisions."],
    watch: [W.movements, W.preeclampsia],
    note: ["Anything from antenatal classes worth following up."],
    links: [L.movements, L.birthPlan]
  },
  {
    phase: "pregnancy", week: 32, label: "32 weeks pregnant",
    summary: "This week's focus: get properly informed for your birth plan.",
    do: ["Read up on your options so the plan is an informed one, then talk them through with your midwife."],
    watch: [W.movements, W.preeclampsia],
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
    watch: [W.movements, W.preeclampsia],
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
    watch: [W.movements, W.preeclampsia],
    note: ["You'll usually have a midwife appointment around now — bring your questions."],
    links: [L.packBag, L.movements]
  },
  {
    phase: "pregnancy", week: 35, label: "35 weeks pregnant",
    summary: "This week's focus: sort the car seat properly while you've got time.",
    do: ["Buy or borrow the car seat and learn to fit it correctly."],
    watch: [W.movements, W.preeclampsia],
    note: ["Agree a birth-partner back-up plan in case yours can't make it."],
    focus: {
      title: "Car seat safety — the essentials",
      intro: "Getting the fit right matters far more than the brand. Baby travels rear-facing from birth:",
      list: [
        "Rear-facing, in the back seat — legally until at least 15 months (many stay longer, which is safer).",
        "Never in a front seat with an active airbag — it's dangerous and illegal.",
        "Use only an approved seat — look for a UN R129 (i-Size) or ECE R44 label (an 'E' in a circle). Both are currently legal in the UK; i-Size is the newer, height-based standard.",
        "Use only the insert that came with the seat; don't add separate padding.",
        "Harness snug on the shoulders (about two fingers' gap), buckle sitting below the tummy.",
        "Get the fit checked — many retailers and safety schemes will check it for free."
      ]
    },
    links: [L.carSeat, L.rospaCarSeat]
  },
  {
    phase: "pregnancy", week: 36, label: "36 weeks pregnant",
    summary: "Home stretch prep: car seat fitted, baby clothes washed.",
    do: ["Fit the car seat and do a practice run; wash and sort baby's first clothes."],
    watch: [W.movements, W.preeclampsia, "Start learning the signs of labour so you'll recognise them."],
    note: ["Save your maternity unit's number where you can find it in a hurry."],
    links: [L.signsLabour, L.movements]
  },
  {
    phase: "pregnancy", week: 37, label: "37 weeks — full term is close",
    summary: "This week's focus: know exactly when to call, and finalise the plan.",
    do: ["Finalise the birth plan and make sure your birth partner knows it inside out."],
    watch: [W.movements, W.preeclampsia, "Signs of labour (see below)."],
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
    watch: [W.movements, W.preeclampsia, "Signs of labour."],
    note: ["Final questions for the midwife."],
    links: [L.signsLabour]
  },
  {
    phase: "pregnancy", week: 39, label: "39 weeks pregnant",
    summary: "Any day now — but most first babies arrive after the due date.",
    do: ["Confirm your route and plan for getting to the unit."],
    watch: [W.movements, W.preeclampsia, "Signs of labour."],
    note: ["Anything still outstanding on the plan."],
    links: [L.signsLabour, L.movements]
  },
  {
    phase: "pregnancy", week: 40, label: "40 weeks — due date",
    summary: "This week's focus: what happens if baby's not here yet (completely normal).",
    do: ["Talk to your midwife about next steps — most first babies come after the due date."],
    watch: [W.movements, W.preeclampsia],
    note: ["Keep tracking movements while you wait."],
    focus: {
      title: "Going past your due date",
      intro: "It's very common. What's usually offered:",
      list: [
        "A membrane sweep, usually from 39–41 weeks — a finger swept around the cervix to try to start labour. It can be uncomfortable and cause period-like pains or a 'show'.",
        "If that doesn't work, induction of labour — usually offered by 41 weeks, as risks rise after that.",
        "It's your choice. If you decline and go past 42 weeks, you'll be offered extra monitoring of baby's wellbeing.",
        "Keep tracking movements while you wait — call immediately if they change."
      ]
    },
    links: [L.induction, L.movements]
  },

  // ---------------- Newborn / fourth trimester ----------------
  {
    phase: "newborn", week: 0, label: "The first few days",
    summary: "The fourth trimester begins. Feeding, sleep, and a lot of watching.",
    do: ["Lots of skin-to-skin and frequent feeds.", "Follow safe sleep from the very first night (see below)."],
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
    summary: "This week's focus: getting feeding established.",
    do: ["Feed little and often; keep to safe sleep every sleep.", "The newborn blood-spot (heel-prick) test is offered around day 5."],
    watch: ["Jaundice, feeding, and nappies. Contact your midwife straight away if jaundice worsens or baby becomes very reluctant to feed."],
    note: ["A light feed/nappy tally helps you and the midwife catch problems early."],
    focus: {
      title: "Feeding in the first days",
      intro: "However you feed, the first days are about frequent feeds and learning baby's cues:",
      list: [
        "Feed responsively — watch for early hunger cues (rooting, hand-to-mouth). Crying is a late sign.",
        "Newborns feed a lot: at least 8–12 times in 24 hours, sometimes hourly at first.",
        "Breastfeeding shouldn't hurt — pain usually means a shallow latch. Ask your midwife or a breastfeeding supporter to check positioning early.",
        "If breastfeeding: a daily 10mcg vitamin D supplement for you, and 8.5–10mcg for baby if they're exclusively breastfed.",
        "If bottle-feeding, make up feeds safely and pace them — hold baby close and fairly upright.",
        "Signs it's going well: plenty of wet/dirty nappies and steady weight gain."
      ]
    },
    links: [L.feedFirst, L.bloodSpot, L.safeSleep]
  },
  {
    phase: "newborn", week: 2, label: "Week 2 with your baby",
    summary: "This week's focus: the newborn checks and first admin.",
    do: ["Most babies are back to their birth weight by around 2 weeks — your midwife/health visitor will keep an eye on it. Care usually hands over from midwife to health visitor about now."],
    watch: ["Jaundice lasting beyond 2 weeks should be checked — contact your midwife, health visitor or GP.", "'Baby blues' (tearful, anxious, low) are common now and usually pass within 2 weeks."],
    note: ["Write down anything you want to raise with the health visitor."],
    focus: {
      title: "Newborn checks & first admin",
      intro: "A few one-off things cluster in the first couple of weeks:",
      list: [
        "Newborn physical exam (NIPE) within 72 hours of birth — eyes, heart, hips and (if applicable) testicles checked.",
        "The day-5 blood-spot (heel-prick) test — screens for 10 rare but serious conditions.",
        "Cord care: keep it clean and dry, fold the nappy below it, let air get to it. It usually drops off in 5–15 days — don't pull it.",
        "Register the birth (England & Wales: within 42 days; Scotland: within 21 days; Northern Ireland: within 42 days)."
      ]
    },
    links: [L.newborn, L.bloodSpot]
  },
  {
    phase: "newborn", week: 3, label: "Week 3 with your baby",
    summary: "This week's focus: crying — and how to cope with it.",
    do: ["Keep feeding on demand; get outside a little — it helps you as much as baby."],
    watch: ["Fever, poor feeding, or an unusually floppy/listless baby always warrants a call to 111 or your GP."],
    note: ["How you're both doing matters too — see next week's mental-health focus."],
    focus: {
      title: "Crying & how to cope",
      intro: "Crying peaks from around 2 weeks to 3–4 months — it's normal and not a sign you're doing anything wrong. To soothe:",
      list: [
        "Hold baby close — skin-to-skin or in a sling; let them hear your heartbeat.",
        "Move gently — sway, rock, walk, sing; try a warm bath or a change of room.",
        "Sit baby upright during and after feeds to bring up wind.",
        "About 1 in 5 babies has colic (long bouts of hard-to-soothe crying) — it passes.",
        "Never shake a baby. If you feel overwhelmed, put baby somewhere safe and step away to calm down — that's the right thing to do.",
        "Cry-sis helpline: 0800 448 0737 (9am–10pm, every day)."
      ]
    },
    links: [L.soothing, L.colic]
  },
  {
    phase: "newborn", week: 4, label: "Week 4 with your baby",
    summary: "This week's focus: your mental health — both of you.",
    do: ["Keep safe sleep and feeding going; notice patterns emerging.", "Check in honestly with each other about how you're coping."],
    watch: ["Same newborn red flags — fever, poor feeding, fewer wet nappies, unusual drowsiness → seek advice."],
    note: ["Anything you want to raise at the 6–8 week review."],
    focus: {
      title: "Looking after your mental health",
      intro: "The fourth trimester is hard on parents, not just babies. Look out for each other:",
      list: [
        "'Baby blues' — feeling tearful, anxious or low in the first two weeks is very common and usually passes.",
        "If low mood lasts longer, deepens, or you can't cope, it may be postnatal depression — common, treatable, and nothing to be ashamed of.",
        "It's not just mums — around 1 in 10 partners develops postnatal depression too.",
        "Signs: persistent sadness, no enjoyment, exhaustion, trouble bonding, withdrawing, frightening thoughts.",
        "Getting help: talk to your GP or health visitor; in most areas you can self-refer to NHS talking therapies. Support for partners: PANDAS and Dad Matters.",
        "Rarely, a new mother can develop postpartum psychosis (sudden confusion, hallucinations, or feeling manic) — this is a medical emergency: call 999 or go to A&E.",
        "If either of you has thoughts of harming yourself or the baby, get help urgently — call 111, or 999 in an emergency."
      ]
    },
    links: [L.pnd, L.safeSleep]
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
    links: [L.vaccine6in1, L.pnd]
  }
];
