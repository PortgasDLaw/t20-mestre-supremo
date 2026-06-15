import { useState, useMemo } from 'react'
import distincoesData from '@/data/distincoes.json'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Search } from 'lucide-react'

interface Poder {
  nome: string
  descricao: string
}

interface ItemEspecial {
  nome: string
  descricao: string
}

interface Distincao {
  id: string
  nome: string
  tipo: 'distinção' | 'rito'
  fonte: string
  resumo: string
  admissao?: string
  marcaDaDistincao?: string
  ritual?: string
  conexao?: string
  poderes: string[]
  itens?: ItemEspecial[]
  poderConcedido?: Poder
}

const data: Distincao[] = distincoesData as Distincao[]
const distincoes = data.filter(d => d.tipo === 'distinção')
const ritos = data.filter(d => d.tipo === 'rito')

function getVariant(tipo: string): 'gold' | 'blood' | 'purple' | 'blue' | 'gray' | 'green' {
  return tipo === 'rito' ? 'purple' : 'gold'
}

export default function Distincoes() {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'distinção' | 'rito'>('todos')
  const [selecionado, setSelecionado] = useState<Distincao | null>(null)

  const filtrados = useMemo(() => {
    return data.filter(d => {
      const matchTipo = filtro === 'todos' || d.tipo === filtro
      const matchBusca = !busca || d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.resumo.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchBusca
    })
  }, [busca, filtro])

  const filtradosDistincoes = filtrados.filter(d => d.tipo === 'distinção')
  const filtradosRitos = filtrados.filter(d => d.tipo === 'rito')

  return (
    <div className="space-y-6">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Distinções & Ritos</h1>
        <p className="font-crimson text-parchment-muted mt-1">
          {distincoes.length} distinções e {ritos.length} ritos — conteúdo exclusivo de Mitos de Arton
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar distinção ou rito..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1">
          {(['todos', 'distinção', 'rito'] as const).map(t => (
            <button key={t} onClick={() => setFiltro(t)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${
                filtro === t
                  ? t === 'rito' ? 'bg-purple-700 text-white border-purple-600' : 'bg-gold text-abyss-950 border-gold'
                  : 'border-grimoire-600 text-parchment-muted hover:border-gold-700 hover:text-parchment'
              }`}>
              {t === 'todos' ? 'Todos' : t === 'distinção' ? 'Distinções' : 'Ritos'}
            </button>
          ))}
        </div>
        <span className="text-parchment-dark text-xs font-crimson ml-auto">{filtrados.length} resultado(s)</span>
      </div>

      {filtradosDistincoes.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-cinzel font-semibold text-xl text-gold">Distinções</h2>
            <div className="flex-1 h-px bg-grimoire-600" />
            <Badge variant="gold">{filtradosDistincoes.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtradosDistincoes.map(d => (
              <DistincaoCard key={d.id} item={d} onSelect={() => setSelecionado(d)} />
            ))}
          </div>
        </section>
      )}

      {filtradosRitos.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-cinzel font-semibold text-xl text-purple-300">Ritos</h2>
            <div className="flex-1 h-px bg-grimoire-600" />
            <Badge variant="purple">{filtradosRitos.length}</Badge>
          </div>
          <div className="bg-abyss-900 border border-purple-900/50 rounded-lg p-3 mb-4">
            <p className="font-crimson text-parchment-muted text-sm">
              <span className="text-purple-400 font-cinzel">Ritos</span> são rituais que transformam o personagem em algo além do comum — lich, revenã, dragão, anjo. Diferente de distinções, seguem passos fixos (sempre três) e exigem conhecimento especial para serem realizados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtradosRitos.map(d => (
              <DistincaoCard key={d.id} item={d} onSelect={() => setSelecionado(d)} />
            ))}
          </div>
        </section>
      )}

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={getVariant(selecionado.tipo)}>
                {selecionado.tipo === 'rito' ? 'Rito' : 'Distinção'}
              </Badge>
              <Badge variant="gray">{selecionado.fonte}</Badge>
            </div>

            <p className="font-crimson text-parchment leading-relaxed">{selecionado.resumo}</p>

            {(selecionado.admissao || selecionado.ritual) && (
              <div className="bg-grimoire-800 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2">
                  {selecionado.tipo === 'rito' ? 'Ritual' : 'Admissão'}
                </h4>
                <p className="font-crimson text-parchment-muted text-sm">
                  {selecionado.admissao || selecionado.ritual}
                </p>
              </div>
            )}

            {selecionado.marcaDaDistincao && (
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2">Marca da Distinção</h4>
                <p className="font-crimson text-parchment text-sm">{selecionado.marcaDaDistincao}</p>
              </div>
            )}

            {selecionado.poderes.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-xs mb-2 border-b border-grimoire-600 pb-1">
                  Poderes da Distinção
                </h4>
                <ul className="space-y-2">
                  {selecionado.poderes.map((p, i) => {
                    const [nome, ...resto] = p.split(' — ')
                    const descricao = resto.join(' — ')
                    return (
                      <li key={i} className="bg-grimoire-800 rounded p-2">
                        <span className="font-cinzel text-parchment text-xs font-semibold">{nome}</span>
                        {descricao && <p className="font-crimson text-parchment-muted text-xs mt-1">{descricao}</p>}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {selecionado.itens && selecionado.itens.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-xs mb-2">Itens Especiais</h4>
                {selecionado.itens.map((item, i) => (
                  <div key={i} className="bg-grimoire-800 rounded p-2">
                    <p className="font-cinzel text-parchment text-xs font-semibold">{item.nome}</p>
                    <p className="font-crimson text-parchment-muted text-xs mt-1">{item.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}

function DistincaoCard({ item, onSelect }: { item: Distincao; onSelect: () => void }) {
  const isRito = item.tipo === 'rito'
  return (
    <Card onClick={onSelect} glow>
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-cinzel font-semibold text-sm leading-tight pr-2 ${isRito ? 'text-purple-300' : 'text-parchment'}`}>
          {item.nome}
        </h3>
        <Badge variant={isRito ? 'purple' : 'gold'}>{isRito ? 'Rito' : 'Distinção'}</Badge>
      </div>
      <p className="font-crimson text-parchment-muted text-xs line-clamp-3 mb-3">{item.resumo}</p>
      {item.marcaDaDistincao && (
        <div className="bg-gold/10 border border-gold/20 rounded p-1.5 mb-2">
          <p className="font-crimson text-gold text-xs line-clamp-2">{item.marcaDaDistincao.split(':')[0]}</p>
        </div>
      )}
      <p className="text-parchment-dark text-xs font-crimson">{item.poderes.length} poderes</p>
    </Card>
  )
}
