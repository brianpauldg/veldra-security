#!/usr/bin/env python3
"""
Bloom Metabolics — NAD+ Reel Renderer
Renders 8 frames at 1080x1920 and assembles into MP4.
"""

import os
import math
import random
from PIL import Image, ImageDraw, ImageFont

# ── Paths ──────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(SCRIPT_DIR, "frames")
os.makedirs(OUT_DIR, exist_ok=True)

# ── Design tokens ──────────────────────────────────────────────────
W, H = 1080, 1920
BG_ANCHOR = (2, 2, 2)
BG_CONTENT = (14, 14, 17)
BG_CARD = (8, 8, 8)
TEXT_HEADLINE = (240, 232, 218)
TEXT_BODY = (200, 191, 176)
ACCENT_BRONZE = (184, 166, 136)
DIVIDER_COLOR = (26, 26, 31)
MARGIN = 80

# ── Fonts ──────────────────────────────────────────────────────────
GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GEORGIA_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
GEORGIA_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
HELVETICA = "/System/Library/Fonts/Helvetica.ttc"

def font_headline(size):
    return ImageFont.truetype(GEORGIA, size)

def font_headline_bold(size):
    return ImageFont.truetype(GEORGIA_BOLD, size)

def font_italic(size):
    return ImageFont.truetype(GEORGIA_ITALIC, size)

def font_body(size):
    return ImageFont.truetype(HELVETICA, size)


