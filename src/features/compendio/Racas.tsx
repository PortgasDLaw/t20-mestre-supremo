import { useState, useMemo } from 'react'
import racasData from '@/data/racas.json'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { RacaDetalhe, type Raca } from './RacaDetalhe'
import { Search, Shield, Star } from 'lucide-react'
import { asset } from '@/lib/asset'

const racas: Raca[] = (racasData as any).racas || (racasData as any)

export default function Racas() {
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<'todas' | 'comum' | 'rara'>('todas')
  const [filtroFonte, setFiltroFonte] = useState<'todas' | 'Tormenta 20' | 'Mitos de Arton'>('todas')
  const [selecionada, setSelecionada] = useState<Raca | null>(null)

  const filtradas = useMemo(() =>
    racas.filter(r => {
      const matchTipo = filtroTipo === 'todas' || r.tipo === filtroTipo
      const matchFonte = filtroFonte === 'todas' || r.fonte === filtroFonte
      const matchBusca = !busca || r.nome.toLowerCase().includes(busca.toLowerCase()) ||
        r.descricao.toLowerCase().includes(busca.toLowerCase())
      return matchTipo && matchFonte && matchBusca
    }), [busca, filtroTipo, filtroFonte])

  const comuns = filtradas.filter(r => r.tipo === 'comum')
  const raras = filtradas.filter(r => r.tipo === 'rara')

  if (selecionada) {
    return <RacaDetalhe raca={selecionada} onBack={() => setSelecionada(null)} />
  }

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
        <div className="flex gap-1">
          {(['todas', 'Tormenta 20', 'Mitos de Arton'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFiltroFonte(f)}
              className={`px-3 py-1.5 text-xs font-cinzel rounded border transition-colors ${
                filtroFonte === f
                  ? f === 'Mitos de Arton'
                    ? 'bg-blue-700 border-blue-600 text-white'
                    : f === 'Tormenta 20'
                    ? 'bg-grimoire-600 border-grimoire-500 text-parchment'
                    : 'bg-grimoire-600 border-grimoire-500 text-parchment'
                  : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'
              }`}
            >
              {f === 'todas' ? 'Todas as fontes' : f}
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

    </div>
  )
}

function RacaCard({ raca, onSelect, isRara }: { raca: Raca; onSelect: () => void; isRara?: boolean }) {
  const moldura = isRara ? 'ui/moldura-epica.png' : 'ui/moldura-normal.png'

  return (
    <div
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-inner-dark ${
        isRara
          ? 'border-purple-700 hover:border-purple-500 bg-gradient-to-b from-purple-950/40 to-abyss-900'
          : 'border-grimoire-600 hover:border-gold-700 bg-gradient-to-b from-abyss-800 to-abyss-900'
      }`}
    >
      {/* Imagem */}
      {raca.imagem && (
        <div className="h-40 overflow-hidden bg-abyss-950 relative">
          <img
            src={asset(raca.imagem)}
            alt={raca.nome}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              const el = e.target as HTMLImageElement
              el.parentElement!.style.display = 'none'
            }}
          />
          {/* Overlay Moldura Medieval */}
          <img
            src={asset(moldura)}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10 opacity-90 group-hover:opacity-100 transition-opacity"
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
