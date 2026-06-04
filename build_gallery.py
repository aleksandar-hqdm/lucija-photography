# -*- coding: utf-8 -*-
"""Scan images/ and write assets/photos.js. Run after adding or changing photos.

Optional sidecar files (same folder):
  categories.json  {"01.jpg": "theater"}   one of: theater, sports, ceremony, kids, food
  captions.json    {"01.jpg": "Caption text"}

Photos are ordered by category (in CATEGORY_ORDER), then by filename within a
category. To recategorise a photo, edit categories.json and rerun this script.
"""
import os, json
from collections import Counter

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(ROOT, "images")
EXT = (".jpg", ".jpeg", ".png", ".webp")
CATEGORY_ORDER = ["theater", "sports", "ceremony", "kids", "food"]


def load(name, default):
    p = os.path.join(ROOT, name)
    if os.path.exists(p):
        with open(p, encoding="utf-8") as fh:
            return json.load(fh)
    return default


caps = load("captions.json", {})
cats = load("categories.json", {})

files = [f for f in os.listdir(IMG) if f.lower().endswith(EXT)]


def sortkey(f):
    cat = cats.get(f, "")
    ci = CATEGORY_ORDER.index(cat) if cat in CATEGORY_ORDER else len(CATEGORY_ORDER)
    return (ci, f)


files.sort(key=sortkey)
items = [{"src": f, "alt": "Lucija Spasevska photography",
          "category": cats.get(f, ""), "caption": caps.get(f, "")} for f in files]

out = "window.PHOTOS = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"
with open(os.path.join(ROOT, "assets", "photos.js"), "w", encoding="utf-8") as fh:
    fh.write(out)

print("Wrote %d photo(s) to assets/photos.js" % len(items))
print("By category:", dict(Counter(i["category"] or "uncategorised" for i in items)))
