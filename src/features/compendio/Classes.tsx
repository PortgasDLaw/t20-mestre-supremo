import { useState, useMemo } from 'react'
import classesData from '@/data/classes.json'
import { Input } from '@/components/ui/Input'
import { Icon } from '@/components/ui/Icon'
import { asset } from '@/lib/asset'
import { X } from 'lucide-react'

interface HabilidadeClasse {
  nivel: number
  nome: string
  descricao: string
}

interface Progressao {
  nivel: number
  habilidade: string
}

export interface Classe {
  id: string
  nome: string
  imagem: string
  descricao: string
  atributo: string
  pv_inicial: string
  pv_por_nivel: string
  pm_por_nivel: number
  pericias_obrigatorias: string[]
  pericias_opcao: string
  proficiencias: string
  habilidades_classe: HabilidadeClasse[]
  progressao: Progressao[]
  poderes: string[]
  linhagens?: Array<{ nome: string; descricao: string }>
}

const classes: Classe[] = (classesData as any).classes || (classesData as any)

// Atribui ícone por classe
function getIconeClasse(nome: string): string {
  const n = nome.toLowerCase()
  if (['guerreiro', 'bárbaro', 'bucaneiro', 'cavaleiro', 'lutador', 'mirmidão', 'vaqueiro'].includes(n)) return 'icStrenght'
  if (['mago', 'arcanista', 'bruxeiro', 'cultivador'].includes(n)) return 'icKnowledge'
  if (['clérigo', 'paladino', 'inquisidor'].includes(n)) return 'icContemplative'
  if (['druida'].includes(n)) return 'icAbundant'
  if (['bardo', 'nobre'].includes(n)) return 'icSignal'
  if (['ladino', 'caçador'].includes(n)) return 'icHonest'
  if (['inventor'].includes(n)) return 'icGear'
  if (['hemófago'].includes(n)) return 'icDanger'
  return 'icHunter'
}

// Papel da classe baseado no atributo
function getPapelClasse(atributo: string): string {
  if (atributo.includes('Força') || atributo.includes('Constituição')) return 'COMBATE'
  if (atributo.includes('Inteligência') || atributo.includes('Carisma')) return 'ARCANA'
  if (atributo.includes('Sabedoria')) return 'DIVINA'
  if (atributo.includes('Destreza')) return 'FURTIVIDADE'
  return 'VERSÁTIL'
}

const TABS = ['Visão Geral', 'Habilidades', 'Poderes', 'Linhagens', 'Progressão'] as const
type Tab = typeof TABS[number]

