import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Extract classes (PDF pages 42-92, book pages 36-86)
with open(r"C:\VS.Projetos\t20-mestre-supremo\classes_full.txt", "w", encoding="utf-8") as f:
    for i in range(41, 95):
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Classes extraction done")
