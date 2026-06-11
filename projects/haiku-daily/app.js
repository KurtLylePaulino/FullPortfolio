// Haiku Daily — daily pick, reroll, copy, sakura petals, generative koto.

const haikuEl   = document.getElementById("haiku");
const jpEl      = document.getElementById("jp");
const bylineEl  = document.getElementById("byline");
const themeEl   = document.getElementById("themeLabel");
const kanjiEl   = document.getElementById("themeKanji");
const dateLabel = document.getElementById("dateLabel");
const poolCount = document.getElementById("poolCount");
const rerollBtn = document.getElementById("rerollBtn");
const copyBtn   = document.getElementById("copyBtn");
const soundBtn  = document.getElementById("soundBtn");
const petalsEl  = document.getElementById("petals");
const toastEl   = document.getElementById("toast");

// ---------- date + daily pick -------------------------------------------

function dayNumber(date) {
  const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(utcMidnight / 86400000);
}
function indexForToday() {
  return dayNumber(new Date()) % HAIKUS.length;
}
function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

// ---------- render -------------------------------------------------------

let currentIndex = indexForToday();

function render(haiku) {
  haikuEl.classList.add("is-swapping");
  if (jpEl) jpEl.classList.add("is-swapping");
  window.setTimeout(() => {
    haikuEl.innerHTML = haiku.lines
      .map((line) => `<span class="line">${line}</span>`)
      .join("");
    if (jpEl) jpEl.textContent = haiku.jp || "";
    bylineEl.textContent = haiku.dates
      ? `— ${haiku.author} · ${haiku.dates}`
      : `— ${haiku.author}`;
    themeEl.textContent = haiku.theme || "";
    kanjiEl.textContent = haiku.kanji || "";
    haikuEl.classList.remove("is-swapping");
    if (jpEl) jpEl.classList.remove("is-swapping");
  }, 220);
}

// ---------- reroll -------------------------------------------------------

function reroll() {
  if (HAIKUS.length < 2) return;
  let next = currentIndex;
  while (next === currentIndex) next = Math.floor(Math.random() * HAIKUS.length);
  currentIndex = next;
  render(HAIKUS[currentIndex]);
  rerollBtn.classList.add("spin");
  window.setTimeout(() => rerollBtn.classList.remove("spin"), 500);
  if (audioOn) pluck(pick(SCALE), audioCtx.currentTime); // a little chime on reroll
}

// ---------- copy ---------------------------------------------------------

function currentText() {
  const h = HAIKUS[currentIndex];
  const credit = h.dates ? `— ${h.author} (${h.dates})` : `— ${h.author}`;
  const jp = h.jp ? `\n${h.jp}` : "";
  return `${h.lines.join("\n")}${jp}\n\n${credit}`;
}
async function copyHaiku() {
  const text = currentText();
  try {
    await navigator.clipboard.writeText(text);
    toast("Haiku copied ✓");
  } catch {
    // Fallback for older browsers / non-secure contexts.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Haiku copied ✓"); }
    catch { toast("Couldn't copy — select & copy manually"); }
    document.body.removeChild(ta);
  }
}

let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 1800);
}

// ---------- sakura petals ------------------------------------------------

function makePetals(count) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const size = 8 + Math.random() * 10;
    const fall = 9 + Math.random() * 9;     // seconds to fall
    const sway = 2.5 + Math.random() * 3;    // sway period
    p.style.left = Math.random() * 100 + "vw";
    p.style.width = p.style.height = size + "px";
    p.style.opacity = (0.5 + Math.random() * 0.45).toFixed(2);
    p.style.animationDuration = `${fall}s, ${sway}s`;
    p.style.animationDelay = `${-Math.random() * fall}s, ${-Math.random() * sway}s`;
    petalsEl.appendChild(p);
  }
}

// ---------- generative koto (Web Audio) ----------------------------------
// Hirajoshi-style pentatonic — the classic "Japanese" colour.
const SCALE = [220.00, 246.94, 293.66, 329.63, 369.99,   // A B D E F#
               440.00, 493.88, 587.33, 659.25];          // + an octave up
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

let audioCtx = null, masterGain = null, reverb = null, audioOn = false, noteTimer = null;

function makeImpulse(seconds, decay) {
  const rate = audioCtx.sampleRate;
  const len = Math.floor(seconds * rate);
  const buf = audioCtx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
    }
  }
  return buf;
}

function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioCtx.destination);

  reverb = audioCtx.createConvolver();
  reverb.buffer = makeImpulse(3.0, 2.2);
  const wet = audioCtx.createGain();
  wet.gain.value = 0.4;
  reverb.connect(wet);
  wet.connect(masterGain);
}

// A plucked koto-ish note: two oscillators through a lowpass with a fast
// attack and long exponential decay, sent to both dry and reverb paths.
function pluck(freq, t) {
  if (!audioCtx) return;
  const o1 = audioCtx.createOscillator(); o1.type = "triangle"; o1.frequency.value = freq;
  const o2 = audioCtx.createOscillator(); o2.type = "sine";     o2.frequency.value = freq * 2; o2.detune.value = 5;
  const g  = audioCtx.createGain();
  const lp = audioCtx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2400;

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 2.6);

  o1.connect(g); o2.connect(g); g.connect(lp);
  lp.connect(masterGain); lp.connect(reverb);
  o1.start(t); o2.start(t);
  o1.stop(t + 2.8); o2.stop(t + 2.8);
}

function scheduleNotes() {
  if (!audioOn) return;
  pluck(pick(SCALE), audioCtx.currentTime + 0.02);
  // occasional soft second note for a little phrase
  if (Math.random() < 0.4) pluck(pick(SCALE), audioCtx.currentTime + 0.28);
  const next = 1600 + Math.random() * 2200;
  noteTimer = window.setTimeout(scheduleNotes, next);
}

function toggleSound() {
  if (!audioCtx) initAudio();
  audioCtx.resume();
  audioOn = !audioOn;
  soundBtn.setAttribute("aria-pressed", String(audioOn));
  soundBtn.querySelector(".lbl").textContent = audioOn ? "Koto on" : "Koto off";
  const now = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setTargetAtTime(audioOn ? 0.16 : 0, now, 0.4);
  if (audioOn) { scheduleNotes(); toast("Koto playing ♪"); }
  else { window.clearTimeout(noteTimer); }
}

// ---------- init ---------------------------------------------------------

dateLabel.textContent = formatDate(new Date());
poolCount.textContent = `${HAIKUS.length} haiku · the classical masters`;
render(HAIKUS[currentIndex]);
makePetals(20);

rerollBtn.addEventListener("click", reroll);
copyBtn.addEventListener("click", copyHaiku);
soundBtn.addEventListener("click", toggleSound);

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  const k = e.key.toLowerCase();
  if (k === "r" || e.code === "Space") { e.preventDefault(); reroll(); }
  else if (k === "c") { e.preventDefault(); copyHaiku(); }
});