export default function Classes() {
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState<Classe | null>(null)
  const [aba, setAba] = useState<Tab>('Visão Geral')

  const filtradas = useMemo(() =>
    classes.filter(c =>
      !busca ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.atributo.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

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
          Classes
        </h1>
        <p className="font-garamond mt-1" style={{ color: '#a99c86', fontSize: 15.5 }}>
          {classes.length} classes — escolha uma para ver habilidades e poderes completos
        </p>
      </div>

      {/* Split Body */}
      <div className="flex flex-1 overflow-hidden gap-6 px-8 py-5">
        {/* LEFT — lista */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ flex: selecionada ? '0 1 430px' : '1 1 auto' }}
        >
          {/* Busca */}
          <div className="mb-4 relative">
            <Icon name="icResearch" size={16} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar classe..."
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

          {/* Grid */}
          <div className={`grid ${gridCols} gap-3 overflow-y-auto scrollbar-thin pr-1`}>
            {filtradas.map(c => (
              <ClasseCard
                key={c.id}
                classe={c}
                selected={selecionada?.id === c.id}
                compact={!!selecionada}
                onClick={() => { setSelecionada(c); setAba('Visão Geral') }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — detalhe */}
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
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,20,30,1) 0%, rgba(26,20,30,0.6) 45%, transparent 100%)' }}
              />
              {/* Close btn */}
              <button
                onClick={() => setSelecionada(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded transition-colors z-10"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#a99c86' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#E8DFCF' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#a99c86' }}
              >
                <X className="w-4 h-4" />
              </button>
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                <div
                  className="font-cinzel text-[0.6rem] uppercase tracking-[3px] mb-1"
                  style={{ color: '#9a8e7c' }}
                >
                  {getPapelClasse(selecionada.atributo)}
                </div>
                <div
                  className="font-cinzel font-bold text-xl leading-tight"
                  style={{ color: '#E8DFCF' }}
                >
                  {selecionada.nome}
                </div>
                <div className="font-garamond text-sm mt-1" style={{ color: '#C89B3C' }}>
                  {selecionada.atributo}
                </div>
              </div>
            </div>

            {/* Stat Boxes */}
            <div className="grid grid-cols-4 gap-0 flex-none" style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}>
              {[
                { label: 'PV Inicial', value: selecionada.pv_inicial },
                { label: 'PV/Nível', value: selecionada.pv_por_nivel },
                { label: 'PM/Nível', value: `+${selecionada.pm_por_nivel}` },
                { label: 'Perícias', value: String(selecionada.pericias_obrigatorias.length) },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-3 px-2"
                  style={{
                    background: '#120d16',
                    borderRight: i < 3 ? '1px solid rgba(200,155,60,0.10)' : 'none',
                  }}
                >
                  <span
                    className="font-cinzel font-bold text-base leading-none"
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
            <div
              className="flex flex-none"
              style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}
            >
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

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">
              {aba === 'Visão Geral'  && <TabVisaoGeral classe={selecionada} />}
              {aba === 'Habilidades' && <TabHabilidades classe={selecionada} />}
              {aba === 'Poderes'     && <TabPoderes classe={selecionada} />}
              {aba === 'Linhagens'   && <TabLinhagens classe={selecionada} />}
              {aba === 'Progressão'  && <TabProgressao classe={selecionada} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ClasseCard({ classe, selected, compact, onClick }: {
  classe: Classe
  selected: boolean
  compact: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const icone = getIconeClasse(classe.nome)
  const papel = getPapelClasse(classe.atributo)

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
          : hovered
            ? '0 10px 28px rgba(0,0,0,0.55)'
            : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered && !selected ? 'translateY(-3px)' : 'none',
      }}
    >
      {/* Disco de ícone */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
        style={{
          background: 'radial-gradient(circle at 50% 32%, rgba(200,155,60,0.28), rgba(18,13,22,0.7))',
          border: '1px solid rgba(200,155,60,0.45)',
        }}
      >
        <Icon name={icone} size={22} color={selected ? '#E4C16A' : '#C89B3C'} />
      </div>

      {/* Role */}
      <div
        className="font-cinzel text-[0.55rem] uppercase tracking-[2px] mb-0.5"
        style={{ color: '#6e6356' }}
      >
        {papel}
      </div>

      {/* Nome */}
      <div
        className="font-cinzel font-semibold leading-tight"
        style={{ fontSize: 17, color: '#E8DFCF', letterSpacing: '0.4px' }}
      >
        {classe.nome}
      </div>

      {/* Atributo */}
      {!compact && (
        <div
          className="font-garamond mt-1 text-sm leading-snug"
          style={{ color: '#8f8472' }}
        >
          {classe.atributo}
        </div>
      )}
    </div>
  )
}

function TabVisaoGeral({ classe }: { classe: Classe }) {
  return (
    <div className="space-y-4">
      <p className="font-garamond leading-relaxed drop-cap" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.72 }}>
        {classe.descricao}
      </p>
      <div
        className="rounded-lg p-4"
        style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
      >
        <div
          className="font-cinzel text-xs uppercase tracking-widest mb-2"
          style={{ color: '#9a8e7c' }}
        >
          Proficiências
        </div>
        <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{classe.proficiencias}</p>
      </div>
      <div
        className="rounded-lg p-4"
        style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
      >
        <div
          className="font-cinzel text-xs uppercase tracking-widest mb-2"
          style={{ color: '#9a8e7c' }}
        >
          Perícias Obrigatórias
        </div>
        <div className="flex flex-wrap gap-1.5">
          {classe.pericias_obrigatorias.map((p, i) => (
            <span
              key={i}
              className="font-cinzel text-[0.65rem] px-2 py-0.5 rounded"
              style={{
                background: 'rgba(200,155,60,0.08)',
                border: '1px solid rgba(200,155,60,0.28)',
                color: '#c2b596',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      {classe.pericias_opcao && (
        <div
          className="rounded-lg p-4"
          style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
        >
          <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8e7c' }}>
            Perícias Opcionais
          </div>
          <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{classe.pericias_opcao}</p>
        </div>
      )}
    </div>
  )
}

function TabHabilidades({ classe }: { classe: Classe }) {
  if (!classe.habilidades_classe?.length) {
    return <p className="font-garamond text-sm" style={{ color: '#6e6356' }}>Nenhuma habilidade registrada.</p>
  }
  return (
    <div className="space-y-3">
      {classe.habilidades_classe.map((h, i) => (
        <div
          key={i}
          className="rounded-lg p-4"
          style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-cinzel font-semibold text-sm" style={{ color: '#E8DFCF' }}>{h.nome}</span>
            <span
              className="font-cinzel text-[0.6rem] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(200,155,60,0.12)', color: '#E4C16A', border: '1px solid rgba(200,155,60,0.3)' }}
            >
              Nível {h.nivel}
            </span>
          </div>
          <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{h.descricao}</p>
        </div>
      ))}
    </div>
  )
}

function TabPoderes({ classe }: { classe: Classe }) {
  if (!classe.poderes?.length) {
    return <p className="font-garamond text-sm" style={{ color: '#6e6356' }}>Nenhum poder listado.</p>
  }
  return (
    <div className="space-y-2">
      <p className="font-cinzel text-xs mb-3" style={{ color: '#9a8e7c' }}>
        {classe.poderes.length} poderes disponíveis
      </p>
      {classe.poderes.map((p, i) => {
        const sep = p.indexOf(' — ')
        const nome = sep > -1 ? p.slice(0, sep) : p
        const desc = sep > -1 ? p.slice(sep + 3) : ''
        return (
          <div key={i} className="rounded-lg px-4 py-3" style={{ background: i % 2 === 0 ? '#1a141e' : '#16111b', border: '1px solid rgba(200,155,60,0.10)' }}>
            <span className="font-cinzel font-semibold text-sm" style={{ color: '#E8DFCF' }}>{nome}</span>
            {desc && <span className="font-garamond text-sm" style={{ color: '#8f8472' }}> — {desc}</span>}
          </div>
        )
      })}
    </div>
  )
}

function TabLinhagens({ classe }: { classe: Classe }) {
  if (!classe.linhagens?.length) {
    return <p className="font-garamond text-sm" style={{ color: '#6e6356' }}>Esta classe não possui linhagens.</p>
  }
  return (
    <div className="space-y-4">
      {classe.linhagens.map((l, i) => (
        <div key={i} className="rounded-lg p-4" style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}>
          <div className="font-cinzel font-semibold text-sm mb-2" style={{ color: '#E4C16A' }}>{l.nome}</div>
          <p className="font-garamond text-sm leading-relaxed" style={{ color: '#a99c86' }}>{l.descricao}</p>
        </div>
      ))}
    </div>
  )
}

function TabProgressao({ classe }: { classe: Classe }) {
  if (!classe.progressao?.length) {
    return <p className="font-garamond text-sm" style={{ color: '#6e6356' }}>Progressão não disponível.</p>
  }
  return (
    <div className="space-y-1">
      {classe.progressao.map((p, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded px-3 py-2"
          style={{ background: i % 2 === 0 ? '#1a141e' : '#16111b' }}
        >
          <span
            className="font-cinzel font-bold text-xs w-8 text-center flex-none"
            style={{ color: '#E4C16A' }}
          >
            {p.nivel}
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'rgba(200,155,60,0.10)' }}
          />
          <span className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{p.habilidade}</span>
        </div>
      ))}
    </div>
  )
}
