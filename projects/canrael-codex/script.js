/* =====================================================================
   THE CANRAEL CODEX — Logic
   Draws quotes from the bank, filters by region, and keeps the
   atmosphere alive with drifting embers.
   ===================================================================== */

(function () {
  "use strict";

  // ---- Elements ----
  const bannerEl     = document.querySelector(".hero-banner");
  const regionsEl    = document.getElementById("regions");
  const blurbEl      = document.getElementById("regionBlurb");
  const cardEl       = document.getElementById("quoteCard");
  const textEl       = document.getElementById("quoteText");
  const attrEl       = document.getElementById("quoteAttr");
  const tagEl        = document.getElementById("quoteRegionTag");
  const drawBtn      = document.getElementById("drawBtn");
  const copyBtn      = document.getElementById("copyBtn");
  const copyLabel    = document.getElementById("copyLabel");
  const counterEl    = document.getElementById("counter");
  const totalCountEl = document.getElementById("totalCount");
  const musicToggle  = document.getElementById("musicToggle");
  const sfxToggle    = document.getElementById("sfxToggle");
  const musicVol     = document.getElementById("musicVol");

  // ---- State ----
  let activeCat = "all";
  let lastIndex = -1;
  let current = null;
  let drawCount = 0;

  const labelOf = (id) => {
    const c = CATEGORIES.find((c) => c.id === id);
    return c ? c.label : id;
  };

  // ---- Ambient SFX (no-ops gracefully if sfx.js is absent) ----
  const sfx = (name) => {
    const s = window.CanraelSFX;
    if (s && typeof s[name] === "function") s[name]();
  };

  // ---- Build region filter chips ----
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "region-chip";
    btn.setAttribute("aria-pressed", cat.id === activeCat ? "true" : "false");
    btn.dataset.cat = cat.id;
    btn.innerHTML = `<span class="chip-sigil" aria-hidden="true">${cat.sigil}</span>${cat.label}`;
    btn.addEventListener("click", () => {
      if (cat.id !== activeCat) sfx("swap"); else sfx("tick");
      setCategory(cat.id);
    });
    regionsEl.appendChild(btn);
  });

  function setCategory(id) {
    activeCat = id;
    document.querySelectorAll(".region-chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", chip.dataset.cat === id ? "true" : "false");
    });
    const cat = CATEGORIES.find((c) => c.id === id);
    blurbEl.textContent = cat ? cat.blurb : "";
    setBackground(cat);
    if (window.CanraelMusic) window.CanraelMusic.setCategory(id);
    lastIndex = -1;
    updateCounter();
    draw();
  }

  // ---- Swap the banner backdrop for the selected region (crossfade) ----
  let bannerImg = null;
  function setBackground(cat) {
    if (!bannerEl || !cat || !cat.image) return;
    const next = "assets/" + cat.image;
    if (next === bannerImg) return;
    bannerImg = next;

    const apply = () => {
      bannerEl.style.backgroundImage = `url("${next}")`;
      bannerEl.classList.remove("swapping");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    // Preload to avoid a flash of empty banner, then crossfade.
    const pre = new Image();
    pre.onload = pre.onerror = () => {
      bannerEl.classList.add("swapping");
      window.setTimeout(apply, 320);
    };
    pre.src = next;
  }

  // ---- Pool for the active category ----
  function pool() {
    if (activeCat === "all") return QUOTES.map((_, i) => i);
    return QUOTES.reduce((acc, q, i) => {
      if (q.cat === activeCat) acc.push(i);
      return acc;
    }, []);
  }

  // ---- Draw a quote (no immediate repeat) ----
  function draw() {
    const indices = pool();
    if (!indices.length) return;

    let idx;
    if (indices.length === 1) {
      idx = indices[0];
    } else {
      do {
        idx = indices[Math.floor(Math.random() * indices.length)];
      } while (idx === lastIndex);
    }
    lastIndex = idx;
    current = QUOTES[idx];
    drawCount++;

    cardEl.classList.add("is-drawing");
    window.setTimeout(() => {
      textEl.textContent = current.text;
      attrEl.textContent = "— " + current.author;
      tagEl.textContent = labelOf(current.cat).replace(/ · /g, " — ");
      cardEl.classList.remove("is-drawing");
      updateCounter();
    }, 260);
  }

  function updateCounter() {
    const n = pool().length;
    const scope = activeCat === "all" ? "the full codex" : labelOf(activeCat);
    counterEl.textContent = `${n} whispers in ${scope}` + (drawCount ? ` · drawn ${drawCount}` : "");
  }

  // ---- Copy / inscribe ----
  async function inscribe() {
    if (!current) return;
    sfx("copy");
    const passage = `“${current.text}”\n— ${current.author}\n\nThe Canrael Codex`;
    try {
      await navigator.clipboard.writeText(passage);
      flashCopy("Inscribed ✓");
    } catch (e) {
      // Fallback for older / insecure contexts
      const ta = document.createElement("textarea");
      ta.value = passage;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); flashCopy("Inscribed ✓"); }
      catch (_) { flashCopy("Copy failed"); }
      document.body.removeChild(ta);
    }
  }

  function flashCopy(msg) {
    copyLabel.textContent = msg;
    copyBtn.classList.add("copied");
    window.setTimeout(() => {
      copyLabel.textContent = "Inscribe";
      copyBtn.classList.remove("copied");
    }, 1400);
  }

  // ---- Events ----
  const doDraw = () => { sfx("draw"); draw(); };
  drawBtn.addEventListener("click", doDraw);
  copyBtn.addEventListener("click", inscribe);

  document.addEventListener("keydown", (e) => {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    // Let a focused button handle Space/Enter natively (don't also draw).
    if (tag === "BUTTON" && (e.code === "Space" || e.key === "Enter")) return;
    if (e.code === "Space") { e.preventDefault(); doDraw(); }
    else if (e.key === "c" || e.key === "C") { inscribe(); }
  });

  // ---- Audio controls (Music / Sfx / volume) ----
  function syncAudioUI() {
    if (sfxToggle && window.CanraelSFX) {
      const on = window.CanraelSFX.isEnabled();
      sfxToggle.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (musicToggle && window.CanraelMusic) {
      const on = window.CanraelMusic.isEnabled();
      musicToggle.setAttribute("aria-pressed", on ? "true" : "false");
    }
    if (musicVol && window.CanraelMusic) {
      musicVol.value = Math.round(window.CanraelMusic.getVolume() * 100);
    }
  }

  if (sfxToggle) {
    sfxToggle.addEventListener("click", () => {
      if (!window.CanraelSFX) return;
      window.CanraelSFX.setEnabled(!window.CanraelSFX.isEnabled());
      syncAudioUI();
    });
  }
  if (musicToggle) {
    musicToggle.addEventListener("click", () => {
      if (!window.CanraelMusic) return;
      window.CanraelMusic.setCategory(activeCat);
      window.CanraelMusic.setEnabled(!window.CanraelMusic.isEnabled());
      syncAudioUI();
    });
  }
  if (musicVol) {
    musicVol.addEventListener("input", () => {
      if (window.CanraelMusic) window.CanraelMusic.setVolume(musicVol.value / 100);
    });
  }
  syncAudioUI();

  // ---- Ambient embers ----
  function spawnEmbers() {
    const host = document.getElementById("embers");
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const COUNT = 26;
    for (let i = 0; i < COUNT; i++) {
      const e = document.createElement("span");
      e.className = "ember";
      const dur = 9 + Math.random() * 12;
      e.style.left = Math.random() * 100 + "vw";
      e.style.animationDuration = dur + "s";
      e.style.animationDelay = -Math.random() * dur + "s";
      e.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      const size = 1.5 + Math.random() * 2.5;
      e.style.width = size + "px";
      e.style.height = size + "px";
      if (Math.random() > 0.7) {
        e.style.background = "var(--aether)";
        e.style.boxShadow = "0 0 6px 1px rgba(143,182,201,0.7)";
      }
      host.appendChild(e);
    }
  }

  // ---- Init ----
  totalCountEl.textContent = QUOTES.length;
  blurbEl.textContent = CATEGORIES[0].blurb;
  bannerImg = "assets/" + CATEGORIES[0].image; // matches the CSS default; avoids an opening flash
  spawnEmbers();
  updateCounter();
  draw();
})();
