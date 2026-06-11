# 江湖箴言 · Wisdom of the Rivers & Lakes

A single-page GitHub Pages site that rolls a **random Chinese proverb** from a curated set of **200 classics**, each shown with its **original author / source**, pinyin, and an English rendering — all wrapped in a living *wuxia / murim* (武侠 · 江湖) scene: a hanging silk scroll on aged rice paper, swaying red lanterns, drifting mountain ranges with a distant pagoda, a glowing moon, falling plum-blossom petals, passing birds, and an optional erhu-style ambience.

## Features

- 🎲 **Draw Lots** — roll a random proverb (never repeats the one just shown).
- 📋 **Copy** — one click copies the proverb, pinyin, translation, and attribution to the clipboard.
- 🎻 **Music** — loops "Silent Bamboo Path" with a soft fade in/out; toggle it with the 琴 button. The track lazy-loads only when first played.
- 🔔 **Synthesized soundscape** — a temple bell and groaning doors on entry, a fortune-stick rattle and sword glint on each draw, soft brush ticks as characters appear, and a seal thunk as the stamp lands. All generated live with the Web Audio API (no files), mixed quiet, rate-limited, and ducked beneath the music. Toggle with the 音/静 seal (bottom-right); the choice is remembered. Because browsers block audio until the first interaction, the opening is a **click-to-enter gate** (入江湖) — that click unlocks sound for the session; a silent auto-open follows after a few seconds if no one clicks.
- 🏮 **Animated scenery** — parallax mountain silhouettes, fog banks, a breathing moon, swaying lanterns (武 / 俠), falling petals, rising embers, and birds crossing the sky.
- ⛩ **Opening sequence** — temple doors part after the title 江湖箴言 is brushed on screen, a sword glint cuts the dark, and the scroll unrolls into view. Click to skip; disabled under `prefers-reduced-motion`.
- 🖌 **Living calligraphy** — every draw slashes a glint across the paper, brush-writes the proverb character by character, then stamps the index seal down; a qi ripple blooms from every click.
- 🖋 **200 attributed proverbs** from 79 sources — Confucius, Laozi, Sun Tzu, Mencius, Zhuangzi, Li Bai, Du Fu, Su Shi, Xin Qiji, the *Water Margin*, and more, each tagged with author and dynasty/text.
- ⌨️ **Keyboard** — `Space` / `Enter` to roll, `C` to copy.
- 📱 Responsive, with a `prefers-reduced-motion` fallback. No build step, no dependencies.

## Files

```
index.html        # markup
css/style.css     # wuxia/murim styling + animated scenery
js/proverbs.js    # the 200 proverbs (zh, pinyin, en, author, dynasty)
js/app.js         # roll + copy + petals + music toggle
js/audio.js       # music player (loop + fade) for the bamboo track
js/sfx.js         # synthesized UI soundscape (Web Audio, no files)
audio/silent-bamboo-path.mp3   # background music
.nojekyll         # serve assets as-is on GitHub Pages
```

## Deploy to GitHub Pages

1. Create a repo and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "江湖箴言: random Chinese proverb scroll"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `/ (root)`, save.
3. Visit `https://<you>.github.io/<repo>/`.

## Run locally

Any static server works, e.g.:
```bash
npx http-server -p 4173
# then open http://localhost:4173
```

## Adding proverbs

Append objects to the `PROVERBS` array in `js/proverbs.js`:
```js
{ zh: "中文。", py: "Pinyin.", en: "English meaning.", author: "作者 Author", dynasty: "Era · 《出处》" }
```
The footer count and index seal update automatically from the array length.
