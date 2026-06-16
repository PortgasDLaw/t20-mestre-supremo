import fitz
import os

doc = fitz.open('/workspaces/t20-mestre-supremo/Docs/Mitos de Arton.pdf')
outdir = '/workspaces/t20-mestre-supremo/scripts/raw/mitos_pages'
os.makedirs(outdir, exist_ok=True)
for i in range(26, 142):
    with open(f'{outdir}/p{i:03d}.txt', 'w', encoding='utf-8') as f:
        f.write(doc[i].get_text())
print('done', len(doc))
