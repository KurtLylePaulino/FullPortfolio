/* =====================================================================
   THE CANRAEL CODEX — Region Music
   Loops a track per region and crossfades when the region changes.
   Off by default; volume starts at 30%. Persists user choices.
   ===================================================================== */

(function () {
  "use strict";

  const DIR = "assets/audio/";
  const EXT = ".mp3";
  const TRACK = {
    all: "theme", world: "world", alverdon: "alverdon", empire: "empire",
    eldovia: "eldovia", frosthold: "frosthold", ankari: "ankari",
    miran: "miran", abyss: "abyss", convergence: "convergence"
  };

  const clamp = (x) => Math.min(1, Math.max(0, x));

  let enabled = localStorage.getItem("canrael-music") === "on"; // default OFF
  let volume = (() => {
    const v = parseFloat(localStorage.getItem("canrael-music-vol"));
    return isNaN(v) ? 0.30 : clamp(v);
  })();

  let currentCat = "all";

  // Two players so we can crossfade between tracks.
  function makePlayer() {
    const a = new Audio();
    a.loop = true;
    a.preload = "none";
    a.volume = 0;
    return a;
  }
  const players = [makePlayer(), makePlayer()];
  let activeIdx = 0;

  const fileFor = (cat) => DIR + (TRACK[cat] || TRACK.all) + EXT;

  // Animate an element's volume toward a target.
  function ramp(audio, target, ms, done) {
    target = clamp(target);
    if (audio._raf) cancelAnimationFrame(audio._raf);
    const start = audio.volume;
    const t0 = performance.now();
    (function step(now) {
      const k = Math.min(1, (now - t0) / ms);
      audio.volume = clamp(start + (target - start) * k);
      if (k < 1) audio._raf = requestAnimationFrame(step);
      else { audio._raf = null; if (done) done(); }
    })(t0);
  }

  function startCurrent() {
    if (!enabled) return;
    const src = fileFor(currentCat);
    const cur = players[activeIdx];

    // Already on this track — just make sure it is audible.
    if (cur.src && cur.src.indexOf(src) !== -1) {
      if (cur.paused) { const p = cur.play(); if (p && p.catch) p.catch(() => {}); }
      ramp(cur, volume, 500);
      return;
    }

    const nextIdx = 1 - activeIdx;
    const next = players[nextIdx];
    next.src = src;
    next.volume = 0;
    const p = next.play();
    if (p && p.catch) p.catch(() => {}); // blocked until a user gesture
    ramp(next, volume, 800);
    ramp(cur, 0, 800, () => { try { cur.pause(); } catch (e) {} });
    activeIdx = nextIdx;
  }

  function stopAll() {
    players.forEach((a) => ramp(a, 0, 450, () => { try { a.pause(); } catch (e) {} }));
  }

  const Music = {
    isEnabled: () => enabled,
    getVolume: () => volume,
    setVolume: function (v) {
      volume = clamp(v);
      localStorage.setItem("canrael-music-vol", String(volume));
      const cur = players[activeIdx];
      if (enabled && cur && !cur.paused && !cur._raf) cur.volume = volume;
      else if (enabled && cur && !cur.paused) cur.volume = volume; // override mid-ramp on drag
    },
    setEnabled: function (v) {
      enabled = !!v;
      localStorage.setItem("canrael-music", enabled ? "on" : "off");
      if (enabled) startCurrent();
      else stopAll();
    },
    setCategory: function (cat) {
      currentCat = cat || "all";
      if (enabled) startCurrent();
    }
  };

  window.CanraelMusic = Music;

  // If music was left enabled, resume on the first user gesture.
  if (enabled) {
    const resume = function () {
      startCurrent();
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
  }
})();
