import { useState, useMemo } from 'react'
import condicoesData from '@/data/condicoes.json'
import { Icon } from '@/components/ui/Icon'
import { X } from 'lucide-react'
import type { Condicao } from '@/types'

const condicoes: Condicao[] = condicoesData as Condicao[]

const COR_MAP: Record<string, { badge: string; bg: string; border: string }> = {
  red:      { badge: '#E05040', bg: 'rgba(224,80,64,0.12)',  border: 'rgba(224,80,64,0.35)' },
  yellow:   { badge: '#DEBA6A', bg: 'rgba(228,193,106,0.10)', border: 'rgba(228,193,106,0.30)' },
  orange:   { badge: '#E0733B', bg: 'rgba(224,115,59,0.12)',  border: 'rgba(224,115,59,0.30)' },
  green:    { badge: '#6E9A52', bg: 'rgba(110,154,82,0.12)',  border: 'rgba(110,154,82,0.30)' },
  blue:     { badge: '#4F8FD6', bg: 'rgba(79,143,214,0.12)',  border: 'rgba(79,143,214,0.30)' },
  purple:   { badge: '#A461E8', bg: 'rgba(164,97,232,0.12)',  border: 'rgba(164,97,232,0.30)' },
  gray:     { badge: '#8A93A6', bg: 'rgba(138,147,166,0.10)', border: 'rgba(138,147,166,0.25)' },
  darkgray: { badge: '#7A6A50', bg: 'rgba(110,99,86,0.10)',   border: 'rgba(110,99,86,0.25)' },
  pink:     { badge: '#D06AC9', bg: 'rgba(208,106,201,0.12)', border: 'rgba(208,106,201,0.30)' },
  brown:    { badge: '#C77F3A', bg: 'rgba(199,127,58,0.10)',  border: 'rgba(199,127,58,0.25)' },
}
const getCor = (c: string) => COR_MAP[c] ?? COR_MAP.gray

export default function Condicoes() {
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState<Condicao | null>(null)

  const filtradas = useMemo(() =>
    condicoes.filter(c =>
      !busca ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-none px-8 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(212,165,74,0.13)' }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icDanger" size={28} color="#E05040" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 38, color: '#DEBA6A', letterSpacing: 1, textShadow: '0 2px 18px rgba(212,165,74,0.18)' }}>
            Condições
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#B89D72', fontSize: 15.5 }}>
          {condicoes.length} condições — penalidades, interações e como remover
        </p>
      </div>

      {/* Filter */}
      <div className="flex-none flex items-center gap-3 px-8 py-3" style={{ borderBottom: '1px solid rgba(212,165,74,0.10)', background: 'rgba(15,11,19,0.5)' }}>
        <span className="font-cinzel text-xs" style={{ color: '#7A6A50', minWidth: 80 }}>
          {filtradas.length} condição(ões)
        </span>
        <div className="flex-1 relative max-w-sm">
          <Icon name="icResearch" size={16} color="#7A6A50" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar condição..."
            style={{
              width: '100%',
              background: '#150F18',
              border: '1px solid rgba(212,165,74,0.20)',
              borderRadius: 6,
              padding: '7px 12px 7px 36px',
              color: '#F1E3C2',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 15,
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.20)' }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtradas.map(c => {
            const cor = getCor(c.cor)
            return <CondicaoCard key={c.id} condicao={c} cor={cor} onClick={() => setSelecionada(c)} />
          })}
        </div>
      </div>

      {selecionada && (
        <CondicaoModal condicao={selecionada} onClose={() => setSelecionada(null)} />
      )}
    </div>
  )
}

function CondicaoCard({ condicao, cor, onClick }: {
  condicao: Condicao
  cor: { badge: string; bg: string; border: string }
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '14px 16px',
        background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)',
        border: `1px solid ${hovered ? cor.badge : cor.border}`,
        boxShadow: hovered ? `0 10px 28px rgba(0,0,0,0.55)` : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-cinzel font-bold text-sm" style={{ color: '#F1E3C2' }}>{condicao.nome}</span>
        <span
          className="font-cinzel text-[0.58rem] uppercase tracking-wide px-2 py-0.5 rounded"
          style={{ color: cor.badge, background: cor.bg, border: `1px solid ${cor.border}` }}
        >
          {condicao.penalidades.length} penalidade{condicao.penalidades.length !== 1 ? 's' : ''}
        </span>
      </div>
      <p className="font-garamond text-sm leading-snug mb-2" style={{ color: '#cfc3aa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {condicao.descricao}
      </p>
      <div className="space-y-0.5">
        {condicao.penalidades.slice(0, 2).map((p, i) => (
          <p key={i} className="font-garamond text-xs" style={{ color: '#E05040' }}>• {p}</p>
        ))}
        {condicao.penalidades.length > 2 && (
          <p className="font-cinzel text-[0.6rem]" style={{ color: '#7A6A50' }}>+{condicao.penalidades.length - 2} mais...</p>
        )}
      </div>
    </div>
  )
}

function CondicaoModal({ condicao, onClose }: { condicao: Condicao; onClose: () => void }) {
  const cor = getCor(condicao.cor)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,165,74,0.30)',
          border: `1px solid ${cor.border}`,
        }}
      >
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor.badge }}>
                Condição
              </span>
              <h2 className="font-cinzel font-bold text-xl mt-0.5" style={{ color: '#F1E3C2' }}>{condicao.nome}</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded" style={{ color: '#7A6A50' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F1E3C2' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#7A6A50' }}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 h-px" style={{ background: `linear-gradient(90deg, ${cor.badge}88, transparent)` }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 space-y-4">
          <p className="font-garamond leading-relaxed" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.72 }}>
            {condicao.descricao}
          </p>

          <div className="rounded-lg p-4" style={{ background: 'rgba(224,80,64,0.10)', border: '1px solid rgba(224,80,64,0.25)' }}>
            <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#E05040' }}>Penalidades</div>
            <ul className="space-y-1.5">
              {condicao.penalidades.map((p, i) => (
                <li key={i} className="flex gap-2 font-garamond text-sm" style={{ color: '#F1E3C2' }}>
                  <span style={{ color: '#E05040', flexShrink: 0 }}>•</span> {p}
                </li>
              ))}
            </ul>
          </div>

          {condicao.interacoes.length > 0 && (
            <div className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#B89D72' }}>Interações</div>
              <ul className="space-y-1.5">
                {condicao.interacoes.map((inter, i) => (
                  <li key={i} className="flex gap-2 font-garamond text-sm" style={{ color: '#B89D72' }}>
                    <span style={{ color: '#D4A54A', flexShrink: 0 }}>◆</span> {inter}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-lg p-4" style={{ background: 'rgba(110,154,82,0.10)', border: '1px solid rgba(110,154,82,0.28)' }}>
            <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#6E9A52' }}>Como Remover</div>
            <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{condicao.remocao}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
