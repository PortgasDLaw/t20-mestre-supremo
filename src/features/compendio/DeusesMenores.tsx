import { useState, useMemo } from 'react'
import deusesData from '@/data/deuses_menores.json'
import gloriennRaw from '@/data/devocoesAlternativas.json'
import { Icon } from '@/components/ui/Icon'
import { X, Star } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PoderConcedido { nome: string; descricao: string }

interface DeusMenor {
  id: string; nome: string; epiteto: string; fonte: string
  statusDivino: number; tipo: string; historia: string
  crencasEObjetivos: string; simboloSagrado: string
  canalizarEnergia: string; armaPreferida: string
  devotos: string; obrigacoesERestricoes: string
  poderConcedido: PoderConcedido
}

interface ClasseInfo { descricao?: string; indumentaria: string; fundamentalista: string }

interface Glorienn {
  id: string; nome: string; epiteto: string; lema: string
  historia: string; motivacoes: string; relacoes: string
  crenças: string; devotos: string[]; obrigacoesRestricoes: string
  brando: string; autoridadeEclesiastica: string; simboloSagrado: string
  canalizarEnergia: string; armaPreferida: string; coresSignificativas: string[]
  areasInfluencia: string[]; outrosNomes: string[]
  poderesConcedidos: PoderConcedido[]
  classesSacerdote: ClasseInfo; classesDruida: ClasseInfo; classesPaladino: ClasseInfo
  fonte: string
}

type Selected = { kind: 'glorienn' } | { kind: 'deus'; deus: DeusMenor }

// ─── Data ─────────────────────────────────────────────────────────────────────

const glorienn = (gloriennRaw as any).glorienn as Glorienn
const deuses: DeusMenor[] = deusesData as DeusMenor[]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNdBadgeColor(energia: string) {
  if (energia === 'Positiva') return { bg: 'rgba(212,165,74,0.15)', color: '#DEBA6A', border: 'rgba(212,165,74,0.35)' }
  if (energia === 'Negativa') return { bg: 'rgba(200,60,60,0.15)', color: '#e05050', border: 'rgba(200,60,60,0.35)' }
  return { bg: 'rgba(138,147,166,0.12)', color: '#8A93A6', border: 'rgba(138,147,166,0.3)' }
}

