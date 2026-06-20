import { useState, useMemo } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X } from 'lucide-react'
import data from '@/data/devocoesAlternativas.json'

type ItemType = 'druida' | 'paladino' | 'vingador' | 'devocao'

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
  poderesConcedidos?: { nome: string; descricao: string }[]
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

  ;(d.novosDruidas || []).forEach((item: any) => all.push({
    ...item, _type: 'druida' as ItemType,
    nome: item.titulo || `Druida de ${item.divindade}`,
  }))
  ;(d.novosPaladinos || []).forEach((item: any) => all.push({
    ...item, _type: 'paladino' as ItemType,
    nome: item.titulo || `Paladino de ${item.divindade}`,
  }))
  ;(d.novosVingadores || []).forEach((item: any) => all.push({
    ...item, _type: 'vingador' as ItemType,
    nome: item.titulo || `Vingador de ${item.divindade}`,
  }))
  ;(d.devocoesAlternativas || []).forEach((item: any) => all.push({
    ...item, _type: 'devocao' as ItemType,
    nome: `Devoção Alternativa: ${item.divindade}`,
  }))

  return all
}

const allItems = buildAll()

const TYPE_LABEL: Record<ItemType, string> = {
  druida:  'Novos Druidas',
  paladino:'Novos Paladinos',
  vingador:'Novos Vingadores',
  devocao: 'Devoções Alternativas',
}

const TYPE_COR: Record<ItemType, string> = {
  druida:  '#6E9A52',
  paladino:'#4F8FD6',
  vingador:'#E05040',
  devocao: '#A461E8',
}

const TYPE_ICONE: Record<ItemType, string> = {
  druida:  'icHope',
  paladino:'icCourage',
  vingador:'icDanger',
  devocao: 'icContemplative',
}

const TIPOS: ItemType[] = ['druida', 'paladino', 'vingador', 'devocao']

