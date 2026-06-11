#!/usr/bin/env python3
"""Copy project screenshots into assets/img/projects as web-optimized WebP.
   (Music is handled separately by stage_music.py.)"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent
IMG_OUT = ROOT / "assets" / "img" / "projects"

# source (relative to portfolio root) -> clean name
PROJECT_IMAGES = [
    ("PROJECTS/CIRCUIT BREAKERS/GameScreenshot.png", "circuit-breakers"),
    ("PROJECTS/WEBDEV/HAIKU DAILY/Screenshot 2026-06-11 112843.png", "haiku-daily"),
    ("PROJECTS/WEBDEV/Jianghu Proverbs/Screenshot 2026-06-11 112815.png", "jianghu-proverbs"),
]

def main():
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    for rel, name in PROJECT_IMAGES:
        src = SRC / rel
        if not src.exists():
            print("!! missing", src); continue
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode in ("RGBA", "P", "LA"): im = im.convert("RGB")
            im.thumbnail((1600, 1600), Image.LANCZOS)
            im.save(IMG_OUT / f"{name}.webp", "WEBP", quality=85, method=6)
        print("project img:", name)
    print("done.")

if __name__ == "__main__":
    main()
