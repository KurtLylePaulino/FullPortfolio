/* Art gallery: load manifest, render grouped masonry (images + motion clips), lightbox */
(function () {
  "use strict";
  const groupsEl = document.getElementById("groups");
  const filtersEl = document.getElementById("filters");
  let DATA = {};
  let flat = [];   // [{group, item}]
  const order = ["motion", "artwork", "vivi", "yuria", "memes"];

  fetch("assets/data/art.json")
    .then((r) => r.json())
    .then((d) => { DATA = d; render(); })
    .catch(() => { groupsEl.innerHTML = '<p style="color:var(--ink-faint)">Gallery failed to load.</p>'; });

  function render() {
    // filters
    let fbtns = '<button class="filter active" data-f="all">All</button>';
    order.forEach((k) => { if (DATA[k]) fbtns += `<button class="filter" data-f="${k}">${DATA[k].title} <b>${DATA[k].items.length}</b></button>`; });
    filtersEl.innerHTML = fbtns;

    // groups
    let html = "";
    flat = [];
    order.forEach((k) => {
      const g = DATA[k]; if (!g) return;
      const isVideo = g.type === "video";
      let cells = "";
      g.items.forEach((it, i) => {
        const gi = flat.length;
        flat.push({ group: k, item: it });
        if (isVideo) {
          cells += `<div class="cell cell--video" data-i="${gi}">
            <video data-src="${it.video}" muted loop playsinline preload="none" aria-label="${it.title || g.title + " " + (i + 1)}"></video>
            <span class="cell__play">▶ clip</span></div>`;
        } else {
          cells += `<div class="cell" data-i="${gi}"><img src="${it.thumb}" alt="${g.title} ${i + 1}" loading="lazy" width="${it.w}" height="${it.h}"></div>`;
        }
      });
      const noun = isVideo ? "clips" : "pieces";
      html += `<section class="group" data-group="${k}">
        <div class="group__head"><h2>${g.title}</h2><span class="group__count">${g.items.length} ${noun}</span><span class="group__line"></span></div>
        <div class="gallery${isVideo ? " gallery--video" : ""}">${cells}</div></section>`;
    });
    groupsEl.innerHTML = html;

    wireVideoTiles();

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
      openLB(+c.dataset.i);
    });
  }

  // lazy-load grid clips; play while visible, pause when off-screen
  function wireVideoTiles() {
    const vids = groupsEl.querySelectorAll(".cell--video video");
    if (!vids.length) return;
    if (!("IntersectionObserver" in window)) {
      vids.forEach((v) => { v.src = v.dataset.src; v.play().catch(() => {}); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { rootMargin: "100px 0px", threshold: 0.25 });
    vids.forEach((v) => io.observe(v));
  }

  // ---- lightbox ----
  const lb = document.getElementById("lb");
  const lbImg = document.getElementById("lb-img");
  const lbVid = document.getElementById("lb-vid");
  const lbCount = document.getElementById("lb-count");
  let cur = 0, timer = null;

  function show(i) {
    cur = (i + flat.length) % flat.length;
    const it = flat[cur].item;
    if (it.video) {
      lbImg.style.display = "none";
      lbVid.style.display = "";
      lbVid.src = it.video;
      lbVid.play().catch(() => {});
    } else {
      if (lbVid) { lbVid.pause(); lbVid.removeAttribute("src"); lbVid.load(); lbVid.style.display = "none"; }
      lbImg.style.display = "";
      lbImg.src = it.full;
    }
    lbCount.textContent = (cur + 1) + " / " + flat.length;
  }
  function openLB(i) { lb.classList.add("open"); show(i); document.body.style.overflow = "hidden"; }
  function closeLB() {
    lb.classList.remove("open"); stop();
    if (lbVid) { lbVid.pause(); lbVid.removeAttribute("src"); lbVid.load(); }
    document.body.style.overflow = "";
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; document.getElementById("lb-play").classList.remove("active"); } }

  document.getElementById("lb-close").onclick = closeLB;
  document.getElementById("lb-prev").onclick = () => { stop(); show(cur - 1); };
  document.getElementById("lb-next").onclick = () => { stop(); show(cur + 1); };
  document.getElementById("lb-play").onclick = function () {
    if (timer) { stop(); } else { this.classList.add("active"); timer = setInterval(() => show(cur + 1), 2600); }
  };
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") { stop(); show(cur - 1); }
    else if (e.key === "ArrowRight") { stop(); show(cur + 1); }
  });
})();
