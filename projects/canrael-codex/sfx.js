/* =====================================================================
   THE CANRAEL CODEX — Ambient SFX
   Synthesized in Web Audio. No files, no network.
   Voice: ethereal + paper. Soft singing-bowl bells for transitions,
   parchment rustles for drawing, a quill scratch for inscribing —
   all bathed in a long stone-hall reverb. Nothing UI-beepy.
   ===================================================================== */

(function () {
  "use strict";

  let ctx = null;
  let master = null;     // dry bus -> destination
  let reverb = null;     // convolver
  let reverbReturn = null;
  let unlocked = false;
  let enabled = (localStorage.getItem("canrael-sfx") || "on") !== "off";

  function makeImpulse(seconds, decay) {
    const rate = ctx.sampleRate;
    const len = Math.max(1, Math.floor(rate * seconds));
    const buf = ctx.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    reverbReturn = ctx.createGain();
    reverbReturn.gain.value = 0.9;
    reverbReturn.connect(master);

    reverb = ctx.createConvolver();
    reverb.buffer = makeImpulse(2.4, 2.6);
    reverb.connect(reverbReturn);

    return ctx;
  }

  function unlock() {
    const c = ensure();
    if (!c) return;
    if (c.state === "suspended") c.resume();
    unlocked = true;
  }

  const live = () => enabled && unlocked && ctx;

  // Route a finished envelope to the dry bus and (optionally) the reverb.
  function out(node, wet) {
    node.connect(master);
    if (wet > 0) {
      const w = ctx.createGain();
      w.gain.value = wet;
      node.connect(w);
      w.connect(reverb);
    }
  }

  // --- A soft inharmonic bell / singing bowl (mystical) ---
  function bell(o) {
    if (!live()) return;
    const t0 = ctx.currentTime + (o.when || 0);
    const f0 = o.freq || 320;
    const dur = o.dur || 2.0;
    const base = o.gain || 0.05;
    const wet = o.wet != null ? o.wet : 0.65;
    const partials = [[1.0, 1.0], [2.0, 0.5], [2.76, 0.3], [5.4, 0.16]];

    partials.forEach((p, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f0 * p[0];
      osc.detune.value = idx === 0 ? 0 : (Math.random() * 6 - 3);

      const g = ctx.createGain();
      const peak = base * p[1];
      const atk = 0.02 + idx * 0.012;
      const dcy = dur * (1 - idx * 0.12);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(peak, t0 + atk);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dcy);

      osc.connect(g);
      out(g, wet);
      osc.start(t0);
      osc.stop(t0 + dcy + 0.05);
    });
  }

  // --- A short grain of filtered noise (paper fibres) ---
  function grain(delay, gain, bp, q, wet) {
    if (!live()) return;
    const t = ctx.currentTime + delay;
    const dur = 0.05 + Math.random() * 0.05;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bandf = ctx.createBiquadFilter();
    bandf.type = "bandpass";
    bandf.frequency.value = bp;
    bandf.Q.value = q || 0.9;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 800;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(bandf);
    bandf.connect(hp);
    hp.connect(g);
    out(g, wet == null ? 0.3 : wet);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  // --- A soft low settle (a page coming to rest) ---
  function settle(delay, gain) {
    if (!live()) return;
    const t = ctx.currentTime + delay;
    const dur = 0.2;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 300;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(lp);
    lp.connect(g);
    out(g, 0.3);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  const SFX = {
    unlock: unlock,
    isEnabled: function () { return enabled; },
    setEnabled: function (v) {
      enabled = !!v;
      localStorage.setItem("canrael-sfx", v ? "on" : "off");
      if (v) { unlock(); SFX.tick(); }
    },

    // re-selecting / a faint confirm — a single soft paper touch
    tick: function () {
      grain(0, 0.02, 1900, 0.8, 0.25);
    },

    // drawing a whisper — turning a page in an old tome
    draw: function () {
      grain(0,    0.038, 1700, 0.8, 0.32);
      grain(0.05, 0.030, 2500, 0.9, 0.32);
      grain(0.09, 0.022, 2050, 0.9, 0.32);
      settle(0.07, 0.02);
    },

    // changing region — a soft mystical bell that blooms in the hall
    swap: function () {
      bell({ freq: 300, dur: 2.1, gain: 0.05, wet: 0.72 });
      bell({ freq: 450, dur: 1.4, gain: 0.018, wet: 0.78, when: 0.02 }); // faint high shimmer
    },

    // inscribing a whisper — a quill scratch settling into a soft chime
    copy: function () {
      grain(0,    0.026, 3600, 1.2, 0.25);
      grain(0.06, 0.024, 4200, 1.3, 0.25);
      grain(0.12, 0.02,  3200, 1.2, 0.25);
      bell({ freq: 528, dur: 1.3, gain: 0.03, wet: 0.68, when: 0.17 });
    }
  };

  window.CanraelSFX = SFX;

  // Unlock the audio context on the first user gesture (browser policy).
  function firstGesture() {
    unlock();
    window.removeEventListener("pointerdown", firstGesture);
    window.removeEventListener("keydown", firstGesture);
  }
  window.addEventListener("pointerdown", firstGesture);
  window.addEventListener("keydown", firstGesture);
})();
