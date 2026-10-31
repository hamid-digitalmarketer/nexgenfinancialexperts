#!/usr/bin/env python3
"""Install official logo + favicon derived from the logo's geometric mark."""
from PIL import Image
import os

SRC = "/home/z/my-project/evidence/nexgen-logo.png"
PUB = "/home/z/my-project/public/images"
os.makedirs(PUB, exist_ok=True)

# Full logo for header/footer
logo = Image.open(SRC).convert("RGBA")
logo.save(f"{PUB}/nexgen-logo.png")

# Find bounding box of saturated (colored) mark pixels
w, h = logo.size
minx, miny, maxx, maxy = w, h, 0, 0
for y in range(h):
    for x in range(w):
        r, g, b, a = logo.getpixel((x, y))
        if a > 100 and max(r, g, b) - min(r, g, b) > 50:
            minx, miny = min(minx, x), min(miny, y)
            maxx, maxy = max(maxx, x), max(maxy, y)
print("mark bbox:", minx, miny, maxx, maxy)

# Crop mark with small padding, keep aspect square-ish
pad = 2
mark = logo.crop((max(0, minx - pad), max(0, miny - pad), min(w, maxx + pad), min(h, maxy + pad)))
# Square canvas
side = max(mark.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
for size in (512, 192, 64, 32):
    sq.resize((size, size), Image.LANCZOS).save(f"{PUB}/icon-{size}.png")
# Next.js app icon (favicon)
os.makedirs("/home/z/my-project/src/app", exist_ok=True)
sq.resize((64, 64), Image.LANCZOS).save("/home/z/my-project/src/app/icon.png")

# Hero image
import shutil
shutil.copy("/home/z/my-project/evidence/hero-finance.jpg", f"{PUB}/hero-finance.jpg")
print("installed:", os.listdir(PUB))
