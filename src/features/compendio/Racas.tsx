import { useState, useMemo } from 'react'
import racasData from '@/data/racas.json'
import { Icon } from '@/components/ui/Icon'
import { asset } from '@/lib/asset'
import { X } from 'lucide-react'

interface HabilidadeRaca {
  nome: string
  descricao: string
}

export interface Raca {
  id: string
  nome: string
  tipo: 'comum' | 'rara'
  imagem: string
  atributos: string
  descricao: string
  habilidades: HabilidadeRaca[]
  deus?: string
  tamanho?: string
  deslocamento?: string
  fonte?: string
}

const todasRacas: Raca[] = (racasData as any).racas || (racasData as any)

const RARIDADE_COR: Record<string, string> = {
  comum: '#8A93A6',
  rara:  '#A461E8',
}

function getIconeRaca(nome: string): string {
  const n = nome.toLowerCase()
  if (n === 'elfo') return 'icExplore'
  if (n === 'anão') return 'icTough'
  if (n === 'halfling') return 'icHonest'
  if (n === 'goblin') return 'icDanger'
  if (n === 'minotauro') return 'icStrenght'
  if (n === 'qareen') return 'icWillpower'
  if (n === 'dahllan') return 'icAbundant'
  if (n === 'lefou') return 'icBoring'
  return 'icFriend'
}

const TABS = ['Visão Geral', 'Habilidades', 'Lore'] as const
type Tab = typeof TABS[number]

type Filtro = 'todas' | 'comum' | 'rara'

