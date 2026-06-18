import os
import glob
from PIL import Image

def make_transparent(img_path, out_path, max_dim=800):
    print(f"Processing {img_path}...")
    img = Image.open(img_path).convert("RGBA")
    
    # Process pixels to create high-quality alpha channel
    data = img.getdata()
    newData = []
    for item in data:
        r, g, b, a = item
        # Use maximum of R, G, B as intensity for keying
        intensity = max(r, g, b)
        
        # Smooth alpha blending for dark backgrounds
        if intensity < 12:
            newData.append((0, 0, 0, 0))
        elif intensity < 55:
            # Interpolate alpha smoothly from 0 to 255
            alpha = int((intensity - 12) / (55 - 12) * 255)
            # Re-scale the colors slightly to avoid a black halo
            factor = 255.0 / max(intensity, 1)
            nr = min(int(r * factor), 255)
            ng = min(int(g * factor), 255)
            nb = min(int(b * factor), 255)
            newData.append((nr, ng, nb, alpha))
        else:
            newData.append((r, g, b, 255))
            
    img.putdata(newData)
    
    # Crop to bounding box to remove extra padding around the frame
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Resize down to make it lightweight for web
    img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
    img.save(out_path, "PNG")
    print(f"Successfully saved transparent image to {out_path} with size {img.size}")

def process_all():
    os.makedirs("public/ui", exist_ok=True)
    
    # Process the medieval frames
    frames = {
        "Design/Moldura mágica medieval - Normal.png": "public/ui/moldura-normal.png",
        "Design/Moldura mágica medieval - Rara.png": "public/ui/moldura-rara.png",
        "Design/Moldura mágica medieval - Épica.png": "public/ui/moldura-epica.png",
        "Design/Moldura mágica medieval - Exotica.png": "public/ui/moldura-exotica.png",
    }
    
    for src, dst in frames.items():
        if os.path.exists(src):
            make_transparent(src, dst, max_dim=600)
        else:
            print(f"Warning: Source file {src} not found!")

    # Check if we should also recreate the other sidebar dividers!
    # Wait, can we crop and make transparent the 'Divisor ornamental com COMPÊNDIO.png'?
    divisor_src = "Design/Divisor ornamental com COMPÊNDIO.png"
    if os.path.exists(divisor_src):
        # Let's crop the text part or make it transparent!
        # Let's save a clean version of the divisor
        make_transparent(divisor_src, "public/ui/divisor-base.png", max_dim=400)

if __name__ == "__main__":
    process_all()