function StatStrip({ items }: { items: { label: string; value: string; accent?: string }[] }) {
  return (
    <div className="grid flex-none" style={{
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      borderBottom: '1px solid rgba(212,165,74,0.12)',
    }}>
      {items.map((s, i) => (
        <div key={i} className="flex flex-col items-center justify-center py-3 px-2"
          style={{ background: '#140F18', borderRight: i < items.length - 1 ? '1px solid rgba(212,165,74,0.10)' : 'none' }}>
          <span className="font-cinzel font-bold text-sm leading-none text-center"
            style={{ color: s.accent ?? '#DEBA6A' }}>{s.value}</span>
          <span className="font-cinzel text-[0.52rem] uppercase tracking-wider mt-1 text-center"
            style={{ color: '#7A6A50' }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function SubTabs<T extends string>({ tabs, active, onChange }: { tabs: T[]; active: T; onChange: (t: T) => void }) {
  return (
    <div className="flex flex-none overflow-x-auto scrollbar-none"
      style={{ borderBottom: '1px solid rgba(212,165,74,0.12)' }}>
      {tabs.map(tab => (
        <button key={tab} onClick={() => onChange(tab)}
          className="relative flex-none px-4 py-2.5 font-cinzel text-[0.7rem] tracking-wide whitespace-nowrap transition-colors duration-150"
          style={{ color: active === tab ? '#F0E4C8' : '#857a68' }}>
          {tab}
          {active === tab && (
            <span className="absolute left-0 right-0" style={{
              bottom: -1, height: 2.5, borderRadius: 2,
              background: 'linear-gradient(90deg, #D4A54A, #DEBA6A)',
              boxShadow: '0 0 8px rgba(212,165,74,0.55)',
            }} />
          )}
        </button>
      ))}
    </div>
  )
}

function SectionBox({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-lg p-4" style={{ background: '#140F18', border: `1px solid ${accent ?? 'rgba(212,165,74,0.14)'}` }}>
      <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: accent ? '#c2b596' : '#B89D72' }}>{title}</div>
      {children}
    </div>
  )
}

// ─── Glórienn detail tabs ──────────────────────────────────────────────────────

const TABS_GLORIENN = ['Identidade', 'História', 'Motivações', 'Relações', 'Igreja & Clero', 'Devotos & O&R', 'Poderes'] as const
type TabGlorienn = typeof TABS_GLORIENN[number]

function GloriennDetail({ onClose }: { onClose: () => void }) {
  const [aba, setAba] = useState<TabGlorienn>('Identidade')

  return (
    <div className="flex-1 min-w-[400px] flex flex-col overflow-hidden rounded-lg animate-fade-in"
      style={{ background: 'linear-gradient(180deg, #1e1528, #16101e)', border: '1px solid rgba(212,165,74,0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>

      {/* Hero header */}
      <div className="relative flex-none px-6 pt-6 pb-4"
        style={{ background: 'linear-gradient(180deg, #251a2e 0%, #1a1020 100%)', borderBottom: '1px solid rgba(212,165,74,0.15)' }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded transition-colors"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#B89D72' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#F1E3C2' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#B89D72' }}>
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-none"
            style={{ background: 'radial-gradient(circle at 50% 28%, rgba(212,165,74,0.4), rgba(18,13,22,0.8))', border: '2px solid rgba(212,165,74,0.6)', boxShadow: '0 0 20px rgba(212,165,74,0.25)' }}>
            <Star className="w-6 h-6" style={{ color: '#DEBA6A' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-cinzel text-[0.6rem] uppercase tracking-[3px]" style={{ color: '#D4A54A' }}>Deusa Maior · Panteão Élfico</span>
            </div>
            <h2 className="font-cinzel font-bold text-2xl leading-tight" style={{ color: '#DEBA6A', textShadow: '0 0 30px rgba(212,165,74,0.3)' }}>
              {glorienn.nome}
            </h2>
            <p className="font-garamond text-sm" style={{ color: '#B89D72' }}>{glorienn.epiteto}</p>
            {glorienn.lema && (
              <p className="font-garamond italic text-xs mt-1" style={{ color: '#7d7060' }}>"{glorienn.lema}"</p>
            )}
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <StatStrip items={[
        { label: 'Símbolo', value: glorienn.simboloSagrado, accent: '#D4A54A' },
        { label: 'Arma', value: glorienn.armaPreferida },
        { label: 'Energia', value: glorienn.canalizarEnergia, accent: '#DEBA6A' },
        { label: 'Cores', value: glorienn.coresSignificativas.join(' · '), accent: '#B89D72' },
      ]} />

      <SubTabs tabs={[...TABS_GLORIENN]} active={aba} onChange={setAba} />

      <div className="flex-1 overflow-y-auto scrollbar-thin p-5">

        {aba === 'Identidade' && (
          <div className="space-y-4">
            {glorienn.outrosNomes?.length > 0 && (
              <SectionBox title="Outros Nomes">
                <div className="space-y-2">
                  {glorienn.outrosNomes.map((n, i) => {
                    const match = n.match(/^(.+?)\s*\((.+)\)$/)
                    return (
                      <div key={i} className="flex items-baseline gap-2">
                        <span className="font-cinzel text-sm font-semibold" style={{ color: '#F1E3C2' }}>
                          {match ? match[1] : n}
                        </span>
                        {match && <span className="font-garamond text-xs" style={{ color: '#8f8472' }}>— {match[2]}</span>}
                      </div>
                    )
                  })}
                </div>
              </SectionBox>
            )}

            <div>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#B89D72' }}>Áreas de Influência</div>
              <div className="flex flex-wrap gap-1.5">
                {glorienn.areasInfluencia.map((a, i) => (
                  <span key={i} className="font-cinzel text-[0.6rem] px-2 py-0.5 rounded"
                    style={{ background: 'rgba(212,165,74,0.08)', border: '1px solid rgba(212,165,74,0.22)', color: '#c2b596' }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <SectionBox title="Lema">
              <p className="font-garamond italic text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>
                "{glorienn.lema}"
              </p>
            </SectionBox>

            <div className="grid grid-cols-2 gap-3">
              <SectionBox title="Símbolo Sagrado">
                <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{glorienn.simboloSagrado}</p>
              </SectionBox>
              <SectionBox title="Arma Preferida">
                <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{glorienn.armaPreferida}</p>
              </SectionBox>
              <SectionBox title="Canalizar Energia">
                <p className="font-garamond text-sm" style={{ color: '#DEBA6A' }}>{glorienn.canalizarEnergia}</p>
              </SectionBox>
              <SectionBox title="Cores Significativas">
                <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{glorienn.coresSignificativas.join(', ')}</p>
              </SectionBox>
            </div>
          </div>
        )}

        {aba === 'História' && (
          <div className="space-y-4">
            <p className="font-garamond leading-relaxed drop-cap"
              style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.75, columnCount: 1 }}>
              {glorienn.historia}
            </p>
          </div>
        )}

        {aba === 'Motivações' && (
          <div className="space-y-4">
            <SectionBox title="Motivações">
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.motivacoes}</p>
            </SectionBox>
            <SectionBox title="Crenças e Objetivos">
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.crenças}</p>
            </SectionBox>
          </div>
        )}

        {aba === 'Relações' && (
          <div className="space-y-4">
            <SectionBox title="Relações com o Panteão">
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.relacoes}</p>
            </SectionBox>
          </div>
        )}

        {aba === 'Igreja & Clero' && (
          <div className="space-y-4">
            {glorienn.autoridadeEclesiastica && (
              <div className="rounded-lg p-4" style={{ background: 'rgba(212,165,74,0.08)', border: '1px solid rgba(212,165,74,0.25)' }}>
                <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#D4A54A' }}>Autoridade Eclesiástica</div>
                <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.autoridadeEclesiastica}</p>
              </div>
            )}

            {[
              { label: 'Sacerdote', data: glorienn.classesSacerdote },
              { label: 'Druida', data: glorienn.classesDruida },
              { label: 'Paladino', data: glorienn.classesPaladino },
            ].map(({ label, data }) => data && (
              <div key={label} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(212,165,74,0.14)' }}>
                <div className="px-4 py-2 font-cinzel text-xs uppercase tracking-widest"
                  style={{ background: '#1a1020', color: '#D4A54A', borderBottom: '1px solid rgba(212,165,74,0.14)' }}>
                  {label}
                </div>
                <div className="p-4 space-y-3" style={{ background: '#140F18' }}>
                  {data.descricao && (
                    <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{data.descricao}</p>
                  )}
                  {data.indumentaria && (
                    <div>
                      <span className="font-cinzel text-[0.6rem] uppercase tracking-wider" style={{ color: '#B89D72' }}>Indumentária — </span>
                      <span className="font-garamond text-sm italic" style={{ color: '#B89D72' }}>{data.indumentaria}</span>
                    </div>
                  )}
                  {data.fundamentalista && (
                    <div className="rounded p-3" style={{ background: 'rgba(200,60,60,0.08)', border: '1px solid rgba(200,60,60,0.2)' }}>
                      <span className="font-cinzel text-[0.6rem] uppercase tracking-wider" style={{ color: '#c46060' }}>Fundamentalista — </span>
                      <span className="font-garamond text-sm" style={{ color: '#b09090' }}>{data.fundamentalista}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {aba === 'Devotos & O&R' && (
          <div className="space-y-4">
            <div>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#B89D72' }}>Devotos</div>
              <div className="flex flex-wrap gap-1.5">
                {glorienn.devotos.map((d, i) => (
                  <span key={i} className="font-cinzel text-[0.6rem] px-2 py-0.5 rounded"
                    style={{ background: 'rgba(212,165,74,0.08)', border: '1px solid rgba(212,165,74,0.22)', color: '#c2b596' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <SectionBox title="Obrigações & Restrições">
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.obrigacoesRestricoes}</p>
            </SectionBox>

            {glorienn.brando && (
              <div className="rounded-lg p-4" style={{ background: 'rgba(212,165,74,0.07)', border: '1px solid rgba(212,165,74,0.28)' }}>
                <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#D4A54A' }}>Versão Branda</div>
                <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{glorienn.brando}</p>
              </div>
            )}
          </div>
        )}

        {aba === 'Poderes' && (
          <div className="space-y-3">
            {glorienn.poderesConcedidos.map((p, i) => (
              <div key={i} className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
                <div className="font-cinzel font-semibold text-sm mb-2" style={{ color: '#DEBA6A' }}>{p.nome}</div>
                <p className="font-garamond text-sm leading-relaxed" style={{ color: '#B89D72' }}>{p.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Deus Menor detail tabs ────────────────────────────────────────────────────

const TABS_DEUS = ['Visão Geral', 'Crenças & O&R', 'Poder Concedido'] as const
type TabDeus = typeof TABS_DEUS[number]

function DeusMenorDetail({ deus, onClose }: { deus: DeusMenor; onClose: () => void }) {
  const [aba, setAba] = useState<TabDeus>('Visão Geral')
  const nc = getNdBadgeColor(deus.canalizarEnergia)

  return (
    <div className="flex-1 min-w-[380px] flex flex-col overflow-hidden rounded-lg animate-fade-in"
      style={{ background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)', border: '1px solid rgba(212,165,74,0.22)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>

      {/* Hero header */}
      <div className="relative flex-none px-5 pt-5 pb-4"
        style={{ borderBottom: '1px solid rgba(212,165,74,0.12)' }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded transition-colors"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#B89D72' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#F1E3C2' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#B89D72' }}>
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-[0.6rem] uppercase tracking-[3px]" style={{ color: '#B89D72' }}>
            Deus Menor · {deus.tipo}
          </span>
          <span className="font-cinzel text-[0.6rem] px-2 py-0.5 rounded"
            style={{ background: nc.bg, color: nc.color, border: `1px solid ${nc.border}` }}>
            {deus.canalizarEnergia}
          </span>
          <span className="font-cinzel text-[0.6rem] px-2 py-0.5 rounded"
            style={{ background: 'rgba(138,147,166,0.10)', color: '#8A93A6', border: '1px solid rgba(138,147,166,0.25)' }}>
            Status {deus.statusDivino}
          </span>
        </div>
        <h2 className="font-cinzel font-bold text-xl leading-tight" style={{ color: '#F1E3C2' }}>{deus.nome}</h2>
        <p className="font-garamond text-sm mt-0.5" style={{ color: '#B89D72' }}>{deus.epiteto}</p>
      </div>

      {/* Stat strip */}
      <StatStrip items={[
        { label: 'Símbolo', value: deus.simboloSagrado, accent: '#D4A54A' },
        { label: 'Arma', value: deus.armaPreferida },
        { label: 'Energia', value: deus.canalizarEnergia, accent: nc.color },
        { label: 'Status', value: String(deus.statusDivino), accent: '#8A93A6' },
      ]} />

      <SubTabs tabs={[...TABS_DEUS]} active={aba} onChange={setAba} />

      <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
        {aba === 'Visão Geral' && (
          <div className="space-y-4">
            <p className="font-garamond leading-relaxed drop-cap"
              style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.75 }}>
              {deus.historia}
            </p>
            <SectionBox title="Devotos">
              <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{deus.devotos}</p>
            </SectionBox>
          </div>
        )}

        {aba === 'Crenças & O&R' && (
          <div className="space-y-4">
            <SectionBox title="Crenças e Objetivos">
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>{deus.crencasEObjetivos}</p>
            </SectionBox>
            <div className="rounded-lg p-4" style={{ background: 'rgba(200,60,60,0.07)', border: '1px solid rgba(200,60,60,0.22)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#c46060' }}>Obrigações & Restrições</div>
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#c0a0a0' }}>{deus.obrigacoesERestricoes}</p>
            </div>
          </div>
        )}

        {aba === 'Poder Concedido' && (
          <div className="space-y-3">
            <div className="rounded-lg p-5" style={{ background: 'rgba(212,165,74,0.07)', border: '1px solid rgba(212,165,74,0.28)' }}>
              <div className="font-cinzel font-bold text-base mb-3" style={{ color: '#DEBA6A' }}>
                {deus.poderConcedido.nome}
              </div>
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#cfc3aa' }}>
                {deus.poderConcedido.descricao}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── God list cards ────────────────────────────────────────────────────────────

function GloriennCard({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150 p-3"
      style={{
        background: selected ? 'linear-gradient(135deg, #251a2e, #1a1020)' : 'linear-gradient(135deg, #1e1528, #160f1c)',
        border: selected ? '1px solid #D4A54A' : `1px solid rgba(212,165,74,${hovered ? '0.45' : '0.25'})`,
        boxShadow: selected ? '0 0 20px rgba(212,165,74,0.2), inset 0 0 0 1px rgba(212,165,74,0.35)' : hovered ? '0 6px 20px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.35)',
        transform: hovered && !selected ? 'translateY(-2px)' : 'none',
      }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-none"
          style={{ background: 'radial-gradient(circle at 50% 28%, rgba(212,165,74,0.4), rgba(18,13,22,0.8))', border: '1px solid rgba(212,165,74,0.55)' }}>
          <Star className="w-4 h-4" style={{ color: '#DEBA6A' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-sm" style={{ color: selected ? '#F0E4C8' : '#DEBA6A' }}>{glorienn.nome}</span>
            <span className="font-cinzel text-[0.55rem] px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(212,165,74,0.12)', color: '#D4A54A', border: '1px solid rgba(212,165,74,0.28)' }}>
              Deusa Maior
            </span>
          </div>
          <p className="font-garamond text-xs" style={{ color: '#8f8472' }}>{glorienn.epiteto}</p>
        </div>
      </div>
    </div>
  )
}

function DeusCard({ deus, selected, onClick }: { deus: DeusMenor; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const nc = getNdBadgeColor(deus.canalizarEnergia)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150 p-3"
      style={{
        background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)',
        border: selected ? '1px solid #D4A54A' : `1px solid rgba(212,165,74,${hovered ? '0.35' : '0.14'})`,
        boxShadow: selected ? '0 0 14px rgba(212,165,74,0.15), inset 0 0 0 1px rgba(212,165,74,0.3)' : hovered ? '0 6px 20px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
        transform: hovered && !selected ? 'translateY(-2px)' : 'none',
      }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-none"
          style={{ background: `${nc.bg}`, border: `1px solid ${nc.border}` }}>
          <Icon name="icContemplative" size={16} color={nc.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-cinzel font-semibold text-sm leading-tight truncate" style={{ color: selected ? '#F0E4C8' : '#F1E3C2' }}>
              {deus.nome}
            </span>
            <span className="flex-none font-cinzel text-[0.55rem] px-1.5 py-0.5 rounded"
              style={{ background: nc.bg, color: nc.color, border: `1px solid ${nc.border}` }}>
              {deus.canalizarEnergia}
            </span>
          </div>
          <p className="font-garamond text-xs truncate" style={{ color: '#8f8472' }}>{deus.epiteto}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DeusesMenores() {
  const [busca, setBusca] = useState('')
  const [filtroEnergia, setFiltroEnergia] = useState<'todos' | 'Positiva' | 'Negativa' | 'Qualquer'>('todos')
  const [selected, setSelected] = useState<Selected | null>(null)

  const filtrados = useMemo(() =>
    deuses.filter(d => {
      const matchEnergia = filtroEnergia === 'todos' || d.canalizarEnergia === filtroEnergia
      const matchBusca = !busca ||
        d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.epiteto.toLowerCase().includes(busca.toLowerCase()) ||
        d.devotos.toLowerCase().includes(busca.toLowerCase())
      return matchEnergia && matchBusca
    }), [busca, filtroEnergia])

  const panelOpen = selected !== null

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Header */}
      <div className="flex-none px-8 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(212,165,74,0.13)' }}>
        <h1 className="font-cinzel font-bold" style={{ fontSize: 38, color: '#DEBA6A', letterSpacing: 1, textShadow: '0 2px 18px rgba(212,165,74,0.18)' }}>
          Deuses
        </h1>
        <p className="font-garamond mt-1" style={{ color: '#B89D72', fontSize: 15.5 }}>
          Glórienn e {deuses.length} deuses menores de Mitos de Arton
        </p>
      </div>

      {/* Split Body */}
      <div className="flex flex-1 overflow-hidden gap-5 px-8 py-5">

        {/* LEFT — lista */}
        <div className="flex flex-col overflow-hidden flex-none" style={{ width: panelOpen ? 280 : 520 }}>

          {/* Glórienn */}
          <div className="mb-4">
            <div className="font-cinzel text-[0.6rem] uppercase tracking-[2px] mb-2 px-0.5"
              style={{ color: '#7A6A50' }}>Deusa Maior</div>
            <GloriennCard
              selected={selected?.kind === 'glorienn'}
              onClick={() => setSelected({ kind: 'glorienn' })}
            />
          </div>

          {/* Filtros deuses menores */}
          <div className="mb-3">
            <div className="font-cinzel text-[0.6rem] uppercase tracking-[2px] mb-2 px-0.5" style={{ color: '#7A6A50' }}>
              Deuses Menores — {filtrados.length}
            </div>
            <div className="relative mb-2">
              <Icon name="icResearch" size={14} color="#7A6A50" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar deus..."
                style={{
                  width: '100%', background: '#150F18', border: '1px solid rgba(212,165,74,0.20)',
                  borderRadius: 6, padding: '6px 10px 6px 30px', color: '#F1E3C2',
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.55)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.20)' }}
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {(['todos', 'Positiva', 'Negativa', 'Qualquer'] as const).map(e => {
                const active = filtroEnergia === e
                const nc = e === 'Positiva' ? '#DEBA6A' : e === 'Negativa' ? '#e05050' : '#8A93A6'
                return (
                  <button key={e} onClick={() => setFiltroEnergia(e)}
                    className="px-2.5 py-1 text-[0.65rem] font-cinzel rounded border transition-colors"
                    style={{
                      background: active ? (e === 'Positiva' ? 'rgba(212,165,74,0.18)' : e === 'Negativa' ? 'rgba(200,60,60,0.18)' : 'rgba(138,147,166,0.12)') : 'transparent',
                      color: active ? nc : '#7A6A50',
                      borderColor: active ? nc : 'rgba(212,165,74,0.18)',
                    }}>
                    {e === 'todos' ? 'Todos' : e}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Deuses menores list */}
          <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 pr-1">
            {filtrados.map(d => (
              <DeusCard key={d.id} deus={d}
                selected={selected?.kind === 'deus' && selected.deus.id === d.id}
                onClick={() => setSelected({ kind: 'deus', deus: d })}
              />
            ))}
            {filtrados.length === 0 && (
              <p className="font-garamond text-sm text-center pt-8" style={{ color: '#7A6A50' }}>
                Nenhum deus encontrado.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT — detalhe */}
        {selected?.kind === 'glorienn' && (
          <GloriennDetail onClose={() => setSelected(null)} />
        )}
        {selected?.kind === 'deus' && (
          <DeusMenorDetail deus={selected.deus} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  )
}
