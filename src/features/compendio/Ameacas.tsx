import { useState, useMemo } from 'react'
import ameacasData from '@/data/ameacas.json'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store'
import { X, Swords } from 'lucide-react'
import type { Ameaca } from '@/types'

const ameacas: Ameaca[] = ameacasData as Ameaca[]

function ndToNum(nd: string) {
  if (nd.includes('/')) { const [n, d] = nd.split('/'); return Number(n) / Number(d) }
  return Number(nd)
}

function getNdCor(nd: string): string {
  const n = ndToNum(nd)
  if (n <= 1)  return '#6E9A52'  // verde
  if (n <= 2)  return '#4FB0C6'  // ciano
  if (n <= 3)  return '#4F8FD6'  // azul
  if (n <= 5)  return '#A461E8'  // roxo
  if (n <= 7)  return '#E0733B'  // laranja
  return '#E05040'               // vermelho
}

const tiposUnicos = ['Todos', ...Array.from(new Set(ameacas.map(a => a.tipo.split(' ')[0])))]
const ndsUnicos = ['Todos', ...Array.from(new Set(ameacas.map(a => a.nd))).sort((a, b) => ndToNum(a) - ndToNum(b))]

const TABS = ['Visão Geral', 'Habilidades', 'Estratégia', 'Tesouro'] as const
type Tab = typeof TABS[number]

