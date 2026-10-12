#!/usr/bin/env python3
"""
Subset the self-hosted fonts to the characters this site can actually show.

Why: the Latin files were ~47 KB each, but a Bulgarian page only ever needs
digits, ASCII punctuation and a few typographic marks from them. Subsetting
cuts the fonts a visitor downloads roughly in half.

Run it only when the *source* fonts change (they are committed already
subset); it reads the .woff2 files in public/fonts/ and rewrites them. Keeps
all of printable ASCII and the whole Cyrillic block, so ordinary text edits
need no re-run; characters outside that fall back to the system font.

    python3 scripts/subset-fonts.py         # needs: pip install fonttools brotli
"""
import glob, os, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'public', 'fonts')

# Everything the source text can contain.
used = set()
for pattern in ('src/**/*.ts', 'src/**/*.tsx', 'src/**/*.css', 'index.html'):
    for path in glob.glob(os.path.join(ROOT, pattern), recursive=True):
        used |= set(open(path, encoding='utf8').read())
used = {c for c in used if ord(c) >= 0x20}

ascii_printable = {chr(c) for c in range(0x20, 0x7F)}
extras = set(' °²³·×–—‘’‚“”„…№€')
cyrillic = {chr(c) for c in list(range(0x0400, 0x0460)) + [0x0301, 0x2116]}

latin_set = ascii_printable | extras | {c for c in used if ord(c) < 0x2200 and not (0x0400 <= ord(c) < 0x0530)}
cyr_set = cyrillic | {c for c in used if 0x0400 <= ord(c) < 0x0530}

total_before = total_after = 0
for path in sorted(glob.glob(os.path.join(FONTS, '*.woff2'))):
    name = os.path.basename(path)
    chars = cyr_set if 'cyrillic' in name else latin_set
    before = os.path.getsize(path)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga', 'calt', 'ccmp', 'locl', 'mark', 'mkmk', 'case', 'tnum', 'lnum', 'pnum']
    opts.hinting = False
    opts.desubroutinize = True
    opts.notdef_outline = True
    font = TTFont(path)
    sub = subset.Subsetter(opts)
    sub.populate(text=''.join(sorted(chars)))
    sub.subset(font)
    font.flavor = 'woff2'
    font.save(path)
    after = os.path.getsize(path)
    total_before += before; total_after += after
    print(f'{name:<38} {before/1024:6.1f} KB -> {after/1024:6.1f} KB')
print(f'{"total":<38} {total_before/1024:6.1f} KB -> {total_after/1024:6.1f} KB')
