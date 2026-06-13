// Haiku Daily — cinematic sumi-e build.
// Daily pick + reroll + copy, a living night scene (canvas petals/fireflies,
// parallax mountains), brush-write reveals, an intro shoji sequence, looping
// music (mp3 if present, else synthesized koto/shakuhachi), and ducked synth SFX.

"use strict";

/* ======================= elements & state ======================= */

const $ = (id) => document.getElementById(id);
const haikuEl = $("haiku"), jpEl = $("jp"), bylineEl = $("byline"),
      themeEl = $("themeLabel"), kanjiEl = $("themeKanji"),
      dateLabel = $("dateLabel"), poolCount = $("poolCount"),
      rerollBtn = $("rerollBtn"), copyBtn = $("copyBtn"),
      musicBtn = $("musicBtn"), sfxBtn = $("sfxBtn"),
      brandJp = $("brandJp"), seal = $("seal"), inkSweep = $("inkSweep"),
      ripples = $("ripples"), toastEl = $("toast"), canvas = $("particles"),
      volSlider = $("volSlider"), volVal = $("volVal");

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MUSIC_FILE = "Moonlit Koto Garden.mp3"; // original track in the repo root

/* ======================= date + daily pick ======================= */

function dayNumber(d) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}
const indexForToday = () => dayNumber(new Date()) % HAIKUS.length;
const formatDate = (d) =>
  d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

let currentIndex = indexForToday();

/* ======================= audio engine ======================= */

let actx = null, master = null, musicGain = null, sfxGain = null, reverb = null;
let audioUnlocked = false;
let musicOn = false, musicReady = false, musicMode = null; // 'file' | 'synth'
let musicEl = null, droneNodes = null, kotoTimer = null, shakuTimer = null;
let sfxEnabled = REDUCED ? false : (localStorage.getItem("haiku-sfx") !== "off");
let musicWanted = localStorage.getItem("haiku-music") === "on";

const clamp01 = (x) => (isNaN(x) ? 0.4 : Math.max(0, Math.min(1, x)));
const _storedVol = localStorage.getItem("haiku-vol");
let musicVolume = _storedVol === null ? 0.4 : clamp01(parseFloat(_storedVol)); // start at 40%

const SCALE = [220.0, 246.94, 293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25]; // hirajoshi-ish
const pick = (a) => a[(Math.random() * a.length) | 0];

