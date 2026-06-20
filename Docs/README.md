# Handoff: Compêndio Mestre — Tormenta20

## Overview

O **Compêndio Mestre** é uma ferramenta web de referência para jogadores e mestres do RPG **Tormenta20**. Funciona como um grimório digital interativo — estética dark fantasy (inspirada em Baldur's Gate 3 e Diablo IV) com navegação por seções de conteúdo do sistema.

O projeto foi desenvolvido em **React + TypeScript + Vite + Tailwind CSS**. Este handoff documenta o design para implementação fiel nesse ambiente.

---

## Sobre os Arquivos de Design

Os arquivos `.dc.html` incluídos neste pacote são **protótipos de alta fidelidade criados em HTML** — referências de visual e comportamento, **não** código de produção para copiar diretamente. A tarefa é **recriar estes designs no projeto React/TypeScript/Vite/Tailwind CSS** usando seus padrões e bibliotecas estabelecidas.

## Fidelidade

**Alta fidelidade (hifi)**: Os protótipos são pixel-perfect com cores finais, tipografia, espaçamento e interações. O desenvolvedor deve recriar a UI com fidelidade máxima usando as bibliotecas existentes do projeto.

---

## Design Tokens

### Cores — Paleta Principal

```ts
// tokens/colors.ts
export const colors = {
  // Backgrounds
  bgBody:        '#0E0A12',   // body principal (roxo escuro quase preto)
  bgSidebar:     '#150f1b',   // sidebar
  bgPanel:       '#1A141E',   // cards e painéis
  bgPanelDark:   '#120d16',   // stat boxes, inputs
  bgPanelDeep:   '#0f0b13',   // portrait, header dark
  bgInput:       '#15101a',   // inputs e selects

  // Dourado (cor de destaque principal)
  gold:          '#C89B3C',   // dourado base
  goldLight:     '#E4C16A',   // dourado claro (títulos, valores)
  goldBright:    '#F0E4C8',   // dourado muito claro (texto em destaque)
  goldDim:       '#9a8e7c',   // dourado apagado (texto secundário)

  // Texto
  textPrimary:   '#E8DFCF',   // texto principal
  textSecondary: '#a99c86',   // texto secundário
  textMuted:     '#8f8472',   // texto apagado
  textFaint:     '#6e6356',   // texto muito apagado
  textDark:      '#5a5145',   // texto escuro

  // Raridades — Classes e Raças
  rarComum:      '#8A93A6',   // cinza aço
  rarRaro:       '#4F8FD6',   // azul
  rarEpico:      '#A461E8',   // roxo
  rarLendario:   '#E0733B',   // âmbar

  // Raridades — Equipamentos
  equipComum:    '#8A93A6',
  equipIncomum:  '#4F8FD6',
  equipRaro:     '#A461E8',
  equipEpico:    '#D06AC9',   // magenta
  equipLendario: '#E0733B',

  // Escolas de Magia
  magiaEvocacao:     '#E0733B',
  magiaAbjuracao:    '#4F8FD6',
  magiaAdivinhacao:  '#C9A23B',
  magiaEncantamento: '#D06AC9',
  magiaIlusao:       '#A461E8',
  magiaNecromancia:  '#6E9A52',
  magiaConjuracao:   '#4FB0C6',
  magiaTransmutacao: '#C77F3A',

  // ND de Ameaças (gradiente de perigo)
  ndFacil:    '#6E9A52',   // ND 1
  ndBaixo:    '#4FB0C6',   // ND 2
  ndMedio:    '#4F8FD6',   // ND 3
  ndAlto:     '#A461E8',   // ND 4-5
  ndPerigo:   '#E0733B',   // ND 6-7
  ndMortal:   '#E05040',   // ND 8+

  // Combate
  combateAtivo:   '#8B1A1A',   // vermelho combate
  combateHP:      '#E05040',
  combateCA:      '#4F8FD6',
  combateFort:    '#6E9A52',
  combateReflex:  '#4F8FD6',
}
```

### Tipografia

```ts
// tokens/typography.ts
// Fontes (carregar do Google Fonts)
// import: Cinzel (wght 500;600;700), Cinzel Decorative (wght 700;900), EB Garamond (ital,wght 0,400;0,500;0,600;1,400)

export const fonts = {
  title:      "'Cinzel', serif",          // títulos de seções, nomes de itens
  titleDeco:  "'Cinzel Decorative', serif", // logo, nome de divindades
  body:       "'EB Garamond', Georgia, serif", // corpo, descrições, atributos
}

export const textStyles = {
  // Títulos de página
  pageTitle:    { fontFamily: fonts.title, fontWeight: 700, fontSize: '38-40px', color: colors.goldLight, letterSpacing: '1px', textShadow: '0 2px 18px rgba(200,155,60,0.18)' },
  // Títulos de card
  cardTitle:    { fontFamily: fonts.title, fontWeight: 600, fontSize: '17-19px', color: colors.textPrimary, letterSpacing: '0.4px' },
  // Labels de atributo
  statLabel:    { fontFamily: fonts.title, fontWeight: 700, fontSize: '20-24px', color: colors.goldLight },
  // Corpo de texto
  body:         { fontFamily: fonts.body, fontSize: '15.5-16.5px', lineHeight: '1.65-1.78', color: '#cfc3aa' },
  // Label meta
  metaLabel:    { fontSize: '10-11px', letterSpacing: '1.5-2.5px', textTransform: 'uppercase', color: colors.textFaint },
}
```

### Espaçamento e Bordas

```ts
export const spacing = {
  // Padding principal das telas
  pagePadding: '28-34px',
  // Gap entre cards
  cardGap: '13-14px',
  // Padding interno de card
  cardPadding: '14-18px',
  // Border radius
  radiusCard: '7-8px',
  radiusModal: '10px',
  radiusPill: '20px',
  radiusBtn: '5-6px',
  radiusStatBox: '6-7px',
}

export const shadows = {
  card:    '0 10px 28px rgba(0,0,0,0.55)',
  modal:   '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30), inset 0 0 60px rgba(0,0,0,0.4)',
  panel:   '0 20px 50px rgba(0,0,0,0.5)',
  sidebar: 'inset -14px 0 30px rgba(0,0,0,0.45)',
}
```

### Gradientes de Fundo

```ts
export const gradients = {
  body:    'radial-gradient(130% 90% at 50% -15%, #221629 0%, #120d17 52%, #0c0810 100%)',
  sidebar: 'linear-gradient(176deg, #1b1420 0%, #150f1b 55%, #100b15 100%)',
  panel:   'linear-gradient(180deg, #1a141e, #16111b)',
  modal:   'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
  gold:    'linear-gradient(180deg, #d6a948, #b3852f)',   // botão primário dourado
}
```

---

## Ícones

Os ícones são arquivos PNG brancos com fundo transparente (500×500px), aplicados via **CSS mask** com cor dourada:

```css
/* Técnica de aplicação dos ícones */
.icon {
  background-color: #C89B3C;           /* cor desejada */
  -webkit-mask-image: url('/icons/icKnowledge.png');
  mask-image: url('/icons/icKnowledge.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  width: 24px;
  height: 24px;
}
```

**Lista completa de ícones disponíveis** (pasta `/uploads/icons/`):

| Arquivo | Uso sugerido |
|---------|-------------|
| `icAbundant.png` | Natureza, Druidas, Peso |
| `icBanner.png` | Distinções, Ritos |
| `icBoring.png` | Ilusão, Monstros |
| `icCompassion.png` | Devotos, Cura |
| `icContemplative.png` | Paladinos, Meditação |
| `icCourage.png` | Coragem, Habilidades |
| `icDanger.png` | Ameaças, Necromancia |
| `icExplore.png` | Exploração, Adivinhação |
| `icFriend.png` | Social, Raças |
| `icGear.png` | Equipamentos, Configurações |
| `icHonest.png` | Honestidade, Ladinos |
| `icHope.png` | Esperança, Bruxos |
| `icHunter.png` | Classes, Combatentes |
| `icIndiferent.png` | Indiferença |
| `icKnowledge.png` | Magias, Saber, Logo |
| `icMedal.png` | Conquistas, Honras |
| `icPrecision.png` | Precisão, Equipamentos |
| `icResearch.png` | Busca, Pesquisa |
| `icSignal.png` | Bardos, Sinais |
| `icStrenght.png` | Força, Guerreiros |
| `icTough.png` | Resistência, Armaduras |
| `icTreasure.png` | Itens Mágicos, Preço |
| `icWillpower.png` | Magia, Deuses |

---

## Arquitetura de Layout (Shell Global)

```
App (h-screen, overflow:hidden, flex)
├── Sidebar (w-[278px], flex-none, flex-col)
│   ├── Logo (icKnowledge + "Compêndio" / "MESTRE")
│   ├── Nav (flex-1, overflow-y-auto) — 14 itens
│   └── Footer (icMedal + versão)
└── Main (flex-1, min-w-0, flex-col)
    ├── [Conteúdo da tela ativa]
    └── [Modais/Overlays: position:fixed inset-0 z-60]
```

### Sidebar — Itens de Menu

```ts
const navItems = [
  { id: 'dashboard',    label: 'Dashboard',           icon: 'icExplore' },
  { id: 'racas',        label: 'Raças',                icon: 'icFriend' },
  { id: 'classes',      label: 'Classes',              icon: 'icHunter' },
  { id: 'magias',       label: 'Magias',               icon: 'icKnowledge' },
  { id: 'equipamentos', label: 'Equipamentos',         icon: 'icPrecision' },
  { id: 'condicoes',    label: 'Condições',            icon: 'icTough' },
  { id: 'ameacas',      label: 'Ameaças',              icon: 'icDanger' },
  { id: 'distincoes',   label: 'Distinções & Ritos',   icon: 'icBanner' },
  { id: 'deusesmaiores',label: 'Deuses',               icon: 'icWillpower' },
  { id: 'devotos',      label: 'Devotos',              icon: 'icCompassion' },
  { id: 'itens',        label: 'Itens Mágicos',        icon: 'icTreasure' },
  { id: 'poderes',      label: 'Poderes Concedidos',   icon: 'icSignal' },
  { id: 'regras',       label: 'Regras Opcionais',     icon: 'icGear' },
  { id: 'gerador',      label: 'Gerador de Encontros', icon: 'icResearch' },
]
```

**Estado ativo da nav:**
- `background: rgba(200,155,60,0.10)`
- `box-shadow: inset 3px 0 0 #C89B3C` (borda esquerda dourada)
- Ícone: `#E4C16A` (dourado claro)
- Label: `color: #E8DFCF`, `font-weight: 600`

---

## Telas e Componentes

### 1. CLASSES (Split-Screen)

**Layout:** Split esquerda/direita. Painel direito aparece apenas ao clicar num card.

```
Classes
├── Header (flex-none): título "Classes" + linha dourada + subtítulo
├── Split (flex-1, flex-row, gap-24px, overflow:hidden)
│   ├── LEFT (flex: 0 1 430px → flex:1 quando nada selecionado)
│   │   ├── Busca (input com ícone icResearch à esq.)
│   │   ├── Pills de raridade (Todas/Comuns/Raras/Épicas/Lendárias)
│   │   └── Grid de cards (2 colunas → 3 quando nada selecionado)
│   └── RIGHT (flex: 1 1 420px, min-w-[380px]) — fade-in ao abrir
│       ├── Portrait (h-286px, image-slot arrastável)
│       ├── Botão ✕ (absolute top-14 right-14)
│       ├── Overlay gradiente sobre portrait
│       ├── Info no rodapé do portrait (ícone + role + nome + badge raridade)
│       ├── 4 Stat Boxes (PV/Nível, PM/Nível, Perícias, Atrib.-Chave)
│       ├── Sub-abas (Visão Geral, Habilidades, Lore, Cultura, Progressão)
│       └── Conteúdo da aba ativa
```

**Card de Classe:**
```tsx
interface ClassCard {
  // Disco de ícone
  disc: {
    width: 52, height: 52, borderRadius: 8,
    background: 'radial-gradient(circle at 50% 32%, rgba(200,155,60,0.28), rgba(18,13,22,0.7))',
    border: '1px solid rgba(200,155,60,0.45)'
  }
  // Badge de raridade (texto apenas, no canto superior direito)
  rarityDot: { width: 8, height: 8, borderRadius: '50%', background: rarityColor }
  rarityText: { fontSize: 10.5, letterSpacing: '1px', textTransform: 'uppercase', color: rarityColor }
  // Nome
  name: { fontFamily: 'Cinzel', fontWeight: 600, fontSize: 17, color: '#E8DFCF' }
  // Tagline
  tagline: { fontSize: 13, color: '#8f8472' }
  // Role
  role: { fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase', color: '#6e6356' }
}

// Estado selecionado:
cardSelected: {
  background: '#221a28',
  border: '1px solid #C89B3C',
  boxShadow: '0 0 18px rgba(200,155,60,0.18), inset 0 0 0 1px rgba(200,155,60,0.4)'
}

// Hover:
cardHover: {
  borderColor: '#C89B3C',
  transform: 'translateY(-3px)',
  boxShadow: '0 10px 28px rgba(0,0,0,0.55)'
}
```

**Sub-aba ativa:**
```css
/* underline dourado animado */
position: absolute; left: 0; right: 0; bottom: -1px;
height: 2.5px;
background: linear-gradient(90deg, #C89B3C, #E4C16A);
box-shadow: 0 0 8px rgba(200,155,60,0.55);
```

**Dados de Classes** (10 classes com conteúdo):
Guerreiro, Bárbaro, Ladino, Clérigo, Druida, Bardo, Mago, Bruxo, Paladino, Arcanista

---

### 2. RAÇAS (Split-Screen idêntico ao Classes)

Mesma estrutura de layout. 9 raças:
Humano, Elfo, Anão, Halfling, Lefou, Goblin, Minotauro, Qareen, Dahllan

Diferença: stats boxes mostram bônus de atributo (+1, +2 etc.) em vez de PV/PM.

---

### 3. MAGIAS (Lista dark)

**Layout:**
```
Magias
├── Header (flex-none): ícone + título + subtítulo
├── Filter Bar (flex-none): contador | busca | select Escola | select ND
└── List (flex-1, overflow-y-auto)
    └── Cards de magia (flex-col, gap-10px)
```

**Card de Magia:**
```tsx
// Thumbnail circular colorido por escola
thumbnail: {
  width: 62, height: 62, borderRadius: 9,
  background: `radial-gradient(circle at 50% 28%, ${schoolColor}66, rgba(13,9,17,0.7))`,
  border: `1px solid ${schoolColor}88`,
  boxShadow: `inset 0 0 20px rgba(0,0,0,0.55), 0 0 16px ${schoolColor}33`
}
// Hover: translateX(3px) + borderColor mais saturado
```

**Badges à direita:** Execução · Alcance · Duração
```css
font-size: 11px; color: #c2b596;
border: 1px solid rgba(200,155,60,0.28);
background: rgba(200,155,60,0.06);
border-radius: 4px; padding: 4px 9px;
```

**Modal de detalhe ao clicar:** overlay `rgba(6,4,9,0.86)` + blur(5px), animação `pageopen` (fade + translateY + scale), fundo dark roxo, inner frame dourado fino, selo da escola, strip de 5 atributos, descrição com capitular dourado, seção de Aprimoramentos.

**Animações:**
```css
@keyframes fadein { from { opacity: 0 } to { opacity: 1 } }
@keyframes pageopen {
  from { opacity: 0; transform: translateY(16px) scale(0.94) }
  to   { opacity: 1; transform: none }
}
```

---

### 4. EQUIPAMENTOS (Lista dark — mesmo padrão que Magias)

**Filtros:** busca | categoria (Arma/Armadura/Item Mágico/Equipamento) | raridade

**Diferença visual dos cards:**
- Badge de raridade colorido inline no nome (não apenas ponto)
- Lado direito: peso (ícone icAbundant) + preço em dourado (ícone icTreasure)

**Modal de detalhe:** idêntico ao de Magias mas com campos Peso/Preço/Dano-CA/Tipo/Alcance + seção "Propriedades" (chips).

---

### 5. AMEAÇAS (Split-Screen)

**Diferenças do Classes:**
- Painel direito: 5 stat boxes (PV, CA, Ataque, Dano, Deslocamento) — sem tabs de Cultura/Progressão, tem "Estratégia" no lugar
- Filtros no LEFT: busca + 2 dropdowns (ND e Tipo) em vez de pills
- Badge de ND colorido (cor varia com ND: verde→ciano→azul→roxo→laranja→vermelho)
- Portrait 260px (vs 286px nas classes)
- 4 abas: Visão Geral, Habilidades, Estratégia, Lore

**10 ameaças com dados completos:** Goblin, Esqueleto, Lobo Gigante, Zumbi, Ogro, Ghoul, Troll, Vampiro, Dragão Jovem, Lich

---

### 6. DISTINÇÕES & RITOS (Modal Focado)

**Layout:** Grid fullwidth (3 colunas, sem painel lateral) → ao clicar, abre modal largo (max-w-[980px], max-h-[92vh], flex-col).

**Modal interno (fixo + scrollável):**
```
Modal (flex-col)
├── HEADER (flex-none, padding 38px 50px 0)
│   ├── Selo (80×80px, border colorido por raridade, glow)
│   └── Nome + Raridade + Tagline
├── BONUS BOXES (flex-none, grid 4 cols)
├── DIVIDER ornamental (linha + losango + linha)
├── TAB BAR (flex-none)
└── SCROLLABLE CONTENT (flex-1, overflow-y-auto)
```

**4 abas com layouts distintos:**
- **Visão Geral:** texto com capitular dourado (float:left)
- **Admissão:** 2 colunas (requisitos à esq. | processo à dir.)
- **Habilidades:** cards com ícone + level badge
- **Lore:** `column-count: 2` com `column-rule: 1px solid rgba(200,155,60,0.14)`

---

### 7. DEUSES (Página dedicada)

**Layout:**
```
Deuses
├── LEFT sidebar (220px): lista de deuses (rows clicáveis)
└── RIGHT content (flex-1)
    ├── Portrait hero (300px, image-slot)
    ├── Overlay gradiente horizontal (escurece à direita)
    ├── Name overlay (bottom-left: categoria + nome Cinzel Decorative 44px + título + epíteto)
    ├── Strip de atributos divinos (Símbolo | Arma | Energia | Cores)
    ├── Tab bar horizontal (7 abas, overflow-x-auto)
    └── Tab content scrollável
```

**7 abas:** Identidade · História · Relações · Igreja & Clero · Devotos & O&R · Poderes · ⚔ Avatar

**Aba Avatar** inclui stat block completo: grid de defesas, grid de ataques, lista de habilidades — estilo Ameaças mas com glow dourado.

---

### 8. DEVOTOS (Sidebar colapsável)

**Layout:**
```
Devotos
├── LEFT sidebar (252px): grupos colapsáveis (Novos Druidas / Novos Paladinos / Vingadores)
│   └── Cada grupo: header clicável (toggle ▲▼) + lista de devotos
└── RIGHT content (flex-1, overflow-y-auto)
    ├── Nome header
    ├── [Parágrafos em 2 colunas se existirem]
    ├── Card Brando (border-left: 3px solid #C89B3C)
    ├── Card Fundamentalista (border-left: 3px solid #E0733B)
    └── Card Novo Poder Concedido (borda dourada, fundo gradiente)
```

---

### 9. GERADOR DE ENCONTROS + RASTREADOR

**Gerador:**
```
Config Panel (background #15101a, border dourada)
├── ROW 1: 3 colunas
│   ├── Select "Nível do Grupo" (1-20)
│   ├── Select "Número de Jogadores" (1-8)
│   └── Grid 2×2 botões Dificuldade (Fácil/Médio/Difícil/Mortal)
│       Ativo: gradient dourado, texto escuro
│       Inativo: bg #15101a, texto #9a8e7c
└── ROW 2: ND alvo calculado + botão "Gerar Encontro"
    ND alvo = nivelGrupo × multiplicador[dificuldade]
    Multiplicadores: Fácil=0.5, Médio=0.75, Difícil=1.5, Mortal=2.0

Resultado (animação fadein):
├── Header: "Encontro Gerado" + botão "Iniciar Combate" (vermelho #8B1A1A)
└── Cards de inimigos
    ├── Nome (Cinzel 22px, dourado)
    ├── Tipo • Tamanho (12px, #7a6f5c)
    ├── Badge ND vermelho (#8B1A1A)
    ├── 4 Stat Boxes: PV(vermelho) | CA(azul) | Fort(verde/vermelho) | Reflex(azul/vermelho)
    ├── Linha de ataque: ⚔ NomeAtaque: bonus (dano)
    └── Estratégia (itálico, #7a6f5c)
```

**Rastreador de Combate:**
```
Tabela estilizada
├── Header fixo: Init | Nome | PV (barra) | Status | Ações
├── Linhas alternadas (#1A141E / #16111b)
├── Coluna Init: badge circular/quadrado dourado
├── Coluna PV: barra de progresso vermelha + valor editável
└── Ações: editar PV | rolar dados | remover
```

---

## Interações e Comportamento

### Seleção de Cards (Classes, Raças, Ameaças)
- Clicar num card: abre painel direito com `animation: fadein 0.22s ease`
- Grid muda de 3 → 2 colunas ao abrir o painel
- Botão ✕ no painel fecha e volta para grid de 3 colunas
- Só um item selecionado por vez

### Filtros
- Pills de raridade: toggle por chave, `background: linear-gradient(180deg,#d6a948,#b3852f)` quando ativo
- Dropdowns: `appearance: none`, seta customizada `▾` em dourado
- Busca: filtra por nome + outros campos relevantes em tempo real

### Modais (Magias, Equipamentos, Distinções)
- Overlay: `rgba(6,4,9,0.86)` + `backdrop-filter: blur(5px)`
- Modal: `animation: pageopen 0.36s cubic-bezier(0.2, 0.85, 0.25, 1)`
- Fechar: clique no overlay ou botão ✕

### Sub-abas
- Aba ativa: `color: #F0E4C8` + underline absoluto (2.5px, gradiente dourado)
- Aba inativa: `color: #857a68`
- Transição: `color 0.18s ease`

### Favoritos (Magias)
- Ícone ★/☆ toggle por magia
- Ativo: `color: #E4C16A`, `filter: drop-shadow(0 0 6px rgba(200,155,60,0.5))`

---

## State Management

### Estado Global Recomendado

```ts
interface AppState {
  // Navegação
  activeNav: string;

  // Classes
  classFilter: 'all' | 'comum' | 'raro' | 'epico' | 'lendario';
  classSearch: string;
  selectedClassId: string | null;
  classTab: 'overview' | 'abilities' | 'lore' | 'cultura' | 'progress';

  // Raças (mesma estrutura)
  racaFilter: string;
  racaSearch: string;
  selectedRacaId: string | null;
  racaTab: string;

  // Magias
  magiaSchool: string;
  magiaND: string | number;
  magiaSearch: string;
  selectedSpellId: string | null;
  favorites: string[];

  // Equipamentos
  equipCat: string;
  equipRarity: string;
  equipSearch: string;
  selectedEquipId: string | null;

  // Ameaças
  ameacaNd: string | number;
  ameacaTipo: string;
  ameacaSearch: string;
  selectedAmeacaId: string | null;
  ameacaTab: string;

  // Distinções
  distFilter: string;
  distSearch: string;
  selectedDistId: string | null;
  distTab: 'visao' | 'admissao' | 'habilidades' | 'lore';

  // Deuses
  selectedDeusId: string;
  deusTab: string;

  // Devotos
  selectedDevotoId: string;
  devotosGroupOpen: Record<string, boolean>;

  // Gerador
  genNivel: number;
  genJogadores: number;
  genDificuldade: 'facil' | 'media' | 'dificil' | 'mortal';
  encontroGerado: EncontroGerado | null;

  // Combate
  combatentes: Combatente[];
}
```

---

## Componentes Reutilizáveis Recomendados

```
components/
├── layout/
│   ├── Sidebar.tsx           — sidebar fixa com nav
│   └── PageShell.tsx         — wrapper com header + conteúdo
├── ui/
│   ├── Icon.tsx              — CSS mask icon com cor configurável
│   ├── GoldPill.tsx          — pill de filtro dourado (ativo/inativo)
│   ├── RarityBadge.tsx       — badge de raridade com cor
│   ├── StatBox.tsx           — caixa de atributo (label + valor Cinzel)
│   ├── SubTab.tsx            — aba com underline dourado animado
│   ├── SearchInput.tsx       — input com ícone de busca à esquerda
│   ├── GoldSelect.tsx        — select estilizado com seta customizada
│   └── Modal.tsx             — overlay + animação pageopen
├── cards/
│   ├── SelectionCard.tsx     — card de seleção (Classes/Raças/Ameaças)
│   └── ListCard.tsx          — row de lista (Magias/Equipamentos)
└── detail/
    ├── PortraitHero.tsx      — retrato com overlay gradiente + info
    ├── AbilityCard.tsx       — card de habilidade com ícone + level
    └── AvatarStatBlock.tsx   — bloco de stats do avatar de divindade
```

---

## Scrollbar Customizada

```css
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #0f0b13; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(#3a2c18, #241a12);
  border-radius: 6px;
  border: 2px solid #0f0b13;
}
::-webkit-scrollbar-thumb:hover { background: #4a3820; }
```

---

## Assets Incluídos

| Arquivo | Tipo | Uso |
|---------|------|-----|
| `Compêndio Mestre.dc.html` | Protótipo DC | Referência visual completa |
| `image-slot.js` | Web Component | Placeholder de imagem arrastável |
| `uploads/icons/ic*.png` | PNG 500×500 | Ícones via CSS mask |

---

## Notas para o Desenvolvedor

1. **Fontes:** Carregar via Google Fonts antes de qualquer render — usar `<link rel="preconnect">` para performance.

2. **CSS Mask para ícones:** Não usar `<img>` para os ícones PNG — usar a técnica de mask CSS que permite tingir com qualquer cor via `background-color`.

3. **Inline styles vs Tailwind:** O protótipo usa inline styles extensivamente. Na implementação, converter para classes Tailwind quando possível, mas manter os valores exatos de cor/sombra/gradiente — não substituir pelos tokens padrão do Tailwind.

4. **Image Slot:** O componente `image-slot.js` é um web component que o usuário pode usar para arrastar imagens de personagens. Na implementação React, pode ser substituído por um componente de upload/drag-drop customizado que persiste a imagem no localStorage ou backend.

5. **Animações:** `fadein` e `pageopen` devem ser definidas globalmente no CSS. Usar `@keyframes` no arquivo de estilos global.

6. **Performance:** Os dados (classes, magias, etc.) devem ser extraídos do protótipo para arquivos JSON separados e importados conforme necessário — não manter tudo no state inicial.

7. **ND Color Logic:** A cor de um ND é calculada progressivamente (1=verde, 2=ciano, 3=azul, 4-5=roxo, 6-7=laranja, 8+=vermelho). Implementar como função utilitária reutilizável.
