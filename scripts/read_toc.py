import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Print TOC page fully
print("=== SUMARIO ===")
print(doc[8].get_text())
