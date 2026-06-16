import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Search, Zap } from 'lucide-react'
import poderesData from '@/data/poderesConcedidos.json'

interface PoderConcedido {
  id: string
  nome: string
  divindade: string[]
  fonte: string
  prereq?: string
  descricao: string
}

const poderes: PoderConcedido[] = poderesData as PoderConcedido[]

const todasDivindades = [...new Set(poderes.flatMap(p => p.divindade))].sort()

export default function PoderesConcedidos() {
  const [busca, setBusca] = useState('')
  const [filtroDivindade, setFiltroDivindade] = useState('todos')
  const [selecionado, setSelecionado] = useState<PoderConcedido | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase()
    return poderes.filter(p => {
      const matchDiv = filtroDivindade === 'todos' || p.divindade.includes(filtroDivindade)
      const matchBusca = !q ||
        p.nome.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        p.divindade.some(d => d.toLowerCase().includes(q)) ||
        (p.prereq || '').toLowerCase().includes(q)
      return matchDiv && matchBusca
    })
  }, [busca, filtroDivindade])

  const grupos = useMemo(() => {
    if (filtroDivindade !== 'todos') return null
    const g: Record<string, PoderConcedido[]> = {}
    filtrados.forEach(p => {
      const div = p.divindade[0]
      if (!g[div]) g[div] = []
      g[div].push(p)
    })
    return g
  }, [filtrados, filtroDivindade])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Poderes Concedidos</h1>
        <p className="font-crimson text-parchment-muted mt-1">Novos poderes divinos de Mitos de Arton — {poderes.length} poderes</p>
      </div>

      <div className="space-y-3">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar poderes concedidos..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <div className="flex gap-1 flex-wrap">
          <button onClick={() => setFiltroDivindade('todos')}
            className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtroDivindade === 'todos' ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
            Todos
          </button>
          {todasDivindades.map(div => (
            <button key={div} onClick={() => setFiltroDivindade(div)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtroDivindade === div ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {div}
            </button>
          ))}
        </div>
        <p className="text-parchment-dark text-xs font-crimson">{filtrados.length} poder(es)</p>
      </div>

      {grupos ? (
        <div className="space-y-6">
          {Object.entries(grupos).sort(([a], [b]) => a.localeCompare(b)).map(([div, items]) => (
            <div key={div}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-gold" />
                <h2 className="font-cinzel font-semibold text-sm text-parchment">{div}</h2>
                <span className="text-parchment-dark text-xs font-crimson">({items.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(p => (
                  <Card key={p.id} onClick={() => setSelecionado(p)}>
                    <h3 className="font-cinzel font-semibold text-parchment text-sm mb-1">{p.nome}</h3>
                    {p.divindade.length > 1 && (
                      <div className="flex gap-1 flex-wrap mb-1">
                        {p.divindade.map(d => <Badge key={d} variant="gold">{d}</Badge>)}
                      </div>
                    )}
                    {p.prereq && <p className="text-xs text-parchment-muted font-crimson italic mb-1">Pré-req: {p.prereq}</p>}
                    <p className="font-crimson text-parchment-dark text-xs line-clamp-3">{p.descricao}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtrados.map(p => (
            <Card key={p.id} onClick={() => setSelecionado(p)}>
              <h3 className="font-cinzel font-semibold text-parchment text-sm mb-1">{p.nome}</h3>
              <div className="flex gap-1 flex-wrap mb-1">
                {p.divindade.map(d => <Badge key={d} variant="gold">{d}</Badge>)}
              </div>
              {p.prereq && <p className="text-xs text-parchment-muted font-crimson italic mb-1">Pré-req: {p.prereq}</p>}
              <p className="font-crimson text-parchment-dark text-xs line-clamp-3">{p.descricao}</p>
            </Card>
          ))}
        </div>
      )}

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {selecionado.divindade.map(d => <Badge key={d} variant="gold">{d}</Badge>)}
              <Badge variant="blue">Mitos de Arton</Badge>
              <Badge variant="purple">Poder Concedido</Badge>
            </div>

            {selecionado.prereq && (
              <div className="bg-grimoire-800 border border-grimoire-600 rounded p-3">
                <p className="text-parchment-dark text-xs font-cinzel mb-1">PRÉ-REQUISITO</p>
                <p className="font-crimson text-parchment text-sm italic">{selecionado.prereq}</p>
              </div>
            )}

            <div>
              <p className="text-parchment-dark text-xs font-cinzel mb-1">DESCRIÇÃO</p>
              <p className="font-crimson text-parchment text-sm leading-relaxed">{selecionado.descricao}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
