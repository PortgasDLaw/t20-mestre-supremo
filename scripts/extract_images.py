import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Extract images from relevant pages (races illustrations ~pages 24-40, classes ~41-91)
import os
os.makedirs(r"C:\VS.Projetos\t20-mestre-supremo\public\imagens", exist_ok=True)

count = 0
# Extract from key pages with illustrations
for page_num in list(range(23, 42)) + list(range(41, 92)) + list(range(173, 222)):
    page = doc[page_num]
    for img_index, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        if len(image_bytes) > 20000:  # Only save images larger than 20KB
            img_path = rf"C:\VS.Projetos\t20-mestre-supremo\public\imagens\p{page_num+1}_img{img_index}.{image_ext}"
            with open(img_path, "wb") as f:
                f.write(image_bytes)
            count += 1

print(f"Extracted {count} images")
