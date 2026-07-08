"""Per-frame hero grade shared by build scripts."""

from __future__ import annotations

from PIL import Image, ImageEnhance, ImageFilter, ImageOps


def enhance_frame(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    smooth = img.filter(ImageFilter.GaussianBlur(radius=0.8))
    img = Image.blend(img, smooth, 0.12)
    img = ImageOps.autocontrast(img, cutoff=0.4)
    img = ImageEnhance.Brightness(img).enhance(1.07)
    img = ImageEnhance.Contrast(img).enhance(1.1)
    img = ImageEnhance.Color(img).enhance(1.12)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=140, threshold=2))
    img = ImageEnhance.Sharpness(img).enhance(1.15)
    return img