function makeImpulse(sec, decay) {
  const rate = actx.sampleRate, len = (sec * rate) | 0, buf = actx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function ensureAudio() {
  if (actx) return true;
  try {
    actx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) { return false; }
  master = actx.createGain(); master.gain.value = 0.9; master.connect(actx.destination);
  musicGain = actx.createGain(); musicGain.gain.value = 0; musicGain.connect(master);
  sfxGain = actx.createGain(); sfxGain.gain.value = sfxEnabled ? 0.35 : 0; sfxGain.connect(master);
  reverb = actx.createConvolver(); reverb.buffer = makeImpulse(3.0, 2.2);
  const wet = actx.createGain(); wet.gain.value = 0.32; reverb.connect(wet); wet.connect(master);
  reverb._wet = wet;
  return true;
}

function unlockAudio() {
  if (audioUnlocked) return;
  if (!ensureAudio()) return;
  audioUnlocked = true;
  if (actx.state === "suspended") actx.resume();
  if (sfxEnabled) sfxBell(); // soft tone on first entry
  if (musicWanted && !musicOn) setMusic(true);
}

/* ---- SFX (synth, rate-limited, ducked) ---- */

const lastSfx = {};
function gate(name, ms) {
  const now = performance.now();
  if (lastSfx[name] && now - lastSfx[name] < ms) return false;
  lastSfx[name] = now; return true;
}
function duck() { // briefly dip the music under an effect
  if (!musicGain || !musicOn) return;
  const now = actx.currentTime, t = musicTargetGain();
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setTargetAtTime(t * 0.55, now, 0.04);
  musicGain.gain.setTargetAtTime(t, now + 0.16, 0.18);
}
function env(node, peak, t, a, d) {
  const g = node;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0008, t + a + d);
}
function noiseBuf(sec) {
  const len = (actx.sampleRate * sec) | 0, b = actx.createBuffer(1, len, actx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function sfxBell() {
  if (!sfxEnabled || !actx) return;
  const t = actx.currentTime;
  [1, 2.01, 3.02].forEach((mult, i) => {
    const o = actx.createOscillator(); o.type = "sine"; o.frequency.value = 528 * mult;
    const g = actx.createGain(); env(g, 0.22 / (i + 1), t, 0.01, 1.6);
    o.connect(g); g.connect(sfxGain); g.connect(reverb);
    o.start(t); o.stop(t + 1.8);
  });
}
function sfxClack() { // bamboo shishi-odoshi "tok"
  if (!sfxEnabled || !actx || !gate("clack", 120)) return;
  const t = actx.currentTime;
  const o = actx.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(150, t + 0.12);
  const g = actx.createGain(); env(g, 0.5, t, 0.004, 0.16);
  const n = actx.createBufferSource(); n.buffer = noiseBuf(0.05);
  const bp = actx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1700; bp.Q.value = 1.2;
  const ng = actx.createGain(); env(ng, 0.28, t, 0.002, 0.05);
  o.connect(g); g.connect(sfxGain); g.connect(reverb);
  n.connect(bp); bp.connect(ng); ng.connect(sfxGain);
  o.start(t); o.stop(t + 0.2); n.start(t); n.stop(t + 0.06);
  duck();
}
function sfxTick() { // soft brush tick per line
  if (!sfxEnabled || !actx || !gate("tick", 28)) return;
  const t = actx.currentTime;
  const n = actx.createBufferSource(); n.buffer = noiseBuf(0.04);
  const hp = actx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 2600;
  const g = actx.createGain(); env(g, 0.12, t, 0.002, 0.035);
  n.connect(hp); hp.connect(g); g.connect(sfxGain);
  n.start(t); n.stop(t + 0.05);
}
function sfxThunk() { // seal stamp
  if (!sfxEnabled || !actx || !gate("thunk", 150)) return;
  const t = actx.currentTime;
  const o = actx.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(58, t + 0.16);
  const g = actx.createGain(); env(g, 0.55, t, 0.004, 0.22);
  const n = actx.createBufferSource(); n.buffer = noiseBuf(0.08);
  const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900;
  const ng = actx.createGain(); env(ng, 0.3, t, 0.002, 0.09);
  o.connect(g); g.connect(sfxGain); n.connect(lp); lp.connect(ng); ng.connect(sfxGain);
  o.start(t); o.stop(t + 0.26); n.start(t); n.stop(t + 0.1);
  duck();
}
function sfxDrop() { // soft water plip for click ripple
  if (!sfxEnabled || !actx || !gate("drop", 80)) return;
  const t = actx.currentTime;
  const o = actx.createOscillator(); o.type = "sine";
  o.frequency.setValueAtTime(900, t); o.frequency.exponentialRampToValueAtTime(420, t + 0.1);
  const g = actx.createGain(); env(g, 0.16, t, 0.003, 0.12);
  o.connect(g); g.connect(sfxGain); g.connect(reverb);
  o.start(t); o.stop(t + 0.16);
}

/* ---- music: looping mp3 if present, else synth ambience ---- */

const musicTargetGain = () => musicVolume * (musicMode === "file" ? 1.0 : 0.5);

async function prepareMusic() {
  if (musicReady) return;
  const url = encodeURI(MUSIC_FILE); // handles the spaces in the filename
  let hasFile = false;
  try {
    const r = await fetch(url, { method: "HEAD" });
    const ct = (r.headers.get("content-type") || "").toLowerCase();
    hasFile = r.ok && ct.indexOf("html") === -1; // any non-HTML 200 = a real asset
  } catch (e) { hasFile = false; }

  if (hasFile) {
    musicEl = new Audio(url); musicEl.loop = true; musicEl.preload = "auto"; musicEl.crossOrigin = "anonymous";
    try {
      const src = actx.createMediaElementSource(musicEl);
      src.connect(musicGain); musicMode = "file";
    } catch (e) { musicEl = null; musicMode = "synth"; }
  } else {
    musicMode = "synth";
  }
  musicReady = true;
}

function startSynthMusic() {
  // low drone bed (root + fifth)
  const t = actx.currentTime;
  const mk = (freq, detune) => {
    const o = actx.createOscillator(); o.type = "triangle"; o.frequency.value = freq; o.detune.value = detune;
    const g = actx.createGain(); g.gain.value = 0.5;
    const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600;
    const lfo = actx.createOscillator(); lfo.frequency.value = 0.05;
    const lfg = actx.createGain(); lfg.gain.value = 180;
    lfo.connect(lfg); lfg.connect(lp.frequency);
    o.connect(g); g.connect(lp); lp.connect(musicGain);
    o.start(t); lfo.start(t);
    return [o, lfo];
  };
  droneNodes = [...mk(110, -4), ...mk(164.81, 5)];
  scheduleKoto();
  scheduleShaku();
}
function scheduleKoto() {
  if (!musicOn || musicMode !== "synth") return;
  pluck(pick(SCALE), actx.currentTime + 0.02);
  if (Math.random() < 0.4) pluck(pick(SCALE), actx.currentTime + 0.3);
  kotoTimer = setTimeout(scheduleKoto, 1700 + Math.random() * 2400);
}
function scheduleShaku() {
  if (!musicOn || musicMode !== "synth") return;
  if (Math.random() < 0.6) shaku(pick(SCALE) / 2);
  shakuTimer = setTimeout(scheduleShaku, 6000 + Math.random() * 7000);
}
function pluck(freq, t) {
  const o1 = actx.createOscillator(); o1.type = "triangle"; o1.frequency.value = freq;
  const o2 = actx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2; o2.detune.value = 5;
  const g = actx.createGain(); const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2400;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.4, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 2.6);
  o1.connect(g); o2.connect(g); g.connect(lp); lp.connect(musicGain); lp.connect(reverb);
  o1.start(t); o2.start(t); o1.stop(t + 2.8); o2.stop(t + 2.8);
}
function shaku(freq) { // breathy shakuhachi-ish sustained note with vibrato
  const t = actx.currentTime;
  const o = actx.createOscillator(); o.type = "sine"; o.frequency.value = freq;
  const vib = actx.createOscillator(); vib.frequency.value = 5; const vibg = actx.createGain(); vibg.gain.value = 4;
  vib.connect(vibg); vibg.connect(o.frequency);
  const g = actx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.4);
  g.gain.setValueAtTime(0.16, t + 1.6);
  g.gain.exponentialRampToValueAtTime(0.0008, t + 3.2);
  const n = actx.createBufferSource(); n.buffer = noiseBuf(3.2);
  const bp = actx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = freq * 2; bp.Q.value = 6;
  const ng = actx.createGain(); ng.gain.value = 0.04;
  o.connect(g); g.connect(musicGain); g.connect(reverb);
  n.connect(bp); bp.connect(ng); ng.connect(musicGain);
  o.start(t); vib.start(t); n.start(t);
  o.stop(t + 3.3); vib.stop(t + 3.3); n.stop(t + 3.3);
}
function stopSynthMusic() {
  clearTimeout(kotoTimer); clearTimeout(shakuTimer);
  if (droneNodes) { droneNodes.forEach((n) => { try { n.stop(); } catch (e) {} }); droneNodes = null; }
}

