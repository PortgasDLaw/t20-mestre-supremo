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

function getBadgeVariant(cat: string): 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple' {
  if (cat === 'arma') return 'blood'
  if (cat === 'armadura' || cat === 'escudo') return 'blue'
  if (cat === 'pocaoOuPergaminho') return 'purple'
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
        {filtrados.map(item => (
          <Card key={item.id} onClick={() => setSelecionado(item)} glow>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-cinzel font-semibold text-parchment text-sm">{item.nome}</h3>
              <Badge variant={getBadgeVariant(item.categoria)}>{item.categoria}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-2">
              <span className="text-parchment-muted">Preço: <span className="text-gold">{item.preco}</span></span>
              <span className="text-parchment-muted">Peso: <span className="text-parchment">{item.peso}</span></span>
              {(item as any).dano && <span className="text-parchment-muted">Dano: <span className="text-blood-light">{(item as any).dano}</span></span>}
              {(item as any).critico && <span className="text-parchment-muted">Crítico: <span className="text-parchment">{(item as any).critico}</span></span>}
              {(item as any).bonus && <span className="text-parchment-muted">Bônus: <span className="text-blue-400">{(item as any).bonus}</span></span>}
              {(item as any).penalidade && <span className="text-parchment-muted">Penalid.: <span className="text-red-400">{(item as any).penalidade}</span></span>}
            </div>
            {(item as any).propriedades?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {(item as any).propriedades.map((p: string) => <Badge key={p} variant="gray">{p}</Badge>)}
              </div>
            )}
            <p className="text-parchment-muted font-crimson text-xs line-clamp-2">{item.descricao}</p>
          </Card>
        ))}
      </div>

      {/* Modal de detalhes */}
      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge variant={getBadgeVariant(selecionado.categoria)}>{selecionado.categoria}</Badge>
              {(selecionado as any).tipo && <Badge variant="gray">{(selecionado as any).tipo}</Badge>}
              {(selecionado as any).escola && <Badge variant="purple">{(selecionado as any).escola}</Badge>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark text-xs">Preço</p>
                <p className="text-gold font-cinzel font-semibold">{selecionado.preco}</p>
              </div>
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark text-xs">Peso</p>
                <p className="text-parchment font-crimson">{selecionado.peso}</p>
              </div>
              {(selecionado as any).dano && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Dano</p>
                  <p className="text-blood-light font-cinzel font-semibold">{(selecionado as any).dano}</p>
                </div>
              )}
              {(selecionado as any).critico && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Crítico</p>
                  <p className="text-parchment font-crimson">{(selecionado as any).critico}</p>
                </div>
              )}
              {(selecionado as any).alcance && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Alcance</p>
                  <p className="text-parchment font-crimson text-xs">{(selecionado as any).alcance}</p>
                </div>
              )}
              {(selecionado as any).tipoDano && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Tipo de Dano</p>
                  <p className="text-parchment font-crimson">{(selecionado as any).tipoDano}</p>
                </div>
              )}
              {(selecionado as any).bonus && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Bônus CA</p>
                  <p className="text-blue-400 font-cinzel font-semibold">{(selecionado as any).bonus}</p>
                </div>
              )}
              {(selecionado as any).maxDes && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Máx. Des</p>
                  <p className="text-parchment font-crimson">{(selecionado as any).maxDes}</p>
                </div>
              )}
              {(selecionado as any).penalidade && (
                <div className="bg-grimoire-800 rounded p-2">
                  <p className="text-parchment-dark text-xs">Penalidade</p>
                  <p className="text-red-400 font-crimson">{(selecionado as any).penalidade}</p>
                </div>
              )}
            </div>
            {(selecionado as any).propriedades?.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-xs mb-1">Propriedades</h4>
                <div className="flex flex-wrap gap-1">
                  {(selecionado as any).propriedades.map((p: string) => <Badge key={p} variant="gold">{p}</Badge>)}
                </div>
              </div>
            )}
            <div>
              <h4 className="font-cinzel text-gold text-xs mb-1">Descrição</h4>
              <p className="font-crimson text-parchment text-sm">{selecionado.descricao}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
