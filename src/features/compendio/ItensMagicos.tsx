import { useState, useMemo } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Input'
import { X } from 'lucide-react'
import data from '@/data/itensMagicos.json'

type Categoria = 'todos' | 'encantosArmas' | 'armasEspecificas' | 'armaduras' | 'esotericos' | 'acessorios' | 'liturgicos' | 'artefatos'

interface ItemMagico {
  id: string
  nome: string
  categoria?: string
  preco?: string
  divindade?: string
  prereq?: string
  descricao: string
  fonte: string
  tipo?: string
  poderes?: string
  requisitos?: string
  especial?: string
  modificadores?: string
  custo?: string
  virtudes?: Record<string, string>
  poder_unido?: string
  destruicao?: string
}

const CAT_LABEL: Record<Categoria, string> = {
  todos:           'Todos',
  encantosArmas:   'Encantos p/ Armas',
  armasEspecificas:'Armas Específicas',
  armaduras:       'Armaduras & Escudos',
  esotericos:      'Esotéricos',
  acessorios:      'Acessórios',
  liturgicos:      'Litúrgicos',
  artefatos:       'Artefatos',
}

const CAT_COR: Record<Categoria, string> = {
  todos:           '#D4A54A',
  encantosArmas:   '#E05040',
  armasEspecificas:'#E05040',
  armaduras:       '#4F8FD6',
  esotericos:      '#A461E8',
  acessorios:      '#6E9A52',
  liturgicos:      '#4FB0C6',
  artefatos:       '#DEBA6A',
}

const CAT_ICONE: Record<Categoria, string> = {
  todos:           'icTreasure',
  encantosArmas:   'icStrenght',
  armasEspecificas:'icStrenght',
  armaduras:       'icTough',
  esotericos:      'icContemplative',
  acessorios:      'icGear',
  liturgicos:      'icWillpower',
  artefatos:       'icTreasure',
}

function buildAllItems(): (ItemMagico & { _cat: Categoria })[] {
  const all: (ItemMagico & { _cat: Categoria })[] = []
  const d = data as any
  const push = (cat: Categoria, arr: ItemMagico[]) => arr?.forEach(i => all.push({ ...i, _cat: cat }))
  push('encantosArmas',    d.encantosArmas)
  push('armasEspecificas', d.armasEspecificas)
  push('armaduras',        d.encantosArmaduras)
  push('armaduras',        d.armadurasEspecificas)
  push('armaduras',        d.escudosEspecificos)
  push('esotericos',       d.encantosEsotericos)
  push('esotericos',       d.esoteriosEspecificos)
  push('acessorios',       d.encantosAcessorios)
  push('acessorios',       d.acessoriosEspecificos)
  push('liturgicos',       d.itensLiturgicos)
  push('liturgicos',       d.liturgiaDosRaidos)
  push('artefatos',        d.artefatos)
  return all
}

const allItems = buildAllItems()

const CAT_OPTS: { value: Categoria; label: string }[] = (Object.keys(CAT_LABEL) as Categoria[]).map(k => ({
  value: k,
  label: k === 'todos' ? 'Todas as Categorias' : CAT_LABEL[k],
}))

