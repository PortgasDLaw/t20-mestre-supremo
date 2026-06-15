import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Pages 23-91 = book pages 18-85 (races and classes, offset=5 for this book)
# Let me check offset: TOC is page 9 (index 8), book page 3
# Page 20 (index 19) = "Construcao de personagem" = book page 14 -> offset = 6

with open(r"C:\VS.Projetos\t20-mestre-supremo\races_classes_full.txt", "w", encoding="utf-8") as f:
    for i in range(23, 92):  # book pages 18-86 = races and classes
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Races/Classes extraction done")