async function setMusic(on) {
  if (!ensureAudio()) return;
  if (actx.state === "suspended") await actx.resume();
  await prepareMusic();
  musicOn = on;
  musicWanted = on; localStorage.setItem("haiku-music", on ? "on" : "off");
  musicBtn.setAttribute("aria-pressed", String(on));
  musicBtn.title = on ? "Background music: on" : "Background music: off";
  const now = actx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  if (on) {
    musicGain.gain.setTargetAtTime(musicTargetGain(), now, 0.8);
    if (musicMode === "file" && musicEl) { try { await musicEl.play(); } catch (e) {} }
    else if (musicMode === "synth" && !droneNodes) startSynthMusic();
    toast(musicMode === "file" ? "Music ♪" : "Koto drifting ♪");
  } else {
    musicGain.gain.setTargetAtTime(0, now, 0.6);
    if (musicMode === "file" && musicEl) { setTimeout(() => { try { musicEl.pause(); } catch (e) {} }, 800); }
    else setTimeout(stopSynthMusic, 800);
  }
}

function setSfx(on) {
  sfxEnabled = on;
  localStorage.setItem("haiku-sfx", on ? "on" : "off");
  sfxBtn.setAttribute("aria-pressed", String(on));
  sfxBtn.title = on ? "UI sound effects: on" : "UI sound effects: off";
  sfxBtn.querySelector(".ico").textContent = on ? "🔔" : "🔕";
  if (actx && sfxGain) sfxGain.gain.setTargetAtTime(on ? 0.35 : 0, actx.currentTime, 0.1);
  if (on) sfxClack();
}

