from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ICON = (
    ROOT.parent
    / "17_AceSpeak_SocialMedia"
    / "Post-Sets"
    / "2026-07-22-acespeak-is-live-r3"
    / "media"
    / "source"
    / "acespeak-app-icon.png"
)
FONT_PATH = (
    ROOT.parent
    / "17_AceSpeak_SocialMedia"
    / ".agents"
    / "skills"
    / "acespeak-social-media"
    / "assets"
    / "Fredoka.ttf"
)
OUTPUT = ROOT / "src/assets/images/why-i-love-building-acespeak-banner.png"


def font(size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    face = ImageFont.truetype(str(FONT_PATH), size=size)
    face.set_variation_by_name(weight)
    return face


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


canvas = Image.new("RGB", (1600, 900), "#F5F2F3")
draw = ImageDraw.Draw(canvas)

# Brand-colour stage shapes.
draw.ellipse((1190, -250, 1760, 320), fill="#FFE3F2")
draw.ellipse((-180, 690, 260, 1130), fill="#FFE3F2")
draw.rounded_rectangle((1030, 82, 1510, 818), radius=44, fill="#1F1B1D")
draw.polygon([(1110, 818), (1310, 300), (1510, 818)], fill="#FBE79B")
draw.line((1220, 228, 1300, 172), fill="#FF3DA6", width=12)
draw.line((1390, 190, 1470, 236), fill="#FF3DA6", width=12)

# Brand lock-up.
icon_small = Image.open(SOURCE_ICON).convert("RGB").resize((92, 92), Image.Resampling.LANCZOS)
icon_small.putalpha(rounded_mask((92, 92), 20))
canvas.paste(icon_small, (104, 88), icon_small)
draw.text((220, 103), "AceSpeak", font=font(64, "SemiBold"), fill="#FF3DA6")

# Article headline.
draw.text((106, 286), "Why I’m proud", font=font(82, "SemiBold"), fill="#1F1B1D")
draw.text((106, 384), "to build AceSpeak", font=font(82, "SemiBold"), fill="#1F1B1D")
draw.text((110, 522), "Speaking stays human.", font=font(38, "Medium"), fill="#E02690")
draw.text((110, 582), "A personal note from AceSpeak’s CTO", font=font(30), fill="#5F575B")

# App icon on stage with a soft shadow.
icon = Image.open(SOURCE_ICON).convert("RGB").resize((292, 292), Image.Resampling.LANCZOS)
mask = rounded_mask((292, 292), 64)
shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
shadow_tile = Image.new("RGBA", (330, 330), (0, 0, 0, 0))
ImageDraw.Draw(shadow_tile).rounded_rectangle((18, 18, 312, 312), radius=72, fill=(0, 0, 0, 125))
shadow_tile = shadow_tile.filter(ImageFilter.GaussianBlur(20))
shadow.alpha_composite(shadow_tile, (1112, 345))
canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow)
canvas.paste(icon.convert("RGBA"), (1130, 345), mask)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
canvas.convert("RGB").save(OUTPUT, quality=94, optimize=True)
