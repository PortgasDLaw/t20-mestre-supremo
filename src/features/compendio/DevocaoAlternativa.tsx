import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Search, Shield, Leaf, Zap, Star, BookOpen } from 'lucide-react'
import data from '@/data/devocoesAlternativas.json'

type ItemType = 'glorienn' | 'druida' | 'paladino' | 'vingador' | 'devocao'

interface SubPoder {
  nome: string
  descricao: string
}

interface DevItem {
  id: string
  _type: ItemType
  nome: string
  divindade?: string
  titulo?: string
  descricao: string
  brando?: string
  fundamentalista?: string
  indumentaria?: string
  poderesConcedidos?: SubPoder[]
  habilidadeEspecial?: { nome: string; descricao: string; rodaExterna?: string[]; rodaInterna?: string[] }
  autoridadeEclesiastica?: string
  motivacoes?: string
  relacoes?: string
  crenças?: string
  outrosNomes?: string[]
  areasInfluencia?: string[]
  obrigacoesRestricoes?: string
}

function buildAll(): DevItem[] {
  const all: DevItem[] = []
  const d = data as any

  if (d.glorienn) {
    all.push({
      ...d.glorienn,
      _type: 'glorienn',
      nome: d.glorienn.nome,
      titulo: d.glorienn.epiteto,
      divindade: d.glorienn.nome,
    })
  }

  ;(d.novosDruidas || []).forEach((item: any) => {
    all.push({
      ...item,
      _type: 'druida' as ItemType,
      nome: item.titulo || `Druida de ${item.divindade}`,
    })
  })

  ;(d.novosPaladinos || []).forEach((item: any) => {
    all.push({
      ...item,
      _type: 'paladino' as ItemType,
      nome: item.titulo || `Paladino de ${item.divindade}`,
    })
  })

  ;(d.novosVingadores || []).forEach((item: any) => {
    all.push({
      ...item,
      _type: 'vingador' as ItemType,
      nome: item.titulo || `Vingador de ${item.divindade}`,
    })
  })

  ;(d.devocoesAlternativas || []).forEach((item: any) => {
    all.push({
      ...item,
      _type: 'devocao' as ItemType,
      nome: `Devoção Alternativa: ${item.divindade}`,
    })
  })

  return all
}

const allItems = buildAll()

const typeLabel: Record<ItemType, string> = {
  glorienn: 'Glórienn',
  druida: 'Novos Druidas',
  paladino: 'Novos Paladinos',
  vingador: 'Novos Vingadores',
  devocao: 'Devoções Alternativas',
}

const typeVariant: Record<ItemType, 'gold' | 'green' | 'blue' | 'blood' | 'purple'> = {
  glorienn: 'gold',
  druida: 'green',
  paladino: 'blue',
  vingador: 'blood',
  devocao: 'purple',
}

const typeIcon: Record<ItemType, React.ReactNode> = {
  glorienn: <Star className="w-4 h-4" />,
  druida: <Leaf className="w-4 h-4" />,
  paladino: <Shield className="w-4 h-4" />,
  vingador: <Zap className="w-4 h-4" />,
  devocao: <BookOpen className="w-4 h-4" />,
}

