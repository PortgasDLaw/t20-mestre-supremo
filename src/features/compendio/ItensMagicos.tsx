import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Search, Sword, Shield, Sparkles, Star, BookOpen, Crown } from 'lucide-react'
import data from '@/data/itensMagicos.json'

type Categoria = 'todos' | 'encantosArmas' | 'armasEspecificas' | 'armaduras' | 'esotericos' | 'acessorios' | 'liturgicos' | 'artefatos'

interface ItemMagico {
  id: string
  nome: string
  categoria?: string
  preco?: string
  divindade?: string
  prereq?: string
  descricao: string
  fonte: string
  tipo?: string
  poderes?: string
  requisitos?: string
  especial?: string
  modificadores?: string
  custo?: string
  virtudes?: Record<string, string>
  poder_unido?: string
  destruicao?: string
}

const categoriaLabel: Record<Categoria, string> = {
  todos: 'Todos',
  encantosArmas: 'Encantos p/ Armas',
  armasEspecificas: 'Armas Específicas',
  armaduras: 'Armaduras & Escudos',
  esotericos: 'Esotéricos',
  acessorios: 'Acessórios',
  liturgicos: 'Itens Litúrgicos',
  artefatos: 'Artefatos',
}

const categoriaIcon: Record<Categoria, React.ReactNode> = {
  todos: null,
  encantosArmas: <Sword className="w-4 h-4" />,
  armasEspecificas: <Sword className="w-4 h-4" />,
  armaduras: <Shield className="w-4 h-4" />,
  esotericos: <Sparkles className="w-4 h-4" />,
  acessorios: <Star className="w-4 h-4" />,
  liturgicos: <BookOpen className="w-4 h-4" />,
  artefatos: <Crown className="w-4 h-4" />,
}

function buildAllItems(): (ItemMagico & { _cat: Categoria })[] {
  const all: (ItemMagico & { _cat: Categoria })[] = []
  const d = data as any
  ;(d.encantosArmas || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'encantosArmas' }))
  ;(d.armasEspecificas || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'armasEspecificas' }))
  ;(d.encantosArmaduras || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'armaduras' }))
  ;(d.armadurasEspecificas || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'armaduras' }))
  ;(d.escudosEspecificos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'armaduras' }))
  ;(d.encantosEsotericos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'esotericos' }))
  ;(d.esoteriosEspecificos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'esotericos' }))
  ;(d.encantosAcessorios || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'acessorios' }))
  ;(d.acessoriosEspecificos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'acessorios' }))
  ;(d.itensLiturgicos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'liturgicos' }))
  ;(d.liturgiaDosRaidos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'liturgicos' }))
  ;(d.artefatos || []).forEach((i: ItemMagico) => all.push({ ...i, _cat: 'artefatos' }))
  return all
}

const allItems = buildAllItems()

function badgeVariant(cat: Categoria): 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple' {
  if (cat === 'artefatos') return 'gold'
  if (cat === 'liturgicos') return 'blue'
  if (cat === 'armaduras') return 'gray'
  if (cat === 'esotericos') return 'purple'
  if (cat === 'acessorios') return 'green'
  return 'blood'
}

