import { useState, useMemo } from 'react'
import magiasData from '@/data/magias.json'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X, Star } from 'lucide-react'
import type { Magia } from '@/types'

const magias: Magia[] = magiasData as Magia[]

const ESCOLA_COR: Record<string, string> = {
  Evocação:     '#E0733B',
  Abjuração:    '#4F8FD6',
  Adivinhação:  '#C9A23B',
  Encantamento: '#D06AC9',
  Ilusão:       '#A461E8',
  Necromancia:  '#6E9A52',
  Conjuração:   '#4FB0C6',
  Transmutação: '#C77F3A',
}

function getEscolaCor(escola: string | null | undefined): string {
  if (!escola) return '#C89B3C'
  for (const [k, v] of Object.entries(ESCOLA_COR)) {
    if (escola.toLowerCase().includes(k.toLowerCase())) return v
  }
  return '#C89B3C'
}

const escolas = ['Todas', ...Array.from(new Set(magias.map(m => m.escola).filter(Boolean))).sort()]
const circulos = ['Todos', '1', '2', '3', '4', '5']

export default function Magias() {
  const [busca, setBusca] = useState('')
  const [escola, setEscola] = useState('Todas')
  const [circulo, setCirculo] = useState('Todos')
  const [selecionada, setSelecionada] = useState<Magia | null>(null)
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set())

  const filtradas = useMemo(() =>
    magias.filter(m => {
      const matchEscola = escola === 'Todas' || m.escola === escola
      const matchCirculo = circulo === 'Todos' || String(m.circulo) === circulo
      const matchBusca = !busca ||
        m.nome.toLowerCase().includes(busca.toLowerCase()) ||
        m.escola.toLowerCase().includes(busca.toLowerCase()) ||
        m.descricao.toLowerCase().includes(busca.toLowerCase())
      return matchEscola && matchCirculo && matchBusca
    }), [busca, escola, circulo])

  function toggleFavorito(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setFavoritos(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-none px-8 pt-7 pb-5"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.13)' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icKnowledge" size={28} color="#C89B3C" />
          <h1
            className="font-cinzel font-bold"
            style={{ fontSize: 38, color: '#E4C16A', letterSpacing: 1, textShadow: '0 2px 18px rgba(200,155,60,0.18)' }}
          >
            Magias
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15.5 }}>
          Arcanas e divinas — clique para ver todos os detalhes
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="flex-none flex items-center gap-3 px-8 py-3"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.10)', background: 'rgba(15,11,19,0.5)' }}
      >
        <span className="font-cinzel text-xs" style={{ color: '#6e6356', minWidth: 70 }}>
          {filtradas.length} magia{filtradas.length !== 1 ? 's' : ''}
        </span>
        <div className="flex-1 relative">
          <Icon name="icResearch" size={16} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar magia..."
            style={{
              width: '100%',
              background: '#15101a',
              border: '1px solid rgba(200,155,60,0.20)',
              borderRadius: 6,
              padding: '7px 12px 7px 36px',
              color: '#E8DFCF',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 15,
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
          />
        </div>
        <Select
          value={escola}
          onChange={e => setEscola(e.target.value)}
          options={escolas.map(e => ({ value: e, label: e === 'Todas' ? 'Todas as Escolas' : e }))}
          className="w-48"
        />
        <Select
          value={circulo}
          onChange={e => setCirculo(e.target.value)}
          options={circulos.map(c => ({ value: c, label: c === 'Todos' ? 'Todos os Círculos' : `${c}º Círculo` }))}
          className="w-44"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-4">
        <div className="flex flex-col gap-2.5">
          {filtradas.map(m => (
            <MagiaCard
              key={m.id}
              magia={m}
              favorito={favoritos.has(m.id)}
              onToggleFavorito={e => toggleFavorito(m.id, e)}
              onClick={() => setSelecionada(m)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selecionada && (
        <MagiaModal magia={selecionada} onClose={() => setSelecionada(null)} />
      )}
    </div>
  )
}

function MagiaCard({ magia, favorito, onToggleFavorito, onClick }: {
  magia: Magia
  favorito: boolean
  onToggleFavorito: (e: React.MouseEvent) => void
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const cor = getEscolaCor(magia.escola)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '12px 16px',
        background: 'linear-gradient(180deg, #1a141e, #16111b)',
        border: `1px solid rgba(200,155,60,${hovered ? '0.45' : '0.18'})`,
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateX(3px)' : 'none',
      }}
    >
      {/* Thumbnail */}
      <div
        className="flex-none flex items-center justify-center rounded-lg"
        style={{
          width: 62,
          height: 62,
          background: `radial-gradient(circle at 50% 28%, ${cor}66, rgba(13,9,17,0.7))`,
          border: `1px solid ${cor}88`,
          boxShadow: `inset 0 0 20px rgba(0,0,0,0.55), 0 0 16px ${cor}33`,
        }}
      >
        <Icon name="icKnowledge" size={26} color={cor} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-cinzel font-semibold text-sm" style={{ color: '#E8DFCF' }}>
            {magia.nome}
          </span>
          {magia.escola && (
            <span className="font-cinzel text-[0.6rem] px-1.5 py-0.5 rounded" style={{ color: cor, background: `${cor}22`, border: `1px solid ${cor}44` }}>
              {magia.escola}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-cinzel text-[0.65rem]"
            style={{ color: '#9a8e7c' }}
          >
            {magia.circulo}º Círculo
          </span>
          {magia.pm && (
            <span className="font-cinzel text-[0.65rem]" style={{ color: '#6e6356' }}>
              · {magia.pm} PM
            </span>
          )}
        </div>
      </div>

      {/* Badges direita */}
      <div className="flex items-center gap-2 flex-none">
        {[
          { label: magia.execucao },
          { label: magia.alcance },
          { label: magia.duracao },
        ].filter(b => b.label).map((b, i) => (
          <span
            key={i}
            className="font-cinzel text-[0.65rem] px-2 py-1 rounded"
            style={{
              color: '#c2b596',
              border: '1px solid rgba(200,155,60,0.28)',
              background: 'rgba(200,155,60,0.06)',
            }}
          >
            {b.label}
          </span>
        ))}

        {/* Favorito */}
        <button
          onClick={onToggleFavorito}
          className="ml-1 transition-all duration-150"
          style={{
            color: favorito ? '#E4C16A' : '#5a5145',
            filter: favorito ? 'drop-shadow(0 0 6px rgba(200,155,60,0.5))' : 'none',
          }}
        >
          <Star className={`w-4 h-4 ${favorito ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  )
}

function MagiaModal({ magia, onClose }: { magia: Magia; onClose: () => void }) {
  const cor = getEscolaCor(magia.escola)
  const [aba, setAba] = useState<'descricao' | 'aprimoramentos'>('descricao')
  const aprimoramentos = (magia as any).aprimoramentos as Array<{ pm?: number; descricao: string }> | undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30), inset 0 0 60px rgba(0,0,0,0.4)',
          border: `1px solid ${cor}44`,
        }}
      >
        {/* Header */}
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Selo escola */}
            <div
              className="flex-none w-16 h-16 rounded-xl flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 28%, ${cor}55, rgba(13,9,17,0.8))`,
                border: `2px solid ${cor}88`,
                boxShadow: `0 0 20px ${cor}44`,
              }}
            >
              <Icon name="icKnowledge" size={28} color={cor} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor }}>
                  {magia.escola} · {magia.circulo}º Círculo
                </span>
              </div>
              <h2 className="font-cinzel font-bold text-xl" style={{ color: '#E8DFCF', letterSpacing: '0.5px' }}>
                {magia.nome}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-none w-8 h-8 flex items-center justify-center rounded transition-colors"
              style={{ color: '#6e6356' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6e6356' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Strip de atributos */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {[
              { label: 'PM', value: magia.pm ? String(magia.pm) : '—' },
              { label: 'Execução', value: magia.execucao || '—' },
              { label: 'Alcance', value: magia.alcance || '—' },
              { label: 'Duração', value: magia.duracao || '—' },
              { label: 'Resistência', value: (magia as any).resistencia || '—' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-lg py-2 px-1"
                style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
              >
                <span className="font-cinzel font-semibold text-xs leading-none text-center" style={{ color: '#E4C16A' }}>
                  {s.value}
                </span>
                <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-1 text-center" style={{ color: '#6e6356' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 mx-6" style={{ borderTop: '1px solid rgba(200,155,60,0.15)' }}>
          <div className="flex-1 h-px" />
          <span style={{ color: '#C89B3C', fontSize: 10, margin: '0 4px' }}>◆</span>
          <div className="flex-1 h-px" />
        </div>

        {/* Tabs */}
        {aprimoramentos?.length ? (
          <div
            className="flex flex-none mx-6"
            style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}
          >
            {(['descricao', 'aprimoramentos'] as const).map(t => (
              <button
                key={t}
                onClick={() => setAba(t)}
                className="relative px-4 py-2.5 font-cinzel text-xs tracking-wide transition-colors"
                style={{ color: aba === t ? '#F0E4C8' : '#857a68' }}
              >
                {t === 'descricao' ? 'Descrição' : 'Aprimoramentos'}
                {aba === t && (
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
        ) : null}

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
          {aba === 'descricao' && (
            <p className="font-garamond leading-relaxed drop-cap" style={{ fontSize: 16.5, color: '#cfc3aa', lineHeight: 1.78 }}>
              {magia.descricao}
            </p>
          )}
          {aba === 'aprimoramentos' && aprimoramentos?.length && (
            <div className="space-y-3">
              {aprimoramentos.map((ap, i) => (
                <div key={i} className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
                  {ap.pm !== undefined && (
                    <span
                      className="font-cinzel text-[0.65rem] px-2 py-0.5 rounded mr-2"
                      style={{ background: `${cor}22`, color: cor, border: `1px solid ${cor}44` }}
                    >
                      +{ap.pm} PM
                    </span>
                  )}
                  <span className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{ap.descricao}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
