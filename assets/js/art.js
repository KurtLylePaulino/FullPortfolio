/* Art gallery: grouped masonry (images + motion clips) + isolated, disclaimer-gated meme vault */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const groupsEl = $("groups");
  const filtersEl = $("filters");
  let DATA = {};
  let flat = [];        // serious work (lightbox list A)
  let memesFlat = [];   // casual collection (lightbox list B)
  const order = ["motion", "artwork", "vivi", "yuria", "maps"];   // memes intentionally excluded here
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // focus helpers for the overlays (lightbox + disclaimer modal)
  function focusables(el) {
    return Array.prototype.slice
      .call(el.querySelectorAll('button, [href], input, video[controls], [tabindex]:not([tabindex="-1"])'))
      .filter((n) => !n.disabled && n.offsetParent !== null);
  }
  function trapTab(el, e) {
    if (e.key !== "Tab") return;
    const f = focusables(el); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  fetch("assets/data/art.json")
    .then((r) => r.json())
    .then((d) => { DATA = d; render(); })
    .catch(() => { groupsEl.innerHTML = '<p style="color:var(--ink-faint)">Gallery failed to load.</p>'; });

  function cellHTML(it, gi, isVideo, label) {
    if (isVideo) {
      return `<div class="cell cell--video" data-i="${gi}">
        <video data-src="${it.video}" muted loop playsinline preload="none" aria-label="${label}"></video>
        <span class="cell__play">▶ clip</span></div>`;
    }
    return `<div class="cell" data-i="${gi}"><img src="${it.thumb}" alt="${label}" loading="lazy" width="${it.w}" height="${it.h}"></div>`;
  }

  function render() {
    // filters (serious groups only)
    let fbtns = '<button class="filter active" data-f="all">All</button>';
    order.forEach((k) => { if (DATA[k]) fbtns += `<button class="filter" data-f="${k}">${DATA[k].title} <b>${DATA[k].items.length}</b></button>`; });
    filtersEl.innerHTML = fbtns;

    // serious groups
    let html = "";
    flat = [];
    order.forEach((k) => {
      const g = DATA[k]; if (!g) return;
      const isVideo = g.type === "video";
      let cells = "";
      g.items.forEach((it, i) => {
        const gi = flat.length; flat.push({ item: it });
        cells += cellHTML(it, gi, isVideo, `${g.title} ${i + 1}`);
      });
      const noun = isVideo ? "clips" : (k === "maps" ? "maps" : "pieces");
      html += `<section class="group" data-group="${k}">
        <div class="group__head"><h2>${g.title}</h2><span class="group__count">${g.items.length} ${noun}</span><span class="group__line"></span></div>
        <div class="gallery${isVideo ? " gallery--video" : ""}">${cells}</div></section>`;
    });
    groupsEl.innerHTML = html;
    wireVideoTiles();

    // casual collection (memes) — rendered into a hidden, gated section
    const memes = DATA.memes;
    if (memes) {
      memesFlat = [];
      let cells = "";
      memes.items.forEach((it, i) => {
        memesFlat.push({ item: it });
        cells += cellHTML(it, i, false, `Casual ${i + 1}`);
      });
      const grid = $("meme-grid");
      if (grid) grid.innerHTML = cells;
      const cnt = $("meme-count");
      if (cnt) cnt.textContent = memes.items.length + " pieces";
      $("meme-grid").addEventListener("click", (e) => {
        const c = e.target.closest(".cell"); if (!c) return;
        openLB(memesFlat, +c.dataset.i);
      });
    }

    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      filtersEl.querySelectorAll(".filter").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const f = b.dataset.f;
      groupsEl.querySelectorAll(".group").forEach((sec) => {
        sec.style.display = (f === "all" || sec.dataset.group === f) ? "" : "none";
      });
    });

    groupsEl.addEventListener("click", (e) => {
      const c = e.target.closest(".cell"); if (!c) return;
      openLB(flat, +c.dataset.i);
    });

    wireMemeVault();
  }

  // lazy-load grid clips; play while visible, pause when off-screen
  function wireVideoTiles() {
    const vids = groupsEl.querySelectorAll(".cell--video video");
    if (!vids.length) return;
    if (reduceMotion) {
      // honor the OS setting: load a still first frame, never autoplay (play on click in the lightbox)
      vids.forEach((v) => { v.preload = "metadata"; v.src = v.dataset.src; });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      vids.forEach((v) => { v.src = v.dataset.src; v.play().catch(() => {}); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
        else v.pause();
      });
    }, { rootMargin: "100px 0px", threshold: 0.25 });
    vids.forEach((v) => io.observe(v));
  }

  // ---- meme vault: disclaimer gate ----
  function wireMemeVault() {
    const openBtn = $("meme-open"), modal = $("meme-modal"), reveal = $("meme-reveal");
    if (!openBtn || !modal || !reveal) return;
    let entered = false, modalReturn = null;
    const showModal = () => {
      modalReturn = document.activeElement;
      modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; $("meme-enter").focus();
    };
    const hideModal = () => {
      modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (modalReturn && modalReturn.focus) modalReturn.focus(); modalReturn = null;
    };
    openBtn.addEventListener("click", () => {
      if (entered) { reveal.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      showModal();
    });
    $("meme-enter").addEventListener("click", () => {
      entered = true; hideModal(); reveal.hidden = false;
      openBtn.textContent = "Jump to the casual collection";
      requestAnimationFrame(() => reveal.scrollIntoView({ behavior: "smooth", block: "start" }));
    });
    $("meme-cancel").addEventListener("click", hideModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") hideModal();
      else trapTab(modal, e);
    });
  }

  // ---- lightbox (works on whichever list opened it) ----
  const lb = $("lb"), lbImg = $("lb-img"), lbVid = $("lb-vid"), lbCount = $("lb-count");
  let activeList = [], cur = 0, timer = null;

  function show(i) {
    cur = (i + activeList.length) % activeList.length;
    const it = activeList[cur].item;
    if (it.video) {
      lbImg.style.display = "none"; lbVid.style.display = "";
      lbVid.src = it.video; if (!reduceMotion) lbVid.play().catch(() => {});
    } else {
      if (lbVid) { lbVid.pause(); lbVid.removeAttribute("src"); lbVid.load(); lbVid.style.display = "none"; }
      lbImg.style.display = ""; lbImg.src = it.full;
    }
    lbCount.textContent = (cur + 1) + " / " + activeList.length;
  }
  let lbReturn = null;
  function openLB(list, i) {
    lbReturn = document.activeElement;
    activeList = list; lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    show(i); document.body.style.overflow = "hidden"; $("lb-close").focus();
  }
  function closeLB() {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); stop();
    if (lbVid) { lbVid.pause(); lbVid.removeAttribute("src"); lbVid.load(); }
    document.body.style.overflow = "";
    if (lbReturn && lbReturn.focus) lbReturn.focus(); lbReturn = null;
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; $("lb-play").classList.remove("active"); } }

  $("lb-close").onclick = closeLB;
  $("lb-prev").onclick = () => { stop(); show(cur - 1); };
  $("lb-next").onclick = () => { stop(); show(cur + 1); };
  $("lb-play").onclick = function () {
    if (timer) { stop(); } else { this.classList.add("active"); timer = setInterval(() => show(cur + 1), 2600); }
  };
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") { stop(); show(cur - 1); }
    else if (e.key === "ArrowRight") { stop(); show(cur + 1); }
    else trapTab(lb, e);
  });
})();
