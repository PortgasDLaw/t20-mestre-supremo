import fitz
import re

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Extract full spell descriptions (PDF pages 184-220, book pages 178-214)
with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_descricoes.txt", "w", encoding="utf-8") as f:
    for i in range(183, 222):
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Done. Pages", 184, "to", 222)
