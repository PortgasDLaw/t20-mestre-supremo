import { useState, useMemo } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X } from 'lucide-react'
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
const todasDivindades = ['Todos', ...[...new Set(poderes.flatMap(p => p.divindade))].sort()]

export default function PoderesConcedidos() {
  const [busca, setBusca] = useState('')
  const [filtroDivindade, setFiltroDivindade] = useState('Todos')
  const [selecionado, setSelecionado] = useState<PoderConcedido | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase()
    return poderes.filter(p => {
      const matchDiv = filtroDivindade === 'Todos' || p.divindade.includes(filtroDivindade)
      const matchBusca = !q ||
        p.nome.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        p.divindade.some(d => d.toLowerCase().includes(q)) ||
        (p.prereq || '').toLowerCase().includes(q)
      return matchDiv && matchBusca
    })
  }, [busca, filtroDivindade])

  const grupos = useMemo(() => {
    if (filtroDivindade !== 'Todos') return null
    const g: Record<string, PoderConcedido[]> = {}
    filtrados.forEach(p => {
      const div = p.divindade[0]
      if (!g[div]) g[div] = []
      g[div].push(p)
    })
    return g
  }, [filtrados, filtroDivindade])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(200,155,60,0.18)', paddingBottom: 16 }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icWillpower" size={26} color="#C89B3C" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 30, color: '#E4C16A', letterSpacing: 1 }}>
            Poderes Concedidos
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15 }}>
          {poderes.length} poderes divinos — clique para ver detalhes e pré-requisitos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="icResearch" size={15} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar poderes..."
            style={{
              width: '100%',
              background: '#15101a',
              border: '1px solid rgba(200,155,60,0.20)',
              borderRadius: 6,
              padding: '7px 12px 7px 34px',
              color: '#E8DFCF',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 14,
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
          />
        </div>
        <Select
          value={filtroDivindade}
          onChange={e => setFiltroDivindade(e.target.value)}
          options={todasDivindades.map(d => ({ value: d, label: d === 'Todos' ? 'Todas as Divindades' : d }))}
          className="w-52"
        />
        <span className="font-cinzel text-xs" style={{ color: '#6e6356' }}>{filtrados.length} poder(es)</span>
      </div>

      {/* Lista agrupada por divindade */}
      <div className="space-y-8">
        {grupos ? (
          Object.entries(grupos).sort(([a], [b]) => a.localeCompare(b)).map(([div, items]) => (
            <div key={div}>
              <div className="flex items-center gap-3 mb-3">
                <Icon name="icWillpower" size={14} color="#C89B3C" />
                <span className="font-cinzel font-semibold text-sm" style={{ color: '#E4C16A' }}>{div}</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(200,155,60,0.15)' }} />
                <span className="font-cinzel text-xs" style={{ color: '#6e6356' }}>{items.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(p => <PoderCard key={p.id} poder={p} onClick={() => setSelecionado(p)} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtrados.map(p => <PoderCard key={p.id} poder={p} onClick={() => setSelecionado(p)} />)}
          </div>
        )}
      </div>

      {selecionado && <PoderModal poder={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}

function PoderCard({ poder, onClick }: { poder: PoderConcedido; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '12px 14px',
        background: hovered ? '#1e1624' : 'linear-gradient(180deg, #1a141e, #16111b)',
        border: `1px solid rgba(200,155,60,${hovered ? '0.45' : '0.18'})`,
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="font-cinzel font-semibold text-sm mb-1" style={{ color: '#E8DFCF' }}>{poder.nome}</div>
      {poder.divindade.length > 1 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {poder.divindade.map(d => (
            <span key={d} className="font-cinzel text-[0.58rem] px-1.5 py-0.5 rounded" style={{ color: '#E4C16A', background: 'rgba(200,155,60,0.12)', border: '1px solid rgba(200,155,60,0.25)' }}>
              {d}
            </span>
          ))}
        </div>
      )}
      {poder.prereq && (
        <p className="font-garamond text-xs italic mb-1" style={{ color: '#6e6356' }}>Pré-req: {poder.prereq}</p>
      )}
      <p className="font-garamond text-xs leading-snug" style={{ color: '#8f8472', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {poder.descricao}
      </p>
    </div>
  )
}

function PoderModal({ poder, onClose }: { poder: PoderConcedido; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30)',
          border: '1px solid rgba(200,155,60,0.28)',
        }}
      >
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {poder.divindade.map(d => (
                  <span key={d} className="font-cinzel text-[0.65rem] uppercase tracking-wide px-2 py-0.5 rounded" style={{ color: '#E4C16A', background: 'rgba(200,155,60,0.12)', border: '1px solid rgba(200,155,60,0.30)' }}>
                    {d}
                  </span>
                ))}
              </div>
              <h2 className="font-cinzel font-bold text-xl" style={{ color: '#E8DFCF' }}>{poder.nome}</h2>
            </div>
            <button onClick={onClose} className="flex-none w-8 h-8 flex items-center justify-center rounded" style={{ color: '#6e6356' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6e6356' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 h-px" style={{ background: 'linear-gradient(90deg, rgba(200,155,60,0.5), transparent)' }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 space-y-4">
          {poder.prereq && (
            <div className="rounded-lg p-3" style={{ background: 'rgba(200,155,60,0.08)', border: '1px solid rgba(200,155,60,0.20)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-1" style={{ color: '#9a8e7c' }}>Pré-requisito</div>
              <p className="font-garamond text-sm italic" style={{ color: '#c2b596' }}>{poder.prereq}</p>
            </div>
          )}
          <p className="font-garamond leading-relaxed" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.72 }}>
            {poder.descricao}
          </p>
          <p className="font-cinzel text-xs" style={{ color: '#6e6356' }}>Fonte: {poder.fonte}</p>
        </div>
      </div>
    </div>
  )
}