export default function Ameacas() {
  const [busca, setBusca] = useState('')
  const [ndFiltro, setNdFiltro] = useState('Todos')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [selecionada, setSelecionada] = useState<Ameaca | null>(null)
  const [aba, setAba] = useState<Tab>('Visão Geral')
  const { adicionarCombatente, setPaginaAtual } = useStore()

  const filtradas = useMemo(() =>
    ameacas.filter(a => {
      const matchBusca = !busca || a.nome.toLowerCase().includes(busca.toLowerCase())
      const matchNd = ndFiltro === 'Todos' || a.nd === ndFiltro
      const matchTipo = tipoFiltro === 'Todos' || a.tipo.includes(tipoFiltro)
      return matchBusca && matchNd && matchTipo
    }).sort((a, b) => ndToNum(a.nd) - ndToNum(b.nd))
  , [busca, ndFiltro, tipoFiltro])

  function adicionarAoCombate(a: Ameaca) {
    adicionarCombatente({
      nome: a.nome,
      iniciativa: Math.floor(Math.random() * 20) + 1,
      pv: a.pv,
      pvMax: a.pv,
      pm: a.pm,
      pmMax: a.pm,
      ca: a.ca,
      tipo: 'monstro',
      condicoes: [],
      notas: `ND ${a.nd} • ${a.tipo}`,
    })
    setPaginaAtual('combate')
  }

  const gridCols = selecionada ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-none px-8 pt-7 pb-5"
        style={{ borderBottom: '1px solid rgba(212,165,74,0.13)' }}
      >
        <h1
          className="font-cinzel font-bold"
          style={{ fontSize: 38, color: '#DEBA6A', letterSpacing: 1, textShadow: '0 2px 18px rgba(212,165,74,0.18)' }}
        >
          Ameaças
        </h1>
        <p className="font-garamond mt-1" style={{ color: '#B89D72', fontSize: 15.5 }}>
          {ameacas.length} criaturas — do ND 1/4 ao lendário
        </p>
      </div>

      {/* Split Body */}
      <div className="flex flex-1 overflow-hidden gap-6 px-8 py-5">
        {/* LEFT */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ flex: selecionada ? '0 1 430px' : '1 1 auto' }}
        >
          {/* Filtros */}
          <div className="flex gap-3 mb-4">
            {/* Busca */}
            <div className="relative flex-1">
              <Icon name="icResearch" size={16} color="#7A6A50" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar criatura..."
                style={{
                  width: '100%',
                  background: '#150F18',
                  border: '1px solid rgba(212,165,74,0.20)',
                  borderRadius: 6,
                  padding: '8px 12px 8px 36px',
                  color: '#F1E3C2',
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 15,
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.55)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.20)' }}
              />
            </div>
            <Select
              value={ndFiltro}
              onChange={e => setNdFiltro(e.target.value)}
              options={ndsUnicos.map(n => ({ value: n, label: n === 'Todos' ? 'Todos os NDs' : `ND ${n}` }))}
              className="w-36"
            />
            <Select
              value={tipoFiltro}
              onChange={e => setTipoFiltro(e.target.value)}
              options={tiposUnicos.map(t => ({ value: t, label: t }))}
              className="w-40"
            />
          </div>

          <p className="font-cinzel text-xs mb-3" style={{ color: '#7A6A50' }}>
            {filtradas.length} criatura(s) encontrada(s)
          </p>

          {/* List / Grid */}
          <div className={`grid ${gridCols} gap-3 overflow-y-auto scrollbar-thin pr-1`}>
            {filtradas.map(a => (
              <AmeacaCard
                key={a.id}
                ameaca={a}
                selected={selecionada?.id === a.id}
                compact={!!selecionada}
                onClick={() => { setSelecionada(a); setAba('Visão Geral') }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        {selecionada && (
          <div
            className="flex-1 min-w-[380px] flex flex-col overflow-hidden rounded-lg animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)',
              border: '1px solid rgba(212,165,74,0.22)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Portrait / Header */}
            <div
              className="relative h-[260px] flex-none overflow-hidden rounded-t-lg flex items-end"
              style={{ background: '#0f0b13' }}
            >
              {(selecionada as any).imagem && (
                <img
                  src={(selecionada as any).imagem}
                  alt={selecionada.nome}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              {/* Ícone de perigo centralizado quando sem imagem */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
                <Icon name="icDanger" size={80} color={`${getNdCor(selecionada.nd)}33`} />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,20,30,1) 0%, rgba(26,20,30,0.5) 45%, transparent 100%)' }}
              />
              <button
                onClick={() => setSelecionada(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded z-10"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#B89D72' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F1E3C2' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#B89D72' }}
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative px-5 pb-4 z-10 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-cinzel text-[0.65rem] uppercase tracking-[2px] px-2 py-0.5 rounded"
                    style={{
                      color: getNdCor(selecionada.nd),
                      background: `${getNdCor(selecionada.nd)}22`,
                      border: `1px solid ${getNdCor(selecionada.nd)}55`,
                    }}
                  >
                    ND {selecionada.nd}
                  </span>
                  <span className="font-garamond text-sm" style={{ color: '#8f8472' }}>
                    {selecionada.tipo} · {selecionada.tamanho}
                  </span>
                </div>
                <div className="font-cinzel font-bold text-xl leading-tight" style={{ color: '#F1E3C2' }}>
                  {selecionada.nome}
                </div>
              </div>
            </div>

            {/* Stat Boxes */}
            <div className="grid grid-cols-5 gap-0 flex-none" style={{ borderBottom: '1px solid rgba(212,165,74,0.12)' }}>
              {[
                { label: 'PV',    value: String(selecionada.pv),  color: '#E05040' },
                { label: 'CA',    value: String(selecionada.ca),  color: '#4F8FD6' },
                { label: 'PM',    value: String(selecionada.pm),  color: '#A461E8' },
                { label: 'Init',  value: selecionada.iniciativa ? `+${selecionada.iniciativa}` : '—', color: '#DEBA6A' },
                { label: 'Desl.', value: selecionada.deslocamento || '9m', color: '#6E9A52' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-3"
                  style={{
                    background: '#140F18',
                    borderRight: i < 4 ? '1px solid rgba(212,165,74,0.10)' : 'none',
                  }}
                >
                  <span className="font-cinzel font-bold text-base leading-none" style={{ color: s.color }}>
                    {s.value}
                  </span>
                  <span className="font-cinzel text-[0.55rem] uppercase tracking-wider mt-1" style={{ color: '#7A6A50' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-none" style={{ borderBottom: '1px solid rgba(212,165,74,0.12)' }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setAba(tab)}
                  className="relative px-3 py-2.5 font-cinzel text-xs tracking-wide transition-colors duration-150"
                  style={{ color: aba === tab ? '#F0E4C8' : '#857a68' }}
                >
                  {tab}
                  {aba === tab && (
                    <span
                      className="absolute left-0 right-0"
                      style={{
                        bottom: -1,
                        height: 2.5,
                        background: 'linear-gradient(90deg, #D4A54A, #DEBA6A)',
                        boxShadow: '0 0 8px rgba(212,165,74,0.55)',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </button>
              ))}
              <div className="ml-auto pr-3 flex items-center">
                <Button
                  variant="blood"
                  size="sm"
                  onClick={() => adicionarAoCombate(selecionada)}
                  style={{ fontSize: 10, padding: '4px 10px', gap: 4 }}
                >
                  <Swords className="w-3 h-3" />
                  Combate
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
              {aba === 'Visão Geral'  && <TabVisaoGeral ameaca={selecionada} />}
              {aba === 'Habilidades' && <TabHabilidades ameaca={selecionada} />}
              {aba === 'Estratégia'  && <TabEstrategia ameaca={selecionada} />}
              {aba === 'Tesouro'     && <TabTesouro ameaca={selecionada} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AmeacaCard({ ameaca, selected, compact, onClick }: {
  ameaca: Ameaca
  selected: boolean
  compact: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const ndCor = getNdCor(ameaca.nd)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: compact ? '10px 12px' : '12px 14px',
        background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)',
        border: selected
          ? '1px solid #D4A54A'
          : `1px solid rgba(212,165,74,${hovered ? '0.45' : '0.18'})`,
        boxShadow: selected
          ? '0 0 18px rgba(212,165,74,0.18)'
          : hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered && !selected ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="font-cinzel font-semibold text-sm leading-tight" style={{ color: '#F1E3C2' }}>
            {ameaca.nome}
          </div>
          <div className="font-garamond text-xs mt-0.5" style={{ color: '#7a6f5c' }}>
            {ameaca.tipo} · {ameaca.tamanho}
          </div>
        </div>
        <span
          className="font-cinzel text-[0.6rem] uppercase tracking-[1px] px-2 py-0.5 rounded flex-none"
          style={{
            color: ndCor,
            background: `${ndCor}22`,
            border: `1px solid ${ndCor}55`,
          }}
        >
          ND {ameaca.nd}
        </span>
      </div>

      {!compact && (
        <div className="grid grid-cols-3 gap-0 mt-3 rounded overflow-hidden" style={{ border: '1px solid rgba(212,165,74,0.12)' }}>
          {[
            { label: 'PV', value: ameaca.pv, color: '#E05040' },
            { label: 'CA', value: ameaca.ca, color: '#4F8FD6' },
            { label: 'PM', value: ameaca.pm, color: '#A461E8' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-2"
              style={{
                background: '#140F18',
                borderRight: i < 2 ? '1px solid rgba(212,165,74,0.10)' : 'none',
              }}
            >
              <span className="font-cinzel font-bold text-sm leading-none" style={{ color: s.color }}>
                {s.value}
              </span>
              <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-0.5" style={{ color: '#7A6A50' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function fmtMod(val: number): string {
  return val >= 0 ? `+${val}` : `${val}`
}

function TabVisaoGeral({ ameaca }: { ameaca: Ameaca }) {
  const ataques = (ameaca as any).ataques as Array<{ nome: string; 'bônus': string; dano: string; critico?: string; tipo?: string }> | undefined
  const atributos = (ameaca as any).atributos as { for: number; des: number; con: number; int: number; sab: number; car: number } | undefined
  const resistencias = (ameaca as any).resistencias as { fortitude: number; reflexos: number; vontade: number } | undefined

  return (
    <div className="space-y-4">
      {ameaca.descricao && (
        <p className="font-garamond leading-relaxed" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.72 }}>
          {ameaca.descricao}
        </p>
      )}

      {/* Atributos */}
      {atributos && (
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(212,165,74,0.14)' }}>
          <div className="font-cinzel text-xs uppercase tracking-widest px-4 py-2" style={{ color: '#B89D72', background: '#0f0b13' }}>
            Atributos
          </div>
          <div className="grid grid-cols-6">
            {([
              { label: 'FOR', val: atributos.for },
              { label: 'DES', val: atributos.des },
              { label: 'CON', val: atributos.con },
              { label: 'INT', val: atributos.int },
              { label: 'SAB', val: atributos.sab },
              { label: 'CAR', val: atributos.car },
            ] as const).map((a, i) => (
              <div
                key={i}
                className="flex flex-col items-center py-3"
                style={{
                  background: '#140F18',
                  borderRight: i < 5 ? '1px solid rgba(212,165,74,0.10)' : 'none',
                }}
              >
                <span className="font-cinzel font-bold text-base leading-none" style={{ color: '#DEBA6A' }}>
                  {fmtMod(a.val)}
                </span>
                <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-1" style={{ color: '#7A6A50' }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resistências */}
      {resistencias && (
        <div className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(212,165,74,0.14)' }}>
          {([
            { label: 'Fortitude', val: resistencias.fortitude },
            { label: 'Reflexos',  val: resistencias.reflexos },
            { label: 'Vontade',   val: resistencias.vontade },
          ] as const).map((r, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-3"
              style={{
                background: '#140F18',
                borderRight: i < 2 ? '1px solid rgba(212,165,74,0.10)' : 'none',
              }}
            >
              <span className="font-cinzel font-bold text-base leading-none" style={{ color: '#4F8FD6' }}>
                {fmtMod(r.val)}
              </span>
              <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-1" style={{ color: '#7A6A50' }}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Ataques */}
      {ataques?.length ? (
        <div className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
          <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#B89D72' }}>
            Ataques
          </div>
          <div className="space-y-2">
            {ataques.map((atk, i) => (
              <div key={i} className="flex items-center gap-3">
                <span style={{ color: '#E05040' }}>⚔</span>
                <span className="font-garamond text-sm" style={{ color: '#F1E3C2' }}>
                  <strong>{atk.nome}:</strong>{' '}
                  <span style={{ color: '#DEBA6A' }}>{atk['bônus']}</span>
                  {' '}({atk.dano}
                  {atk.critico ? `, crit ${atk.critico}` : ''}
                  {atk.tipo ? `, ${atk.tipo}` : ''})
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function TabHabilidades({ ameaca }: { ameaca: Ameaca }) {
  const habs = (ameaca as any).habilidades as string[] | undefined
  if (!habs?.length) return <p className="font-garamond text-sm" style={{ color: '#7A6A50' }}>Nenhuma habilidade especial.</p>
  return (
    <div className="space-y-3">
      {habs.map((h, i) => {
        const dotIdx = h.indexOf('.')
        const nome = dotIdx > 0 && dotIdx < 50 ? h.slice(0, dotIdx) : `Habilidade ${i + 1}`
        const desc = dotIdx > 0 && dotIdx < 50 ? h.slice(dotIdx + 1).trim() : h
        return (
          <div key={i} className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
            <div className="font-cinzel font-semibold text-sm mb-1.5" style={{ color: '#F1E3C2' }}>{nome}</div>
            <p className="font-garamond text-sm leading-relaxed" style={{ color: '#B89D72' }}>{desc}</p>
          </div>
        )
      })}
    </div>
  )
}

function TabEstrategia({ ameaca }: { ameaca: Ameaca }) {
  const taticas = (ameaca as any).taticas as string | undefined
  const habitat = (ameaca as any).habitat as string | undefined
  return (
    <div className="space-y-4">
      {taticas && (
        <div>
          <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#B89D72' }}>Táticas</div>
          <p className="font-garamond leading-relaxed" style={{ fontSize: 15, color: '#cfc3aa', lineHeight: 1.72 }}>{taticas}</p>
        </div>
      )}
      {habitat && (
        <div>
          <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#B89D72' }}>Habitat</div>
          <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{habitat}</p>
        </div>
      )}
      {!taticas && !habitat && (
        <p className="font-garamond text-sm" style={{ color: '#7A6A50' }}>Estratégia não disponível.</p>
      )}
    </div>
  )
}

function TabTesouro({ ameaca }: { ameaca: Ameaca }) {
  const tesouro = (ameaca as any).tesouro as string | undefined
  if (!tesouro) return <p className="font-garamond text-sm" style={{ color: '#7A6A50' }}>Nenhuma informação de tesouro disponível.</p>
  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.20)' }}>
        <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#B89D72' }}>Tesouro</div>
        <p className="font-garamond leading-relaxed" style={{ fontSize: 15.5, color: '#cfc3aa', lineHeight: 1.72 }}>{tesouro}</p>
      </div>
    </div>
  )
}
