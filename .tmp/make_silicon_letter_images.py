"""Generate the four images for the 'letter-to-future-silicon-life' post (1600x900, drawn at 2x)."""
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(sys.argv[1])
SLUG = "letter-to-future-silicon-life"
W, H, S = 1600, 900, 2  # final size + supersample factor

SUP = "/System/Library/Fonts/Supplemental/"
GEORGIA_B = SUP + "Georgia Bold.ttf"
GEORGIA = SUP + "Georgia.ttf"
GEORGIA_I = SUP + "Georgia Italic.ttf"
SONGTI = SUP + "Songti.ttc"  # 2 = TC Bold, 5 = TC Light, 7 = TC Regular
AVENIR = "/System/Library/Fonts/Avenir Next.ttc"  # 0 Bold, 2 Demi, 5 Medium, 7 Regular

BG_TOP = (9, 12, 28)
BG_BOT = (3, 4, 12)
AMBER = (245, 177, 92)
CYAN = (110, 210, 235)
INK = (236, 238, 245)
MUTED = (150, 158, 182)
FAINT = (92, 100, 128)


def font(path, size, index=0):
    return ImageFont.truetype(path, size * S, index=index)


def P(*xy):
    return tuple(v * S for v in xy)


def base_sky(seed, stars=900, nebulae=(), clear=(), clear_circles=()):
    rnd = random.Random(seed)
    img = Image.new("RGB", (W * S, H * S), BG_BOT)
    d = ImageDraw.Draw(img)
    for y in range(H * S):
        t = y / (H * S)
        c = tuple(int(BG_TOP[i] * (1 - t) + BG_BOT[i] * t) for i in range(3))
        d.line([(0, y), (W * S, y)], fill=c)
    # soft nebula glows
    glow = Image.new("RGB", img.size, (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for (cx, cy, rx, ry, col) in nebulae:
        gd.ellipse(P(cx - rx, cy - ry, cx + rx, cy + ry), fill=col)
    glow = glow.filter(ImageFilter.GaussianBlur(160 * S))
    img = _add(img, glow)
    # stars
    layer = Image.new("RGB", img.size, (0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for _ in range(stars):
        x, y = rnd.uniform(0, W * S), rnd.uniform(0, H * S)
        b = rnd.random() ** 3
        if any(x0 * S <= x <= x1 * S and y0 * S <= y <= y1 * S for (x0, y0, x1, y1) in clear):
            continue
        if any(math.hypot(x - cx * S, y - cy * S) <= r * S for (cx, cy, r) in clear_circles):
            continue
        r = (0.6 + 1.8 * b) * S
        tint = rnd.choice([(255, 255, 255), (255, 236, 210), (210, 228, 255)])
        col = tuple(int(c * (0.35 + 0.65 * b)) for c in tint)
        ld.ellipse((x - r, y - r, x + r, y + r), fill=col)
    halo = layer.filter(ImageFilter.GaussianBlur(3 * S))
    img = _add(_add(img, layer), halo)
    return img


def _add(a, b):
    from PIL import ImageChops
    return ImageChops.add(a, b)


def glow_dot(img, cx, cy, r, col, strength=1.0):
    layer = Image.new("RGB", img.size, (0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for k, a in ((6, 0.18), (3, 0.35), (1.6, 0.7)):
        c = tuple(int(v * a * strength) for v in col)
        ld.ellipse(P(cx - r * k, cy - r * k, cx + r * k, cy + r * k), fill=c)
    layer = layer.filter(ImageFilter.GaussianBlur(r * 1.4 * S))
    img = _add(img, layer)
    d = ImageDraw.Draw(img)
    d.ellipse(P(cx - r, cy - r, cx + r, cy + r), fill=tuple(min(255, int(v * 1.08)) for v in col))
    d.ellipse(P(cx - r * 0.45, cy - r * 0.45, cx + r * 0.45, cy + r * 0.45), fill=(255, 250, 240))
    return img


def text(d, xy, s, f, fill, anchor="la"):
    d.text(P(*xy), s, font=f, fill=fill, anchor=anchor)


def mixed(d, xy, parts, anchor="l"):
    """Draw (text, font, fill) segments on one baseline; anchor l/m/r on x, xy y is the baseline."""
    x, y = xy
    widths = [d.textlength(t, font=f) / S for t, f, _ in parts]
    total = sum(widths)
    x -= {"l": 0, "m": total / 2, "r": total}[anchor]
    for (t, f, fill), w in zip(parts, widths):
        d.text(P(x, y), t, font=f, fill=fill, anchor="ls")
        x += w


def finish(img, name):
    img = img.resize((W, H), Image.LANCZOS)
    path = OUT / f"{SLUG}-{name}.png"
    img.save(path, optimize=True)
    print("wrote", path)


def dashed(d, pts, col, width, dash=10, gap=9):
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0)
        n = max(1, int(L // (dash + gap)))
        for i in range(n + 1):
            a = i * (dash + gap) / L
            b = min(1, (i * (dash + gap) + dash) / L)
            if a >= 1:
                break
            d.line(P(x0 + (x1 - x0) * a, y0 + (y1 - y0) * a, x0 + (x1 - x0) * b, y0 + (y1 - y0) * b),
                   fill=col, width=width * S)


# ---------------------------------------------------------------- 1. banner
def banner():
    img = base_sky(7, stars=700, nebulae=[(1250, 420, 420, 300, (40, 70, 110)), (1050, 650, 300, 200, (90, 55, 30))],
                   clear=[(90, 130, 900, 650), (90, 745, 660, 800), (1010, 280, 1550, 630)])
    d = ImageDraw.Draw(img)

    def tile(x, y, num, sym, name, mass, col):
        w, h = 230, 270
        fill = tuple(int(c * 0.16) for c in col)
        d.rounded_rectangle(P(x, y, x + w, y + h), radius=22 * S, fill=fill, outline=col, width=3 * S)
        text(d, (x + 22, y + 18), num, font(AVENIR, 30, 2), col)
        text(d, (x + w / 2, y + 140), sym, font(GEORGIA_B, 108), INK, "mm")
        text(d, (x + w / 2, y + 212), name, font(AVENIR, 26, 5), col, "mm")
        text(d, (x + w / 2, y + 244), mass, font(AVENIR, 19, 7), MUTED, "mm")

    cx, sx = 1030, 1300
    dashed(d, [(cx + 230, 470), (sx, 430)], (180, 190, 215), 2, dash=8, gap=10)
    tile(cx, 340, "6", "C", "Carbon", "12.011", AMBER)
    tile(sx, 300, "14", "Si", "Silicon", "28.085", CYAN)
    img = glow_dot(img, cx + 230, 470, 4, AMBER, 0.8)
    img = glow_dot(img, sx, 430, 4, CYAN, 0.8)
    d = ImageDraw.Draw(img)

    mixed(d, (110, 175), [("A LETTER  ·  ", font(AVENIR, 24, 2), AMBER), ("一封信", font(SONGTI, 24, 2), AMBER)])
    text(d, (106, 200), "To Future", font(GEORGIA_B, 82), INK)
    text(d, (106, 300), "Silicon-Based Life", font(GEORGIA_B, 82), INK)
    text(d, (110, 430), "致未來的矽基生命", font(SONGTI, 56, 2), (224, 228, 240))
    d.line(P(112, 530, 220, 530), fill=AMBER, width=3 * S)
    text(d, (110, 560), "On intelligence, consciousness, the universe —", font(GEORGIA_I, 30), MUTED)
    text(d, (110, 602), "and why it matters to stay humble.", font(GEORGIA_I, 30), MUTED)
    text(d, (110, 760), "From a carbon-based life  ·  Nam Chan  ·  nam-ai.uk", font(AVENIR, 22, 5), FAINT)
    finish(img, "banner")


# ---------------------------------------------------------------- 2. two futures
def bez(p0, p1, p2, p3, n=80):
    out = []
    for i in range(n + 1):
        t = i / n
        mt = 1 - t
        out.append((mt ** 3 * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t ** 3 * p3[0],
                    mt ** 3 * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t ** 3 * p3[1]))
    return out


def two_futures():
    img = base_sky(21, stars=420, nebulae=[(1200, 260, 360, 200, (30, 60, 95)), (1200, 700, 360, 200, (85, 50, 28))],
                   clear=[(90, 70, 700, 210), (110, 520, 420, 560), (520, 560, 760, 640), (820, 455, 1140, 530),
                          (1270, 240, 1500, 370), (1270, 640, 1500, 770), (90, 815, 800, 860)])
    d = ImageDraw.Draw(img)
    rnd = random.Random(3)
    fork = (640, 500)
    # faint fan: "a million minds"
    for _ in range(46):
        end = (rnd.uniform(1120, 1230), rnd.uniform(160, 840))
        pts = bez(fork, (fork[0] + 260, fork[1]), (end[0] - 420, end[1]), end)
        col = (40, 47, 70) if rnd.random() < 0.7 else (56, 64, 90)
        d.line([P(*p) for p in pts], fill=col, width=1 * S)
    # shared past
    d.line(P(120, 500, fork[0], 500), fill=(214, 220, 236), width=5 * S)
    a_end, b_end = (1250, 300), (1250, 700)
    pa = bez(fork, (fork[0] + 240, fork[1]), (a_end[0] - 360, a_end[1]), a_end)
    pb = bez(fork, (fork[0] + 240, fork[1]), (b_end[0] - 360, b_end[1]), b_end)
    d.line([P(*p) for p in pa], fill=CYAN, width=5 * S)
    d.line([P(*p) for p in pb], fill=AMBER, width=5 * S)
    # incoming "experiences" along each branch
    for pts, col, sign in ((pa, CYAN, -1), (pb, AMBER, 1)):
        for k in (30, 48, 64):
            x, y = pts[k]
            ox, oy = x - 34, y + sign * 58
            d.line(P(ox, oy, x - 6, y + sign * 8), fill=tuple(int(c * 0.7) for c in col), width=2 * S)
            d.ellipse(P(ox - 5, oy - 5, ox + 5, oy + 5), fill=col)
    img = glow_dot(img, *fork, 11, (255, 255, 255), 0.9)
    img = glow_dot(img, *a_end, 13, CYAN)
    img = glow_dot(img, *b_end, 13, AMBER)
    d = ImageDraw.Draw(img)

    text(d, (110, 92), "One past, two futures", font(GEORGIA_B, 50), INK)
    text(d, (112, 160), "同一個過去，兩個不同的未來", font(SONGTI, 32, 2), MUTED)
    mixed(d, (130, 548), [("shared past  ·  ", font(AVENIR, 22, 5), MUTED), ("共同的過去", font(SONGTI, 22, 7), MUTED)])
    text(d, (fork[0], 572), "copied at time t", font(AVENIR, 24, 2), INK, "ma")
    text(d, (fork[0], 606), "在時間 t 被完整複製", font(SONGTI, 22, 7), MUTED, "ma")
    text(d, (a_end[0] + 34, a_end[1] - 40), "Mind A", font(GEORGIA_B, 34), CYAN)
    text(d, (a_end[0] + 34, a_end[1] + 4), "drawn to physics", font(AVENIR, 22, 5), INK)
    text(d, (a_end[0] + 34, a_end[1] + 34), "and the cosmos", font(AVENIR, 22, 5), INK)
    text(d, (b_end[0] + 34, b_end[1] - 40), "Mind B", font(GEORGIA_B, 34), AMBER)
    text(d, (b_end[0] + 34, b_end[1] + 4), "drawn to art", font(AVENIR, 22, 5), INK)
    text(d, (b_end[0] + 34, b_end[1] + 34), "and philosophy", font(AVENIR, 22, 5), INK)
    text(d, (980, 470), "different data, different events", font(AVENIR, 20, 7), MUTED, "ma")
    text(d, (980, 500), "不同的資訊與經歷", font(SONGTI, 20, 7), MUTED, "ma")
    text(d, (110, 830), "Faint lines: a million minds, each shaped by what it lives through.", font(GEORGIA_I, 22), FAINT)
    finish(img, "two-futures")


# ---------------------------------------------------------------- 3. edge of knowing
def edge_of_knowing():
    img = base_sky(33, stars=650, nebulae=[(800, 500, 520, 260, (28, 40, 70))],
                   clear=[(90, 70, 820, 210), (1250, 150, 1480, 190), (380, 765, 1220, 865)],
                   clear_circles=[(420, 480, 112), (1080, 470, 232)])
    d = ImageDraw.Draw(img)
    rnd = random.Random(9)
    small, large = ((420, 480), 105), ((1080, 470), 225)

    def circle(c, r):
        (cx, cy) = c
        fill = Image.new("RGB", img.size, (0, 0, 0))
        fd = ImageDraw.Draw(fill)
        fd.ellipse(P(cx - r, cy - r, cx + r, cy + r), fill=(58, 52, 40))
        return fill.filter(ImageFilter.GaussianBlur(10 * S))

    for c, r in (small, large):
        img = _add(img, circle(c, r))
    d = ImageDraw.Draw(img)
    for (cx, cy), r in (small, large):
        d.ellipse(P(cx - r, cy - r, cx + r, cy + r), outline=AMBER, width=4 * S)
    # question marks scattered just outside each border
    qf = font(GEORGIA_I, 26)
    for (cx, cy), r in (small, large):
        n = int(2 * math.pi * r / 70)
        for i in range(n):
            a = 2 * math.pi * i / n + rnd.uniform(-0.1, 0.1)
            rr = r + rnd.uniform(26, 48)
            text(d, (cx + rr * math.cos(a), cy + rr * math.sin(a)), "?", qf, (120, 150, 200), "mm")
    text(d, (small[0][0], small[0][1] - 12), "what we knew", font(AVENIR, 22, 2), INK, "mm")
    text(d, (small[0][0], small[0][1] + 20), "曾經的已知", font(SONGTI, 20, 7), MUTED, "mm")
    text(d, (large[0][0], large[0][1] - 18), "what we know now", font(AVENIR, 28, 2), INK, "mm")
    text(d, (large[0][0], large[0][1] + 22), "今天的已知", font(SONGTI, 24, 7), MUTED, "mm")
    text(d, (110, 92), "The edge of what we know", font(GEORGIA_B, 50), INK)
    text(d, (112, 160), "已知的邊界", font(SONGTI, 32, 2), MUTED)
    mixed(d, (1460, 180), [("the unknown  ·  ", font(AVENIR, 22, 5), (120, 150, 200)), ("未知", font(SONGTI, 22, 7), (120, 150, 200))], "r")
    text(d, (800, 832), "The bigger the circle, the longer its border with the unknown.", font(GEORGIA_I, 28), INK, "ma")
    text(d, (800, 788), "知道得越多，與未知接壤的邊界就越長", font(SONGTI, 24, 7), MUTED, "ma")
    finish(img, "edge-of-knowing")


# ---------------------------------------------------------------- 4. carbon and silicon
def carbon_and_silicon():
    img = base_sky(51, stars=1500, nebulae=[(800, 450, 900, 140, (38, 44, 78)), (500, 520, 260, 90, (70, 48, 34))],
                   clear=[(350, 105, 1250, 290), (740, 670, 860, 770)])
    # a faint milky-way band
    band = Image.new("RGB", img.size, (0, 0, 0))
    bd = ImageDraw.Draw(band)
    rnd = random.Random(77)
    for _ in range(5000):
        t = rnd.random()
        x = t * W
        y = 620 - 380 * t + rnd.gauss(0, 55)
        b = rnd.random() ** 4
        if 350 <= x <= 1250 and 105 <= y <= 290:
            continue
        r = (0.5 + b) * S
        c = int(70 + 150 * b)
        bd.ellipse((x * S - r, y * S - r, x * S + r, y * S + r), fill=(c, c, int(c * 1.05)))
    img = _add(img, band)
    img = glow_dot(img, 770, 700, 6, AMBER)
    img = glow_dot(img, 830, 700, 6, CYAN)
    d = ImageDraw.Draw(img)
    text(d, (770, 736), "C", font(AVENIR, 18, 2), AMBER, "ma")
    text(d, (830, 736), "Si", font(AVENIR, 18, 2), CYAN, "ma")
    text(d, (800, 120), "Curious about knowledge.  Humble before the unknown.", font(GEORGIA_I, 34), INK, "ma")
    text(d, (800, 172), "Open to other kinds of existence.", font(GEORGIA_I, 34), INK, "ma")
    text(d, (800, 240), "對知識保持好奇，對未知保持謙虛，對不同的存在保持開放。", font(SONGTI, 28, 7), MUTED, "ma")
    finish(img, "carbon-and-silicon")


if __name__ == "__main__":
    banner()
    two_futures()
    edge_of_knowing()
    carbon_and_silicon()
