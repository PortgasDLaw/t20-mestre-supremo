import { useState, useMemo } from 'react'
import racasData from '@/data/racas.json'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Search, Shield, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface Habilidade {
  nome: string
  descricao: string
}

interface Raca {
  id: string
  nome: string
  tipo: string
  imagem: string
  atributos: string
  descricao: string
  habilidades: Habilidade[]
  deus?: string
  tamanho: string
  deslocamento: string
  idiomas?: string[]
}

const racas: Raca[] = (racasData as any).racas || (racasData as any)

export default function Racas() {
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<'todas' | 'comum' | 'rara'>('todas')
  const [selecionada, setSelecionada] = useState<Raca | null>(null)
  const [expandida, setExpandida] = useState<string | null>(null)

  const filtradas = useMemo(() =>
    racas.filter(r => {
      const matchTipo = filtroTipo === 'todas' || r.tipo === filtroTipo
      const matchBusca = !busca || r.nome.toLowerCase().includes(busca.toLowerCase()) ||
        r.descricao.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchBusca
    }), [busca, filtroTipo])

  const comuns = filtradas.filter(r => r.tipo === 'comum')
  const raras = filtradas.filter(r => r.tipo === 'rara')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Raças de Arton</h1>
        <p className="font-crimson text-parchment-muted mt-1">
          {racas.length} raças disponíveis — comuns e raras — clique para ver detalhes completos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-end">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar raça..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1">
          {(['todas', 'comum', 'rara'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFiltroTipo(t)}
              className={`px-3 py-1.5 text-xs font-cinzel rounded border transition-colors ${
                filtroTipo === t
                  ? t === 'rara'
                    ? 'bg-purple-700 border-purple-600 text-white'
                    : t === 'comum'
                    ? 'bg-gold text-abyss-950 border-gold'
                    : 'bg-grimoire-600 border-grimoire-500 text-parchment'
                  : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'
              }`}
            >
              {t === 'todas' ? 'Todas' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
            </button>
          ))}
        </div>
        <span className="text-parchment-dark text-xs font-crimson ml-auto">
          {filtradas.length} raça(s) encontrada(s)
        </span>
      </div>

      {/* Raças Comuns */}
      {comuns.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-gold" />
            <h2 className="font-cinzel font-semibold text-xl text-gold">Raças Comuns</h2>
            <div className="flex-1 h-px bg-grimoire-600" />
            <Badge variant="gold">{comuns.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {comuns.map(raca => (
              <RacaCard key={raca.id} raca={raca} onSelect={() => setSelecionada(raca)} />
            ))}
          </div>
        </section>
      )}

      {/* Raças Raras */}
      {raras.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-purple-400" />
            <h2 className="font-cinzel font-semibold text-xl text-purple-300">Raças Raras</h2>
            <div className="flex-1 h-px bg-grimoire-600" />
            <Badge variant="purple">{raras.length}</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {raras.map(raca => (
              <RacaCard key={raca.id} raca={raca} onSelect={() => setSelecionada(raca)} isRara />
            ))}
          </div>
        </section>
      )}

      {/* Modal de detalhes */}
      {selecionada && (
        <Modal
          open={!!selecionada}
          onClose={() => setSelecionada(null)}
          title={selecionada.nome}
          size="lg"
        >
          <div className="space-y-5">
            <div className="flex gap-3">
              <Badge variant={selecionada.tipo === 'rara' ? 'purple' : 'gold'}>
                {selecionada.tipo === 'rara' ? 'Raça Rara' : 'Raça Comum'}
              </Badge>
              {selecionada.deus && (
                <Badge variant="gray">Divindade: {selecionada.deus}</Badge>
              )}
            </div>

            {/* Imagem e info básica */}
            <div className="flex gap-4">
              {selecionada.imagem && (
                <div className="flex-shrink-0 w-36 h-44 rounded-lg overflow-hidden border border-grimoire-600 bg-abyss-900">
                  <img
                    src={selecionada.imagem}
                    alt={selecionada.nome}
                    className="w-full h-full object-cover object-top"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              )}
              <div className="flex-1 space-y-3">
                <p className="font-crimson text-parchment leading-relaxed">{selecionada.descricao}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark">Tamanho</p>
                    <p className="text-parchment font-semibold">{selecionada.tamanho}</p>
                  </div>
                  <div className="bg-grimoire-800 rounded p-2">
                    <p className="text-parchment-dark">Deslocamento</p>
                    <p className="text-parchment font-semibold">{selecionada.deslocamento}</p>
                  </div>
                  <div className="bg-grimoire-800 rounded p-2 col-span-2">
                    <p className="text-parchment-dark">Atributos</p>
                    <p className="text-gold font-semibold">{selecionada.atributos}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            {selecionada.habilidades.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-sm mb-3 border-b border-grimoire-600 pb-1">
                  Habilidades Raciais
                </h4>
                <div className="space-y-2">
                  {selecionada.habilidades.map((hab, i) => (
                    <div key={i} className="bg-grimoire-800 rounded-lg p-3">
                      <button
                        className="w-full flex items-center justify-between"
                        onClick={() => setExpandida(expandida === `${selecionada.id}-${i}` ? null : `${selecionada.id}-${i}`)}
                      >
                        <span className="font-cinzel text-parchment text-sm font-semibold">{hab.nome}</span>
                        {expandida === `${selecionada.id}-${i}`
                          ? <ChevronUp className="w-4 h-4 text-gold" />
                          : <ChevronDown className="w-4 h-4 text-grimoire-500" />
                        }
                      </button>
                      {expandida === `${selecionada.id}-${i}` && (
                        <p className="font-crimson text-parchment-muted text-sm mt-2 leading-relaxed">
                          {hab.descricao}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Idiomas */}
            {selecionada.idiomas && selecionada.idiomas.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-sm mb-2">Idiomas</h4>
                <div className="flex flex-wrap gap-1">
                  {selecionada.idiomas.map((idioma, i) => (
                    <Badge key={i} variant="gray">{idioma}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}

function RacaCard({ raca, onSelect, isRara }: { raca: Raca; onSelect: () => void; isRara?: boolean }) {
  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
        isRara
          ? 'border-purple-700 hover:border-purple-500 bg-gradient-to-b from-purple-950/40 to-abyss-900'
          : 'border-grimoire-600 hover:border-gold-700 bg-gradient-to-b from-abyss-800 to-abyss-900'
      }`}
    >
      {/* Imagem */}
      {raca.imagem && (
        <div className="h-40 overflow-hidden bg-abyss-950">
          <img
            src={raca.imagem}
            alt={raca.nome}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              const el = e.target as HTMLImageElement
              el.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h3 className={`font-cinzel font-bold text-base ${isRara ? 'text-purple-300' : 'text-gold'}`}>
            {raca.nome}
          </h3>
        </div>
        <p className="text-parchment-dark text-xs mb-2 font-crimson">{raca.atributos}</p>
        <p className="text-parchment-muted text-xs font-crimson line-clamp-2">{raca.descricao}</p>
        <div className="mt-2 flex gap-1 flex-wrap">
          {raca.habilidades.slice(0, 3).map((hab, i) => (
            <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-grimoire-700 text-parchment-muted border border-grimoire-600">
              {hab.nome}
            </span>
          ))}
          {raca.habilidades.length > 3 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-grimoire-700 text-parchment-muted border border-grimoire-600">
              +{raca.habilidades.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