const TIPO_OPTS = [
  { value: 'todos', label: 'Todos os Devotos' },
  ...TIPOS.map(t => ({ value: t, label: TYPE_LABEL[t] })),
]

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(200,155,60,0.18)', paddingBottom: 16 }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icWillpower" size={26} color="#C89B3C" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 30, color: '#E4C16A', letterSpacing: 1 }}>
            Devotos
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15 }}>
          Novos druidas, paladinos, vingadores e devoções alternativas de Mitos de Arton
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="icResearch" size={15} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar devotos e devoções..."
            style={{
              width: '100%', background: '#15101a',
              border: '1px solid rgba(200,155,60,0.20)', borderRadius: 6,
              padding: '7px 12px 7px 34px', color: '#E8DFCF',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
          />
        </div>
        <Select
          value={filtro}
          onChange={e => setFiltro(e.target.value as ItemType | 'todos')}
          options={TIPO_OPTS}
          className="w-52"
        />
        <span className="font-cinzel text-xs" style={{ color: '#6e6356' }}>{filtrados.length} resultado(s)</span>
      </div>

      {/* Grupos */}
      <div className="space-y-8">
        {TIPOS.filter(t => grupos[t]?.length).map(t => {
          const cor = TYPE_COR[t]
          const items = grupos[t]!
          return (
            <div key={t}>
              <div className="flex items-center gap-3 mb-3">
                <Icon name={TYPE_ICONE[t]} size={14} color={cor} />
                <span className="font-cinzel font-semibold text-sm" style={{ color: cor }}>{TYPE_LABEL[t]}</span>
                <div className="flex-1 h-px" style={{ background: `${cor}28` }} />
                <span className="font-cinzel text-xs px-2 py-0.5 rounded" style={{ color: cor, background: `${cor}14`, border: `1px solid ${cor}38` }}>
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(item => (
                  <DevItem key={item.id} item={item} cor={cor} onClick={() => setSelecionado(item)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selecionado && <DevModal item={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}

function DevItem({ item, cor, onClick }: { item: DevItem; cor: string; onClick: () => void }) {
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
        border: `1px solid ${hovered ? cor : `${cor}44`}`,
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="font-cinzel font-semibold text-sm mb-1 leading-tight" style={{ color: '#E8DFCF' }}>
        {item.titulo || item.nome}
      </div>
      {item.divindade && (
        <p className="font-garamond text-xs mb-1.5" style={{ color: cor }}>Divindade: {item.divindade}</p>
      )}
      <p className="font-garamond text-xs leading-snug" style={{ color: '#8f8472', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.descricao}
      </p>
    </div>
  )
}

function DevModal({ item, onClose }: { item: DevItem; onClose: () => void }) {
  const cor = TYPE_COR[item._type]
  const [aba, setAba] = useState<'geral' | 'ob' | 'poderes'>('geral')

  const temObrigacoes = !!(item.obrigacoesRestricoes || item.brando || item.fundamentalista)
  const temPoderes = !!(item.poderesConcedidos?.length)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30)',
          border: `1px solid ${cor}44`,
        }}
      >
        {/* Header */}
        <div className="flex-none p-6 pb-0">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor }}>
                {TYPE_LABEL[item._type]}{item.divindade ? ` · ${item.divindade}` : ''}
              </span>
              <h2 className="font-cinzel font-bold text-xl mt-0.5" style={{ color: '#E8DFCF' }}>
                {item.titulo || item.nome}
              </h2>
            </div>
            <button onClick={onClose} className="flex-none w-8 h-8 flex items-center justify-center rounded" style={{ color: '#6e6356' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6e6356' }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-abas */}
          <div className="flex" style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}>
            {([
              { key: 'geral',    label: 'Visão Geral' },
              temObrigacoes && { key: 'ob',      label: 'Obrigações' },
              temPoderes    && { key: 'poderes', label: 'Poderes Concedidos' },
            ].filter(Boolean) as { key: string; label: string }[]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setAba(tab.key as typeof aba)}
                className="relative px-4 py-2.5 font-cinzel text-xs tracking-wide transition-colors"
                style={{ color: aba === tab.key ? '#F0E4C8' : '#857a68' }}
              >
                {tab.label}
                {aba === tab.key && (
                  <span className="absolute left-0 right-0" style={{ bottom: -1, height: 2.5, background: `linear-gradient(90deg, ${cor}, ${cor}88)`, boxShadow: `0 0 8px ${cor}66`, borderRadius: 2 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
          {aba === 'geral' && (
            <>
              <p className="font-garamond leading-relaxed" style={{ fontSize: 15.5, color: '#cfc3aa', lineHeight: 1.72 }}>
                {item.descricao}
              </p>
              {item.indumentaria && (
                <DarkBox label="Indumentária">
                  <p className="font-garamond text-sm italic" style={{ color: '#a99c86' }}>{item.indumentaria}</p>
                </DarkBox>
              )}
              {item.autoridadeEclesiastica && (
                <DarkBox label="Autoridade Eclesiástica">
                  <p className="font-garamond text-sm" style={{ color: '#a99c86' }}>{item.autoridadeEclesiastica}</p>
                </DarkBox>
              )}
              {item.habilidadeEspecial && (
                <div className="rounded-lg p-4" style={{ background: `${cor}14`, border: `1px solid ${cor}38` }}>
                  <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: cor }}>
                    {item.habilidadeEspecial.nome}
                  </div>
                  <p className="font-garamond text-sm leading-relaxed mb-3" style={{ color: '#cfc3aa' }}>
                    {item.habilidadeEspecial.descricao}
                  </p>
                  {item.habilidadeEspecial.rodaExterna && (
                    <div className="mb-2">
                      <div className="font-cinzel text-[0.6rem] uppercase tracking-widest mb-1" style={{ color: '#9a8e7c' }}>Roda Externa</div>
                      <ul className="space-y-1">
                        {item.habilidadeEspecial.rodaExterna.map((r, i) => (
                          <li key={i} className="font-garamond text-sm" style={{ color: '#a99c86' }}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.habilidadeEspecial.rodaInterna && (
                    <div>
                      <div className="font-cinzel text-[0.6rem] uppercase tracking-widest mb-1" style={{ color: '#9a8e7c' }}>Roda Interna</div>
                      <ul className="space-y-1">
                        {item.habilidadeEspecial.rodaInterna.map((r, i) => (
                          <li key={i} className="font-garamond text-sm" style={{ color: '#a99c86' }}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {aba === 'ob' && (
            <>
              {item.obrigacoesRestricoes && (
                <DarkBox label="Obrigações & Restrições">
                  <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{item.obrigacoesRestricoes}</p>
                </DarkBox>
              )}
              {item.brando && (
                <div className="rounded-lg p-4" style={{ background: 'rgba(200,155,60,0.08)', border: '1px solid rgba(200,155,60,0.25)' }}>
                  <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#E4C16A' }}>Devoção Branda</div>
                  <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{item.brando}</p>
                </div>
              )}
              {item.fundamentalista && (
                <div className="rounded-lg p-4" style={{ background: 'rgba(224,80,64,0.10)', border: '1px solid rgba(224,80,64,0.28)' }}>
                  <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#E05040' }}>Fundamentalista</div>
                  <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{item.fundamentalista}</p>
                </div>
              )}
            </>
          )}

          {aba === 'poderes' && temPoderes && (
            <div className="space-y-3">
              {item.poderesConcedidos!.map((p, i) => (
                <div key={i} className="rounded-lg p-4" style={{ background: '#120d16', border: `1px solid ${cor}33` }}>
                  <div className="font-cinzel text-xs font-semibold mb-1.5" style={{ color: cor }}>{p.nome}</div>
                  <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{p.descricao}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DarkBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
      <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>{label}</div>
      {children}
    </div>
  )
}
