#!/usr/bin/env python3
"""
Optimize portfolio art into web-ready WebP (full + thumbnail) and emit a JSON
manifest the galleries consume. Source art is NOT modified.

Run from the FullPortfolio dir:  python tools/optimize_images.py
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent          # FullPortfolio/
SRC = ROOT.parent / "AI imagen"                        # ../AI imagen
OUT = ROOT / "assets" / "img" / "art"
DATA = ROOT / "assets" / "data"

# group key -> (source dir relative to SRC, display title)
GROUPS = {
    "artwork": ("ARTWORK", "Artwork"),
    "vivi":    ("CHARACTER CONSISTENCY SHOWCASE/Vivi", "Vivi"),
    "yuria":   ("CHARACTER CONSISTENCY SHOWCASE/Yuria", "Yuria"),
    "memes":   ("Memes", "Memes"),
}

FULL_MAX = 1600      # long edge, px
THUMB_MAX = 640      # long edge, px
FULL_Q = 82
THUMB_Q = 78

def convert(src_path: Path, full_path: Path, thumb_path: Path):
    with Image.open(src_path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode in ("RGBA", "P", "LA"):
            im = im.convert("RGB")
        w, h = im.size
        full = im.copy()
        full.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
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
                w, h = convert(src, full_path, thumb_path)
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
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "art.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nDONE: {total} images -> {OUT}")
    print(f"manifest -> {DATA / 'art.json'}")

if __name__ == "__main__":
    main()