export default function ItensMagicos() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<Categoria>('todos')
  const [selecionado, setSelecionado] = useState<(ItemMagico & { _cat: Categoria }) | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase()
    return allItems.filter(item => {
      const matchCat = filtro === 'todos' || item._cat === filtro
      const matchBusca = !q || item.nome.toLowerCase().includes(q) ||
        item.descricao.toLowerCase().includes(q) ||
        (item.divindade || '').toLowerCase().includes(q) ||
        (item.prereq || '').toLowerCase().includes(q)
      return matchCat && matchBusca
    })
  }, [busca, filtro])

  const grupos = useMemo(() => {
    const g: Partial<Record<Categoria, typeof filtrados>> = {}
    filtrados.forEach(item => {
      if (!g[item._cat]) g[item._cat] = []
      g[item._cat]!.push(item)
    })
    return g
  }, [filtrados])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Itens Mágicos</h1>
        <p className="font-crimson text-parchment-muted mt-1">Encantos, armas específicas, itens litúrgicos e artefatos de Mitos de Arton</p>
      </div>

      <div className="space-y-3">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar itens mágicos..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="flex gap-1 flex-wrap">
          {(Object.keys(categoriaLabel) as Categoria[]).map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtro === cat ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {categoriaLabel[cat]}
            </button>
          ))}
        </div>
        <p className="text-parchment-dark text-xs font-crimson">{filtrados.length} item(s)</p>
      </div>

      <div className="space-y-6">
        {(Object.entries(grupos) as [Categoria, typeof filtrados][]).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              {categoriaIcon[cat]}
              <h2 className="font-cinzel font-semibold text-sm text-parchment">{categoriaLabel[cat]}</h2>
              <span className="text-parchment-dark text-xs font-crimson">({items.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(item => (
                <Card key={item.id} onClick={() => setSelecionado(item)}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-cinzel font-semibold text-parchment text-sm leading-tight">{item.nome}</h3>
                    <Badge variant={badgeVariant(item._cat)}>
                      {item.categoria || (item._cat === 'artefatos' ? 'Artefato' : item.tipo || categoriaLabel[cat])}
                    </Badge>
                  </div>
                  {item.divindade && (
                    <p className="text-xs text-gold font-crimson mb-1">Divindade: {item.divindade}</p>
                  )}
                  {item.preco && (
                    <p className="text-xs text-parchment-muted font-crimson mb-1">{item.preco}</p>
                  )}
                  <p className="font-crimson text-parchment-dark text-xs line-clamp-3">{item.descricao}</p>
                  {item.prereq && (
                    <p className="text-xs text-parchment-dark font-crimson mt-1 italic">Pré-req: {item.prereq}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={badgeVariant(selecionado._cat)}>{categoriaLabel[selecionado._cat]}</Badge>
              {selecionado.categoria && <Badge variant="gray">{selecionado.categoria}</Badge>}
              {selecionado.divindade && <Badge variant="gold">{selecionado.divindade}</Badge>}
              {selecionado.tipo && <Badge variant="blue">{selecionado.tipo}</Badge>}
            </div>

            {selecionado.preco && (
              <div className="bg-grimoire-800 rounded p-2 inline-block">
                <span className="text-gold font-cinzel text-sm">{selecionado.preco}</span>
              </div>
            )}

            <div>
              <p className="text-parchment-dark text-xs font-cinzel mb-1">DESCRIÇÃO</p>
              <p className="font-crimson text-parchment text-sm">{selecionado.descricao}</p>
            </div>

            {selecionado.prereq && (
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark text-xs font-cinzel mb-1">PRÉ-REQUISITO</p>
                <p className="font-crimson text-parchment text-sm italic">{selecionado.prereq}</p>
              </div>
            )}

            {selecionado.requisitos && (
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark text-xs font-cinzel mb-1">REQUISITOS PARA EMPUNHAR</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.requisitos}</p>
              </div>
            )}

            {selecionado.poderes && (
              <div>
                <p className="text-gold font-cinzel text-xs mb-1">PODERES</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.poderes}</p>
              </div>
            )}

            {selecionado.modificadores && (
              <div>
                <p className="text-gold font-cinzel text-xs mb-1">MODIFICADORES</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.modificadores}</p>
              </div>
            )}

            {selecionado.custo && (
              <div className="bg-blood-950 border border-blood-800 rounded p-2">
                <p className="text-blood-light font-cinzel text-xs mb-1">CUSTO / MALDIÇÃO</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.custo}</p>
              </div>
            )}

            {selecionado.especial && (
              <div>
                <p className="text-purple-400 font-cinzel text-xs mb-1">ESPECIAL</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.especial}</p>
              </div>
            )}

            {selecionado.destruicao && (
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-blood-light font-cinzel text-xs mb-1">COMO DESTRUIR</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.destruicao}</p>
              </div>
            )}

            {selecionado.virtudes && (
              <div>
                <p className="text-gold font-cinzel text-xs mb-2">VIRTUDES INDIVIDUAIS</p>
                <div className="space-y-2">
                  {Object.entries(selecionado.virtudes).map(([nome, desc]) => (
                    <div key={nome} className="bg-grimoire-800 rounded p-2">
                      <p className="font-cinzel text-xs text-gold capitalize mb-1">{nome}</p>
                      <p className="font-crimson text-parchment text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selecionado.poder_unido && (
              <div className="bg-gold bg-opacity-10 border border-gold rounded p-2">
                <p className="text-gold font-cinzel text-xs mb-1">PODER UNIDO</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.poder_unido}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
