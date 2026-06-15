import { useState, useMemo } from 'react'
import equipamentosData from '@/data/equipamentos.json'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Search } from 'lucide-react'
import type { Equipamento } from '@/types'

type Categoria = 'todos' | 'arma' | 'armadura' | 'escudo' | 'itemGeral' | 'municao' | 'pocaoOuPergaminho'

const categoriaLabel: Record<string, string> = {
  todos: 'Todos', arma: 'Armas', armadura: 'Armaduras', escudo: 'Escudos',
  itemGeral: 'Itens Gerais', municao: 'Munições', pocaoOuPergaminho: 'Poções & Pergaminhos',
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

const categoriaBadge: Record<string, string> = {
  arma: 'arma', armadura: 'armadura', escudo: 'escudo',
  itemGeral: 'item', municao: 'munição', pocaoOuPergaminho: 'poção/perg.',
}

function getBadgeVariant(cat: string): 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple' {
  if (cat === 'arma') return 'blood'
  if (cat === 'armadura' || cat === 'escudo') return 'blue'
  if (cat === 'pocaoOuPergaminho') return 'purple'
  return 'gray'
}

function getProfBadgeVariant(prof: string): 'gold' | 'blood' | 'gray' {
  if (prof === 'marcial') return 'blood'
  if (prof === 'exótica') return 'gold'
  return 'gray'
}

export default function Equipamentos() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('todos')
  const [tipoArma, setTipoArma] = useState<string>('todos')
  const [selecionado, setSelecionado] = useState<Equipamento | null>(null)

  const filtrados = useMemo(() => {
    return allItems.filter(item => {
      const matchCat = categoria === 'todos' || item.categoria === categoria
      const matchTipo = tipoArma === 'todos' || (item as any).tipo === tipoArma
      const matchBusca = !busca || item.nome.toLowerCase().includes(busca.toLowerCase()) ||
        item.descricao?.toLowerCase().includes(busca.toLowerCase())
      return matchCat && matchBusca && (categoria !== 'arma' || matchTipo)
    })
  }, [busca, categoria, tipoArma])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Equipamentos</h1>
        <p className="font-crimson text-parchment-muted mt-1">Armas, armaduras, itens e artefatos</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar equipamento..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <div className="flex flex-wrap gap-1">
          {(Object.keys(categoriaLabel) as Categoria[]).map(cat => (
            <button key={cat} onClick={() => setCategoria(cat)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${categoria === cat ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700 hover:text-parchment'}`}>
              {categoriaLabel[cat]}
            </button>
          ))}
        </div>
        {categoria === 'arma' && (
          <div className="flex gap-1">
            {['todos', 'simples', 'marcial'].map(t => (
              <button key={t} onClick={() => setTipoArma(t)}
                className={`px-2 py-1 text-xs font-crimson rounded transition-colors ${tipoArma === t ? 'bg-blood text-parchment' : 'text-parchment-muted hover:text-parchment'}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contagem */}
      <p className="text-parchment-dark text-xs font-crimson">{filtrados.length} item(ns) encontrado(s)</p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtrados.map(item => {
          const i = item as any
          return (
            <Card key={item.id} onClick={() => setSelecionado(item)} glow>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-cinzel font-semibold text-parchment text-sm leading-tight pr-2">{item.nome}</h3>
                <Badge variant={getBadgeVariant(item.categoria)}>{categoriaBadge[item.categoria] ?? item.categoria}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-3">
                <span className="text-parchment-muted">Preço: <span className="text-gold font-semibold">{item.preco}</span></span>
                <span className="text-parchment-muted">Espaços: <span className="text-parchment">{i.espacos ?? '—'}</span></span>
                {i.dano && <span className="text-parchment-muted">Dano: <span className="text-blood-light font-semibold">{i.dano}</span></span>}
                {i.critico && <span className="text-parchment-muted">Crítico: <span className="text-parchment">{i.critico}</span></span>}
                {i.defesa && <span className="text-parchment-muted">Defesa: <span className="text-blue-400 font-semibold">{i.defesa}</span></span>}
                {i.penalidade && i.penalidade !== '0' && <span className="text-parchment-muted">Penalid.: <span className="text-red-400">{i.penalidade}</span></span>}
              </div>
              <div className="flex flex-wrap gap-1">
                {i.proficiencia && <Badge variant={getProfBadgeVariant(i.proficiencia)}>{i.proficiencia}</Badge>}
                {i.tipoDano && <Badge variant="gray">{i.tipoDano}</Badge>}
                {i.empunhadura && <Badge variant="gray">{i.empunhadura}</Badge>}
                {i.tipo && item.categoria !== 'arma' && item.categoria !== 'armadura' && item.categoria !== 'escudo' && (
                  <Badge variant="gray">{i.tipo}</Badge>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Modal de detalhes */}
      {selecionado && (() => {
        const s = selecionado as any
        return (
          <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
            <div className="space-y-4">
              {/* Badges de categoria e tipo */}
              <div className="flex flex-wrap gap-2">
                <Badge variant={getBadgeVariant(selecionado.categoria)}>{categoriaBadge[selecionado.categoria] ?? selecionado.categoria}</Badge>
                {s.proficiencia && <Badge variant={getProfBadgeVariant(s.proficiencia)}>{s.proficiencia}</Badge>}
                {s.tipo && <Badge variant="gray">{s.tipo}</Badge>}
                {s.empunhadura && <Badge variant="gray">{s.empunhadura}</Badge>}
              </div>

              {/* Grid de stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Preço</p>
                  <p className="text-gold font-cinzel font-semibold">{selecionado.preco}</p>
                </div>
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Espaços</p>
                  <p className="text-parchment font-crimson">{s.espacos ?? '—'}</p>
                </div>
                {s.dano && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Dano</p>
                    <p className="text-blood-light font-cinzel font-semibold">{s.dano}</p>
                  </div>
                )}
                {s.critico && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Crítico</p>
                    <p className="text-parchment font-crimson">{s.critico}</p>
                  </div>
                )}
                {s.tipoDano && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Tipo de Dano</p>
                    <p className="text-parchment font-crimson">{s.tipoDano}</p>
                  </div>
                )}
                {s.alcance && s.alcance !== '-' && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Alcance</p>
                    <p className="text-parchment font-crimson">{s.alcance}</p>
                  </div>
                )}
                {s.defesa && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Bônus de Defesa</p>
                    <p className="text-blue-400 font-cinzel font-semibold">{s.defesa}</p>
                  </div>
                )}
                {s.penalidade && s.penalidade !== '0' && (
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark text-xs">Penalidade</p>
                    <p className="text-red-400 font-crimson">{s.penalidade}</p>
                  </div>
                )}
              </div>

              {s.descricao && (
                <div>
                  <h4 className="font-cinzel text-gold text-xs mb-1">Descrição</h4>
                  <p className="font-crimson text-parchment text-sm">{s.descricao}</p>
                </div>
              )}
            </div>
          </Modal>
        )
      })()}
    </div>
  )
}
