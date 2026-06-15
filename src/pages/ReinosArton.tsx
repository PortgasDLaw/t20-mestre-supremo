import { useState } from 'react'
import reinosData from '../data/reinos.json'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Search, MapPin, Crown, Users, BookOpen, Swords, Lightbulb } from 'lucide-react'
import type { Reino } from '../types'

const reinos: Reino[] = reinosData as Reino[]

export default function ReinosArton() {
  const [selecionado, setSelecionado] = useState<Reino | null>(null)
  const [busca, setBusca] = useState('')

  const filtrados = reinos.filter(r =>
    !busca || r.nome.toLowerCase().includes(busca.toLowerCase()) || r.tipo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Reinos de Arton</h1>
        <p className="font-crimson text-parchment-muted mt-1">Clique em um reino para ver detalhes completos</p>
      </div>

      <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar reino..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-96">
        {/* Lista de reinos */}
        <div className="space-y-2">
          {filtrados.map(reino => (
            <button
              key={reino.id}
              onClick={() => setSelecionado(reino)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${selecionado?.id === reino.id ? 'border-gold bg-grimoire-700' : 'border-grimoire-600 bg-abyss-800 hover:border-gold-700'}`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: reino.cor }} />
                <div>
                  <p className="font-cinzel font-semibold text-parchment text-sm">{reino.nome}</p>
                  <p className="text-parchment-muted text-xs">{reino.tipo}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detalhes */}
        <div className="lg:col-span-2">
          {!selecionado ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <MapPin className="w-12 h-12 text-grimoire-600 mx-auto mb-3" />
                <p className="font-cinzel text-parchment-muted">Selecione um reino para ver detalhes</p>
              </div>
            </div>
          ) : (
            <div className="bg-abyss-800 border border-grimoire-600 rounded-lg p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-12 rounded-sm" style={{ backgroundColor: selecionado.cor }} />
                <div>
                  <h2 className="font-cinzel font-bold text-2xl text-gold">{selecionado.nome}</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="gold">{selecionado.tipo}</Badge>
                    <Badge variant="gray">Pop: {selecionado.populacao}</Badge>
                  </div>
                </div>
              </div>

              {/* História */}
              <div>
                <h3 className="font-cinzel text-gold text-sm mb-1 flex items-center gap-1"><BookOpen className="w-4 h-4" /> História</h3>
                <p className="font-crimson text-parchment text-sm leading-relaxed">{selecionado.historia}</p>
              </div>

              {/* Descrição */}
              <p className="font-crimson text-parchment-muted text-sm italic">{selecionado.descricao}</p>

              {/* Governo e Religião */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-grimoire-800 rounded p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-1 flex items-center gap-1"><Crown className="w-3 h-3" /> Governo</h4>
                  <p className="font-crimson text-parchment text-sm">{selecionado.governo}</p>
                </div>
                <div className="bg-grimoire-800 rounded p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-1">Religiões</h4>
                  <div className="flex flex-wrap gap-1">
                    {selecionado.religiao.map(r => <Badge key={r} variant="gold">{r}</Badge>)}
                  </div>
                </div>
              </div>

              {/* Cidades */}
              <div>
                <h4 className="font-cinzel text-parchment text-xs mb-2 flex items-center gap-1"><Users className="w-3 h-3" /> Cidades</h4>
                <div className="flex flex-wrap gap-1">
                  {selecionado.cidades.map(c => <Badge key={c} variant="gray">{c}</Badge>)}
                </div>
              </div>

              {/* Conflitos */}
              <div>
                <h4 className="font-cinzel text-blood-light text-xs mb-2 flex items-center gap-1"><Swords className="w-3 h-3" /> Conflitos Atuais</h4>
                <ul className="space-y-1">
                  {selecionado.conflitos.map((c, i) => (
                    <li key={i} className="text-sm font-crimson text-parchment flex gap-2">
                      <span className="text-blood">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ganchos */}
              <div>
                <h4 className="font-cinzel text-purple-400 text-xs mb-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Ganchos de Aventura</h4>
                <ul className="space-y-2">
                  {selecionado.ganchos.map((g, i) => (
                    <li key={i} className="text-sm font-crimson text-parchment bg-grimoire-800 border-l-2 border-purple-700 px-3 py-1.5">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
