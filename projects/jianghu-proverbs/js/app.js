/* 江湖箴言 · roll + copy logic */
(function () {
  "use strict";

  const els = {
    scroll:     document.getElementById("scroll"),
    inner:      document.querySelector(".scroll-inner"),
    attribution: document.getElementById("attribution"),
    proverb:    document.querySelector(".proverb"),
    zh:         document.getElementById("zh"),
    py:         document.getElementById("py"),
    en:         document.getElementById("en"),
    author:     document.getElementById("author"),
    dynasty:    document.getElementById("dynasty"),
    stamp:      document.getElementById("indexStamp"),
    rollBtn:    document.getElementById("rollBtn"),
    copyBtn:    document.getElementById("copyBtn"),
    copyLabel:  document.getElementById("copyLabel"),
    counter:    document.getElementById("counter"),
  };

  if (els.counter) {
    els.counter.textContent = "— 江湖共" + PROVERBS.length + "卷 · " + PROVERBS.length + " scrolls —";
  }

  let current = null;   // currently displayed proverb
  let lastIdx = -1;     // avoid immediate repeats
  let copyResetTimer = null;
  let brushTimers = []; // pending per-character brush-tick sounds
  let stampTimer = null;
  const sfx = window.Sfx || null;

  function pickIndex() {
    if (PROVERBS.length <= 1) return 0;
    let i;
    do { i = Math.floor(Math.random() * PROVERBS.length); }
    while (i === lastIdx);
    return i;
  }

  function render(p, idx) {
    // brush-write the Chinese character by character
    els.zh.innerHTML = p.zh.split("").map(function (ch, i) {
      return '<span class="char" style="--i:' + i + '">' + ch + "</span>";
    }).join("");

    // the other lines follow once the brush finishes
    var lead = Math.min(p.zh.length * 55, 1500);
    els.py.style.animationDelay = (lead + 100) + "ms";
    els.en.style.animationDelay = (lead + 280) + "ms";
    els.attribution.style.animationDelay = (lead + 460) + "ms";
    els.stamp.style.animationDelay = (lead + 620) + "ms";

    els.py.textContent = p.py || "";
    els.en.textContent = p.en || "";
    els.author.textContent = p.author || "";
    els.dynasty.textContent = p.dynasty || "";
    els.stamp.textContent = "第\n" + (idx + 1);

    // restart the staggered reveal + seal thump
    els.stamp.classList.remove("show");
    els.inner.classList.remove("swap");
    void els.inner.offsetWidth;
    els.inner.classList.add("swap");
    els.stamp.classList.add("show");

    // sound: a soft brush tick per character (rate-limited in Sfx),
    // then the seal thunk when the stamp lands
    if (sfx) {
      brushTimers.forEach(clearTimeout);
      brushTimers = [];
      for (var k = 0; k < p.zh.length; k++) {
        brushTimers.push(setTimeout(function () { sfx.brush(); }, k * 55));
      }
      clearTimeout(stampTimer);
      stampTimer = setTimeout(function () { sfx.stamp(); }, lead + 620);
    }
  }

  function roll() {
    const idx = pickIndex();
    lastIdx = idx;
    current = PROVERBS[idx];

    els.scroll.classList.remove("rolling");
    void els.scroll.offsetWidth;
    els.scroll.classList.add("rolling");

    render(current, idx);

    els.copyBtn.disabled = false;
    resetCopyLabel();
  }

  function plainText(p) {
    // strip any HTML line breaks from the Chinese line
    const zh = p.zh.replace(/<br\s*\/?>/gi, " ");
    return `${zh}\n${p.py}\n“${p.en}”\n— ${p.author} · ${p.dynasty}`;
  }

  function resetCopyLabel() {
    els.copyBtn.classList.remove("copied");
    els.copyLabel.textContent = "抄录 · Copy";
  }

  async function copy() {
    if (!current) return;
    const text = plainText(current);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
      showCopied();
    } catch (e) {
      legacyCopy(text);
      showCopied();
    }
  }

  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function showCopied() {
    if (sfx) sfx.copy();
    els.copyBtn.classList.add("copied");
    els.copyLabel.textContent = "已抄录 · Copied!";
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(resetCopyLabel, 1800);
  }

  // a roll triggered by the visitor — plays the draw soundscape
  function userRoll() {
    if (sfx) { sfx.unlock(); sfx.draw(); }
    roll();
  }

  els.rollBtn.addEventListener("click", userRoll);
  els.copyBtn.addEventListener("click", copy);

  // ---- opening sequence: doors part (with sound), scroll unrolls ----
  (function introSequence() {
    var el = document.getElementById("intro");
    var enterBtn = document.getElementById("introEnter");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var opened = false;

    function reveal() {
      document.body.classList.remove("intro-playing");
      document.body.classList.add("intro-done");
      roll(); // re-draw so the brush writes (and is heard) as the scroll unrolls
    }
    function removeOverlay() {
      if (!el) return;
      var node = el;
      el = null;
      node.classList.add("gone");
      setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 450);
    }
    function open(withSound) {
      if (opened) return;
      opened = true;
      // sound must start inside the user gesture, before the doors move
      if (withSound && sfx) { sfx.unlock(); sfx.enter(); }
      if (el) el.classList.add("opening"); // slash glint + doors part
      setTimeout(reveal, 250);
      setTimeout(removeOverlay, 1250);
    }

    if (!el || reduce) {
      document.body.classList.remove("intro-playing");
      document.body.classList.add("intro-done");
      removeOverlay();
      roll();
      return;
    }

    function userOpen() { open(true); }
    if (enterBtn) {
      enterBtn.addEventListener("click", function (e) { e.stopPropagation(); userOpen(); });
    }
    el.addEventListener("click", userOpen);
    document.addEventListener("keydown", function onKey() {
      document.removeEventListener("keydown", onKey);
      userOpen();
    });
    // silent fallback for visitors who never interact (audio stays muted)
    setTimeout(function () { open(false); }, 8000);
  })();

  // ---- sound-effects mute toggle ----
  var soundBtn = document.getElementById("soundBtn");
  if (soundBtn && sfx) {
    function syncSoundBtn() {
      var m = sfx.isMuted();
      soundBtn.classList.toggle("muted", m);
      soundBtn.setAttribute("aria-pressed", m ? "false" : "true");
    }
    syncSoundBtn();
    soundBtn.addEventListener("click", function () {
      sfx.toggleMuted();
      syncSoundBtn();
    });
  } else if (soundBtn) {
    soundBtn.style.display = "none";
  }

  // ---- qi ripple on click ----
  document.addEventListener("pointerdown", function (e) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var q = document.createElement("i");
    q.className = "qi";
    q.style.left = e.clientX + "px";
    q.style.top = e.clientY + "px";
    document.body.appendChild(q);
    setTimeout(function () { if (q.parentNode) q.parentNode.removeChild(q); }, 700);
  });

  // ---- embers drifting up through the night ----
  (function spawnEmbers() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var i = 0; i < 7; i++) {
      var e = document.createElement("i");
      e.className = "ember";
      e.style.left = (5 + Math.random() * 90).toFixed(1) + "%";
      e.style.animationDuration = (11 + Math.random() * 10).toFixed(1) + "s";
      e.style.animationDelay = (-Math.random() * 18).toFixed(1) + "s";
      document.body.appendChild(e);
    }
  })();

  // ---- falling plum-blossom petals ----
  (function spawnPetals() {
    var box = document.getElementById("petals");
    if (!box || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var n = window.innerWidth < 600 ? 10 : 18;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("i");
      p.className = "petal";
      p.style.left = (Math.random() * 100).toFixed(1) + "%";
      p.style.setProperty("--s", (0.55 + Math.random() * 0.9).toFixed(2));
      p.style.animationDuration = (9 + Math.random() * 12).toFixed(1) + "s";
      p.style.animationDelay = (-Math.random() * 20).toFixed(1) + "s";
      box.appendChild(p);
    }
  })();

  // ---- erhu ambience toggle ----
  var musicBtn = document.getElementById("musicBtn");
  var musicLabel = document.getElementById("musicLabel");
  if (musicBtn && window.ErhuMusic) {
    musicBtn.addEventListener("click", function () {
      var on = ErhuMusic.toggle();
      musicBtn.classList.toggle("playing", on);
      musicBtn.setAttribute("aria-pressed", on ? "true" : "false");
      musicLabel.textContent = on ? "止乐 · Silence" : "奏乐 · Music";
      if (sfx) sfx.onMusic(on); // duck SFX beneath the music
    });
  }

  // keyboard: space / enter rolls, C copies
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "BUTTON") return;
    if (document.body.classList.contains("intro-playing")) return; // gate still up
    if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); userRoll(); }
    else if (e.key === "c" || e.key === "C") { if (current) copy(); }
  });

  // first roll on load for an inviting start
  window.addEventListener("DOMContentLoaded", roll);
})();
