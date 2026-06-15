import { useState, useMemo } from 'react'
import magiasData from '../data/magias.json'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Select } from '../components/ui/Input'
import { Search, Sparkles, Zap } from 'lucide-react'
import type { Magia } from '../types'

const magias: Magia[] = magiasData as Magia[]

const escolas = ['Todas', ...Array.from(new Set(magias.map(m => m.escola)))]
const circulos = ['Todos', '1', '2', '3', '4', '5']

export default function Magias() {
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState<'todos' | 'arcana' | 'divina'>('todos')
  const [escola, setEscola] = useState('Todas')
  const [circulo, setCirculo] = useState('Todos')
  const [selecionada, setSelecionada] = useState<Magia | null>(null)

  const filtradas = useMemo(() =>
    magias.filter(m => {
      const matchTipo = tipo === 'todos' || m.tipo === tipo
      const matchEscola = escola === 'Todas' || m.escola === escola
      const matchCirculo = circulo === 'Todos' || String(m.circulo) === circulo
      const matchBusca = !busca || m.nome.toLowerCase().includes(busca.toLowerCase()) || m.descricao.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchEscola && matchCirculo && matchBusca
    }), [busca, tipo, escola, circulo])

  const porCirculo = useMemo(() => {
    const groups: Record<number, Magia[]> = {}
    filtradas.forEach(m => {
      if (!groups[m.circulo]) groups[m.circulo] = []
      groups[m.circulo].push(m)
    })
    return Object.entries(groups).sort(([a], [b]) => Number(a) - Number(b))
  }, [filtradas])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Magias</h1>
        <p className="font-crimson text-parchment-muted mt-1">Arcanas e divinas — clique para ver todos os detalhes</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-end">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar magia..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <div className="flex gap-1">
          {(['todos', 'arcana', 'divina'] as const).map(t => (
            <button key={t} onClick={() => setTipo(t)}
              className={`px-3 py-1.5 text-xs font-cinzel rounded border transition-colors ${tipo === t ? (t === 'arcana' ? 'bg-purple-700 border-purple-600 text-white' : t === 'divina' ? 'bg-gold text-abyss-950 border-gold' : 'bg-grimoire-600 border-grimoire-500 text-parchment') : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {t === 'todos' ? 'Todas' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <Select value={escola} onChange={e => setEscola(e.target.value)} options={escolas.map(e => ({ value: e, label: e }))} className="max-w-40" />
        <Select value={circulo} onChange={e => setCirculo(e.target.value)} options={circulos.map(c => ({ value: c, label: c === 'Todos' ? 'Todos os Círculos' : `${c}º Círculo` }))} className="max-w-48" />
      </div>

      <p className="text-parchment-dark text-xs font-crimson">{filtradas.length} magia(s) encontrada(s)</p>

      {/* Listagem por círculo */}
      <div className="space-y-6">
        {porCirculo.map(([circ, lista]) => (
          <div key={circ}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-grimoire-700 border border-gold-800 flex items-center justify-center">
                <span className="font-cinzel font-bold text-gold text-sm">{circ}</span>
              </div>
              <h2 className="font-cinzel font-semibold text-parchment">{circ}º Círculo</h2>
              <div className="flex-1 h-px bg-grimoire-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {lista.map(magia => (
                <div key={magia.id} onClick={() => setSelecionada(magia)}
                  className="bg-abyss-800 border border-grimoire-600 rounded-lg p-3 cursor-pointer hover:border-gold-700 hover:shadow-gold-sm transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-cinzel font-semibold text-parchment text-sm">{magia.nome}</h3>
                    <Badge variant={magia.tipo === 'arcana' ? 'purple' : 'gold'}>
                      {magia.tipo}
                    </Badge>
                  </div>
                  <p className="text-parchment-dark text-xs mb-2">{magia.escola}</p>
                  <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                    <span className="text-parchment-muted">PM: <span className="text-gold font-semibold">{magia.pm}</span></span>
                    <span className="text-parchment-muted">Exec: <span className="text-parchment">{magia.execucao}</span></span>
                    <span className="text-parchment-muted">Alcance: <span className="text-parchment">{magia.alcance}</span></span>
                    <span className="text-parchment-muted">Duração: <span className="text-parchment">{magia.duracao}</span></span>
                  </div>
                  <p className="text-parchment-muted font-crimson text-xs line-clamp-2">{magia.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selecionada && (
        <Modal open={!!selecionada} onClose={() => setSelecionada(null)} title={selecionada.nome} size="lg">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge variant={selecionada.tipo === 'arcana' ? 'purple' : 'gold'}>{selecionada.tipo}</Badge>
              <Badge variant="gray">{selecionada.escola}</Badge>
              <Badge variant="blue">{selecionada.circulo}º Círculo</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Custo de PM', value: `${selecionada.pm} PM`, highlight: true },
                { label: 'Execução', value: selecionada.execucao },
                { label: 'Alcance', value: selecionada.alcance },
                { label: 'Duração', value: selecionada.duracao },
                { label: 'Área / Alvo', value: selecionada.area },
                { label: 'Resistência', value: selecionada.resistencia },
              ].map(({ label, value, highlight }) => (
                <div key={label} className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">{label}</p>
                  <p className={`font-crimson text-sm ${highlight ? 'text-gold font-semibold' : 'text-parchment'}`}>{value}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-cinzel text-gold text-sm mb-2">Descrição</h4>
              <p className="font-crimson text-parchment text-sm leading-relaxed">{selecionada.descricao}</p>
            </div>

            {selecionada.aprimoramentos.length > 0 && (
              <div>
                <h4 className="font-cinzel text-purple-400 text-sm mb-2 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Aprimoramentos
                </h4>
                <ul className="space-y-1.5">
                  {selecionada.aprimoramentos.map((ap, i) => (
                    <li key={i} className="flex gap-2 text-sm font-crimson text-parchment">
                      <span className="text-purple-400 flex-shrink-0">+</span> {ap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