function setVolume(v, persist) {
  musicVolume = clamp01(v);
  const pct = Math.round(musicVolume * 100) + "%";
  if (volSlider) volSlider.style.setProperty("--vol", pct);
  if (volVal) volVal.textContent = pct;
  if (persist) localStorage.setItem("haiku-vol", String(musicVolume));
  if (actx && musicGain && musicOn) musicGain.gain.setTargetAtTime(musicTargetGain(), actx.currentTime, 0.12);
}

/* ======================= render (brush-write) ======================= */

function currentText() {
  const h = HAIKUS[currentIndex];
  const credit = h.dates ? `— ${h.author} (${h.dates})` : `— ${h.author}`;
  return `${h.lines.join("\n")}${h.jp ? "\n" + h.jp : ""}\n\n${credit}`;
}

function render(h, animate) {
  [jpEl, bylineEl, themeEl].forEach((el) => el.classList.add("fade"));
  window.setTimeout(() => {
    haikuEl.innerHTML = h.lines
      .map((l, i) => `<span class="line" style="--i:${i}">${l}</span>`)
      .join("");
    jpEl.textContent = h.jp || "";
    bylineEl.textContent = h.dates ? `— ${h.author} · ${h.dates}` : `— ${h.author}`;
    themeEl.textContent = h.theme || "";
    kanjiEl.textContent = h.kanji || "";
    [jpEl, bylineEl, themeEl].forEach((el) => el.classList.remove("fade"));

    if (animate && !REDUCED) {
      haikuEl.classList.remove("writing"); void haikuEl.offsetWidth; haikuEl.classList.add("writing");
      inkSweep.classList.remove("run"); void inkSweep.offsetWidth; inkSweep.classList.add("run");
      sfxClack();
      h.lines.forEach((_, i) => setTimeout(sfxTick, i * 420 + 60));
    }
  }, 220);
}

/* ======================= reroll + ripple + copy ======================= */

function reroll() {
  if (HAIKUS.length < 2) return;
  let n = currentIndex;
  while (n === currentIndex) n = (Math.random() * HAIKUS.length) | 0;
  currentIndex = n;
  render(HAIKUS[currentIndex], true);
  rerollBtn.classList.add("spin");
  setTimeout(() => rerollBtn.classList.remove("spin"), 500);
}

function ripple(x, y) {
  if (REDUCED) return;
  const r = document.createElement("span");
  r.className = "ripple"; r.style.left = x + "px"; r.style.top = y + "px";
  ripples.appendChild(r);
  setTimeout(() => r.remove(), 750);
}

async function copyHaiku() {
  const text = currentText();
  try { await navigator.clipboard.writeText(text); toast("Haiku copied ✓"); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Haiku copied ✓"); }
    catch { toast("Couldn't copy — select & copy manually"); }
    ta.remove();
  }
}

