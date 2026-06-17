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
  const gazeBtn      = document.getElementById("gazeBtn");
  const lightbox     = document.getElementById("lightbox");
  const lbImg        = document.getElementById("lbImg");
  const lbPrev       = document.getElementById("lbPrev");
  const lbNext       = document.getElementById("lbNext");
  const lbClose      = document.getElementById("lbClose");
  const lbTitle      = document.getElementById("lbTitle");
  const lbCount      = document.getElementById("lbCount");
  const seekBtn      = document.getElementById("seekBtn");
  const seek         = document.getElementById("seek");
  const seekClose    = document.getElementById("seekClose");
  const seekWarn     = document.getElementById("seekWarn");
  const seekSearch   = document.getElementById("seekSearch");
  const seekProceed  = document.getElementById("seekProceed");
  const seekCancel   = document.getElementById("seekCancel");
  const seekInput    = document.getElementById("seekInput");
  const seekMeta     = document.getElementById("seekMeta");
  const seekResults  = document.getElementById("seekResults");

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
    document.body.dataset.region = id;
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
    renderQuote(current);
  }

  // ---- Render a quote into the card (with the inked-fade transition) ----
  function renderQuote(q) {
    current = q;
    cardEl.classList.add("is-drawing");
    window.setTimeout(() => {
      textEl.textContent = q.text;
      attrEl.textContent = "— " + q.author;
      tagEl.textContent = labelOf(q.cat).replace(/ · /g, " — ");
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
    // When Seek is open, it owns the keyboard (let the input type freely).
    if (seek && seek.classList.contains("open")) {
      if (e.key === "Escape") closeSeek();
      return;
    }
    // When the scene viewer is open, it owns the keyboard.
    if (lightbox && lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeGallery();
      else if (e.key === "ArrowRight") nextScene();
      else if (e.key === "ArrowLeft") prevScene();
      return;
    }
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    // Let a focused button handle Space/Enter natively (don't also draw).
    if (tag === "BUTTON" && (e.code === "Space" || e.key === "Enter")) return;
    if (e.code === "Space") { e.preventDefault(); doDraw(); }
    else if (e.key === "c" || e.key === "C") { inscribe(); }
  });

  // ---- Realm scene viewer (lightbox) ----
  function galleryFor(cat) {
    if (cat === "all") {
      const arr = ["assets/hero.webp"];
      CATEGORIES.forEach((c) => { if (c.id !== "all") arr.push("assets/bg-" + c.id + ".webp"); });
      return arr;
    }
    const arr = ["assets/bg-" + cat + ".webp"];
    for (let i = 1; i <= 9; i++) arr.push("assets/scenes/" + cat + "-" + i + ".webp");
    return arr;
  }

  let lbList = [];
  let lbIndex = 0;

  function showScene(i, instant) {
    if (!lbList.length) return;
    lbIndex = (i + lbList.length) % lbList.length;
    lbCount.textContent = (lbIndex + 1) + " / " + lbList.length;
    const src = lbList[lbIndex];
    if (instant) { lbImg.src = src; lbImg.classList.remove("swapping"); return; }
    lbImg.classList.add("swapping");
    const pre = new Image();
    pre.onload = pre.onerror = () => { lbImg.src = src; lbImg.classList.remove("swapping"); };
    pre.src = src;
  }
  function nextScene() { sfx("tick"); showScene(lbIndex + 1); }
  function prevScene() { sfx("tick"); showScene(lbIndex - 1); }

  function openGallery(cat) {
    lbList = galleryFor(cat);
    lbTitle.textContent = labelOf(cat).replace(/ · /g, " — ");
    showScene(0, true);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    sfx("swap");
  }
  function closeGallery() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (gazeBtn) gazeBtn.addEventListener("click", () => openGallery(activeCat));
  if (lbClose) lbClose.addEventListener("click", closeGallery);
  if (lbNext) lbNext.addEventListener("click", nextScene);
  if (lbPrev) lbPrev.addEventListener("click", prevScene);
  if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeGallery(); });

  // ---- Seek (direct search through the codex) ----
  const SEEK_CAP = 120;
  let seekAcked = false; // remember the warning was acknowledged this session

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  function highlight(el, text, terms) {
    el.textContent = "";
    if (!terms.length) { el.textContent = text; return; }
    const re = new RegExp("(" + terms.map(escapeRe).join("|") + ")", "ig");
    let last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
      const mk = document.createElement("mark");
      mk.textContent = m[0];
      el.appendChild(mk);
      last = m.index + m[0].length;
      if (m.index === re.lastIndex) re.lastIndex++; // guard against zero-length matches
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  function renderResults() {
    const raw = seekInput.value.trim().toLowerCase();
    const terms = raw ? raw.split(/\s+/) : [];
    const matches = [];
    for (let i = 0; i < QUOTES.length; i++) {
      const q = QUOTES[i];
      const hay = (q.text + " " + q.author).toLowerCase();
      if (terms.every((t) => hay.indexOf(t) !== -1)) matches.push(i);
    }

    seekResults.innerHTML = "";
    if (!matches.length) {
      const e = document.createElement("div");
      e.className = "seek-empty";
      e.textContent = "No whisper in the codex answers to that.";
      seekResults.appendChild(e);
    }
    matches.slice(0, SEEK_CAP).forEach((i) => {
      const q = QUOTES[i];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "seek-result";
      btn.setAttribute("role", "option");
      const t = document.createElement("p");
      t.className = "seek-result-text";
      highlight(t, "“" + q.text + "”", terms);
      const meta = document.createElement("div");
      meta.className = "seek-result-meta";
      meta.appendChild(document.createTextNode("— " + q.author + " · "));
      const cat = document.createElement("span");
      cat.className = "seek-result-cat";
      cat.textContent = labelOf(q.cat).replace(/ · /g, " — ");
      meta.appendChild(cat);
      btn.appendChild(t);
      btn.appendChild(meta);
      btn.addEventListener("click", () => chooseResult(i));
      seekResults.appendChild(btn);
    });

    if (!terms.length) {
      seekMeta.textContent = QUOTES.length + " whispers in the codex";
    } else {
      seekMeta.textContent = matches.length + (matches.length === 1 ? " whisper found" : " whispers found")
        + (matches.length > SEEK_CAP ? " · showing first " + SEEK_CAP : "");
    }
  }

  function chooseResult(i) {
    sfx("copy");
    lastIndex = i;
    renderQuote(QUOTES[i]);
    closeSeek();
  }

  function showSearch() {
    seekWarn.hidden = true;
    seekSearch.hidden = false;
    renderResults();
    window.setTimeout(() => seekInput.focus(), 60);
  }

  function openSeek() {
    seek.classList.add("open");
    seek.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    sfx("swap");
    if (seekAcked) { showSearch(); }
    else { seekWarn.hidden = false; seekSearch.hidden = true; }
  }

  function closeSeek() {
    seek.classList.remove("open");
    seek.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (seekBtn)     seekBtn.addEventListener("click", openSeek);
  if (seekClose)   seekClose.addEventListener("click", closeSeek);
  if (seekCancel)  seekCancel.addEventListener("click", closeSeek);
  if (seekProceed) seekProceed.addEventListener("click", () => { seekAcked = true; sfx("tick"); showSearch(); });
  if (seekInput)   seekInput.addEventListener("input", renderResults);
  if (seek)        seek.addEventListener("click", (e) => { if (e.target === seek) closeSeek(); });

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
  document.body.dataset.region = CATEGORIES[0].id;
  bannerImg = "assets/" + CATEGORIES[0].image; // matches the CSS default; avoids an opening flash
  spawnEmbers();
  updateCounter();
  draw();
})();