# ── Text wrapping helper ──────────────────────────────────────────
def wrap_text(draw, text, font, max_width):
    """Wrap text to fit within max_width, return list of lines."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(draw, text, x, y, font, color, max_width, line_height_mult=1.55):
    """Draw wrapped text, return final y position."""
    lines = wrap_text(draw, text, font, max_width)
    fsize = font.size
    lh = int(fsize * line_height_mult)
    for line in lines:
        draw.text((x, y), line, font=font, fill=color)
        y += lh
    return y


def draw_centered_wrapped(draw, text, cx, y, font, color, max_width, line_height_mult=1.4):
    """Draw centered wrapped text, return final y."""
    lines = wrap_text(draw, text, font, max_width)
    fsize = font.size
    lh = int(fsize * line_height_mult)
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        draw.text((cx - tw // 2, y), line, font=font, fill=color)
        y += lh
    return y


# ── Logo renderer ─────────────────────────────────────────────────
def draw_logo(img, cx, cy, size=100):
    """Draw the Bloom B logo with concentric rings."""
    draw = ImageDraw.Draw(img)
    r_outer = size // 2

    # Concentric rings
    for i, (r_frac, alpha) in enumerate([
        (1.0, 35), (0.887, 25), (0.770, 18)
    ]):
        r = int(r_outer * r_frac)
        ring_color = (216, 207, 190, alpha)
        # Draw circle outline using ellipse
        bbox = (cx - r, cy - r, cx + r, cy + r)
        draw.ellipse(bbox, outline=(216, 207, 190, alpha), width=1)

    # Core circle with gradient (simplified as solid dark)
    r_core = int(r_outer * 0.63)
    # Dark fill
    for dr in range(r_core, 0, -1):
        frac = dr / r_core
        v = int(12 + 20 * (1 - frac))
        c = (v, v - 1, v - 2)
        draw.ellipse((cx - dr, cy - dr, cx + dr, cy + dr), fill=c)

    # B glyph
    b_font = ImageFont.truetype(GEORGIA_ITALIC, int(size * 0.7))
    bbox = draw.textbbox((0, 0), "B", font=b_font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    # Cream color for B
    draw.text((cx - tw // 2, cy - th // 2 - bbox[1]), "B",
              font=b_font, fill=(220, 210, 190))


def draw_wordmark(draw, cx, y, text="EST MMXXVI", color=ACCENT_BRONZE, size=18):
    """Draw the EST MMXXVI wordmark centered."""
    f = font_body(size)
    # Manual letter spacing simulation
    spaced = "  ".join(text)
    bbox = draw.textbbox((0, 0), spaced, font=f)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, y), spaced, font=f, fill=color)


# ── Abstract generative art for image frames ──────────────────────
def generate_neural_art(w, h, seed=42, style="brain"):
    """Generate dark cinematic cellular/neural art for image frames."""
    random.seed(seed)
    import numpy as np

    # Start with pure black
    pixels = np.zeros((h, w, 3), dtype=np.float64)

    cx, cy = w // 2, h // 2

    # --- Layer 1: Deep ambient glow (warm center) ---
    for y_px in range(h):
        for x_px in range(0, w, 2):  # step 2 for speed
            dx = (x_px - cx) / (w * 0.4)
            dy = (y_px - cy) / (h * 0.35)
            dist = math.sqrt(dx * dx + dy * dy)
            if dist < 1.0:
                intensity = (1.0 - dist) ** 3 * 18
                pixels[y_px, x_px] = [intensity * 1.1, intensity * 0.9, intensity * 0.5]
                if x_px + 1 < w:
                    pixels[y_px, x_px + 1] = pixels[y_px, x_px]

    # --- Layer 2: Filament network (organic branching lines) ---
    num_filaments = 120 if style == "brain" else 80
    for _ in range(num_filaments):
        # Start from a random point biased toward center
        fx = cx + random.gauss(0, w * 0.25)
        fy = cy + random.gauss(0, h * 0.22)
        angle = random.uniform(0, 2 * math.pi)
        length = random.randint(80, 400)
        brightness = random.uniform(0.3, 1.0)

        for step in range(length):
            # Organic wandering
            angle += random.gauss(0, 0.15)
            speed = random.uniform(1.5, 3.0)
            fx += math.cos(angle) * speed
            fy += math.sin(angle) * speed

            ix, iy = int(fx), int(fy)
            if 0 <= ix < w and 0 <= iy < h:
                # Filament core
                fade = brightness * (1.0 - step / length) ** 0.5
                r = 40 + fade * 160
                g = 35 + fade * 130
                b = 15 + fade * 70
                for dx2 in range(-1, 2):
                    for dy2 in range(-1, 2):
                        px2, py2 = ix + dx2, iy + dy2
                        if 0 <= px2 < w and 0 <= py2 < h:
                            d = math.sqrt(dx2 * dx2 + dy2 * dy2)
                            falloff = max(0, 1.0 - d / 1.5) * 0.6
                            pixels[py2, px2, 0] = min(255, pixels[py2, px2, 0] + r * falloff)
                            pixels[py2, px2, 1] = min(255, pixels[py2, px2, 1] + g * falloff)
                            pixels[py2, px2, 2] = min(255, pixels[py2, px2, 2] + b * falloff)

            # Branch occasionally
            if random.random() < 0.02:
                branch_angle = angle + random.choice([-0.8, 0.8])
                bx, by = fx, fy
                for bs in range(random.randint(20, 80)):
                    branch_angle += random.gauss(0, 0.1)
                    bx += math.cos(branch_angle) * 2
                    by += math.sin(branch_angle) * 2
                    bix, biy = int(bx), int(by)
                    if 0 <= bix < w and 0 <= biy < h:
                        bfade = brightness * 0.4 * (1.0 - bs / 80)
                        pixels[biy, bix, 0] = min(255, pixels[biy, bix, 0] + 80 * bfade)
                        pixels[biy, bix, 1] = min(255, pixels[biy, bix, 1] + 65 * bfade)
                        pixels[biy, bix, 2] = min(255, pixels[biy, bix, 2] + 30 * bfade)

    # --- Layer 3: Bright nodes at intersections ---
    num_nodes = 200 if style == "brain" else 140
    for _ in range(num_nodes):
        nx = int(cx + random.gauss(0, w * 0.28))
        ny = int(cy + random.gauss(0, h * 0.25))
        if not (0 <= nx < w and 0 <= ny < h):
            continue
        node_r = random.randint(3, 12)
        node_brightness = random.uniform(0.5, 1.0)
        for dr in range(node_r, 0, -1):
            frac = 1.0 - (dr / node_r)
            intensity = frac ** 2 * node_brightness
            for a_step in range(0, 360, 8):
                rad = math.radians(a_step)
                px_n = int(nx + dr * math.cos(rad))
                py_n = int(ny + dr * math.sin(rad))
                if 0 <= px_n < w and 0 <= py_n < h:
                    pixels[py_n, px_n, 0] = min(255, pixels[py_n, px_n, 0] + 200 * intensity)
                    pixels[py_n, px_n, 1] = min(255, pixels[py_n, px_n, 1] + 175 * intensity)
                    pixels[py_n, px_n, 2] = min(255, pixels[py_n, px_n, 2] + 100 * intensity)

    # --- Layer 4: Particle dust ---
    for _ in range(3000):
        px_d = int(cx + random.gauss(0, w * 0.35))
        py_d = int(cy + random.gauss(0, h * 0.32))
        if 0 <= px_d < w and 0 <= py_d < h:
            v = random.uniform(8, 35)
            pixels[py_d, px_d, 0] = min(255, pixels[py_d, px_d, 0] + v * 1.2)
            pixels[py_d, px_d, 1] = min(255, pixels[py_d, px_d, 1] + v)
            pixels[py_d, px_d, 2] = min(255, pixels[py_d, px_d, 2] + v * 0.5)

    # Convert to PIL and apply soft glow
    pixels = np.clip(pixels, 0, 255).astype(np.uint8)
    img = Image.fromarray(pixels, "RGB")

    # Multi-pass glow: blend with heavily blurred version
    small = img.resize((w // 8, h // 8), Image.LANCZOS)
    glow = small.resize((w, h), Image.LANCZOS)
    img = Image.blend(img, glow, 0.35)

    # Second pass — softer
    small2 = img.resize((w // 16, h // 16), Image.LANCZOS)
    glow2 = small2.resize((w, h), Image.LANCZOS)
    img = Image.blend(img, glow2, 0.2)

    return img


def add_vignette(img):
    """Add dark vignette overlay to image."""
    w, h = img.size
    vignette = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)

    max_r = int(math.sqrt(w ** 2 + h ** 2) / 2)
    cx, cy = w // 2, h // 2

    for r in range(max_r, 0, -3):
        frac = r / max_r
        if frac > 0.4:
            alpha = int(180 * ((frac - 0.4) / 0.6) ** 1.5)
        else:
            alpha = 0
        vd.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(2, 2, 2, alpha))

    img_rgba = img.convert("RGBA")
    composited = Image.alpha_composite(img_rgba, vignette)
    return composited.convert("RGB")


# ── Frame renderers ───────────────────────────────────────────────

def load_and_fit(path, w, h):
    """Load an image and crop/resize to fit w x h (cover fit)."""
    src = Image.open(path).convert("RGB")
    sw, sh = src.size
    # Scale to cover
    scale = max(w / sw, h / sh)
    new_w, new_h = int(sw * scale), int(sh * scale)
    src = src.resize((new_w, new_h), Image.LANCZOS)
    # Center crop
    left = (new_w - w) // 2
    top = (new_h - h) // 2
    return src.crop((left, top, left + w, top + h))


# Source image paths
HOOK_IMG = os.path.join(OUT_DIR, "source_hook_nad.png")
BRAIN_IMG = os.path.join(OUT_DIR, "source_brain.png")
BODY_IMG = os.path.join(OUT_DIR, "source_body.png")


def frame_01_cover():
    """COVER / HOOK — NAD+ hero image with overlay text."""
    # Load hero image
    img = load_and_fit(HOOK_IMG, W, H)

    # Dark overlay for text readability — gradient from top and bottom
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # Top gradient (for logo)
    for y in range(500):
        alpha = int(200 * (1 - y / 500) ** 1.5)
        od.line([(0, y), (W, y)], fill=(2, 2, 2, alpha))
    # Bottom gradient (for label)
    for y in range(H - 450, H):
        frac = (y - (H - 450)) / 450
        alpha = int(220 * frac ** 1.8)
        od.line([(0, y), (W, y)], fill=(2, 2, 2, alpha))

    img_rgba = img.convert("RGBA")
    img = Image.alpha_composite(img_rgba, overlay).convert("RGB")

    draw = ImageDraw.Draw(img)

    # Logo at top
    draw_logo(img, W // 2, 200, size=100)
    draw_wordmark(draw, W // 2, 268)

    # Headline near bottom
    f_head = font_headline(64)
    draw_centered_wrapped(draw, "The molecule your cells run on.", W // 2, H - 380,
                          f_head, TEXT_HEADLINE, 780)

    # NAD+ accent below headline
    f_accent = font_italic(48)
    bbox = draw.textbbox((0, 0), "NAD+", font=f_accent)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 220), "NAD+", font=f_accent, fill=ACCENT_BRONZE)

    # Bottom label
    f_small = font_body(20)
    label = "Educational series  ·  01"
    bbox = draw.textbbox((0, 0), label, font=f_small)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 100),
              label, font=f_small, fill=(*TEXT_BODY[:3],))

    return img


def frame_02_definition():
    """DEFINITION — lifted black."""
    img = Image.new("RGB", (W, H), BG_CONTENT)
    draw = ImageDraw.Draw(img)

    y = MARGIN + 80

    # Headline
    f_head = font_headline(54)
    draw.text((MARGIN, y), "What is NAD+?", font=f_head, fill=TEXT_HEADLINE)
    y += 120

    # Body
    f_body = font_body(33)
    body = ("Nicotinamide adenine dinucleotide. A coenzyme found in every "
            "living cell. Central to how your cells produce energy, repair "
            "DNA, and regulate metabolism.")
    y = draw_wrapped(draw, body, MARGIN, y, f_body, TEXT_BODY, W - 2 * MARGIN)

    # Divider + italic accent at bottom
    accent_y = H - MARGIN - 200
    draw.line([(MARGIN, accent_y), (MARGIN + 60, accent_y)], fill=DIVIDER_COLOR, width=1)
    f_italic = font_italic(31)
    draw.text((MARGIN, accent_y + 30), "Without it, cellular function stops.",
              font=f_italic, fill=ACCENT_BRONZE)

    # Bottom wordmark
    f_tiny = font_body(14)
    bbox = draw.textbbox((0, 0), "BLOOM", font=f_tiny)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 50), "BLOOM", font=f_tiny,
              fill=(*TEXT_BODY[:3],))

    return img


def frame_03_why_matters():
    """WHY IT MATTERS — lifted black."""
    img = Image.new("RGB", (W, H), BG_CONTENT)
    draw = ImageDraw.Draw(img)

    y = MARGIN + 80

    f_head = font_headline(52)
    y = draw_wrapped(draw, "Why researchers are paying attention.",
                     MARGIN, y, f_head, TEXT_HEADLINE, W - 2 * MARGIN)
    y += 60

    f_body = font_body(33)
    draw.text((MARGIN, y), "NAD+ levels naturally decline with age.",
              font=f_body, fill=TEXT_BODY)
    y += 90

    body2 = ("Studies suggest this decline correlates with reduced metabolic "
             "efficiency, slower cellular repair, and changes in energy regulation.")
    y = draw_wrapped(draw, body2, MARGIN, y, f_body, TEXT_BODY, W - 2 * MARGIN)

    # Bottom accent
    accent_y = H - MARGIN - 220
    draw.line([(MARGIN, accent_y), (MARGIN + 60, accent_y)], fill=DIVIDER_COLOR, width=1)
    f_italic = font_italic(27)
    draw_wrapped(draw, "By age 50, NAD+ levels may be roughly half of youthful baseline.",
                 MARGIN, accent_y + 30, f_italic, ACCENT_BRONZE, W - 2 * MARGIN)

    f_tiny = font_body(14)
    bbox = draw.textbbox((0, 0), "BLOOM", font=f_tiny)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 50), "BLOOM", font=f_tiny, fill=TEXT_BODY)

    return img


def frame_04_image():
    """IMAGE FRAME 1 — glowing brain with vignette + caption."""
    img = load_and_fit(BRAIN_IMG, W, H)
    img = add_vignette(img)
    draw = ImageDraw.Draw(img)

    # Caption area at bottom
    cap_y = H - 180
    draw.line([(MARGIN, cap_y), (W - MARGIN, cap_y)], fill=DIVIDER_COLOR, width=1)

    f_cap = font_body(26)
    draw.text((MARGIN, cap_y + 28),
              "Every cell depends on this single coenzyme.",
              font=f_cap, fill=TEXT_HEADLINE)

    # Tiny brand
    f_tiny = font_body(12)
    draw.text((W - MARGIN - 60, H - 40), "BLOOM", font=f_tiny, fill=ACCENT_BRONZE)

    return img


def frame_05_function():
    """THE FUNCTION — lifted black."""
    img = Image.new("RGB", (W, H), BG_CONTENT)
    draw = ImageDraw.Draw(img)

    y = MARGIN + 80

    f_head = font_headline(52)
    draw.text((MARGIN, y), "What NAD+ actually does.", font=f_head, fill=TEXT_HEADLINE)
    y += 130

    f_body = font_body(33)
    items = [
        "—  Powers mitochondrial energy production",
        "—  Activates sirtuins (longevity-related proteins)",
        "—  Supports DNA repair pathways",
        "—  Regulates circadian rhythm signaling",
    ]
    for item in items:
        y = draw_wrapped(draw, item, MARGIN, y, f_body, TEXT_BODY, W - 2 * MARGIN)
        y += 20

    # Bottom accent
    accent_y = H - MARGIN - 200
    draw.line([(MARGIN, accent_y), (MARGIN + 60, accent_y)], fill=DIVIDER_COLOR, width=1)
    f_italic = font_italic(31)
    draw.text((MARGIN, accent_y + 30),
              "Every cell. Every minute. Continuously.",
              font=f_italic, fill=ACCENT_BRONZE)

    f_tiny = font_body(14)
    bbox = draw.textbbox((0, 0), "BLOOM", font=f_tiny)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 50), "BLOOM", font=f_tiny, fill=TEXT_BODY)

    return img


def frame_06_image():
    """IMAGE FRAME 2 — glowing body with vignette + caption."""
    img = load_and_fit(BODY_IMG, W, H)
    img = add_vignette(img)
    draw = ImageDraw.Draw(img)

    cap_y = H - 180
    draw.line([(MARGIN, cap_y), (W - MARGIN, cap_y)], fill=DIVIDER_COLOR, width=1)

    f_cap = font_body(26)
    draw_wrapped(draw, "Where metabolism meets the science of aging.",
                 MARGIN, cap_y + 28, f_cap, TEXT_HEADLINE, W - 2 * MARGIN)

    f_tiny = font_body(12)
    draw.text((W - MARGIN - 60, H - 40), "BLOOM", font=f_tiny, fill=ACCENT_BRONZE)

    return img


def frame_07_research():
    """RESEARCH ANGLE — lifted black."""
    img = Image.new("RGB", (W, H), BG_CONTENT)
    draw = ImageDraw.Draw(img)

    y = MARGIN + 80

    f_head = font_headline(50)
    y = draw_wrapped(draw, "Why it's a longevity research focus.",
                     MARGIN, y, f_head, TEXT_HEADLINE, W - 2 * MARGIN)
    y += 60

    f_body = font_body(33)
    body1 = ("Researchers studying healthspan are exploring whether "
             "supporting NAD+ pathways could influence how cells age, "
             "repair, and metabolize.")
    y = draw_wrapped(draw, body1, MARGIN, y, f_body, TEXT_BODY, W - 2 * MARGIN)
    y += 50

    f_body_sm = font_body(28)
    body2 = ("Active areas of research include precursor compounds like "
             "NMN and NR, IV protocols, and lifestyle factors that influence "
             "endogenous production.")
    y = draw_wrapped(draw, body2, MARGIN, y, f_body_sm, TEXT_BODY, W - 2 * MARGIN)

    # Bottom accent
    accent_y = H - MARGIN - 220
    draw.line([(MARGIN, accent_y), (MARGIN + 60, accent_y)], fill=DIVIDER_COLOR, width=1)
    f_italic = font_italic(29)
    draw_wrapped(draw, "The science is still developing. The interest is not.",
                 MARGIN, accent_y + 30, f_italic, ACCENT_BRONZE, W - 2 * MARGIN)

    f_tiny = font_body(14)
    bbox = draw.textbbox((0, 0), "BLOOM", font=f_tiny)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, H - 50), "BLOOM", font=f_tiny, fill=TEXT_BODY)

    return img


def frame_08_cta():
    """CTA — pure black anchor."""
    img = Image.new("RGB", (W, H), BG_ANCHOR)
    draw = ImageDraw.Draw(img)

    # Logo
    draw_logo(img, W // 2, 280, size=120)
    draw_wordmark(draw, W // 2, 360)

    # Headline
    f_head = font_headline(54)
    draw_centered_wrapped(draw, "Personalized longevity care.",
                          W // 2, 740, f_head, TEXT_HEADLINE, 700)

    # Italic subhead
    f_italic = font_italic(34)
    draw_centered_wrapped(draw, "Built around the science of how cells age.",
                          W // 2, 860, f_italic, ACCENT_BRONZE, 700)

    # CTA
    f_cta = font_body(24)
    cta_text = "J O I N   T H E   W A I T L I S T"
    bbox = draw.textbbox((0, 0), cta_text, font=f_cta)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, 1060), cta_text, font=f_cta, fill=TEXT_BODY)

    # URL
    f_url = font_body(22)
    url = "bloommetabolics.com/waitlist"
    bbox = draw.textbbox((0, 0), url, font=f_url)
    tw = bbox[2] - bbox[0]
    draw.text((W // 2 - tw // 2, 1120), url, font=f_url, fill=(*TEXT_BODY, ))

    # Disclaimer
    f_disc = font_body(17)
    disc = ("Educational content. Not medical advice. "
            "Consult a licensed provider before any therapy.")
    draw_centered_wrapped(draw, disc, W // 2, H - 160,
                          f_disc, (240, 232, 218), W - 2 * MARGIN)

    return img


# ── Main ──────────────────────────────────────────────────────────
def main():
    renderers = [
        ("frame_01_cover", frame_01_cover),
        ("frame_02_definition", frame_02_definition),
        ("frame_03_why_matters", frame_03_why_matters),
        ("frame_04_image", frame_04_image),
        ("frame_05_function", frame_05_function),
        # ("frame_06_image", frame_06_image),  # removed per request
        ("frame_07_research", frame_07_research),
        ("frame_08_cta", frame_08_cta),
    ]

    frame_paths = []
    for name, render_fn in renderers:
        print(f"Rendering {name}...")
        img = render_fn()
        path = os.path.join(OUT_DIR, f"{name}.png")
        img.save(path, "PNG")
        frame_paths.append(path)
        print(f"  → {path}")

    # ── Assemble MP4 with ffmpeg via imageio ──
    print("\nAssembling MP4...")

    import imageio_ffmpeg
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # Each frame displays for 3 seconds, 30fps = 90 frames per slide
    # Total: 8 frames × 3s = 24s
    FRAME_DURATION = 3  # seconds
    FPS = 30

    # Create a temporary frame sequence for ffmpeg
    import tempfile
    import shutil
    import subprocess

    seq_dir = os.path.join(OUT_DIR, "_sequence")
    os.makedirs(seq_dir, exist_ok=True)

    idx = 0
    for frame_path in frame_paths:
        for f in range(FPS * FRAME_DURATION):
            seq_path = os.path.join(seq_dir, f"seq_{idx:05d}.png")
            # Symlink instead of copy for speed
            if os.path.exists(seq_path):
                os.remove(seq_path)
            os.symlink(os.path.abspath(frame_path), seq_path)
            idx += 1

    output_mp4 = os.path.join(SCRIPT_DIR, "bloom-nad-plus-reel.mp4")

    cmd = [
        ffmpeg_exe,
        "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(seq_dir, "seq_%05d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "slow",
        "-crf", "18",
        "-vf", "scale=1080:1920",
        output_mp4,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)

    # Cleanup sequence dir
    shutil.rmtree(seq_dir)

    if result.returncode == 0:
        size_mb = os.path.getsize(output_mp4) / (1024 * 1024)
        print(f"\n✅ MP4 exported: {output_mp4}")
        print(f"   Size: {size_mb:.1f} MB")
        print(f"   Duration: {len(frame_paths) * FRAME_DURATION}s @ {FPS}fps")
        print(f"   Resolution: {W}x{H}")
    else:
        print(f"\n❌ ffmpeg error:\n{result.stderr[-500:]}")


if __name__ == "__main__":
    main()
