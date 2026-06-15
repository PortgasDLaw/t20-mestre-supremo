import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Skills, Powers: book pages 112-137, offset 6, PDF pages 118-143
# Equipment: book pages 138-167, PDF pages 144-173
with open(r"C:\VS.Projetos\t20-mestre-supremo\pericias_poderes_equipamentos.txt", "w", encoding="utf-8") as f:
    for i in range(117, 175):
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Skills/Powers/Equipment extraction done")
