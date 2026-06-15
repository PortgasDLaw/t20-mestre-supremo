import fitz

pdf_path = r"C:\VS.Projetos\T20 - Livro Básico - Jogo do Ano.pdf"
doc = fitz.open(pdf_path)

# Read TOC and pages 9 to get full table of contents
for i in range(8, 10):
    print(f"\n=== PAGE {i+1} ===")
    print(doc[i].get_text())

# Read pages 18-100 for races and classes
for i in range(18, 100):
    text = doc[i].get_text()
    if text.strip():
        print(f"\n=== PAGE {i+1} ===")
        print(text)
