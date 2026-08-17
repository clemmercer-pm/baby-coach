/* Baby Coach — v1 logic. No framework, no build step. */
(function () {
  "use strict";

  var MODE_KEY = "babyCoach.mode";   // "pregnancy" | "born"
  var DATE_KEY = "babyCoach.date";   // YYYY-MM-DD
  var LEGACY_DUE_KEY = "babyCoach.dueDate"; // pre-toggle storage
  var MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
  var MS_PER_DAY = 24 * 60 * 60 * 1000;

  // --- Elements ---
  var setup = document.getElementById("setup");
  var roadmap = document.getElementById("roadmap");
  var dateInput = document.getElementById("dueDate");
  var dateLabel = document.getElementById("dateLabel");
  var stageLine = document.getElementById("stageLine");
  var thisWeekLabel = document.getElementById("thisWeekLabel");
  var thisWeekBody = document.getElementById("thisWeekBody");
  var comingUp = document.getElementById("comingUp");
  var toggleBtns = document.querySelectorAll(".toggle__btn");

  var selectedMode = "pregnancy";

  // --- Timeline maths ---

  // One shared axis: 40 = due date. Pregnancy week w -> w. Newborn week w -> 40 + w.
  function sortIndex(entry) {
    return entry.phase === "newborn" ? 40 + entry.week : entry.week;
  }

  // Where you are today on that axis, given your mode + date.
  function currentIndex(mode, date, today) {
    if (mode === "born") return 40 + (today - date) / MS_PER_WEEK; // weeks since birth
    return 40 - (date - today) / MS_PER_WEEK;                       // weeks pregnant
  }

  function ordered() {
    return TIMELINE.slice().sort(function (a, b) { return sortIndex(a) - sortIndex(b); });
  }

  function isPhase(mode) {
    return function (e) { return mode === "born" ? e.phase === "newborn" : e.phase === "pregnancy"; };
  }

  // Current focus = latest entry you've reached *within your mode's phase*.
  // Keeping selection inside the phase is what stops a due-date app showing
  // newborn content (and vice-versa). Returns null if you're before it all.
  function pickCurrent(list, nowIndex, mode) {
    var candidates = list.filter(isPhase(mode));
    var current = null;
    for (var i = 0; i < candidates.length; i++) {
      if (sortIndex(candidates[i]) <= nowIndex + 0.01) current = candidates[i];
    }
    return current;
  }

  // Next few entries after where you are (drawn from the full list, so a
  // pregnancy view can preview the newborn stages as "coming up").
  function upcoming(list, current) {
    var start = current ? list.indexOf(current) + 1 : 0;
    return list.slice(start, start + 3);
  }

  function relativeLabel(entry, nowIndex) {
    var w = Math.round(sortIndex(entry) - nowIndex);
    if (w <= 0) return "this week";
    if (w === 1) return "in about a week";
    return "in about " + w + " weeks";
  }

  function stageText(mode, nowIndex) {
    if (mode === "born") {
      var days = Math.max(0, Math.round((nowIndex - 40) * 7));
      if (days < 7) return "Your baby is " + days + " day" + (days === 1 ? "" : "s") + " old";
      var w = Math.floor(days / 7), d = days % 7;
      return "Your baby is " + w + " week" + (w > 1 ? "s" : "") +
             (d ? " + " + d + " day" + (d > 1 ? "s" : "") : "") + " old";
    }
    if (nowIndex < 40) {
      var wk = Math.floor(nowIndex), dd = Math.round((nowIndex - wk) * 7);
      if (dd === 7) { wk += 1; dd = 0; }
      return "You're about " + wk + " weeks" + (dd ? " + " + dd + " day" + (dd > 1 ? "s" : "") : "") + " pregnant";
    }
    var over = Math.round(nowIndex - 40);
    if (over <= 0) return "Around your due date";
    return "About " + over + " week" + (over > 1 ? "s" : "") + " past your due date — if baby's arrived, switch to “Baby's arrived” above";
  }

  // --- Rendering ---

  function hasPlaceholder(entry) {
    return [].concat(entry.do, entry.watch, entry.note)
      .some(function (t) { return /PLACEHOLDER/.test(t); });
  }

  function groupHtml(label, items) {
    if (!items || !items.length) return "";
    var lis = items.map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("");
    return '<div class="focus__group"><p class="focus__label">' + label +
           '</p><ul class="focus__list">' + lis + "</ul></div>";
  }

  function renderCurrent(entry) {
    thisWeekLabel.textContent = entry.label;
    var html = "";
    if (entry.summary) html += '<p class="this-week__summary">' + escapeHtml(entry.summary) + "</p>";
    html += groupHtml("Do this", entry.do) +
            groupHtml("Watch for", entry.watch) +
            groupHtml("Worth noting", entry.note);
    if (entry.focus) html += focusHtml(entry.focus);
    if (entry.links && entry.links.length) html += linksHtml(entry.links);
    if (hasPlaceholder(entry)) html += '<p class="placeholder">⚠ Placeholder content — being written</p>';
    thisWeekBody.innerHTML = html;
  }

  function focusHtml(focus) {
    var items = (focus.list || []).map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; }).join("");
    return '<div class="focus-box">' +
           '<p class="focus-box__title">' + escapeHtml(focus.title) + "</p>" +
           (focus.intro ? '<p class="focus-box__intro">' + escapeHtml(focus.intro) + "</p>" : "") +
           (items ? '<ul class="focus-box__list">' + items + "</ul>" : "") +
           "</div>";
  }

  function linksHtml(links) {
    var a = links.map(function (l) {
      return '<a class="links__link" href="' + encodeURI(l.url) +
             '" target="_blank" rel="noopener noreferrer">' + escapeHtml(l.label) + " ↗</a>";
    }).join("");
    return '<div class="links"><p class="links__label">Read more</p>' + a + "</div>";
  }

  function renderBeforeRoadmap(firstEntry) {
    thisWeekLabel.textContent = "Your weekly roadmap starts soon";
    thisWeekBody.innerHTML =
      "<p>Baby Coach's week-by-week guidance kicks in from <strong>" +
      escapeHtml(firstEntry.label) + "</strong>. Here's what's on the horizon — nothing to do just yet.</p>";
  }

  function renderComingUp(entries, nowIndex) {
    if (!entries.length) {
      comingUp.innerHTML =
        '<div class="coming-up__item"><div class="coming-up__what">You’ve reached the end of the current roadmap. More stages are coming in a future update.</div></div>';
      return;
    }
    comingUp.innerHTML = entries.map(function (e) {
      return '<div class="coming-up__item">' +
             '<div class="coming-up__when">' + escapeHtml(relativeLabel(e, nowIndex)) + "</div>" +
             '<div class="coming-up__what">' + escapeHtml(e.label) + "</div></div>";
    }).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // --- Flow ---

  function show(mode, date) {
    var nowIndex = currentIndex(mode, date, new Date());
    var list = ordered();
    var current = pickCurrent(list, nowIndex, mode);

    stageLine.textContent = stageText(mode, nowIndex);
    if (current) { renderCurrent(current); } else { renderBeforeRoadmap(list.filter(isPhase(mode))[0]); }
    renderComingUp(upcoming(list, current), nowIndex);

    setup.hidden = true;
    roadmap.hidden = false;
  }

  function askForDate() {
    roadmap.hidden = true;
    setup.hidden = false;
  }

  function applyMode(mode) {
    selectedMode = mode;
    dateLabel.textContent = mode === "born" ? "When was your baby born?" : "When's your due date?";
    dateInput.max = mode === "born" ? isoToday() : "";
    dateInput.min = mode === "born" ? "" : isoToday();
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].classList.toggle("is-active", toggleBtns[i].getAttribute("data-mode") === mode);
    }
  }

  function isoToday() {
    return new Date().toISOString().slice(0, 10);
  }

  // Validate the date makes sense for the chosen mode.
  function validate(mode, date) {
    if (isNaN(date.getTime())) return "Please enter a date.";
    var weeksAway = (date - new Date()) / MS_PER_WEEK;
    if (mode === "born") {
      if (weeksAway > 0.2) return "A birth date can't be in the future.";
      if (weeksAway < -14) return "That's more than 3 months ago — outside this roadmap for now.";
    } else {
      if (weeksAway > 40) return "That due date looks too far off — please check the year.";
      if (weeksAway < -3) return "That due date is well in the past — has baby arrived? Try “Baby's arrived”.";
    }
    return null;
  }

  function init() {
    // Migrate legacy due-date-only storage.
    var legacy = localStorage.getItem(LEGACY_DUE_KEY);
    if (legacy && !localStorage.getItem(DATE_KEY)) {
      localStorage.setItem(MODE_KEY, "pregnancy");
      localStorage.setItem(DATE_KEY, legacy);
      localStorage.removeItem(LEGACY_DUE_KEY);
    }

    var savedMode = localStorage.getItem(MODE_KEY);
    var savedDate = localStorage.getItem(DATE_KEY);
    applyMode(savedMode === "born" ? "born" : "pregnancy");

    if (savedMode && savedDate) { show(savedMode, new Date(savedDate)); } else { askForDate(); }

    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].addEventListener("click", function () {
        applyMode(this.getAttribute("data-mode"));
        clearError();
      });
    }

    document.getElementById("saveDate").addEventListener("click", function () {
      if (!dateInput.value) { dateInput.focus(); return; }
      var date = new Date(dateInput.value);
      var problem = validate(selectedMode, date);
      if (problem) { setError(problem); return; }
      clearError();
      localStorage.setItem(MODE_KEY, selectedMode);
      localStorage.setItem(DATE_KEY, dateInput.value);
      show(selectedMode, date);
    });

    document.getElementById("changeDate").addEventListener("click", function () {
      applyMode(localStorage.getItem(MODE_KEY) === "born" ? "born" : "pregnancy");
      dateInput.value = localStorage.getItem(DATE_KEY) || "";
      clearError();
      askForDate();
    });
  }

  function setError(msg) {
    clearError();
    var p = document.createElement("p");
    p.id = "dateError";
    p.className = "setup__error";
    p.textContent = msg;
    dateInput.insertAdjacentElement("afterend", p);
  }

  function clearError() {
    var e = document.getElementById("dateError");
    if (e) e.remove();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