let toastTimer;
function toast(msg) {
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

/* ======================= background particles ======================= */

let pCtx, pW = 0, pH = 0, dpr = 1, petals = [], flies = [], lanterns = [], rafId = null;

function roundRect(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function spawnLantern(seed) {
  return {
    x: Math.random() * pW,
    y: seed ? Math.random() * pH : pH + 40,
    vy: 0.15 + Math.random() * 0.35, size: 16 + Math.random() * 14,
    swayA: 8 + Math.random() * 16, swayP: Math.random() * 6.28, swayS: 0.005 + Math.random() * 0.01,
    flick: Math.random() * 6.28, flickS: 0.03 + Math.random() * 0.04,
    alpha: 0.7 + Math.random() * 0.3,
  };
}

function resizeCanvas() {
  if (!canvas) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  pW = canvas.clientWidth; pH = canvas.clientHeight;
  canvas.width = pW * dpr; canvas.height = pH * dpr;
  pCtx = canvas.getContext("2d"); pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function initParticles() {
  if (!canvas || REDUCED) return;
  resizeCanvas();
  const small = pW < 640;
  const nPetals = small ? 12 : 18, nFlies = small ? 8 : 13, nLanterns = small ? 6 : 10;
  petals = Array.from({ length: nPetals }, () => spawnPetal(true));
  flies = Array.from({ length: nFlies }, () => ({
    x: Math.random() * pW, y: pH * (0.55 + Math.random() * 0.4),
    phase: Math.random() * 6.28, speed: 0.3 + Math.random() * 0.5,
    drift: 0.2 + Math.random() * 0.5, r: 1.4 + Math.random() * 1.6,
    ox: Math.random() * 6.28, oy: Math.random() * 6.28,
  }));
  lanterns = Array.from({ length: nLanterns }, () => spawnLantern(true));
  if (!rafId) rafId = requestAnimationFrame(tick);
}
function spawnPetal(seed) {
  return {
    x: Math.random() * pW,
    y: seed ? Math.random() * pH : -20,
    vy: 0.4 + Math.random() * 0.9, size: 5 + Math.random() * 6,
    rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.05,
    swayA: 12 + Math.random() * 20, swayP: Math.random() * 6.28, swayS: 0.01 + Math.random() * 0.02,
    alpha: 0.5 + Math.random() * 0.45,
  };
}
function drawPetal(p) {
  pCtx.save();
  pCtx.translate(p.x + Math.sin(p.swayP) * p.swayA, p.y);
  pCtx.rotate(p.rot);
  pCtx.globalAlpha = p.alpha;
  const s = p.size;
  pCtx.beginPath();
  pCtx.moveTo(0, -s);
  pCtx.quadraticCurveTo(s * 0.9, -s * 0.2, 0, s);
  pCtx.quadraticCurveTo(-s * 0.9, -s * 0.2, 0, -s);
  pCtx.fillStyle = "#f6b8cd";
  pCtx.fill();
  pCtx.restore();
}
let last = 0;
function tick(ts) {
  rafId = requestAnimationFrame(tick);
  if (document.hidden) return;
  if (ts - last < 16) return; // ~60fps cap
  last = ts;
  pCtx.clearRect(0, 0, pW, pH);

  // additive glow pass: fireflies + lantern halos
  pCtx.globalCompositeOperation = "lighter";
  for (const f of flies) {
    f.phase += 0.03 * f.speed;
    const fx = f.x + Math.sin(f.ox + ts * 0.0004 * f.drift) * 30;
    const fy = f.y + Math.cos(f.oy + ts * 0.0005 * f.drift) * 20;
    const glow = 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(f.phase));
    const g = pCtx.createRadialGradient(fx, fy, 0, fx, fy, f.r * 6);
    g.addColorStop(0, `rgba(225,240,150,${glow})`);
    g.addColorStop(1, "rgba(225,240,150,0)");
    pCtx.fillStyle = g;
    pCtx.beginPath(); pCtx.arc(fx, fy, f.r * 6, 0, 6.2832); pCtx.fill();
  }
  for (const l of lanterns) {
    l.y -= l.vy; l.swayP += l.swayS; l.flick += l.flickS;
    if (l.y < -l.size * 3) Object.assign(l, spawnLantern(false));
    const lx = l.x + Math.sin(l.swayP) * l.swayA;
    const glow = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(l.flick));
    const g = pCtx.createRadialGradient(lx, l.y, 0, lx, l.y, l.size * 3.4);
    g.addColorStop(0, `rgba(255,182,96,${0.62 * glow * l.alpha})`);
    g.addColorStop(0.5, `rgba(255,150,70,${0.22 * glow * l.alpha})`);
    g.addColorStop(1, "rgba(255,150,60,0)");
    pCtx.fillStyle = g;
    pCtx.beginPath(); pCtx.arc(lx, l.y, l.size * 3.4, 0, 6.2832); pCtx.fill();
  }
  pCtx.globalCompositeOperation = "source-over";

  // lantern bodies
  for (const l of lanterns) {
    const lx = l.x + Math.sin(l.swayP) * l.swayA, s = l.size, w = s, h = s * 1.25;
    pCtx.save();
    pCtx.translate(lx, l.y); pCtx.globalAlpha = l.alpha;
    const grad = pCtx.createLinearGradient(0, -h / 2, 0, h / 2);
    grad.addColorStop(0, "#ffd680"); grad.addColorStop(0.5, "#f08a3c"); grad.addColorStop(1, "#d2502a");
    pCtx.fillStyle = grad; roundRect(pCtx, -w / 2, -h / 2, w, h, w * 0.42); pCtx.fill();
    pCtx.fillStyle = "#241c14";
    pCtx.fillRect(-w * 0.26, -h / 2 - 2, w * 0.52, 2.5);
    pCtx.fillRect(-w * 0.2, h / 2 - 0.5, w * 0.4, 2.5);
    pCtx.restore();
  }
  pCtx.globalAlpha = 1;

  // petals
  for (const p of petals) {
    p.y += p.vy; p.rot += p.vr; p.swayP += p.swayS;
    if (p.y > pH + 20) Object.assign(p, spawnPetal(false));
    drawPetal(p);
  }
  pCtx.globalAlpha = 1;
}

/* ======================= parallax ======================= */

let px = 0, py = 0, parallaxRaf = null;
const rFar = document.querySelector(".range-far"),
      rMid = document.querySelector(".range-mid"),
      rNear = document.querySelector(".range-near"),
      moonEl = document.querySelector(".moon");
function applyParallax() {
  parallaxRaf = null;
  if (rFar) rFar.style.transform = `translate3d(${px * 6}px, ${py * 4}px, 0)`;
  if (rMid) rMid.style.transform = `translate3d(${px * 14}px, ${py * 8}px, 0)`;
  if (rNear) rNear.style.transform = `translate3d(${px * 26}px, ${py * 12}px, 0)`;
  if (moonEl) moonEl.style.transform = `translate3d(${px * -10}px, ${py * -6}px, 0)`;
}
function onPointerMove(e) {
  if (REDUCED) return;
  px = (e.clientX / window.innerWidth - 0.5) * 2;
  py = (e.clientY / window.innerHeight - 0.5) * 2;
  if (!parallaxRaf) parallaxRaf = requestAnimationFrame(applyParallax);
}

/* ======================= intro ======================= */

function runIntro() {
  if (REDUCED) {
    document.body.classList.add("intro-done", "card-in", "reduce-motion");
    render(HAIKUS[currentIndex], false);
    return;
  }
  // timer-driven (not rAF) so the reveal still fires if the page loads hidden
  setTimeout(() => document.body.classList.add("intro-run", "card-in"), 30);
  setTimeout(() => { brandJp.classList.add("write"); for (let i = 0; i < 3; i++) setTimeout(sfxTick, 250 + i * 180); }, 850);
  setTimeout(() => { seal.classList.add("stamp"); sfxThunk(); }, 1350);
  setTimeout(() => document.body.classList.add("intro-done"), 1550);
  setTimeout(() => render(HAIKUS[currentIndex], true), 1750);
}

/* ======================= init ======================= */

dateLabel.textContent = formatDate(new Date());
poolCount.textContent = `${HAIKUS.length} haiku · the classical masters`;

// reflect persisted preferences on the buttons
sfxBtn.setAttribute("aria-pressed", String(sfxEnabled));
sfxBtn.querySelector(".ico").textContent = sfxEnabled ? "🔔" : "🔕";
if (volSlider) volSlider.value = String(Math.round(musicVolume * 100));
setVolume(musicVolume, false);

runIntro();
initParticles();

// audio unlocks on first interaction
["pointerdown", "keydown", "touchstart"].forEach((ev) =>
  window.addEventListener(ev, unlockAudio, { once: true, passive: true }));

rerollBtn.addEventListener("click", (e) => { unlockAudio(); ripple(e.clientX, e.clientY); sfxDrop(); reroll(); });
copyBtn.addEventListener("click", () => { unlockAudio(); copyHaiku(); });
musicBtn.addEventListener("click", () => { unlockAudio(); setMusic(!musicOn); });
sfxBtn.addEventListener("click", () => { unlockAudio(); setSfx(!sfxEnabled); });
if (volSlider) volSlider.addEventListener("input", () => setVolume(volSlider.value / 100, true));

// ripple bloom anywhere on the card
$("scroll").addEventListener("pointerdown", (e) => {
  if (e.target.closest(".btn")) return; // buttons handle their own
  ripple(e.clientX, e.clientY);
});

window.addEventListener("pointermove", onPointerMove, { passive: true });
window.addEventListener("resize", () => { if (!REDUCED) resizeCanvas(); });
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !REDUCED && !rafId) rafId = requestAnimationFrame(tick);
});

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea")) return;
  const k = e.key.toLowerCase();
  if (k === "r" || e.code === "Space") { e.preventDefault(); reroll(); }
  else if (k === "c") { e.preventDefault(); copyHaiku(); }
  else if (k === "m") { unlockAudio(); setMusic(!musicOn); }
});
