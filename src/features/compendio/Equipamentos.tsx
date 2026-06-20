import { useState, useMemo } from 'react'
import equipamentosData from '@/data/equipamentos.json'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X } from 'lucide-react'
import type { Equipamento } from '@/types'

const CAT_ICONE: Record<string, string> = {
  arma: 'icStrenght',
  armadura: 'icTough',
  escudo: 'icTough',
  municao: 'icPrecision',
  itemGeral: 'icGear',
  pocaoOuPergaminho: 'icKnowledge',
  default: 'icGear',
}

const CAT_COR: Record<string, string> = {
  arma:              '#E05040',
  armadura:          '#4F8FD6',
  escudo:            '#4F8FD6',
  municao:           '#C89B3C',
  itemGeral:         '#8A93A6',
  pocaoOuPergaminho: '#A461E8',
}

const CAT_LABEL: Record<string, string> = {
  arma: 'Arma', armadura: 'Armadura', escudo: 'Escudo',
  municao: 'Munição', itemGeral: 'Item', pocaoOuPergaminho: 'Poção/Perg.',
}

const allItems: Equipamento[] = [
  ...equipamentosData.armas,
  ...equipamentosData.municoes,
  ...equipamentosData.armaduras,
  ...equipamentosData.escudos,
  ...equipamentosData.alimentacao,
  ...equipamentosData.animais,
  ...equipamentosData.catalisadoresAlquimicos,
  ...equipamentosData.equipamentoAnimal,
  ...equipamentosData.equipamentoDeAventura,
  ...equipamentosData.itensEsotericos,
  ...equipamentosData.ferramentas,
  ...equipamentosData.preparadosAlquimicos,
  ...equipamentosData.servicos,
  ...equipamentosData.veiculos,
  ...equipamentosData.venenosAlquimicos,
  ...equipamentosData.vestuario,
  ...equipamentosData.pocoesEPergaminhos,
] as unknown as Equipamento[]

type CatFiltro = 'todos' | 'arma' | 'armadura' | 'escudo' | 'itemGeral' | 'municao' | 'pocaoOuPergaminho'

const CAT_OPTIONS: { value: CatFiltro; label: string }[] = [
  { value: 'todos',              label: 'Todas as Categorias' },
  { value: 'arma',               label: 'Armas' },
  { value: 'armadura',           label: 'Armaduras' },
  { value: 'escudo',             label: 'Escudos' },
  { value: 'itemGeral',          label: 'Itens Gerais' },
  { value: 'municao',            label: 'Munições' },
  { value: 'pocaoOuPergaminho',  label: 'Poções & Pergaminhos' },
]

