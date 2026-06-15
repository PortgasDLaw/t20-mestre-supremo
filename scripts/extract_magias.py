import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Magic chapter: book pages 168-212, offset 6, so PDF pages 174-218
with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_full.txt", "w", encoding="utf-8") as f:
    for i in range(173, 220):
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Magic extraction done")
