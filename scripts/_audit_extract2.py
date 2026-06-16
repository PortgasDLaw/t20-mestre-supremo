import fitz
import os

doc = fitz.open('/workspaces/t20-mestre-supremo/Docs/Mitos de Arton.pdf')
outdir = '/workspaces/t20-mestre-supremo/scripts/raw/mitos_pages_blocks'
os.makedirs(outdir, exist_ok=True)
for i in range(20, 142):
    page = doc[i]
    blocks = page.get_text('blocks')
    # sort blocks by column (x0) then y0 to better separate two-column layout
    with open(f'{outdir}/p{i:03d}.txt', 'w', encoding='utf-8') as f:
        for b in blocks:
            x0,y0,x1,y1,text,bno,btype = b
            f.write(f'--- block x0={x0:.0f} y0={y0:.0f} x1={x1:.0f} y1={y1:.0f} ---\n')
            f.write(text)
            f.write('\n')
print('done')
