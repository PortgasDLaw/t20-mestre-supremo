import { useState, useMemo } from 'react'
import deusesData from '@/data/deuses_menores.json'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Search } from 'lucide-react'

interface PoderConcedido {
  nome: string
  descricao: string
}

interface DeusMenor {
  id: string
  nome: string
  epiteto: string
  fonte: string
  statusDivino: number
  tipo: string
  historia: string
  crencasEObjetivos: string
  simboloSagrado: string
  canalizarEnergia: string
  armaPreferida: string
  devotos: string
  obrigacoesERestricoes: string
  poderConcedido: PoderConcedido
}

const deuses: DeusMenor[] = deusesData as DeusMenor[]

function getStatusColor(status: number): string {
  if (status >= 3) return 'text-gold'
  if (status === 2) return 'text-blue-400'
  return 'text-gray-400'
}

function getEnergiaBadge(energia: string): 'gold' | 'blood' | 'gray' | 'blue' | 'purple' | 'green' {
  if (energia === 'Positiva') return 'gold'
  if (energia === 'Negativa') return 'blood'
  return 'gray'
}

export default function DeusesMenores() {
  const [busca, setBusca] = useState('')
  const [filtroEnergia, setFiltroEnergia] = useState<'todos' | 'Positiva' | 'Negativa' | 'Qualquer'>('todos')
  const [selecionado, setSelecionado] = useState<DeusMenor | null>(null)

  const filtrados = useMemo(() => {
    return deuses.filter(d => {
      const matchEnergia = filtroEnergia === 'todos' || d.canalizarEnergia === filtroEnergia
      const matchBusca = !busca ||
        d.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.epiteto.toLowerCase().includes(busca.toLowerCase()) ||
        d.devotos.toLowerCase().includes(busca.toLowerCase())
      return matchEnergia && matchBusca
    })
  }, [busca, filtroEnergia])

  return (
    <div className="space-y-6">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Deuses Menores</h1>
        <p className="font-crimson text-parchment-muted mt-1">
          {deuses.length} divindades menores — mortais ascendidos e espíritos de Mitos de Arton
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar deus menor..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1">
          {(['todos', 'Positiva', 'Negativa', 'Qualquer'] as const).map(e => (
            <button key={e} onClick={() => setFiltroEnergia(e)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${
                filtroEnergia === e
                  ? e === 'Positiva' ? 'bg-gold text-abyss-950 border-gold'
                    : e === 'Negativa' ? 'bg-blood text-parchment border-blood'
                    : 'bg-grimoire-600 border-grimoire-500 text-parchment'
                  : 'border-grimoire-600 text-parchment-muted hover:border-gold-700 hover:text-parchment'
              }`}>
              {e === 'todos' ? 'Todos' : e}
            </button>
          ))}
        </div>
        <span className="text-parchment-dark text-xs font-crimson ml-auto">{filtrados.length} deus(es)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtrados.map(deus => (
          <Card key={deus.id} onClick={() => setSelecionado(deus)} glow>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 pr-2">
                <h3 className={`font-cinzel font-bold text-sm ${getStatusColor(deus.statusDivino)}`}>
                  {deus.nome}
                </h3>
                <p className="font-crimson text-parchment-muted text-xs">{deus.epiteto}</p>
              </div>
              <Badge variant={getEnergiaBadge(deus.canalizarEnergia)}>
                {deus.canalizarEnergia}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
              <span className="text-parchment-dark">Status: <span className={`font-semibold ${getStatusColor(deus.statusDivino)}`}>{deus.statusDivino}</span></span>
              <span className="text-parchment-dark">Arma: <span className="text-parchment">{deus.armaPreferida}</span></span>
            </div>
            <p className="font-crimson text-parchment-muted text-xs line-clamp-2 mb-2">{deus.historia}</p>
            <div className="bg-grimoire-800 rounded p-1.5">
              <p className="font-cinzel text-gold text-xs">{deus.poderConcedido.nome}</p>
            </div>
          </Card>
        ))}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant={getEnergiaBadge(selecionado.canalizarEnergia)}>
                Energia {selecionado.canalizarEnergia}
              </Badge>
              <Badge variant="gray">Status Divino {selecionado.statusDivino}</Badge>
              <Badge variant="gray">{selecionado.tipo}</Badge>
            </div>

            <div>
              <p className="font-cinzel text-gold text-base">{selecionado.epiteto}</p>
              <p className="font-crimson text-parchment leading-relaxed mt-2">{selecionado.historia}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark">Símbolo Sagrado</p>
                <p className="text-parchment font-semibold">{selecionado.simboloSagrado}</p>
              </div>
              <div className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark">Arma Preferida</p>
                <p className="text-parchment font-semibold">{selecionado.armaPreferida}</p>
              </div>
              <div className="bg-grimoire-800 rounded p-2 col-span-2">
                <p className="text-parchment-dark">Devotos</p>
                <p className="text-parchment">{selecionado.devotos}</p>
              </div>
            </div>

            <div>
              <h4 className="font-cinzel text-gold text-xs mb-2">Crenças e Objetivos</h4>
              <p className="font-crimson text-parchment-muted text-sm">{selecionado.crencasEObjetivos}</p>
            </div>

            <div className="bg-blood/10 border border-blood/30 rounded-lg p-3">
              <h4 className="font-cinzel text-blood-light text-xs mb-2">Obrigações & Restrições</h4>
              <p className="font-crimson text-parchment-muted text-sm">{selecionado.obrigacoesERestricoes}</p>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
              <h4 className="font-cinzel text-gold text-xs mb-2">
                Poder Concedido — {selecionado.poderConcedido.nome}
              </h4>
              <p className="font-crimson text-parchment text-sm">{selecionado.poderConcedido.descricao}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
