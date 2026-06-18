# T20 Mestre Supremo

Ferramenta open source para mestres de **Tormenta20** (RPG brasileiro, equivalente ao D&D).
Público: mestres de RPG e contribuidores da comunidade. **Offline-first, sem backend.**

> **Toda IA/contribuidor:** leia este arquivo + as entradas mais recentes de [Docs/DIARIO-IA.md](Docs/DIARIO-IA.md) ANTES de começar. Ao terminar, registre o que fez no diário (e atualize aqui se um padrão mudar). Protocolo no topo do diário.

## Stack
SPA **React 18 + TypeScript + Vite + Tailwind + Zustand**. Dados persistidos em **localStorage** (sem servidor).

## Estrutura
```
src/
├── lib/            ← utilidades sem React (id.ts, random.ts)
├── features/
│   ├── compendio/  ← páginas de referência (Magias, Ameaças, Classes, Raças, etc.)
│   ├── combate/    ← RastreadorCombate, GeradorEncontros
│   ├── campanha/   ← Dashboard, NPCs, Campanha
│   └── ferramentas/ ← BuscaUniversal, FerramentasRapidas, GeradorAventuras
├── store/          ← Zustand fatiado: combateSlice, npcSlice, campanhaSlice, navegacaoSlice + schemas.ts (Zod)
├── types/          ← por domínio: compendio.ts, campanha.ts, combate.ts
├── components/ui/  ← Button, Card, Input, Modal, Badge, EmptyState, Ornate, EntityDetail
├── data/           ← JSONs estáticos do T20 (magias, ameaças, classes, etc.)
└── utils/          ← dice.ts, generators.ts
```

## Padrões de código (seguir sempre)
- Imports com alias **`@/`** (ex: `@/store`, `@/lib/id`, `@/features/combate/RastreadorCombate`).
- IDs via **`generateId()`** de `@/lib/id` (`crypto.randomUUID()`).
- Aleatoriedade via **`pickRandom()`** de `@/lib/random`.
- **Lazy loading** em todas as páginas (code splitting pelo Vite).
- Store **fatiado por domínio** (Zustand) + validação **Zod** na reidratação.
- `EmptyState` reutilizável para estados vazios.

## Design system — ESTILO CENTRALIZADO (regra forte)
A aparência é centralizada porque o estilo muda com frequência. **Nunca** escrever estilo hardcoded nas páginas — reutilizar os componentes abaixo.
- `tailwind.config.js` — paleta (abyss/grimoire/gold/blood/parchment), fontes (Cinzel/Crimson), texturas, sombras, animações.
- `src/components/ui/Ornate.tsx` — `OrnatePanel` (cantos = arte PNG em `public/ui/canto-*.png`; props `corners`/`cornerSize`), `OrnateDivider`, `AttributeChip`, `StatBox`, mapa `accentClasses` (gold|purple|blue|blood).
- `public/ui/` — arte ornamental servida pelo Vite (cantos + `divisor-compendio.png` usado no sidebar). Fontes originais (alta-res) em `Design/`; reprocessar com PIL (recorte por alpha + downscale) ao gerar novas.
- `src/components/ui/EntityDetail.tsx` — scaffold genérico de página de detalhe (breadcrumb + hero + abas + sidebar). Páginas só passam **dados** via props.
- `src/components/ui/Modal.tsx` — usa OrnatePanel.
- Guia "onde mudar o quê": [Docs/ESTILO-VISUAL.md](Docs/ESTILO-VISUAL.md).
- **Regra:** full-page `EntityDetail` só para entidades com retrato (Raças/Classes); demais em `Modal` ornamentado.

## Regra inviolável de conteúdo
**Só dados reais dos livros oficiais. NUNCA inventar** lore, cultura, regiões, regras ou stat blocks.
Fontes de verdade (auditoria): `Docs/T20 - Livro Básico - Jogo do Ano.pdf` e `Docs/Mitos de Arton.pdf`.

## Status da auditoria de `src/data/` (contra os PDFs)
**Concluídos ✓:** magias, classes, devocoesAlternativas, racas, condicoes, itensMagicos, equipamentos, distincoes, regrasOpcionais, deuses_menores, ameacas (reconstruído), poderesConcedidos, tabelas (35 tabelas dos dois livros).
**Pendente:** `reinos.json` — "Sultanato de Iram" e "Reinton" não estão nos PDFs disponíveis (provável outro suplemento).

## Extração de PDF (quando for expandir os JSONs)
- PyMuPDF (fitz): limpar soft hyphens com `.replace('\xad\n','').replace('\xad','')`.
- Habilidades de raça: parágrafo `"Nome. Você..."` (não bullet points).
- Poderes de classe: bullet points `•` no PDF.
- **Sempre validar antes de commitar:** `python3 -c "import json; json.load(open('src/data/X.json'))"`
