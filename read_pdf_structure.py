import fitz
import sys

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

# Print first 20 pages to understand structure
for i in range(min(20, len(doc))):
    text = doc[i].get_text()
    if text.strip():
        print(f"\n=== PAGE {i+1} ===")
        print(text[:1000])
