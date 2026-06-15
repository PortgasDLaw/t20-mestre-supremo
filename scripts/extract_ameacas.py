import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Threats: book pages 280-323, offset 6, PDF pages 286-329
# Rewards: book pages 324-350, PDF pages 330-356
# World: book pages 350-392, PDF pages 356-398
with open(r"C:\VS.Projetos\t20-mestre-supremo\ameacas_recompensas_mundo.txt", "w", encoding="utf-8") as f:
    for i in range(285, 399):
        text = doc[i].get_text()
        if text.strip():
            f.write(f"\n=== PDF PAGE {i+1} ===\n")
            f.write(text)

print("Threats/Rewards/World extraction done")