export default function DevocaoAlternativa() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<ItemType | 'todos'>('todos')
  const [selecionado, setSelecionado] = useState<DevItem | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase()
    return allItems.filter(item => {
      const matchType = filtro === 'todos' || item._type === filtro
      const matchBusca = !q ||
        item.nome.toLowerCase().includes(q) ||
        item.descricao.toLowerCase().includes(q) ||
        (item.divindade || '').toLowerCase().includes(q) ||
        (item.titulo || '').toLowerCase().includes(q)
      return matchType && matchBusca
    })
  }, [busca, filtro])

  const grupos = useMemo(() => {
    const g: Partial<Record<ItemType, DevItem[]>> = {}
    filtrados.forEach(item => {
      if (!g[item._type]) g[item._type] = []
      g[item._type]!.push(item)
    })
    return g
  }, [filtrados])

  const tipos: ItemType[] = ['glorienn', 'druida', 'paladino', 'vingador', 'devocao']

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Deuses & Devotos</h1>
        <p className="font-crimson text-parchment-muted mt-1">Novos druidas, paladinos, vingadores, Glórienn e devoções alternativas de Mitos de Arton</p>
      </div>

      <div className="space-y-3">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar devotos e devoções..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setFiltro('todos')}
            className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtro === 'todos' ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
            Todos
          </button>
          {tipos.map(t => (
            <button key={t} onClick={() => setFiltro(t)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtro === t ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {typeLabel[t]}
            </button>
          ))}
        </div>
        <p className="text-parchment-dark text-xs font-crimson">{filtrados.length} resultado(s)</p>
      </div>

      <div className="space-y-6">
        {tipos.filter(t => grupos[t]?.length).map(t => (
          <div key={t}>
            <div className="flex items-center gap-2 mb-3">
              {typeIcon[t]}
              <h2 className="font-cinzel font-semibold text-sm text-parchment">{typeLabel[t]}</h2>
              <span className="text-parchment-dark text-xs font-crimson">({grupos[t]!.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {grupos[t]!.map(item => (
                <Card key={item.id} onClick={() => setSelecionado(item)}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-cinzel font-semibold text-parchment text-sm leading-tight">{item.titulo || item.nome}</h3>
                    <Badge variant={typeVariant[item._type]}>{typeLabel[item._type]}</Badge>
                  </div>
                  {item.divindade && item._type !== 'glorienn' && (
                    <p className="text-xs text-gold font-crimson mb-1">Divindade: {item.divindade}</p>
                  )}
                  <p className="font-crimson text-parchment-dark text-xs line-clamp-3">{item.descricao}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.titulo || selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={typeVariant[selecionado._type]}>{typeLabel[selecionado._type]}</Badge>
              {selecionado.divindade && selecionado._type !== 'glorienn' && (
                <Badge variant="gold">{selecionado.divindade}</Badge>
              )}
              <Badge variant="gray">Mitos de Arton</Badge>
            </div>

            {selecionado._type === 'glorienn' && (
              <>
                {selecionado.outrosNomes && selecionado.outrosNomes.length > 0 && (
                  <div className="bg-grimoire-800 rounded p-3">
                    <p className="text-parchment-dark text-xs font-cinzel mb-1">OUTROS NOMES</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {selecionado.outrosNomes.map((n, i) => (
                        <li key={i} className="font-crimson text-parchment text-xs">{n}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selecionado.areasInfluencia && (
                  <div>
                    <p className="text-parchment-dark text-xs font-cinzel mb-1">ÁREAS DE INFLUÊNCIA</p>
                    <p className="font-crimson text-parchment text-sm">{selecionado.areasInfluencia.join(', ')}</p>
                  </div>
                )}
                {selecionado.motivacoes && (
                  <div>
                    <p className="text-gold font-cinzel text-xs mb-1">MOTIVAÇÕES</p>
                    <p className="font-crimson text-parchment text-sm">{selecionado.motivacoes}</p>
                  </div>
                )}
                {selecionado.relacoes && (
                  <div>
                    <p className="text-gold font-cinzel text-xs mb-1">RELAÇÕES</p>
                    <p className="font-crimson text-parchment text-sm">{selecionado.relacoes}</p>
                  </div>
                )}
                {selecionado.autoridadeEclesiastica && (
                  <div className="bg-grimoire-800 rounded p-3">
                    <p className="text-parchment-dark text-xs font-cinzel mb-1">AUTORIDADE ECLESIÁSTICA</p>
                    <p className="font-crimson text-parchment text-sm">{selecionado.autoridadeEclesiastica}</p>
                  </div>
                )}
              </>
            )}

            <div>
              <p className="text-parchment-dark text-xs font-cinzel mb-1">DESCRIÇÃO</p>
              <p className="font-crimson text-parchment text-sm leading-relaxed">{selecionado.descricao}</p>
            </div>

            {selecionado.obrigacoesRestricoes && (
              <div className="bg-grimoire-800 rounded p-3">
                <p className="text-parchment-dark text-xs font-cinzel mb-1">OBRIGAÇÕES & RESTRIÇÕES</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.obrigacoesRestricoes}</p>
              </div>
            )}

            {selecionado.brando && (
              <div className="bg-grimoire-800 border border-grimoire-600 rounded p-3">
                <p className="text-gold font-cinzel text-xs mb-1">DEVOÇÃO BRANDA</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.brando}</p>
              </div>
            )}

            {selecionado.fundamentalista && (
              <div className="bg-blood-950 border border-blood-800 rounded p-3">
                <p className="text-blood-light font-cinzel text-xs mb-1">FUNDAMENTALISTA</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.fundamentalista}</p>
              </div>
            )}

            {selecionado.indumentaria && (
              <div>
                <p className="text-parchment-dark text-xs font-cinzel mb-1">INDUMENTÁRIA</p>
                <p className="font-crimson text-parchment text-sm italic">{selecionado.indumentaria}</p>
              </div>
            )}

            {selecionado.habilidadeEspecial && (
              <div className="bg-grimoire-800 rounded p-3 space-y-2">
                <p className="text-gold font-cinzel text-xs">{selecionado.habilidadeEspecial.nome}</p>
                <p className="font-crimson text-parchment text-sm">{selecionado.habilidadeEspecial.descricao}</p>
                {selecionado.habilidadeEspecial.rodaExterna && (
                  <div>
                    <p className="text-parchment-dark text-xs font-cinzel mb-1">RODA EXTERNA</p>
                    <ul className="space-y-1">
                      {selecionado.habilidadeEspecial.rodaExterna.map((r, i) => (
                        <li key={i} className="font-crimson text-parchment-dark text-xs">• {r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selecionado.habilidadeEspecial.rodaInterna && (
                  <div>
                    <p className="text-parchment-dark text-xs font-cinzel mb-1">RODA INTERNA</p>
                    <ul className="space-y-1">
                      {selecionado.habilidadeEspecial.rodaInterna.map((r, i) => (
                        <li key={i} className="font-crimson text-parchment-dark text-xs">• {r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selecionado.poderesConcedidos && selecionado.poderesConcedidos.length > 0 && (
              <div>
                <p className="text-gold font-cinzel text-xs mb-2">PODERES CONCEDIDOS</p>
                <div className="space-y-2">
                  {selecionado.poderesConcedidos.map((p, i) => (
                    <div key={i} className="bg-grimoire-800 rounded p-2">
                      <p className="font-cinzel text-xs text-gold mb-1">{p.nome}</p>
                      <p className="font-crimson text-parchment text-xs">{p.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
