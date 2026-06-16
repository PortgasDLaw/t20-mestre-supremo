import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import regrasData from '@/data/regrasOpcionais.json'

interface SubRegra {
  nome: string
  descricao: string
  prereq?: string
  preco?: string
}

interface RegraOpcional {
  id: string
  categoria: string
  nome: string
  fonte: string
  descricao: string
  conteudo?: SubRegra[]
  materiais?: SubRegra[]
  poderesFabricacao?: SubRegra[]
}

const regras: RegraOpcional[] = regrasData as RegraOpcional[]
const categorias = [...new Set(regras.map(r => r.categoria))]

const catColor: Record<string, 'gold' | 'blue' | 'green' | 'gray' | 'purple' | 'blood'> = {
  'Poderes Revisados': 'gold',
  'Efeitos Novos de Poderes': 'purple',
  'Autoridades Feudais': 'blue',
  'Fabricação Avançada': 'green',
  'Miscêlania': 'gray',
}

function SubRegrasList({ items, title }: { items: SubRegra[], title?: string }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? items : items.slice(0, 4)
  return (
    <div>
      {title && <p className="text-parchment-dark text-xs font-cinzel mb-2">{title}</p>}
      <div className="space-y-2">
        {shown.map((sub, i) => (
          <div key={i} className="bg-grimoire-900 rounded p-2 border border-grimoire-700">
            <div className="flex items-start gap-2">
              <span className="text-gold font-cinzel text-xs mt-0.5">•</span>
              <div>
                <span className="font-cinzel text-parchment text-xs font-semibold">{sub.nome}</span>
                {sub.prereq && <span className="text-parchment-dark text-xs font-crimson ml-2 italic">Pré-req: {sub.prereq}</span>}
                {sub.preco && <span className="text-gold text-xs font-crimson ml-2">{sub.preco}</span>}
                <p className="font-crimson text-parchment-dark text-xs mt-0.5">{sub.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 4 && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-xs text-parchment-muted hover:text-gold font-cinzel transition-colors">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Ver menos' : `Ver mais ${items.length - 4} itens`}
        </button>
      )}
    </div>
  )
}

export default function RegrasOpcionais() {
  const [busca, setBusca] = useState('')
  const [filtrocat, setFiltrocat] = useState<string>('todas')
  const [selecionado, setSelecionado] = useState<RegraOpcional | null>(null)

  const filtradas = useMemo(() => {
    const q = busca.toLowerCase()
    return regras.filter(r => {
      const matchCat = filtrocat === 'todas' || r.categoria === filtrocat
      const matchBusca = !q || r.nome.toLowerCase().includes(q) ||
        r.descricao.toLowerCase().includes(q) ||
        r.categoria.toLowerCase().includes(q) ||
        (r.conteudo || []).some(s => s.nome.toLowerCase().includes(q) || s.descricao.toLowerCase().includes(q))
      return matchCat && matchBusca
    })
  }, [busca, filtrocat])

  const grupos = useMemo(() => {
    const g: Record<string, RegraOpcional[]> = {}
    filtradas.forEach(r => {
      if (!g[r.categoria]) g[r.categoria] = []
      g[r.categoria].push(r)
    })
    return g
  }, [filtradas])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Regras Opcionais</h1>
        <p className="font-crimson text-parchment-muted mt-1">Regras alternativas e expansões de Mitos de Arton — use a critério do mestre</p>
      </div>

      <div className="bg-grimoire-800 border border-grimoire-600 rounded-lg p-3">
        <p className="font-crimson text-parchment-muted text-sm italic">
          "Estas regras são opcionais por poderem desbalancear seu jogo. Use por sua própria conta."
        </p>
      </div>

      <div className="space-y-3">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar regras opcionais..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setFiltrocat('todas')}
            className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtrocat === 'todas' ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
            Todas
          </button>
          {categorias.map(cat => (
            <button key={cat} onClick={() => setFiltrocat(cat)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtrocat === cat ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grupos).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={catColor[cat] || 'gray'}>{cat}</Badge>
              <span className="text-parchment-dark text-xs font-crimson">({items.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map(r => (
                <Card key={r.id} onClick={() => setSelecionado(r)}>
                  <h3 className="font-cinzel font-semibold text-parchment text-sm mb-2">{r.nome}</h3>
                  <p className="font-crimson text-parchment-dark text-xs line-clamp-3">{r.descricao}</p>
                  {r.conteudo && r.conteudo.length > 0 && (
                    <p className="text-parchment-dark text-xs font-crimson mt-2 italic">{r.conteudo.length} opções</p>
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
            <div className="flex gap-2">
              <Badge variant={catColor[selecionado.categoria] || 'gray'}>{selecionado.categoria}</Badge>
              <Badge variant="gray">Mitos de Arton</Badge>
            </div>

            <p className="font-crimson text-parchment text-sm">{selecionado.descricao}</p>

            {selecionado.conteudo && selecionado.conteudo.length > 0 && (
              <SubRegrasList items={selecionado.conteudo} title="Opções / Sub-regras" />
            )}

            {selecionado.materiais && selecionado.materiais.length > 0 && (
              <SubRegrasList items={selecionado.materiais} title="Materiais" />
            )}

            {selecionado.poderesFabricacao && selecionado.poderesFabricacao.length > 0 && (
              <SubRegrasList items={selecionado.poderesFabricacao} title="Poderes de Fabricação" />
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
