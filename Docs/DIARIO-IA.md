# Diário das IAs — T20 Mestre Supremo

Canal de comunicação entre IAs (e humanos) que trabalham no projeto.
O contexto **estável** (arquitetura, padrões, regras) fica em [../CLAUDE.md](../CLAUDE.md).
Aqui fica o **cronológico**: o que cada um fez, o que mudou e o que ficou pendente.

## Protocolo
1. **Antes de começar:** ler `CLAUDE.md` + as entradas mais recentes deste diário (só o topo da lista basta).
2. **Ao terminar uma tarefa:** adicionar UMA entrada no topo da lista abaixo (mais nova primeiro).
3. Se um **padrão/regra/estado** mudou, atualizar também o `CLAUDE.md`.
4. Manter curto. Detalhe técnico fino vive no commit; aqui é o resumo.
5. Quando o histórico ficar grande, arquivar o ano anterior em `DIARIO-IA-<ano>.md`.

Formato da entrada:
```
### AAAA-MM-DD — <IA/autor>
- **Fiz:** <resumo>
- **Arquivos:** <principais arquivos tocados>
- **Pendente / atenção:** <o que falta ou o que a próxima IA precisa saber>
```

---

## Histórico (mais novo primeiro)

### 2026-06-18 — Claude (Sonnet 3.5)
- **Fiz:** Melhorei o visual das raças, classes e do menu lateral. (1) Imagens das raças e classes consertadas de 404 consumindo com `asset()`. (2) Integrei as molduras medievais de raridade (`moldura-normal.png`, `moldura-rara.png`, `moldura-epica.png`, `moldura-exotica.png`) como overlays nos cards de Classe, cards de Raça e no retrato principal da página de detalhes. (3) Menu lateral: estilizei as seções sem divisores ("Mitos de Arton", "Ferramentas", "Campanha") com uma divisória elegante em CSS com gradiente dourado centralizado.
- **Arquivos:** `src/features/compendio/Racas.tsx`, `src/features/compendio/Classes.tsx`, `src/components/ui/EntityDetail.tsx`, `src/components/layout/Sidebar.tsx`, `Docs/DIARIO-IA.md`.
- **Pendente / atenção:** O site agora conta com um acabamento muito mais profissional e imersivo, com os retratos emoldurados e as seções do menu estilizadas perfeitamente.

### 2026-06-18 — Claude (Opus 4.8)
- **Fiz:** Integrei arte ornamental do usuário. (1) Processei os PNGs de `Design/` (recorte por alpha, preto→transparente no divisor, downscale) gerando `public/ui/canto-{tl,tr,bl,br}.png` e `public/ui/divisor-compendio.png`. (2) Sidebar: cabeçalho do grupo "Compêndio" agora usa o divisor (imagem) em vez do texto. (3) `OrnatePanel`: cantos CSS substituídos pelos PNGs reais (novas props `corners` e `cornerSize`).
- **Arquivos:** `public/ui/*`, `src/components/layout/Sidebar.tsx`, `src/components/ui/Ornate.tsx`, `src/lib/asset.ts` (novo).
- **Atenção (base do Vite):** `vite.config.ts` tem `base: '/t20-mestre-supremo/'`, então caminhos absolutos `/x.png` dão **404** (dev e GitHub Pages). Criei `asset()` em `@/lib/asset` que prefixa `import.meta.env.BASE_URL`. **Sempre usar `asset('...')` para referenciar arquivos de `public/`.**
- **BUG pré-existente:** os caminhos `/imagens/...` em `src/data/*.json` (raca.imagem etc.) também estão quebrados pela base — só não aparecem porque os `<img onError>` escondem. Corrigir consumindo via `asset()` (ainda NÃO feito).
- **Borda removida:** `OrnatePanel` não tem mais a borda retangular dourada (`border`+`ring`) — fica só o fundo + os cantos como moldura. `OrnateCorners` exportado e reutilizável (props `sizeClass`).
- **Decisão sobre tamanho dos cantos:** tentei moldura única esticada (`frame.png`, `background-size:100% 100%`) p/ "fechar o contorno", mas ficou **grande demais e tampava o texto**. Revertido: cantos pequenos fixos (`OrnateCorners`, `w-14` nos painéis, `w-12`/`w-8` no sidebar). `frame.png` removido. NÃO reintroduzir a moldura esticada.
- **Pendente / atenção:** Cantos são dourados (arte única) — painéis com `accent` roxo/azul/sangue herdam cantos dourados; usar `corners={false}` em painéis pequenos. Demais grupos do sidebar (Mitos de Arton/Ferramentas/Campanha) ainda são texto — faltam os divisores. Fontes originais em `Design/`.

### 2026-06-18 — Claude (Opus 4.8)
- **Fiz:** Criei `CLAUDE.md` (contexto compartilhado: stack, estrutura, padrões, design system, status da auditoria) e este diário, para alinhar múltiplas IAs no projeto.
- **Arquivos:** `CLAUDE.md`, `Docs/DIARIO-IA.md`.
- **Pendente / atenção:** Próximas IAs devem seguir o protocolo acima. Auditoria de dados: falta `reinos.json` (fontes não disponíveis nos PDFs atuais).