export default function Racas() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [selecionada, setSelecionada] = useState<Raca | null>(null)
  const [aba, setAba] = useState<Tab>('Visão Geral')

  const filtradas = useMemo(() =>
    todasRacas.filter(r => {
      const matchTipo = filtro === 'todas' || r.tipo === filtro
      const matchBusca = !busca ||
        r.nome.toLowerCase().includes(busca.toLowerCase()) ||
        r.descricao.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchBusca
    }), [busca, filtro])

  const pills: { id: Filtro; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'comum', label: 'Comuns' },
    { id: 'rara',  label: 'Raras' },
  ]

  const gridCols = selecionada ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-none px-8 pt-7 pb-5"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.13)' }}
      >
        <h1
          className="font-cinzel font-bold"
          style={{ fontSize: 38, color: '#E4C16A', letterSpacing: 1, textShadow: '0 2px 18px rgba(200,155,60,0.18)' }}
        >
          Raças
        </h1>
        <p className="font-garamond mt-1" style={{ color: '#a99c86', fontSize: 15.5 }}>
          {todasRacas.length} raças de Arton — comuns e raras
        </p>
      </div>

      {/* Split Body */}
      <div className="flex flex-1 overflow-hidden gap-6 px-8 py-5">
        {/* LEFT */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ flex: selecionada ? '0 1 430px' : '1 1 auto' }}
        >
          {/* Busca */}
          <div className="mb-3 relative">
            <Icon name="icResearch" size={16} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar raça..."
              style={{
                width: '100%',
                background: '#15101a',
                border: '1px solid rgba(200,155,60,0.20)',
                borderRadius: 6,
                padding: '8px 12px 8px 36px',
                color: '#E8DFCF',
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 15,
                outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.55)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
            />
          </div>

          {/* Pills */}
          <div className="flex gap-2 mb-4">
            {pills.map(p => {
              const active = filtro === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setFiltro(p.id)}
                  className="px-4 py-1.5 rounded-full font-cinzel text-xs transition-all duration-150"
                  style={{
                    background: active ? 'linear-gradient(180deg,#d6a948,#b3852f)' : 'transparent',
                    color: active ? '#120d16' : '#9a8e7c',
                    border: `1px solid ${active ? 'transparent' : 'rgba(200,155,60,0.25)'}`,
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {p.label}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className={`grid ${gridCols} gap-3 overflow-y-auto scrollbar-thin pr-1`}>
            {filtradas.map(r => (
              <RacaCard
                key={r.id}
                raca={r}
                selected={selecionada?.id === r.id}
                compact={!!selecionada}
                onClick={() => { setSelecionada(r); setAba('Visão Geral') }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        {selecionada && (
          <div
            className="flex-1 min-w-[380px] flex flex-col overflow-hidden rounded-lg animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, #1a141e, #16111b)',
              border: '1px solid rgba(200,155,60,0.22)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Portrait */}
            <div className="relative h-[286px] flex-none overflow-hidden rounded-t-lg" style={{ background: '#0f0b13' }}>
              {selecionada.imagem && (
                <img
                  src={asset(selecionada.imagem)}
                  alt={selecionada.nome}
                  className="w-full h-full object-cover object-top"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,20,30,1) 0%, rgba(26,20,30,0.6) 45%, transparent 100%)' }}
              />
              <button
                onClick={() => setSelecionada(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded transition-colors z-10"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#a99c86' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a99c86' }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full flex-none"
                    style={{ background: RARIDADE_COR[selecionada.tipo] ?? '#8A93A6' }}
                  />
                  <span
                    className="font-cinzel text-[0.6rem] uppercase tracking-[2px]"
                    style={{ color: RARIDADE_COR[selecionada.tipo] ?? '#8A93A6' }}
                  >
                    {selecionada.tipo}
                  </span>
                </div>
                <div className="font-cinzel font-bold text-xl leading-tight" style={{ color: '#E8DFCF' }}>
                  {selecionada.nome}
                </div>
                {selecionada.deus && (
                  <div className="font-garamond text-sm mt-1" style={{ color: '#9a8e7c' }}>
                    Deus: {selecionada.deus}
                  </div>
                )}
              </div>
            </div>

            {/* Stat Boxes */}
            <div className="grid grid-cols-4 gap-0 flex-none" style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}>
              {[
                { label: 'Atributos', value: selecionada.atributos.replace('Você recebe ', '').replace('bônus de ', '') },
                { label: 'Habilidades', value: String(selecionada.habilidades.length) },
                { label: 'Tamanho', value: selecionada.tamanho || 'Médio' },
                { label: 'Deslocamento', value: selecionada.deslocamento || '9m' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-3 px-1"
                  style={{
                    background: '#120d16',
                    borderRight: i < 3 ? '1px solid rgba(200,155,60,0.10)' : 'none',
                  }}
                >
                  <span
                    className="font-cinzel font-bold text-sm leading-none text-center"
                    style={{ color: '#E4C16A' }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-cinzel text-[0.55rem] uppercase tracking-wider mt-1 text-center"
                    style={{ color: '#6e6356' }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-none" style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setAba(tab)}
                  className="relative px-4 py-2.5 font-cinzel text-xs tracking-wide transition-colors duration-150"
                  style={{ color: aba === tab ? '#F0E4C8' : '#857a68' }}
                >
                  {tab}
                  {aba === tab && (
                    <span
                      className="absolute left-0 right-0"
                      style={{
                        bottom: -1,
                        height: 2.5,
                        background: 'linear-gradient(90deg, #C89B3C, #E4C16A)',
                        boxShadow: '0 0 8px rgba(200,155,60,0.55)',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
              {aba === 'Visão Geral' && (
                <div className="space-y-4">
                  <p className="font-garamond leading-relaxed drop-cap" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.72 }}>
                    {selecionada.descricao}
                  </p>
                  <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                    <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>Bônus de Atributos</div>
                    <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{selecionada.atributos}</p>
                  </div>
                </div>
              )}
              {aba === 'Habilidades' && (
                <div className="space-y-3">
                  {selecionada.habilidades.map((h, i) => (
                    <div key={i} className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                      <div className="font-cinzel font-semibold text-sm mb-2" style={{ color: '#E8DFCF' }}>{h.nome}</div>
                      <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{h.descricao}</p>
                    </div>
                  ))}
                </div>
              )}
              {aba === 'Lore' && (
                <div className="space-y-4">
                  {selecionada.deus && (
                    <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                      <div className="font-cinzel text-xs uppercase tracking-widest mb-1" style={{ color: '#9a8e7c' }}>Divindade Patrona</div>
                      <p className="font-cinzel font-semibold text-sm" style={{ color: '#E4C16A' }}>{selecionada.deus}</p>
                    </div>
                  )}
                  {selecionada.fonte && (
                    <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                      <div className="font-cinzel text-xs uppercase tracking-widest mb-1" style={{ color: '#9a8e7c' }}>Fonte</div>
                      <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{selecionada.fonte}</p>
                    </div>
                  )}
                  <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                    <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>Tipo</div>
                    <p className="font-cinzel font-semibold text-sm capitalize" style={{ color: selecionada.tipo === 'rara' ? '#A461E8' : '#8A93A6' }}>
                      {selecionada.tipo}
                    </p>
                  </div>
                  <p className="font-garamond leading-relaxed drop-cap" style={{ fontSize: 15, color: '#a99c86', lineHeight: 1.72 }}>
                    {selecionada.descricao}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RacaCard({ raca, selected, compact, onClick }: {
  raca: Raca
  selected: boolean
  compact: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const icone = getIconeRaca(raca.nome)
  const rarCor = RARIDADE_COR[raca.tipo] ?? '#8A93A6'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: compact ? '12px' : '14px',
        background: selected ? '#221a28' : 'linear-gradient(180deg, #1a141e, #16111b)',
        border: selected
          ? '1px solid #C89B3C'
          : `1px solid rgba(200,155,60,${hovered ? '0.45' : '0.18'})`,
        boxShadow: selected
          ? '0 0 18px rgba(200,155,60,0.18), inset 0 0 0 1px rgba(200,155,60,0.4)'
          : hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered && !selected ? 'translateY(-3px)' : 'none',
      }}
    >
      {/* Rarity badge top-right */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full" style={{ background: rarCor }} />
        <span className="font-cinzel text-[0.6rem] uppercase tracking-[1px]" style={{ color: rarCor }}>
          {raca.tipo}
        </span>
      </div>

      {/* Icon disc */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
        style={{
          background: 'radial-gradient(circle at 50% 32%, rgba(200,155,60,0.28), rgba(18,13,22,0.7))',
          border: '1px solid rgba(200,155,60,0.45)',
        }}
      >
        <Icon name={icone} size={22} color={selected ? '#E4C16A' : '#C89B3C'} />
      </div>

      <div
        className="font-cinzel font-semibold leading-tight"
        style={{ fontSize: 17, color: '#E8DFCF', letterSpacing: '0.4px' }}
      >
        {raca.nome}
      </div>

      {!compact && (
        <div className="font-garamond mt-1 text-sm" style={{ color: '#8f8472' }}>
          {raca.atributos.length > 50 ? raca.atributos.slice(0, 50) + '…' : raca.atributos}
        </div>
      )}
    </div>
  )
}
