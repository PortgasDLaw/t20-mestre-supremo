import fitz
import json
import re

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Extract FULL magic descriptions (pages 184-222 of PDF = indices 183-221)
all_text = ""
for i in range(183, 222):
    text = doc[i].get_text()
    if text.strip():
        all_text += f"\n\n=== PAGE {i+1} ===\n" + text

with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_all.txt", "w", encoding="utf-8") as f:
    f.write(all_text)

print(f"Total chars: {len(all_text)}")
print(f"Total pages: {222-183}")