export default function ItensMagicos() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<Categoria>('todos')
  const [selecionado, setSelecionado] = useState<(ItemMagico & { _cat: Categoria }) | null>(null)

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase()
    return allItems.filter(item => {
      const matchCat = filtro === 'todos' || item._cat === filtro
      const matchBusca = !q ||
        item.nome.toLowerCase().includes(q) ||
        item.descricao.toLowerCase().includes(q) ||
        (item.divindade || '').toLowerCase().includes(q) ||
        (item.prereq || '').toLowerCase().includes(q)
      return matchCat && matchBusca
    })
  }, [busca, filtro])

  const grupos = useMemo(() => {
    const g: Partial<Record<Categoria, typeof filtrados>> = {}
    filtrados.forEach(item => {
      if (!g[item._cat]) g[item._cat] = []
      g[item._cat]!.push(item)
    })
    return g
  }, [filtrados])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(212,165,74,0.18)', paddingBottom: 16 }}>
        <div className="flex items-center gap-3 mb-1">
          <Icon name="icTreasure" size={26} color="#D4A54A" />
          <h1 className="font-cinzel font-bold" style={{ fontSize: 30, color: '#DEBA6A', letterSpacing: 1 }}>
            Itens Mágicos
          </h1>
        </div>
        <p className="font-garamond" style={{ color: '#B89D72', fontSize: 15 }}>
          {allItems.length} itens — encantos, armas, armaduras, esotéricos e artefatos de Mitos de Arton
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="icResearch" size={15} color="#7A6A50" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar itens mágicos..."
            style={{
              width: '100%', background: '#150F18',
              border: '1px solid rgba(212,165,74,0.20)', borderRadius: 6,
              padding: '7px 12px 7px 34px', color: '#F1E3C2',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.55)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(212,165,74,0.20)' }}
          />
        </div>
        <Select
          value={filtro}
          onChange={e => setFiltro(e.target.value as Categoria)}
          options={CAT_OPTS}
          className="w-52"
        />
        <span className="font-cinzel text-xs" style={{ color: '#7A6A50' }}>{filtrados.length} item(ns)</span>
      </div>

      {/* Grupos por categoria */}
      <div className="space-y-8">
        {(Object.entries(grupos) as [Categoria, typeof filtrados][]).map(([cat, items]) => {
          const cor = CAT_COR[cat]
          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-3">
                <Icon name={CAT_ICONE[cat]} size={14} color={cor} />
                <span className="font-cinzel font-semibold text-sm" style={{ color: cor }}>{CAT_LABEL[cat]}</span>
                <div className="flex-1 h-px" style={{ background: `${cor}28` }} />
                <span className="font-cinzel text-xs px-2 py-0.5 rounded" style={{ color: cor, background: `${cor}14`, border: `1px solid ${cor}38` }}>
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(item => (
                  <ItemCard key={item.id} item={item} cor={cor} onClick={() => setSelecionado(item)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {selecionado && <ItemModal item={selecionado} onClose={() => setSelecionado(null)} />}
    </div>
  )
}

function ItemCard({ item, cor, onClick }: { item: ItemMagico & { _cat: Categoria }; cor: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg cursor-pointer transition-all duration-150"
      style={{
        padding: '12px 14px',
        background: 'linear-gradient(180deg, #211922 0%, #18121c 100%)',
        border: '1px solid rgba(193, 142, 52, 0.25)',
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.55)' : '0 4px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="font-cinzel font-semibold text-sm leading-tight" style={{ color: '#F1E3C2' }}>{item.nome}</span>
        {item.preco && (
          <span className="font-cinzel text-[0.6rem] px-1.5 py-0.5 rounded flex-none" style={{ color: '#DEBA6A', background: 'rgba(212,165,74,0.12)', border: '1px solid rgba(212,165,74,0.28)' }}>
            {item.preco}
          </span>
        )}
      </div>
      {item.divindade && (
        <p className="font-garamond text-xs mb-1" style={{ color: cor }}>Divindade: {item.divindade}</p>
      )}
      {item.prereq && (
        <p className="font-garamond text-xs italic mb-1" style={{ color: '#7A6A50' }}>Pré-req: {item.prereq}</p>
      )}
      <p className="font-garamond text-xs leading-snug" style={{ color: '#8f8472', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {item.descricao}
      </p>
    </div>
  )
}

function ItemModal({ item, onClose }: { item: ItemMagico & { _cat: Categoria }; onClose: () => void }) {
  const cor = CAT_COR[item._cat]

  const campos = [
    item.preco       && { label: 'Preço',      value: item.preco },
    item.categoria   && { label: 'Categoria',   value: item.categoria },
    item.tipo        && { label: 'Tipo',         value: item.tipo },
    item.divindade   && { label: 'Divindade',   value: item.divindade },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0" style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-xl animate-page-open overflow-hidden"
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,165,74,0.30)',
          border: `1px solid ${cor}44`,
        }}
      >
        {/* Header */}
        <div className="flex-none p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className="flex-none w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `radial-gradient(circle at 50% 28%, ${cor}44, rgba(13,9,17,0.8))`, border: `2px solid ${cor}66`, boxShadow: `0 0 16px ${cor}33` }}>
              <Icon name={CAT_ICONE[item._cat]} size={24} color={cor} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-cinzel text-[0.65rem] uppercase tracking-[2px]" style={{ color: cor }}>
                {CAT_LABEL[item._cat]}
              </span>
              <h2 className="font-cinzel font-bold text-xl mt-0.5" style={{ color: '#F1E3C2' }}>{item.nome}</h2>
            </div>
            <button onClick={onClose} className="flex-none w-8 h-8 flex items-center justify-center rounded" style={{ color: '#7A6A50' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#F1E3C2' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#7A6A50' }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {campos.length > 0 && (
            <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${Math.min(campos.length, 4)}, 1fr)` }}>
              {campos.map((c, i) => (
                <div key={i} className="flex flex-col items-center rounded-lg py-2 px-1" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
                  <span className="font-cinzel font-semibold text-xs leading-none text-center" style={{ color: '#DEBA6A' }}>{c.value}</span>
                  <span className="font-cinzel text-[0.5rem] uppercase tracking-wide mt-1 text-center" style={{ color: '#7A6A50' }}>{c.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(212,165,74,0.4), transparent)' }} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-6 space-y-4">
          <p className="font-garamond leading-relaxed" style={{ fontSize: 15.5, color: '#cfc3aa', lineHeight: 1.72 }}>{item.descricao}</p>

          {item.prereq && (
            <Section label="Pré-requisito">
              <p className="font-garamond text-sm italic" style={{ color: '#B89D72' }}>{item.prereq}</p>
            </Section>
          )}
          {item.requisitos && (
            <Section label="Requisitos para Empunhar">
              <p className="font-garamond text-sm" style={{ color: '#B89D72' }}>{item.requisitos}</p>
            </Section>
          )}
          {item.poderes && (
            <Section label="Poderes" accent={cor}>
              <p className="font-garamond text-sm leading-relaxed" style={{ color: '#F1E3C2' }}>{item.poderes}</p>
            </Section>
          )}
          {item.modificadores && (
            <Section label="Modificadores" accent={cor}>
              <p className="font-garamond text-sm" style={{ color: '#F1E3C2' }}>{item.modificadores}</p>
            </Section>
          )}
          {item.especial && (
            <Section label="Especial" accent="#A461E8">
              <p className="font-garamond text-sm" style={{ color: '#c2b596' }}>{item.especial}</p>
            </Section>
          )}
          {item.custo && (
            <div className="rounded-lg p-4" style={{ background: 'rgba(224,80,64,0.10)', border: '1px solid rgba(224,80,64,0.25)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#E05040' }}>Custo / Maldição</div>
              <p className="font-garamond text-sm" style={{ color: '#cfc3aa' }}>{item.custo}</p>
            </div>
          )}
          {item.virtudes && (
            <div>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-3" style={{ color: '#DEBA6A' }}>Virtudes Individuais</div>
              <div className="space-y-2">
                {Object.entries(item.virtudes).map(([nome, desc]) => (
                  <div key={nome} className="rounded-lg p-3" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
                    <div className="font-cinzel text-xs font-semibold mb-1 capitalize" style={{ color: '#DEBA6A' }}>{nome}</div>
                    <p className="font-garamond text-sm" style={{ color: '#B89D72' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {item.poder_unido && (
            <div className="rounded-lg p-4" style={{ background: 'rgba(212,165,74,0.08)', border: '1px solid rgba(212,165,74,0.30)' }}>
              <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: '#DEBA6A' }}>Poder Unido</div>
              <p className="font-garamond text-sm" style={{ color: '#F1E3C2' }}>{item.poder_unido}</p>
            </div>
          )}
          {item.destruicao && (
            <Section label="Como Destruir">
              <p className="font-garamond text-sm" style={{ color: '#B89D72' }}>{item.destruicao}</p>
            </Section>
          )}
          <p className="font-cinzel text-xs" style={{ color: '#7A6A50' }}>Fonte: {item.fonte}</p>
        </div>
      </div>
    </div>
  )
}

function Section({ label, accent = '#B89D72', children }: { label: string; accent?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4" style={{ background: '#140F18', border: '1px solid rgba(212,165,74,0.14)' }}>
      <div className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>{label}</div>
      {children}
    </div>
  )
}
