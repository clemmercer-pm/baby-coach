/* Baby Coach — v1 logic. No framework, no build step. */
(function () {
  "use strict";

  var STORAGE_KEY = "babyCoach.dueDate";
  var MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

  // --- Elements ---
  var setup = document.getElementById("setup");
  var roadmap = document.getElementById("roadmap");
  var dueInput = document.getElementById("dueDate");
  var stageLine = document.getElementById("stageLine");
  var thisWeekLabel = document.getElementById("thisWeekLabel");
  var thisWeekBody = document.getElementById("thisWeekBody");
  var comingUp = document.getElementById("comingUp");

  // --- Timeline maths ---

  // Put every entry on one axis so we can order across pregnancy -> newborn.
  // Pregnancy week w -> w (e.g. 31). Newborn week w -> 40 + w (e.g. 41).
  function sortIndex(entry) {
    return entry.phase === "newborn" ? 40 + entry.week : entry.week;
  }

  // Where are you today, on that same axis? 40 = due date.
  function currentIndex(dueDate, today) {
    var weeksToDue = (dueDate - today) / MS_PER_WEEK;
    if (weeksToDue >= 0) return 40 - weeksToDue;   // still pregnant
    return 40 + Math.abs(weeksToDue);              // past the due date (approx from due date)
  }

  function ordered() {
    return TIMELINE.slice().sort(function (a, b) { return sortIndex(a) - sortIndex(b); });
  }

  // The current focus = the latest entry you've reached.
  // Returns null if you're earlier than the whole roadmap (nothing reached yet).
  function pickCurrent(list, nowIndex) {
    var current = null;
    for (var i = 0; i < list.length; i++) {
      if (sortIndex(list[i]) <= nowIndex + 0.5) current = list[i];
    }
    return current;
  }

  // The next few entries after where you are now.
  function upcoming(list, current) {
    var start = current ? list.indexOf(current) + 1 : 0;
    return list.slice(start, start + 3);
  }

  // "in about 3 weeks" / "in about a week" / "this week".
  function relativeLabel(entry, nowIndex) {
    var w = Math.round(sortIndex(entry) - nowIndex);
    if (w <= 0) return "this week";
    if (w === 1) return "in about a week";
    return "in about " + w + " weeks";
  }

  function stageText(nowIndex) {
    if (nowIndex < 40) {
      var w = Math.floor(nowIndex);
      var d = Math.round((nowIndex - w) * 7);
      if (d === 7) { w += 1; d = 0; }
      return "You're about " + w + " weeks" + (d ? " + " + d + " day" + (d > 1 ? "s" : "") : "") + " pregnant";
    }
    var wk = Math.round(nowIndex - 40);
    if (wk <= 0) return "Around your due date";
    return "About " + wk + " week" + (wk > 1 ? "s" : "") + " into life with your baby (estimated from your due date)";
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
    var flag = hasPlaceholder(entry)
      ? '<p class="placeholder">⚠ Placeholder content — real guidance lands on Day 34</p>' : "";
    thisWeekBody.innerHTML =
      groupHtml("Do this", entry.do) +
      groupHtml("Watch for", entry.watch) +
      groupHtml("Worth noting", entry.note) + flag;
  }

  // Shown when you're earlier than the first roadmap entry.
  function renderBeforeRoadmap(firstEntry) {
    thisWeekLabel.textContent = "Your weekly roadmap starts soon";
    thisWeekBody.innerHTML =
      "<p>Baby Coach's week-by-week guidance kicks in from <strong>" +
      escapeHtml(firstEntry.label) + "</strong>. Here's what's on the horizon — nothing to do just yet.</p>";
  }

  function renderComingUp(entries, nowIndex) {
    if (!entries.length) {
      comingUp.innerHTML =
        "<div class=\"coming-up__item\"><div class=\"coming-up__what\">You've reached the end of the current roadmap. More stages are coming in a future update.</div></div>";
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

  function show(dueDate) {
    var nowIndex = currentIndex(dueDate, new Date());
    var list = ordered();
    var current = pickCurrent(list, nowIndex);

    stageLine.textContent = stageText(nowIndex);
    if (current) { renderCurrent(current); } else { renderBeforeRoadmap(list[0]); }
    renderComingUp(upcoming(list, current), nowIndex);

    setup.hidden = true;
    roadmap.hidden = false;
  }

  function askForDate() {
    roadmap.hidden = true;
    setup.hidden = false;
  }

  // Guard against nonsense dates (typos, wrong year).
  function isPlausibleDueDate(date) {
    if (isNaN(date.getTime())) return false;
    var weeksAway = (date - new Date()) / MS_PER_WEEK;
    return weeksAway <= 40 && weeksAway >= -12; // up to full pregnancy ahead, ~3 months past
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { show(new Date(saved)); } else { askForDate(); }

    document.getElementById("saveDate").addEventListener("click", function () {
      if (!dueInput.value) { dueInput.focus(); return; }
      var date = new Date(dueInput.value);
      if (!isPlausibleDueDate(date)) {
        setInputError("That date looks off — please check the year.");
        return;
      }
      clearInputError();
      localStorage.setItem(STORAGE_KEY, dueInput.value);
      show(date);
    });

    document.getElementById("changeDate").addEventListener("click", function () {
      dueInput.value = localStorage.getItem(STORAGE_KEY) || "";
      clearInputError();
      askForDate();
    });
  }

  function setInputError(msg) {
    clearInputError();
    var p = document.createElement("p");
    p.id = "dateError";
    p.className = "setup__error";
    p.textContent = msg;
    dueInput.insertAdjacentElement("afterend", p);
  }

  function clearInputError() {
    var existing = document.getElementById("dateError");
    if (existing) existing.remove();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init(); // DOM already parsed (e.g. script ran late) — run now.
  }
})();
