# FullPortfolio — Kurt Lyle Paulino

A central hub portfolio with four individually-themed worlds: **Art**, **Music**,
**Projects**, and **Writing (Canrael)**. Pure static site — no build step, no
dependencies — designed to deploy free on **GitHub Pages**.

```
index.html        Hub / landing (the central node)
art.html          Visual — grouped galleries + lightbox + slideshow
music.html        Sound — player w/ 3 playlists (Original · DnD · Library of Ruina), 37 tracks
projects.html     Technical — game, ML, web apps
writing.html      Literary — Canrael lore + a downloadable PDF codex

assets/
  css/   base.css (shared shell) + one theme per page
  js/    main.js (nav, reveals, hero particles) + art.js + music.js
  img/   web-optimized WebP art + project shots
  audio/ mp3 tracks
  data/  art.json, music.json (gallery + tracklist manifests)
  docs/  thesis PDF, ML notebook, and the writing codex
projects/
  haiku-daily/        live demo (static)
  jianghu-proverbs/   live demo (static)
tools/   optimize_images.py, stage_media.py (asset pipeline — not served)
```

## Heavy assets (intentionally off-site)

To keep the repo lean and Pages fast, large originals are **not** committed
(GitHub rejects files > 100 MB). The site references web-optimized versions and
links out for the rest:

| Asset | Original | On the site |
|---|---|---|
| Art (58 images) | ~685 MB PNG | ~12 MB WebP (full + thumb) |
| Circuit Breakers build | ~282 MB | "external" link — host on itch.io / GitHub Releases |
| Melanoma model + video | ~255 MB / ~647 MB | "external" link — host the video on YouTube |

### Links to fill in later
A few buttons point to placeholders until you supply real URLs:
- **projects.html** — Circuit Breakers Windows build, Melanoma trained model + video presentation.
- Per-project **GitHub ↗** links currently point to your profile; swap for the exact repos when public.

## Re-running the asset pipeline

If you add or change source art/music (in the sibling `AI imagen/`, `MUSIC/`,
`PROJECTS/`, `WRITING/` folders), regenerate optimized assets + manifests:

```bash
python tools/optimize_images.py   # art -> WebP + assets/data/art.json
python tools/stage_music.py       # 3 music libraries -> assets/audio/* + music.json (de-duped)
python tools/stage_media.py       # project screenshots -> WebP
```
