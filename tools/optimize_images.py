#!/usr/bin/env python3
"""
Optimize portfolio art into web-ready WebP (full + thumbnail) and emit a JSON
manifest the galleries consume. Source art is NOT modified.

Run from the FullPortfolio dir:  python tools/optimize_images.py
"""
import json
import shutil
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent          # FullPortfolio/
SRC = ROOT.parent / "AI imagen"                        # ../AI imagen
VIDEO_SRC = ROOT.parent / "Ai VIDEOS"                  # ../Ai VIDEOS
OUT = ROOT / "assets" / "img" / "art"
OUT_VID = ROOT / "assets" / "video" / "art"
DATA = ROOT / "assets" / "data"

# group key -> (source dir relative to SRC, display title)
GROUPS = {
    "artwork": ("ARTWORK", "Artwork"),
    "vivi":    ("CHARACTER CONSISTENCY SHOWCASE/Vivi", "Vivi"),
    "yuria":   ("CHARACTER CONSISTENCY SHOWCASE/Yuria", "Yuria"),
    "maps":    ("DND MAPS", "Maps & Battlemaps"),
    "memes":   ("Memes", "Memes"),
}

# groups that benefit from a larger full-size in the lightbox (map detail)
FULL_MAX_OVERRIDE = {"maps": 2000}

FULL_MAX = 1600      # long edge, px
THUMB_MAX = 640      # long edge, px
FULL_Q = 82
THUMB_Q = 78

def convert(src_path: Path, full_path: Path, thumb_path: Path, full_max: int = FULL_MAX):
    with Image.open(src_path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode in ("RGBA", "P", "LA"):
            im = im.convert("RGB")
        w, h = im.size
        full = im.copy()
        full.thumbnail((full_max, full_max), Image.LANCZOS)
        full.save(full_path, "WEBP", quality=FULL_Q, method=6)
        thumb = im.copy()
        thumb.thumbnail((THUMB_MAX, THUMB_MAX), Image.LANCZOS)
        thumb.save(thumb_path, "WEBP", quality=THUMB_Q, method=6)
        return w, h

def main():
    manifest = {}
    total = 0
    for key, (subdir, title) in GROUPS.items():
        src_dir = SRC / subdir
        out_dir = OUT / key
        out_dir.mkdir(parents=True, exist_ok=True)
        items = []
        if not src_dir.exists():
            print(f"!! missing source: {src_dir}", file=sys.stderr)
            continue
        files = sorted(p for p in src_dir.iterdir()
                       if p.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp"))
        for i, src in enumerate(files, 1):
            stem = f"{key}-{i:02d}"
            full_path = out_dir / f"{stem}.webp"
            thumb_path = out_dir / f"{stem}-thumb.webp"
            try:
                w, h = convert(src, full_path, thumb_path, FULL_MAX_OVERRIDE.get(key, FULL_MAX))
            except Exception as e:
                print(f"!! failed {src.name}: {e}", file=sys.stderr)
                continue
            items.append({
                "full": f"assets/img/art/{key}/{stem}.webp",
                "thumb": f"assets/img/art/{key}/{stem}-thumb.webp",
                "w": w, "h": h,
            })
            total += 1
            print(f"  {stem}  <-  {src.name}")
        manifest[key] = {"title": title, "items": items}
        print(f"[{key}] {len(items)} images")

    # ---- videos: copy short clips as-is into a 'motion' group ----
    if VIDEO_SRC.exists():
        shutil.rmtree(OUT_VID, ignore_errors=True)   # clear stale clips so renames/removals don't orphan
        OUT_VID.mkdir(parents=True, exist_ok=True)
        vids = sorted(p for p in VIDEO_SRC.iterdir() if p.suffix.lower() == ".mp4")
        vitems = []
        for i, src in enumerate(vids, 1):
            stem = f"Showcase_{i}"
            shutil.copy2(src, OUT_VID / f"{stem}.mp4")
            vitems.append({"video": f"assets/video/art/{stem}.mp4", "title": f"Showcase {i}"})
            print(f"  {stem}  <-  {src.name}")
        if vitems:
            manifest["motion"] = {"title": "Motion", "type": "video", "items": vitems}
        print(f"[motion] {len(vitems)} clips")
    else:
        print(f"!! no video source: {VIDEO_SRC}", file=sys.stderr)

    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "art.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDONE: {total} images -> {OUT}")
    print(f"manifest -> {DATA / 'art.json'}")

if __name__ == "__main__":
    main()
