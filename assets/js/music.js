/* Music: categorized playlists (Original / DnD / Ruina) + one sticky player */
(function () {
  "use strict";
  const listEl = document.getElementById("tracks");
  const tabsEl = document.getElementById("mtabs");
  const audio = new Audio();
  audio.preload = "metadata";
  let CATS = [], flat = [], cur = -1;

  const $ = (id) => document.getElementById(id);
  const fmt = (s) => (isNaN(s) ? "0:00" : Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0"));

  fetch("assets/data/music.json").then((r) => r.json()).then((d) => { CATS = d.categories; render(); });

  function render() {
    // tabs
    let total = CATS.reduce((n, c) => n + c.tracks.length, 0);
    let tabs = `<button class="filter active" data-f="all">All <b>${total}</b></button>`;
    CATS.forEach((c) => { tabs += `<button class="filter" data-f="${c.key}">${c.title} <b>${c.tracks.length}</b></button>`; });
    tabsEl.innerHTML = tabs;

    // sections
    flat = [];
    let html = "";
    CATS.forEach((c) => {
      let rows = "";
      c.tracks.forEach((t) => {
        const gi = flat.length;
        flat.push(t);
        rows += `
          <div class="track" data-i="${gi}">
            <div class="track__no">${String(gi + 1).padStart(2, "0")}
              <span class="eq"><span></span><span></span><span></span><span></span></span></div>
            <div><div class="track__title">${t.title}</div><div class="track__vibe">${t.vibe}</div></div>
            <div class="track__dur" data-dur="${gi}">––:––</div>
          </div>`;
      });
      html += `<section class="cat" data-cat="${c.key}">
        <div class="cat__head"><h2>${c.title}</h2><span class="cat__count">${c.tracks.length} tracks</span><span class="cat__line"></span></div>
        <p class="cat__blurb">${c.blurb}</p>
        <div class="cat__tracks">${rows}</div></section>`;
    });
    listEl.innerHTML = html;

    listEl.querySelectorAll(".track").forEach((row) => {
      row.addEventListener("click", () => {
        const i = +row.dataset.i;
        if (i === cur) toggle(); else play(i);
      });
    });

    tabsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      tabsEl.querySelectorAll(".filter").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const f = b.dataset.f;
      listEl.querySelectorAll(".cat").forEach((sec) => {
        sec.style.display = (f === "all" || sec.dataset.cat === f) ? "" : "none";
      });
    });

    probeDurations();
  }

  // probe track lengths with limited concurrency so we don't fire 37 downloads at once
  function probeDurations() {
    let i = 0;
    const CONCURRENCY = 4;
    function next() {
      const idx = i++;
      if (idx >= flat.length) return;
      const a = new Audio(); a.preload = "metadata"; a.src = flat[idx].src;
      const done = () => {
        const el = listEl.querySelector(`[data-dur="${idx}"]`);
        if (el && !isNaN(a.duration)) el.textContent = fmt(a.duration);
        next();
      };
      a.addEventListener("loadedmetadata", done, { once: true });
      a.addEventListener("error", next, { once: true });
    }
    for (let k = 0; k < CONCURRENCY; k++) next();
  }

  function play(i) {
    cur = i;
    audio.src = flat[i].src;
    audio.play();
    $("player").classList.add("up");
    $("p-title").textContent = flat[i].title;
    $("p-vibe").textContent = flat[i].vibe;
    mark();
  }
  function toggle() {
    if (cur < 0) return play(0);
    if (audio.paused) audio.play(); else audio.pause();
  }
  function mark() {
    listEl.querySelectorAll(".track").forEach((r) => r.classList.toggle("playing", +r.dataset.i === cur && !audio.paused));
    $("p-main").textContent = audio.paused ? "▶" : "❚❚";
  }
  audio.addEventListener("play", mark);
  audio.addEventListener("pause", mark);
  audio.addEventListener("ended", () => play((cur + 1) % flat.length));
  audio.addEventListener("timeupdate", () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    $("p-fill").style.width = pct + "%";
    $("p-time").textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
  });

  // ---- volume ----
  const vol = $("p-vol"), mute = $("p-mute");
  const savedVol = parseFloat(localStorage.getItem("mvol"));
  audio.volume = isNaN(savedVol) ? 1 : Math.min(1, Math.max(0, savedVol));
  if (vol) vol.value = audio.volume;
  function volIcon() {
    mute.textContent = (audio.muted || audio.volume === 0) ? "🔇" : audio.volume < 0.5 ? "🔉" : "🔊";
  }
  volIcon();
  if (vol) vol.addEventListener("input", () => {
    audio.muted = false;
    audio.volume = parseFloat(vol.value);
    localStorage.setItem("mvol", vol.value);
    volIcon();
  });
  if (mute) mute.addEventListener("click", () => {
    audio.muted = !audio.muted;
    if (!audio.muted && audio.volume === 0) { audio.volume = 0.5; if (vol) vol.value = 0.5; }
    volIcon();
  });

  $("p-main").onclick = toggle;
  $("p-prev").onclick = () => play((cur - 1 + flat.length) % flat.length);
  $("p-next").onclick = () => play((cur + 1) % flat.length);
  $("p-bar").onclick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  };
})();
