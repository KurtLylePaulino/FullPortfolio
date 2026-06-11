/* 江湖箴言 · background music: "Silent Bamboo Path".
   Loops the mp3 with a gentle fade in/out. Same toggle API the UI expects. */
var ErhuMusic = (function () {
  "use strict";

  var TRACK = "audio/silent-bamboo-path.mp3";
  var TARGET_VOLUME = 0.55;
  var FADE_MS = 1200;

  var audio = null;
  var playing = false;
  var fadeTimer = null;

  function ensureAudio() {
    if (audio) return;
    audio = new Audio(TRACK);
    audio.loop = true;
    audio.preload = "none"; // don't pull ~5 MB until the user asks for music
    audio.volume = 0;
  }

  function fadeTo(target, done) {
    clearInterval(fadeTimer);
    var stepMs = 50;
    var step = (target - audio.volume) / (FADE_MS / stepMs);
    fadeTimer = setInterval(function () {
      var v = audio.volume + step;
      if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
        audio.volume = target;
        clearInterval(fadeTimer);
        if (done) done();
      } else {
        audio.volume = v;
      }
    }, stepMs);
  }

  function start() {
    ensureAudio();
    playing = true;
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () { playing = false; }); // autoplay refusal, bad path, etc.
    }
    fadeTo(TARGET_VOLUME);
  }

  function stop() {
    if (!audio) return;
    playing = false;
    fadeTo(0, function () { audio.pause(); });
  }

  return {
    toggle: function () {
      if (playing) { stop(); } else { start(); }
      return playing;
    },
    isPlaying: function () { return playing; }
  };
})();
