import { useState, useMemo } from 'react'
import distincoesData from '@/data/distincoes.json'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X } from 'lucide-react'

interface Distincao {
  id: string
  nome: string
  tipo: 'distinção' | 'rito'
  fonte: string
  resumo: string
  admissao?: string
  marcaDaDistincao?: string
  ritual?: string
  conexao?: string
  poderes: string[]
  itens?: { nome: string; descricao: string }[]
  poderConcedido?: { nome: string; descricao: string }
}

const data: Distincao[] = distincoesData as Distincao[]
const distincoes = data.filter(d => d.tipo === 'distinção')
const ritos = data.filter(d => d.tipo === 'rito')

const TIPO_OPTS = [
  { value: 'todos',    label: 'Distinções & Ritos' },
  { value: 'distinção', label: 'Distinções' },
  { value: 'rito',     label: 'Ritos' },
]

export default function Distincoes() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'distinção' | 'rito'>('todos')
  const [selecionado, setSelecionado] = useState<Distincao | null>(null)

  const filtrados = useMemo(() =>
    data.filter(d => {
      const matchTipo = filtro === 'todos' || d.tipo === filtro
      const matchBusca = !busca ||
        d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.resumo.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchBusca
    }), [busca, filtro])

  const filtradosDistincoes = filtrados.filter(d => d.tipo === 'distinção')
  const filtradosRitos = filtrados.filter(d => d.tipo === 'rito')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(200,155,60,0.18)', paddingBottom: 16 }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icMedal" size={26} color="#C89B3C" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 30, color: '#E4C16A', letterSpacing: 1 }}>
            Distinções & Ritos
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15 }}>
          {distincoes.length} distinções e {ritos.length} ritos de Mitos de Arton
        </p>
      </div>

      {/* Ritos: aviso */}
      {(filtro === 'todos' || filtro === 'rito') && (
        <div className="rounded-lg p-4" style={{ background: 'rgba(164,97,232,0.08)', border: '1px solid rgba(164,97,232,0.25)' }}>
          <p className="font-garamond text-sm" style={{ color: '#c2b596', lineHeight: 1.65 }}>
            <span className="font-cinzel text-xs uppercase tracking-wide" style={{ color: '#A461E8' }}>Ritos</span>
            {' '}são rituais que transformam o personagem em algo além do comum — lich, revenã, dragão, anjo. Seguem sempre três passos fixos e exigem conhecimento especial.
          </p>
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="icResearch" size={15} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar distinção ou rito..."
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
          value={filtro}
          onChange={e => setFiltro(e.target.value as typeof filtro)}
          options={TIPO_OPTS}
          className="w-44"
        />
        <span className="font-cinzel text-xs" style={{ color: '#6e6356' }}>{filtrados.length} resultado(s)</span>
      </div>

      {/* Distinções */}
      {filtradosDistincoes.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Icon name="icMedal" size={14} color="#C89B3C" />
            <span className="font-cinzel font-semibold text-sm" style={{ color: '#E4C16A' }}>Distinções</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(200,155,60,0.15)' }} />
            <span className="font-cinzel text-xs px-2 py-0.5 rounded" style={{ color: '#E4C16A', background: 'rgba(200,155,60,0.12)', border: '1px solid rgba(200,155,60,0.25)' }}>
              {filtradosDistincoes.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtradosDistincoes.map(d => <DistincaoCard key={d.id} item={d} onSelect={() => setSelecionado(d)} />)}
          </div>
        </section>
      )}

      {/* Ritos */}
      {filtradosRitos.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Icon name="icContemplative" size={14} color="#A461E8" />
            <span className="font-cinzel font-semibold text-sm" style={{ color: '#A461E8' }}>Ritos</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(164,97,232,0.15)' }} />
            <span className="font-cinzel text-xs px-2 py-0.5 rounded" style={{ color: '#A461E8', background: 'rgba(164,97,232,0.12)', border: '1px solid rgba(164,97,232,0.25)' }}>
              {filtradosRitos.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtradosRitos.map(d => <DistincaoCard key={d.id} item={d} onSelect={() => setSelecionado(d)} />)}
          </div>
        </section>
      )}

      {selecionado && <DistincaoModal item={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}

function DistincaoCard({ item, onSelect }: { item: Distincao; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isRito = item.tipo === 'rito'
  const accentColor = isRito ? '#A461E8' : '#E4C16A'
  const accentBg = isRito ? 'rgba(164,97,232,0.10)' : 'rgba(200,155,60,0.10)'
  const accentBorder = isRito ? 'rgba(164,97,232,0.25)' : 'rgba(200,155,60,0.25)'

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '14px 16px',
        background: hovered ? '#1e1624' : 'linear-gradient(180deg, #1a141e, #16111b)',
        border: `1px solid ${hovered ? accentColor : accentBorder}`,
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-cinzel font-semibold text-sm leading-tight" style={{ color: '#E8DFCF' }}>{item.nome}</span>
        <span className="font-cinzel text-[0.58rem] uppercase px-1.5 py-0.5 rounded flex-none" style={{ color: accentColor, background: accentBg, border: `1px solid ${accentBorder}` }}>
          {isRito ? 'Rito' : 'Distinção'}
        </span>
      </div>
      <p className="font-garamond text-xs leading-snug mb-3" style={{ color: '#8f8472', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.resumo}
      </p>
      {item.marcaDaDistincao && (
        <div className="rounded p-2 mb-2" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
          <p className="font-garamond text-xs" style={{ color: accentColor }}>
            {item.marcaDaDistincao.split(':')[0]}
          </p>
        </div>
      )}
      <p className="font-cinzel text-[0.6rem]" style={{ color: '#6e6356' }}>{item.poderes.length} poderes</p>
    </div>
  )
}

function DistincaoModal({ item, onClose }: { item: Distincao; onClose: () => void }) {
  const isRito = item.tipo === 'rito'
  const accentColor = isRito ? '#A461E8' : '#E4C16A'
  const accentBorder = isRito ? 'rgba(164,97,232,0.30)' : 'rgba(200,155,60,0.30)'
  const accentBg = isRito ? 'rgba(164,97,232,0.10)' : 'rgba(200,155,60,0.10)'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30)',
          border: `1px solid ${accentBorder}`,
        }}
      >
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: accentColor }}>
                {isRito ? 'Rito' : 'Distinção'} · {item.fonte}
              </span>
              <h2 className="font-cinzel font-bold text-xl mt-0.5" style={{ color: '#E8DFCF' }}>{item.nome}</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded flex-none" style={{ color: '#6e6356' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6e6356' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 h-px" style={{ background: `linear-gradient(90deg, ${accentColor}88, transparent)` }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 space-y-4">
          <p className="font-garamond leading-relaxed" style={{ fontSize: 15.5, color: '#cfc3aa', lineHeight: 1.72 }}>
            {item.resumo}
          </p>

          {(item.admissao || item.ritual) && (
            <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>
                {isRito ? 'Ritual' : 'Admissão'}
              </div>
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>
                {item.admissao || item.ritual}
              </p>
            </div>
          )}

          {item.marcaDaDistincao && (
            <div className="rounded-lg p-4" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Marca da Distinção
              </div>
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#E8DFCF' }}>
                {item.marcaDaDistincao}
              </p>
            </div>
          )}

          {item.poderes.length > 0 && (
            <div>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                Poderes da Distinção
              </div>
              <div className="space-y-2">
                {item.poderes.map((p, i) => {
                  const dashIdx = p.indexOf(' — ')
                  const nome = dashIdx > 0 ? p.slice(0, dashIdx) : `Poder ${i + 1}`
                  const desc = dashIdx > 0 ? p.slice(dashIdx + 3) : p
                  return (
                    <div key={i} className="rounded-lg p-3" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                      <div className="font-cinzel text-xs font-semibold mb-1" style={{ color: '#E8DFCF' }}>{nome}</div>
                      {desc && <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{desc}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {item.itens && item.itens.length > 0 && (
            <div>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#9a8e7c' }}>
                Itens Especiais
              </div>
              {item.itens.map((it, i) => (
                <div key={i} className="rounded-lg p-3 mb-2" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                  <div className="font-cinzel text-xs font-semibold mb-1" style={{ color: '#E4C16A' }}>{it.nome}</div>
                  <p className="font-garamond text-sm" style={{ color: '#a99c86' }}>{it.descricao}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