export default function Equipamentos() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<CatFiltro>('todos')
  const [selecionado, setSelecionado] = useState<Equipamento | null>(null)

  const filtrados = useMemo(() =>
    allItems.filter(item => {
      const matchCat = categoria === 'todos' || item.categoria === categoria
      const matchBusca = !busca ||
        item.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.descricao?.toLowerCase().includes(busca.toLowerCase())
      return matchCat && matchBusca
    }), [busca, categoria])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-none px-8 pt-7 pb-5"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.13)' }}
      >
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icPrecision" size={28} color="#C89B3C" />
          <h1
            className="font-cinzel font-bold"
            style={{ fontSize: 38, color: '#E4C16A', letterSpacing: 1, textShadow: '0 2px 18px rgba(200,155,60,0.18)' }}
          >
            Equipamentos
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#a99c86', fontSize: 15.5 }}>
          Armas, armaduras, itens e artefatos — clique para ver detalhes
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="flex-none flex items-center gap-3 px-8 py-3"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.10)', background: 'rgba(15,11,19,0.5)' }}
      >
        <span className="font-cinzel text-xs flex-none" style={{ color: '#6e6356', minWidth: 70 }}>
          {filtrados.length} item{filtrados.length !== 1 ? 'ns' : ''}
        </span>
        <div className="flex-1 relative">
          <Icon name="icResearch" size={16} color="#6e6356" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar equipamento..."
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
          value={categoria}
          onChange={e => setCategoria(e.target.value as CatFiltro)}
          options={CAT_OPTIONS}
          className="w-52"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-8 py-4">
        <div className="flex flex-col gap-2.5">
          {filtrados.map(item => (
            <EquipamentoCard
              key={item.id}
              item={item}
              onClick={() => setSelecionado(item)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selecionado && (
        <EquipamentoModal item={selecionado} onClose={() => setSelecionado(null)} />
      )}
    </div>
  )
}

function EquipamentoCard({ item, onClick }: { item: Equipamento; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const cat = item.categoria as string
  const cor = CAT_COR[cat] ?? '#C89B3C'
  const icone = CAT_ICONE[cat] ?? CAT_ICONE.default

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
          width: 56,
          height: 56,
          background: `radial-gradient(circle at 50% 28%, ${cor}44, rgba(13,9,17,0.7))`,
          border: `1px solid ${cor}66`,
          boxShadow: `inset 0 0 16px rgba(0,0,0,0.5)`,
        }}
      >
        <Icon name={icone} size={22} color={cor} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-cinzel font-semibold text-sm" style={{ color: '#E8DFCF' }}>
            {item.nome}
          </span>
          <span
            className="font-cinzel text-[0.6rem] px-1.5 py-0.5 rounded"
            style={{ color: cor, background: `${cor}22`, border: `1px solid ${cor}44` }}
          >
            {CAT_LABEL[cat] ?? cat}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {(item as any).proficiencia && (
            <span className="font-garamond text-xs" style={{ color: '#8f8472' }}>
              {(item as any).proficiencia}
            </span>
          )}
          {(item as any).tipo && (
            <span className="font-garamond text-xs" style={{ color: '#6e6356' }}>
              {(item as any).tipo}
            </span>
          )}
        </div>
      </div>

      {/* Direita: peso + preço */}
      <div className="flex items-center gap-4 flex-none">
        {(item as any).espacos && (
          <div className="flex items-center gap-1.5">
            <Icon name="icAbundant" size={13} color="#6e6356" />
            <span className="font-cinzel text-xs" style={{ color: '#8f8472' }}>
              {(item as any).espacos} espaço{Number((item as any).espacos) !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        {item.preco && (
          <div className="flex items-center gap-1.5">
            <Icon name="icTreasure" size={13} color="#C89B3C" />
            <span className="font-cinzel font-semibold text-sm" style={{ color: '#E4C16A' }}>
              {item.preco}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function EquipamentoModal({ item, onClose }: { item: Equipamento; onClose: () => void }) {
  const cat = item.categoria as string
  const cor = CAT_COR[cat] ?? '#C89B3C'
  const icone = CAT_ICONE[cat] ?? CAT_ICONE.default

  const campos = [
    (item as any).dano          && { label: 'Dano',          value: (item as any).dano },
    (item as any).critico       && { label: 'Crítico',       value: (item as any).critico },
    (item as any).alcance       && { label: 'Alcance',       value: (item as any).alcance },
    (item as any).tipoDano      && { label: 'Tipo de Dano',  value: (item as any).tipoDano },
    (item as any).empunhadura   && { label: 'Empunhadura',   value: (item as any).empunhadura },
    (item as any).proficiencia  && { label: 'Proficiência',  value: (item as any).proficiencia },
    (item as any).defesa        && { label: 'Defesa',        value: (item as any).defesa },
    (item as any).penalidade !== undefined && (item as any).penalidade !== null
                                && { label: 'Penalidade',    value: `${(item as any).penalidade}` },
    (item as any).espacos       && { label: 'Espaços',       value: String((item as any).espacos) },
    item.preco                  && { label: 'Preço',         value: item.preco },
  ].filter(Boolean) as { label: string; value: string }[]

  const propriedades = (item as any).propriedades as string[] | undefined

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30), inset 0 0 60px rgba(0,0,0,0.4)',
          border: `1px solid ${cor}44`,
        }}
      >
        {/* Header */}
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start gap-4">
            <div
              className="flex-none w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 28%, ${cor}55, rgba(13,9,17,0.8))`,
                border: `2px solid ${cor}88`,
                boxShadow: `0 0 16px ${cor}44`,
              }}
            >
              <Icon name={icone} size={24} color={cor} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor }}>
                {CAT_LABEL[cat] ?? cat}
              </span>
              <h2 className="font-cinzel font-bold text-lg mt-0.5" style={{ color: '#E8DFCF' }}>
                {item.nome}
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

          {/* Campos */}
          {campos.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {campos.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-lg py-2 px-1"
                  style={{ background: '#120d16', border: '1px solid rgba(200,155,60,0.14)' }}
                >
                  <span className="font-cinzel font-semibold text-xs leading-none text-center" style={{ color: '#E4C16A' }}>
                    {c.value}
                  </span>
                  <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-1 text-center" style={{ color: '#6e6356' }}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-6" style={{ borderTop: '1px solid rgba(200,155,60,0.15)', marginBottom: 0 }}>
          <div className="flex items-center justify-center" style={{ marginTop: -6 }}>
            <span style={{ color: '#C89B3C', fontSize: 10, background: '#19121f', padding: '0 8px' }}>◆</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
          {item.descricao ? (
            <p className="font-garamond leading-relaxed" style={{ fontSize: 16, color: '#cfc3aa', lineHeight: 1.75 }}>
              {item.descricao}
            </p>
          ) : (
            <p className="font-garamond text-sm" style={{ color: '#6e6356' }}>
              Sem descrição adicional.
            </p>
          )}

          {propriedades?.length ? (
            <div className="mt-4">
              <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#9a8e7c' }}>
                Propriedades
              </div>
              <div className="flex flex-wrap gap-2">
                {propriedades.map((p, i) => (
                  <span
                    key={i}
                    className="font-cinzel text-xs px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(200,155,60,0.08)',
                      border: '1px solid rgba(200,155,60,0.25)',
                      color: '#c2b596',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
