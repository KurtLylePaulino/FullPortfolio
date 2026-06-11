/* Art gallery: load manifest, render grouped masonry, lightbox w/ slideshow */
(function () {
  "use strict";
  const groupsEl = document.getElementById("groups");
  const filtersEl = document.getElementById("filters");
  let DATA = {};
  let flat = [];   // [{group, idx, item}]
  const order = ["artwork", "vivi", "yuria", "memes"];

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
      let cells = "";
      g.items.forEach((it, i) => {
        const gi = flat.length;
        flat.push({ group: k, item: it });
        cells += `<div class="cell" data-i="${gi}"><img src="${it.thumb}" alt="${g.title} ${i + 1}" loading="lazy" width="${it.w}" height="${it.h}"></div>`;
      });
      html += `<section class="group" data-group="${k}">
        <div class="group__head"><h2>${g.title}</h2><span class="group__count">${g.items.length} pieces</span><span class="group__line"></span></div>
        <div class="gallery">${cells}</div></section>`;
    });
    groupsEl.innerHTML = html;

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

  // ---- lightbox ----
  const lb = document.getElementById("lb");
  const lbImg = document.getElementById("lb-img");
  const lbCount = document.getElementById("lb-count");
  let cur = 0, timer = null;

  function show(i) {
    cur = (i + flat.length) % flat.length;
    lbImg.src = flat[cur].item.full;
    lbCount.textContent = (cur + 1) + " / " + flat.length;
  }
  function openLB(i) { lb.classList.add("open"); show(i); document.body.style.overflow = "hidden"; }
  function closeLB() { lb.classList.remove("open"); stop(); document.body.style.overflow = ""; }
  function stop() { if (timer) { clearInterval(timer); timer = null; document.getElementById("lb-play").classList.remove("active"); } }

  document.getElementById("lb-close").onclick = closeLB;
  document.getElementById("lb-prev").onclick = () => { stop(); show(cur - 1); };
  document.getElementById("lb-next").onclick = () => { show(cur + 1); };
  document.getElementById("lb-play").onclick = function () {
    if (timer) { stop(); } else { this.classList.add("active"); timer = setInterval(() => show(cur + 1), 2600); }
  };
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") { stop(); show(cur - 1); }
    else if (e.key === "ArrowRight") show(cur + 1);
  });
})();
