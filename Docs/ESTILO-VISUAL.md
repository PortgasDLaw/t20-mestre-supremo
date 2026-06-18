# Guia de Estilo Visual — T20 Mestre Supremo

Toda a aparência do app é **centralizada** para facilitar mudanças de paleta/design no futuro.
Para mudar o visual, edite **somente** os arquivos abaixo — as páginas não têm estilo "hardcoded".

## Onde mudar o quê

| Quero mudar...                          | Edite                                                |
| --------------------------------------- | ---------------------------------------------------- |
| **Cores** (paleta inteira)              | `tailwind.config.js` → `theme.extend.colors`         |
| **Fontes**                              | `tailwind.config.js` → `fontFamily` + `index.css`    |
| **Texturas, sombras, animações**        | `tailwind.config.js` (`backgroundImage`, `boxShadow`, `animation`) |
| **Moldura ornamentada / cantos / chips**| `src/components/ui/Ornate.tsx`                       |
| **Layout do detalhe (hero/abas/sidebar)** | `src/components/ui/EntityDetail.tsx`               |
| **Janelas modais**                      | `src/components/ui/Modal.tsx`                        |
| **Mapa de cores por "accent"**          | `src/components/ui/Ornate.tsx` → `accentClasses`     |

## Conceito de "accent"

Cada detalhe/modal recebe um `accent` (`gold` | `purple` | `blue` | `blood`) que define
a cor da moldura, texto e bordas. Trocar o mapa `accentClasses` em `Ornate.tsx` reestiliza
todos os accents de uma vez.

## Como uma página usa o sistema

Páginas com retrato (Raças, Classes) montam um detalhe rico **só passando dados** para
`EntityDetail` — nenhuma aparência é definida na página:

```tsx
<EntityDetail
  breadcrumbRoot="Raças"
  onBack={...}
  accent="gold"
  title={raca.nome}
  image={raca.imagem}
  badges={...}
  subtitle={...}
  hero={...}            // bloco-destaque (ex: atributos)
  tabs={[...]}          // abas com conteúdo
  sidebar={[...]}       // seções de características/chips
/>
```

Páginas mais simples (Magias, Condições, Equipamentos, etc.) usam o `Modal` compartilhado,
que herda automaticamente a moldura ornamentada.

## Primitivos reutilizáveis (`Ornate.tsx`)

- `OrnatePanel` — painel com flourishes nos cantos + textura gótica.
- `OrnateDivider` — divisória com losango ◆.
- `AttributeChip` — chip de modificador (+1 / DES +2; negativos em vermelho-sangue).
- `StatBox` — linha rótulo/valor para sidebars.
