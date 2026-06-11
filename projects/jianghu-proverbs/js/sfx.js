/* 江湖箴言 · synthesized UI soundscape (Web Audio API).
   No audio files — every sound is generated live, mixed quiet, and ducked
   under the background music. Honors a persisted mute flag and reduced-motion. */
var Sfx = (function () {
  "use strict";

  var STORE_KEY = "jh_sfx_muted";
  var BASE_GAIN = 0.32;          // overall SFX level (kept gentle)
  var DUCK_GAIN = 0.18;          // softer still while music plays
  var BRUSH_MIN_GAP = 60;        // ms — rate-limit per-character brush ticks

  var ctx = null, master = null, reverb = null, reverbSend = null;
  var noiseBuf = null;
  var musicPlaying = false;
  var lastBrush = 0;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // default: audible, unless the visitor prefers reduced motion
  var stored = null;
  try { stored = localStorage.getItem(STORE_KEY); } catch (e) {}
  var muted = stored === null ? !!reduceMotion : stored === "1";

  function persist() {
    try { localStorage.setItem(STORE_KEY, muted ? "1" : "0"); } catch (e) {}
  }

  function ensure() {
    if (ctx) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = musicPlaying ? DUCK_GAIN : BASE_GAIN;
    master.connect(ctx.destination);

    // a short hall reverb so sounds breathe like a temple courtyard
    reverb = ctx.createConvolver();
    reverb.buffer = makeImpulse(1.1, 2.6);
    var revGain = ctx.createGain();
    revGain.gain.value = 0.9;
    reverb.connect(revGain);
    revGain.connect(master);
    reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.18;
    reverbSend.connect(reverb);

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  function makeImpulse(dur, decay) {
    var len = Math.floor(ctx.sampleRate * dur);
    var buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var data = buf.getChannelData(ch);
      for (var i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function noise() {
    var s = ctx.createBufferSource();
    s.buffer = noiseBuf;
    return s;
  }

  // route a node to the dry master and (optionally) the reverb send
  function out(node, send) {
    node.connect(master);
    if (send) node.connect(reverbSend);
  }

  function now() { return ctx.currentTime; }

  /* ---- individual voices ---- */

  // a temple bell / gong: inharmonic sine partials with long decay
  function bell(t, freq, level, len) {
    freq = freq || 150;
    level = level || 0.5;
    len = len || 3.0;
    var partials = [1, 2.02, 2.96, 4.18, 5.62];
    var amps = [1, 0.55, 0.4, 0.26, 0.16];
    for (var i = 0; i < partials.length; i++) {
      var o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq * partials[i];
      var g = ctx.createGain();
      var peak = level * amps[i];
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len / (1 + i * 0.6));
      o.connect(g);
      out(g, true);
      o.start(t);
      o.stop(t + len + 0.1);
    }
  }

  // heavy wooden door groan: low band-passed noise with a slow swell + creak
  function doorGroan(t) {
    var dur = 1.2;
    var src = noise();
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 3.5;
    bp.frequency.setValueAtTime(130, t);
    bp.frequency.linearRampToValueAtTime(70, t + dur);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.3, t + 0.35);
    g.gain.linearRampToValueAtTime(0.22, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    // creak: slow tremolo so it "sticks and slips"
    var lfo = ctx.createOscillator();
    lfo.frequency.value = 7;
    var lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.09;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    src.connect(bp);
    bp.connect(g);
    out(g, true);
    src.start(t);
    src.stop(t + dur + 0.1);
    lfo.start(t);
    lfo.stop(t + dur + 0.1);
  }

  // silk/paper slide: airy noise with a falling filter sweep
  function paperSlide(t, dur, level) {
    dur = dur || 0.7;
    level = level || 0.16;
    var src = noise();
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.1;
    bp.frequency.setValueAtTime(2200, t);
    bp.frequency.exponentialRampToValueAtTime(700, t + dur);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp);
    bp.connect(g);
    out(g, false);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  // sword "shing": bright metallic ring + airy transient
  function swordShing(t) {
    // bright noise transient
    var src = noise();
    var hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(2600, t);
    hp.frequency.exponentialRampToValueAtTime(5200, t + 0.18);
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.linearRampToValueAtTime(0.14, t + 0.012);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    src.connect(hp);
    hp.connect(ng);
    out(ng, true);
    src.start(t);
    src.stop(t + 0.3);
    // metallic ring partials
    var rings = [2640, 3960, 5280];
    for (var i = 0; i < rings.length; i++) {
      var o = ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = rings[i];
      var g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05 / (i + 1), t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5 - i * 0.1);
      o.connect(g);
      out(g, true);
      o.start(t);
      o.stop(t + 0.6);
    }
  }

  // a single bamboo clack (for the fortune-stick rattle)
  function bambooClack(t, freq, level) {
    var src = noise();
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 9;
    bp.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(level, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    src.connect(bp);
    bp.connect(g);
    out(g, true);
    src.start(t);
    src.stop(t + 0.08);
    // woody pitched ping under it
    var o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = freq;
    var og = ctx.createGain();
    og.gain.setValueAtTime(level * 0.5, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(og);
    out(og, false);
    o.start(t);
    o.stop(t + 0.06);
  }

  // fortune-stick canister shaken: a scatter of bamboo clacks
  function rattle(t) {
    var n = 7;
    for (var i = 0; i < n; i++) {
      var tt = t + Math.random() * 0.42;
      var freq = 850 + Math.random() * 950;
      bambooClack(tt, freq, 0.06 + Math.random() * 0.05);
    }
  }

  // soft brush stroke tick
  function brushTick() {
    var t = now();
    var src = noise();
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.4;
    bp.frequency.value = 1600 + Math.random() * 1400;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05 + Math.random() * 0.03);
    src.connect(bp);
    bp.connect(g);
    out(g, false);
    src.start(t);
    src.stop(t + 0.12);
  }

  // seal pressed down: low thump + click transient
  function sealThunk() {
    var t = now();
    var o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.3, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g);
    out(g, true);
    o.start(t);
    o.stop(t + 0.3);
    // click
    var src = noise();
    var hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1800;
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.12, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    src.connect(hp);
    hp.connect(ng);
    out(ng, false);
    src.start(t);
    src.stop(t + 0.06);
  }

  /* ---- public API ---- */

  // ctx only exists after unlock() ran inside a user gesture, so its
  // existence already implies audio is permitted; resume() may still be
  // settling asynchronously, but scheduled nodes will sound once it does.
  function ready() { return ctx && !muted; }

  return {
    // call on the first real user gesture so the browser permits audio
    unlock: function () {
      if (muted) return;
      ensure();
      if (ctx && ctx.state === "suspended") ctx.resume();
    },

    // the opening: temple bell, doors groaning apart, the scroll sliding open
    enter: function () {
      if (!ready()) return;
      var t = now();
      bell(t, 150, 0.55, 3.4);
      doorGroan(t + 0.12);
      paperSlide(t + 0.85, 0.9, 0.18);
    },

    // drawing lots: a soft sweep away, the canister rattle, a sword glint
    draw: function () {
      if (!ready()) return;
      var t = now();
      paperSlide(t, 0.32, 0.12); // old proverb sweeps away
      rattle(t + 0.02);
      swordShing(t + 0.16);
    },

    // one gentle brush tick as a character appears (rate-limited)
    brush: function () {
      if (!ready()) return;
      var n = performance.now();
      if (n - lastBrush < BRUSH_MIN_GAP) return;
      lastBrush = n;
      brushTick();
    },

    stamp: function () { if (ready()) sealThunk(); },

    copy: function () {
      if (!ready()) return;
      paperSlide(now(), 0.22, 0.13);
    },

    // duck SFX under the background music
    onMusic: function (playing) {
      musicPlaying = !!playing;
      if (master) {
        master.gain.setTargetAtTime(
          musicPlaying ? DUCK_GAIN : BASE_GAIN, now(), 0.3);
      }
    },

    toggleMuted: function () {
      muted = !muted;
      persist();
      if (muted) {
        if (master) master.gain.setTargetAtTime(0.0001, now(), 0.05);
      } else {
        ensure();
        if (ctx && ctx.state === "suspended") ctx.resume();
        if (master) master.gain.setTargetAtTime(
          musicPlaying ? DUCK_GAIN : BASE_GAIN, now(), 0.1);
      }
      return muted;
    },

    isMuted: function () { return muted; }
  };
})();
