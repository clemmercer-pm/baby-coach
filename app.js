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

  // Where are you today, on that same axis?
  function currentIndex(dueDate, today) {
    var weeksToDue = (dueDate - today) / MS_PER_WEEK;
    if (weeksToDue >= 0) return 40 - weeksToDue;      // still pregnant
    return 40 + Math.abs(weeksToDue);                  // baby's here (approx from due date)
  }

  function ordered() {
    return TIMELINE.slice().sort(function (a, b) { return sortIndex(a) - sortIndex(b); });
  }

  // The current focus = the latest entry you've reached.
  function pickCurrent(list, nowIndex) {
    var current = list[0];
    for (var i = 0; i < list.length; i++) {
      if (sortIndex(list[i]) <= nowIndex + 0.5) current = list[i];
    }
    return current;
  }

  function nextThree(list, current) {
    var start = list.indexOf(current);
    return list.slice(start + 1, start + 4);
  }

  function stageText(nowIndex) {
    if (nowIndex < 40) return "You're about " + Math.round(nowIndex) + " weeks pregnant";
    var wk = Math.round(nowIndex - 40);
    return wk <= 0 ? "Around your due date" : "About " + wk + " week" + (wk > 1 ? "s" : "") + " since your due date";
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

  function renderComingUp(entries) {
    if (!entries.length) { comingUp.innerHTML = "<p>You're at the end of the v1 roadmap.</p>"; return; }
    comingUp.innerHTML = entries.map(function (e) {
      return '<div class="coming-up__item"><div class="coming-up__when">Next</div>' +
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
    var now = new Date();
    var nowIndex = currentIndex(dueDate, now);
    var list = ordered();
    var current = pickCurrent(list, nowIndex);

    stageLine.textContent = stageText(nowIndex);
    renderCurrent(current);
    renderComingUp(nextThree(list, current));

    setup.hidden = true;
    roadmap.hidden = false;
  }

  function askForDate() {
    roadmap.hidden = true;
    setup.hidden = false;
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { show(new Date(saved)); } else { askForDate(); }

    document.getElementById("saveDate").addEventListener("click", function () {
      if (!dueInput.value) { dueInput.focus(); return; }
      localStorage.setItem(STORAGE_KEY, dueInput.value);
      show(new Date(dueInput.value));
    });

    document.getElementById("changeDate").addEventListener("click", function () {
      dueInput.value = localStorage.getItem(STORAGE_KEY) || "";
      askForDate();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init(); // DOM already parsed (e.g. script ran late) — run now.
  }
})();
