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

### 2026-06-20 — Claude (Sonnet 4.6) — Split-screen Deuses, aba Poderes em Classes, melhoria Raças
- **Fiz:** (1) **`DeusesMenores.tsx`**: reescrito como split-screen completo. Esquerda: Glórienn em seção "Deusa Maior" + busca/filtro + lista de 15 deuses menores. Direita: painel de detalhe com tabs diferentes por tipo — Glórienn tem 7 tabs (Identidade, História, Motivações, Relações, Igreja & Clero, Devotos & O&R, Poderes) com todos os campos do JSON; deus menor tem 3 tabs (Visão Geral, Crenças & O&R, Poder Concedido). Glórienn agora é clicável e mostra todos os dados do livro. (2) **`Layout.tsx`**: `devocaoAlternativa` (aba "Deuses") movido de SHELL_PAGES para FULL_PAGES pois agora tem layout próprio `h-full`. (3) **`Classes.tsx`**: adicionadas abas "Poderes" (exibe o array `poderes[]` com 20+ poderes antes ocultos, separando nome do efeito pelo `—`) e "Linhagens" (separada de Lore); removida aba "Lore" redundante. (4) **`Racas.tsx`**: aba "Lore" agora mostra deus patrono, fonte e tipo da raça em vez de repetir a descrição.
- **Arquivos:** `src/features/compendio/DeusesMenores.tsx`, `src/components/layout/Layout.tsx`, `src/features/compendio/Classes.tsx`, `src/features/compendio/Racas.tsx`.
- **Pendente / atenção:** Dados de Glórienn não têm campo "avatar" (stat block de ND 19 visto no protótipo HTML era mockup, não existe no JSON). Se quiser adicionar, precisará adicionar ao `devocoesAlternativas.json`. `deuses_menores.json` tem 15 deuses menores — mais podem ser adicionados via PDF.

### 2026-06-20 — Claude (Sonnet 4.6) — Redesign layouts por design spec
- **Fiz:** Reconstrução das 5 páginas principais para seguir fielmente o `Docs/README.md` (design spec dark fantasy estilo BG3/Diablo IV). (1) **`Layout.tsx`**: removido wrapper genérico de padding (`p-7`); criado `PageShell` para páginas simples; pages com layout próprio (`h-full flex flex-col`) renderizam direto. (2) **`Classes.tsx`**: reescrito como split-screen — esquerda tem busca + grid 3→2 colunas; direita mostra portrait 286px + 4 stat boxes (PV Inicial/PV Nível/PM Nível/Perícias) + 4 sub-abas (Visão Geral, Habilidades, Lore, Progressão) com underline dourado animado. Cards têm disco de ícone PNG + papel + nome. (3) **`Racas.tsx`**: mesmo padrão split-screen; pills de filtro Todas/Comuns/Raras com gradient dourado ativo; rarity badge canto superior direito com cor por tipo. (4) **`Ameacas.tsx`**: split-screen com ND badge colorido (gradiente verde→ciano→azul→roxo→laranja→vermelho), 5 stat boxes (PV/CA/PM/Init/Deslocamento) com cores por tipo; 4 abas: Visão Geral/Habilidades/Estratégia/Lore. (5) **`Magias.tsx`**: flat-list com thumbnail escola-colorido via `radial-gradient` + CSS mask icon; filter bar (contador|busca|escola|círculo); badges Execução·Alcance·Duração à direita; star toggle favorito; modal com strip de 5 atributos + drop-cap dourado + seção Aprimoramentos. Fix: `null` guards em `escola` e `escola` filter. (6) **`Equipamentos.tsx`**: flat-list com thumbnails coloridos por categoria (arma=vermelho, armadura=azul, etc.); peso (espaços) + preço com ícones `icAbundant`/`icTreasure`; modal com campos dinâmicos e propriedades chips. (7) **`PageShell.tsx`**: novo wrapper para páginas que não usam layout próprio.
- **Arquivos:** `src/components/layout/Layout.tsx`, `src/components/layout/PageShell.tsx` (novo), `src/features/compendio/Classes.tsx`, `src/features/compendio/Racas.tsx`, `src/features/compendio/Ameacas.tsx`, `src/features/compendio/Magias.tsx`, `src/features/compendio/Equipamentos.tsx`.
- **Pendente / atenção:** Pages antigas (Dashboard, Condições, Distinções, Deuses, etc.) continuam funcionando via `PageShell` sem alteração. `ClasseDetalhe.tsx` e `RacaDetalhe.tsx` ainda existem mas não são mais usados pelas páginas refatoradas — podem ser removidos em sessão futura.

### 2026-06-20 — Claude (Sonnet 4.6)
- **Fiz:** Redesign visual completo seguindo spec do README (design system dark fantasy estilo BG3/Diablo IV). (1) `tailwind.config.js`: nova paleta de cores alinhada ao spec (bgBody `#0E0A12`, bgPanel `#1A141E`, gold `#C89B3C`, etc.), novos tokens de raridade, escola de magia, ND de ameaças, animação `pageopen`. (2) `index.css`: fundo radial-gradient escuro fixo no body, scrollbar customizado (spec §Scrollbar), animações globais `fadein`/`pageopen`. (3) `index.html`: fontes **Cinzel Decorative** e **EB Garamond** adicionadas. (4) Novo componente `src/components/ui/Icon.tsx`: ícone PNG via CSS mask (tingível em qualquer cor) — substitui Lucide React no sidebar. (5) `Sidebar.tsx`: redesenhado com ícones PNG, largura 278px, novo logo "Compêndio / MESTRE", gradiente lateral, renomeação de itens: **"Deuses & Devotos" → "Deuses"** (rota `devocaoAlternativa`) e **"Deuses Menores" → "Devotos"** (rota `deuses`). (6) `Layout.tsx`: h-screen overflow:hidden, fundo `#0E0A12`. (7) `Card.tsx`: cards com gradient panel-gradient e borda dourada sutil. (8) `Modal.tsx`: overlay `rgba(6,4,9,0.86)` + blur(5px), animation `page-open`. (9) `Button.tsx`: gradient dourado `linear-gradient(180deg, #d6a948, #b3852f)`. (10) `Input.tsx`/`Select.tsx`: inputs com bg `#15101a`, borda dourada sutil, seta select customizada. (11) `Ornate.tsx`: ajuste de cores nos chips e stat boxes. (12) `Badge.tsx`: variantes com cores spec (raridades, escolas).
- **Arquivos:** `index.html`, `tailwind.config.js`, `src/index.css`, `src/components/ui/Icon.tsx` (novo), `src/components/layout/Sidebar.tsx`, `src/components/layout/Layout.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Modal.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/Ornate.tsx`, `src/components/ui/Badge.tsx`, `public/ui/ic*.png` (copiados de `Docs/icons/`).
- **Pendente / atenção:** A sidebar renomeia "Deuses Menores" → "Devotos" e "Deuses & Devotos" → "Deuses" SOMENTE nos rótulos (sem mover dados/rotas). Se quiser separar a Glórienn em página própria ou mover conteúdo entre abas, precisará de nova sessão com refactor de dados.

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
