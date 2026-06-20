import { useState, useMemo } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
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

const CAT_COR: Record<string, string> = {
  'Poderes Revisados':        '#E4C16A',
  'Efeitos Novos de Poderes': '#A461E8',
  'Autoridades Feudais':      '#4F8FD6',
  'Fabricação Avançada':      '#6E9A52',
  'Miscêlania':               '#8A93A6',
}
const getCor = (cat: string) => CAT_COR[cat] ?? '#C89B3C'

const CAT_OPTS = [
  { value: 'todas', label: 'Todas as Categorias' },
  ...categorias.map(c => ({ value: c, label: c })),
]

function SubRegrasList({ items, title }: { items: SubRegra[]; title?: string }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? items : items.slice(0, 5)
  return (
    <div>
      {title && (
        <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>{title}</div>
      )}
      <div className="space-y-2">
        {shown.map((sub, i) => (
          <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(200,155,60,0.12)' }}>
            <div className="flex items-start gap-2 flex-wrap mb-0.5">
              <span className="font-cinzel text-xs font-semibold" style={{ color: '#E8DFCF' }}>{sub.nome}</span>
              {sub.prereq && (
                <span className="font-garamond text-xs italic" style={{ color: '#6e6356' }}>Pré-req: {sub.prereq}</span>
              )}
              {sub.preco && (
                <span className="font-cinzel text-xs" style={{ color: '#E4C16A' }}>{sub.preco}</span>
              )}
            </div>
            <p className="font-garamond text-xs leading-relaxed" style={{ color: '#a99c86' }}>{sub.descricao}</p>
          </div>
        ))}
      </div>
      {items.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 font-cinzel text-xs transition-colors"
          style={{ color: '#857a68' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E4C16A' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#857a68' }}
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Ver menos' : `Ver mais ${items.length - 5} itens`}
        </button>
      )}
    </div>
  )
}

export default function RegrasOpcionais() {
  const [busca, setBusca] = useState('')
  const [filtrocat, setFiltrocat] = useState('todas')
  const [selecionado, setSelecionado] = useState<RegraOpcional | null>(null)

  const filtradas = useMemo(() => {
    const q = busca.toLowerCase()
    return regras.filter(r => {
      const matchCat = filtrocat === 'todas' || r.categoria === filtrocat
      const matchBusca = !q ||
        r.nome.toLowerCase().includes(q) ||
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
    <div className="space-y-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(200,155,60,0.18)', paddingBottom: 16 }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icBoring" size={26} color="#C89B3C" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 30, color: '#E4C16A', letterSpacing: 1 }}>
            Regras Opcionais
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15 }}>
          Regras alternativas e expansões de Mitos de Arton — use a critério do mestre
        </p>
      </div>

      {/* Aviso */}
      <div className="rounded-lg p-4" style={{ background: 'rgba(200,155,60,0.07)', border: '1px solid rgba(200,155,60,0.20)' }}>
        <p className="font-garamond text-sm italic" style={{ color: '#a99c86', lineHeight: 1.65 }}>
          "Estas regras são opcionais por poderem desbalancear seu jogo. Use por sua própria conta e risco."
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="icResearch" size={15} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar regras opcionais..."
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
          value={filtrocat}
          onChange={e => setFiltrocat(e.target.value)}
          options={CAT_OPTS}
          className="w-52"
        />
        <span className="font-cinzel text-xs" style={{ color: '#6e6356' }}>{filtradas.length} regra(s)</span>
      </div>

      {/* Grupos */}
      <div className="space-y-8">
        {Object.entries(grupos).map(([cat, items]) => {
          const cor = getCor(cat)
          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-cinzel font-semibold text-sm" style={{ color: cor }}>{cat}</span>
                <div className="flex-1 h-px" style={{ background: `${cor}28` }} />
                <span className="font-cinzel text-xs px-2 py-0.5 rounded" style={{ color: cor, background: `${cor}14`, border: `1px solid ${cor}38` }}>
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map(r => (
                  <RegraCard key={r.id} regra={r} cor={cor} onClick={() => setSelecionado(r)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selecionado && <RegraModal regra={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}

function RegraCard({ regra, cor, onClick }: { regra: RegraOpcional; cor: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '14px 16px',
        background: hovered ? '#1e1624' : 'linear-gradient(180deg, #1a141e, #16111b)',
        border: `1px solid ${hovered ? cor : `${cor}38`}`,
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="font-cinzel font-semibold text-sm mb-1.5" style={{ color: '#E8DFCF' }}>{regra.nome}</div>
      <p className="font-garamond text-xs leading-snug mb-2" style={{ color: '#8f8472', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {regra.descricao}
      </p>
      {regra.conteudo && regra.conteudo.length > 0 && (
        <p className="font-cinzel text-[0.6rem]" style={{ color: '#6e6356' }}>{regra.conteudo.length} opções</p>
      )}
    </div>
  )
}

function RegraModal({ regra, onClose }: { regra: RegraOpcional; onClose: () => void }) {
  const cor = getCor(regra.categoria)
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
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor }}>
                {regra.categoria} · {regra.fonte}
              </span>
              <h2 className="font-cinzel font-bold text-xl mt-0.5" style={{ color: '#E8DFCF' }}>{regra.nome}</h2>
            </div>
            <button onClick={onClose} className="flex-none w-8 h-8 flex items-center justify-center rounded" style={{ color: '#6e6356' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6e6356' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 h-px" style={{ background: `linear-gradient(90deg, ${cor}88, transparent)` }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 space-y-5">
          <p className="font-garamond leading-relaxed" style={{ fontSize: 15.5, color: '#cfc3aa', lineHeight: 1.72 }}>
            {regra.descricao}
          </p>

          {regra.conteudo && regra.conteudo.length > 0 && (
            <SubRegrasList items={regra.conteudo} title="Opções" />
          )}
          {regra.materiais && regra.materiais.length > 0 && (
            <SubRegrasList items={regra.materiais} title="Materiais" />
          )}
          {regra.poderesFabricacao && regra.poderesFabricacao.length > 0 && (
            <SubRegrasList items={regra.poderesFabricacao} title="Poderes de Fabricação" />
          )}
        </div>
      </div>
    </div>
  )
}
