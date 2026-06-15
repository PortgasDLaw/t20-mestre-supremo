import { useState, useMemo } from 'react'
import ameacasData from '@/data/ameacas.json'
import { Input, Select } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useStore } from '@/store'
import { Search, Skull, Plus, Sword, Shield, Heart } from 'lucide-react'
import type { Ameaca } from '@/types'

const ameacas: Ameaca[] = ameacasData as Ameaca[]

const tipos = ['Todos', ...Array.from(new Set(ameacas.map(a => a.tipo.split(' ')[0])))]
const nds = ['Todos', '1/4', '1/3', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '10', '14']

function ndToNum(nd: string) {
  if (nd.includes('/')) { const [n, d] = nd.split('/'); return Number(n) / Number(d) }
  return Number(nd)
}

export default function Ameacas() {
  const [busca, setBusca] = useState('')
  const [ndFiltro, setNdFiltro] = useState('Todos')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [selecionada, setSelecionada] = useState<Ameaca | null>(null)
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

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Ameaças</h1>
        <p className="font-crimson text-parchment-muted mt-1">Compêndio de criaturas — clique para ver ficha completa</p>
      </div>

      <div className="flex flex-wrap gap-3 items-end">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar criatura..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <Select value={ndFiltro} onChange={e => setNdFiltro(e.target.value)} options={nds.map(n => ({ value: n, label: n === 'Todos' ? 'Todos os NDs' : `ND ${n}` }))} className="max-w-40" />
        <Select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)} options={tipos.map(t => ({ value: t, label: t }))} className="max-w-48" />
      </div>

      <p className="text-parchment-dark text-xs font-crimson">{filtradas.length} criatura(s)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtradas.map(a => (
          <div key={a.id} className="bg-abyss-800 border border-grimoire-600 rounded-lg p-3 hover:border-blood transition-all hover:shadow-blood">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-cinzel font-bold text-parchment">{a.nome}</h3>
                <p className="text-parchment-dark text-xs">{a.tipo} • {a.tamanho}</p>
              </div>
              <div className="text-right">
                <Badge variant="blood">ND {a.nd}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-center bg-grimoire-800 rounded p-1">
                <Heart className="w-3 h-3 text-blood-light mx-auto mb-0.5" />
                <p className="text-parchment font-cinzel text-sm font-bold">{a.pv}</p>
                <p className="text-parchment-dark text-xs">PV</p>
              </div>
              <div className="text-center bg-grimoire-800 rounded p-1">
                <Shield className="w-3 h-3 text-blue-400 mx-auto mb-0.5" />
                <p className="text-parchment font-cinzel text-sm font-bold">{a.ca}</p>
                <p className="text-parchment-dark text-xs">CA</p>
              </div>
              <div className="text-center bg-grimoire-800 rounded p-1">
                <Sword className="w-3 h-3 text-gold mx-auto mb-0.5" />
                <p className="text-parchment font-cinzel text-sm font-bold">{a.iniciativa}</p>
                <p className="text-parchment-dark text-xs">Inic.</p>
              </div>
            </div>

            {a.ataques.slice(0, 1).map(atq => (
              <p key={atq.nome} className="text-xs font-crimson text-parchment-muted mb-2">
                ⚔ {atq.nome}: <span className="text-blood-light">{atq.bônus}</span> ({atq.dano})
              </p>
            ))}

            <p className="font-crimson text-parchment-muted text-xs line-clamp-2 mb-2">{a.descricao}</p>

            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setSelecionada(a)} className="flex-1">Ver Ficha</Button>
              <Button size="sm" variant="blood" onClick={() => adicionarAoCombate(a)} className="flex-1">
                <Plus className="w-3 h-3" /> Combate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ficha */}
      {selecionada && (
        <Modal open={!!selecionada} onClose={() => setSelecionada(null)} title={selecionada.nome} size="xl">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="blood">ND {selecionada.nd}</Badge>
              <Badge variant="gray">{selecionada.tipo}</Badge>
              <Badge variant="gray">{selecionada.tamanho}</Badge>
            </div>

            <p className="font-crimson text-parchment">{selecionada.descricao}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { label: 'PV', value: selecionada.pv, color: 'text-blood-light' },
                { label: 'PM', value: selecionada.pm, color: 'text-purple-400' },
                { label: 'CA', value: selecionada.ca, color: 'text-blue-400' },
                { label: 'Fort', value: selecionada.resistencias.fortitude >= 0 ? `+${selecionada.resistencias.fortitude}` : String(selecionada.resistencias.fortitude), color: 'text-green-400' },
                { label: 'Reflex', value: selecionada.resistencias.reflexos >= 0 ? `+${selecionada.resistencias.reflexos}` : String(selecionada.resistencias.reflexos), color: 'text-yellow-400' },
                { label: 'Von.', value: selecionada.resistencias.vontade >= 0 ? `+${selecionada.resistencias.vontade}` : String(selecionada.resistencias.vontade), color: 'text-blue-300' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-grimoire-800 rounded p-2 text-center">
                  <p className="text-parchment-dark text-xs">{label}</p>
                  <p className={`font-cinzel font-bold text-lg ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Atributos */}
            <div>
              <h4 className="font-cinzel text-gold text-sm mb-2">Atributos</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {Object.entries(selecionada.atributos).map(([attr, val]) => (
                  <div key={attr} className="bg-grimoire-800 rounded p-2 text-center">
                    <p className="text-parchment-dark text-xs uppercase">{attr}</p>
                    <p className="text-parchment font-cinzel font-bold">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ataques */}
            <div>
              <h4 className="font-cinzel text-blood-light text-sm mb-2">Ataques</h4>
              <div className="space-y-1">
                {selecionada.ataques.map((atq, i) => (
                  <div key={i} className="bg-grimoire-800 rounded p-2 flex items-center justify-between">
                    <span className="font-crimson text-parchment text-sm">{atq.nome}</span>
                    <div className="flex gap-3 text-sm">
                      <span className="text-gold">{atq.bônus}</span>
                      <span className="text-blood-light">{atq.dano}</span>
                      <span className="text-parchment-muted">{atq.tipo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Habilidades */}
            <div>
              <h4 className="font-cinzel text-purple-400 text-sm mb-2">Habilidades Especiais</h4>
              <ul className="space-y-1">
                {selecionada.habilidades.map((h, i) => (
                  <li key={i} className="font-crimson text-parchment text-sm flex gap-2">
                    <span className="text-purple-400">◆</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Táticas e Tesouro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-blood-dark border border-blood-muted rounded p-3">
                <h4 className="font-cinzel text-blood-light text-xs mb-1">Táticas Sugeridas</h4>
                <p className="font-crimson text-parchment text-sm">{selecionada.taticas}</p>
              </div>
              <div className="bg-grimoire-800 border border-gold-900 rounded p-3">
                <h4 className="font-cinzel text-gold text-xs mb-1">Tesouro</h4>
                <p className="font-crimson text-parchment text-sm">{selecionada.tesouro}</p>
                <p className="text-parchment-muted text-xs mt-1">Habitat: {selecionada.habitat}</p>
              </div>
            </div>

            <Button variant="blood" onClick={() => { adicionarAoCombate(selecionada); setSelecionada(null) }}>
              <Plus className="w-4 h-4" /> Adicionar ao Combate
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
