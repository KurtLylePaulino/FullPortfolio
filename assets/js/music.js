/* Music: load manifest, render tracklist, sticky audio player */
(function () {
  "use strict";
  const listEl = document.getElementById("tracks");
  const audio = new Audio();
  audio.preload = "metadata";
  let TRACKS = [], cur = -1, durs = {};

  const $ = (id) => document.getElementById(id);
  const fmt = (s) => (isNaN(s) ? "0:00" : Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0"));

  fetch("assets/data/music.json").then((r) => r.json()).then((d) => { TRACKS = d.tracks; render(); });

  function render() {
    listEl.innerHTML = TRACKS.map((t, i) => `
      <div class="track" data-i="${i}">
        <div class="track__no">${String(i + 1).padStart(2, "0")}
          <span class="eq"><span></span><span></span><span></span><span></span></span></div>
        <div><div class="track__title">${t.title}</div><div class="track__vibe">${t.vibe}</div></div>
        <div class="track__dur" data-dur="${i}">––:––</div>
      </div>`).join("");
    listEl.querySelectorAll(".track").forEach((row) => {
      row.addEventListener("click", () => {
        const i = +row.dataset.i;
        if (i === cur) toggle(); else play(i);
      });
    });
    // probe durations
    TRACKS.forEach((t, i) => {
      const a = new Audio(); a.preload = "metadata"; a.src = t.src;
      a.addEventListener("loadedmetadata", () => {
        durs[i] = a.duration;
        const el = listEl.querySelector(`[data-dur="${i}"]`);
        if (el) el.textContent = fmt(a.duration);
      });
    });
  }

  function play(i) {
    cur = i;
    audio.src = TRACKS[i].src;
    audio.play();
    $("player").classList.add("up");
    $("p-title").textContent = TRACKS[i].title;
    $("p-vibe").textContent = TRACKS[i].vibe;
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
  audio.addEventListener("ended", () => play((cur + 1) % TRACKS.length));
  audio.addEventListener("timeupdate", () => {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    $("p-fill").style.width = pct + "%";
    $("p-time").textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
  });

  $("p-main").onclick = toggle;
  $("p-prev").onclick = () => play((cur - 1 + TRACKS.length) % TRACKS.length);
  $("p-next").onclick = () => play((cur + 1) % TRACKS.length);
  $("p-bar").onclick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  };
})();
