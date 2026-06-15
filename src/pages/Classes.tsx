import { useState, useMemo } from 'react'
import classesData from '../data/classes.json'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Search, Swords, ChevronDown, ChevronUp, BookOpen, Zap } from 'lucide-react'

interface HabilidadeClasse {
  nivel: number
  nome: string
  descricao: string
}

interface Progressao {
  nivel: number
  habilidade: string
}

interface Classe {
  id: string
  nome: string
  imagem: string
  descricao: string
  atributo: string
  pv_inicial: string
  pv_por_nivel: string
  pm_por_nivel: number
  pericias_obrigatorias: string[]
  pericias_opcao: string
  proficiencias: string
  habilidades_classe: HabilidadeClasse[]
  progressao: Progressao[]
  poderes: string[]
  linhagens?: Array<{ nome: string; descricao: string }>
}

const classes: Classe[] = (classesData as any).classes || (classesData as any)

const ATRIBUTO_COR: Record<string, string> = {
  'Inteligência': 'text-blue-400',
  'Carisma': 'text-purple-400',
  'Força': 'text-red-400',
  'Constituição': 'text-orange-400',
  'Destreza': 'text-green-400',
  'Sabedoria': 'text-yellow-400',
}

function getAtributoCor(atributo: string): string {
  for (const [key, val] of Object.entries(ATRIBUTO_COR)) {
    if (atributo.includes(key)) return val
  }
  return 'text-gold'
}

export default function Classes() {
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState<Classe | null>(null)
  const [abaModal, setAbaModal] = useState<'info' | 'habilidades' | 'poderes' | 'progressao'>('info')
  const [expandida, setExpandida] = useState<string | null>(null)

  const filtradas = useMemo(() =>
    classes.filter(c =>
      !busca ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      c.atributo.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

  const abrirClasse = (c: Classe) => {
    setSelecionada(c)
    setAbaModal('info')
    setExpandida(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Classes de Personagem</h1>
        <p className="font-crimson text-parchment-muted mt-1">
          {classes.length} classes disponíveis — clique para ver habilidades e poderes completos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar classe..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="max-w-xs"
        />
        <span className="text-parchment-dark text-xs font-crimson ml-auto">
          {filtradas.length} classe(s) encontrada(s)
        </span>
      </div>

      {/* Grid de Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtradas.map(classe => (
          <ClasseCard key={classe.id} classe={classe} onSelect={() => abrirClasse(classe)} />
        ))}
      </div>

      {/* Modal de detalhes */}
      {selecionada && (
        <Modal
          open={!!selecionada}
          onClose={() => setSelecionada(null)}
          title={selecionada.nome}
          size="xl"
        >
          {/* Abas */}
          <div className="flex gap-1 mb-4 border-b border-grimoire-600 pb-2">
            {(['info', 'habilidades', 'poderes', 'progressao'] as const).map(aba => (
              <button
                key={aba}
                onClick={() => setAbaModal(aba)}
                className={`px-3 py-1.5 text-xs font-cinzel rounded-t border-b-2 transition-colors ${
                  abaModal === aba
                    ? 'border-gold text-gold'
                    : 'border-transparent text-parchment-muted hover:text-parchment'
                }`}
              >
                {aba === 'info' ? 'Informações' : aba === 'habilidades' ? 'Habilidades' : aba === 'poderes' ? 'Poderes' : 'Progressão'}
              </button>
            ))}
          </div>

          {/* Aba Info */}
          {abaModal === 'info' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {selecionada.imagem && (
                  <div className="flex-shrink-0 w-32 h-44 rounded-lg overflow-hidden border border-grimoire-600 bg-abyss-900">
                    <img
                      src={selecionada.imagem}
                      alt={selecionada.nome}
                      className="w-full h-full object-cover object-top"
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-crimson text-parchment leading-relaxed mb-3">{selecionada.descricao}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-grimoire-800 rounded p-2">
                      <p className="text-parchment-dark">Atributo</p>
                      <p className={`font-semibold ${getAtributoCor(selecionada.atributo)}`}>{selecionada.atributo}</p>
                    </div>
                    <div className="bg-grimoire-800 rounded p-2">
                      <p className="text-parchment-dark">PM por Nível</p>
                      <p className="text-parchment font-semibold">+{selecionada.pm_por_nivel}</p>
                    </div>
                    <div className="bg-grimoire-800 rounded p-2">
                      <p className="text-parchment-dark">PV Inicial</p>
                      <p className="text-green-400 font-semibold">{selecionada.pv_inicial}</p>
                    </div>
                    <div className="bg-grimoire-800 rounded p-2">
                      <p className="text-parchment-dark">PV por Nível</p>
                      <p className="text-green-400 font-semibold">+{selecionada.pv_por_nivel}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-grimoire-800 rounded-lg p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-2">Perícias Obrigatórias</h4>
                  <div className="flex flex-wrap gap-1">
                    {selecionada.pericias_obrigatorias.map((p, i) => (
                      <Badge key={i} variant="gold">{p}</Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-grimoire-800 rounded-lg p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-2">Opções de Perícias</h4>
                  <p className="font-crimson text-parchment-muted text-xs">{selecionada.pericias_opcao}</p>
                </div>
              </div>

              <div className="bg-grimoire-800 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2">Proficiências</h4>
                <p className="font-crimson text-parchment text-xs">{selecionada.proficiencias}</p>
              </div>

              {selecionada.linhagens && selecionada.linhagens.length > 0 && (
                <div>
                  <h4 className="font-cinzel text-purple-300 text-sm mb-2">Linhagens</h4>
                  <div className="space-y-2">
                    {selecionada.linhagens.map((lin, i) => (
                      <div key={i} className="bg-purple-950/30 border border-purple-800 rounded-lg p-3">
                        <p className="font-cinzel text-purple-200 text-sm font-semibold mb-1">{lin.nome}</p>
                        <p className="font-crimson text-parchment-muted text-xs leading-relaxed">{lin.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Aba Habilidades */}
          {abaModal === 'habilidades' && (
            <div className="space-y-2">
              {selecionada.habilidades_classe.map((hab, i) => (
                <div key={i} className="bg-grimoire-800 rounded-lg border border-grimoire-600">
                  <button
                    className="w-full flex items-center justify-between p-3"
                    onClick={() => setExpandida(expandida === `hab-${i}` ? null : `hab-${i}`)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold text-abyss-950 flex items-center justify-center text-xs font-cinzel font-bold flex-shrink-0">
                        {hab.nivel}
                      </span>
                      <span className="font-cinzel text-parchment text-sm font-semibold">{hab.nome}</span>
                    </div>
                    {expandida === `hab-${i}`
                      ? <ChevronUp className="w-4 h-4 text-gold" />
                      : <ChevronDown className="w-4 h-4 text-grimoire-500" />
                    }
                  </button>
                  {expandida === `hab-${i}` && (
                    <div className="px-3 pb-3">
                      <p className="font-crimson text-parchment-muted text-sm leading-relaxed">{hab.descricao}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Aba Poderes */}
          {abaModal === 'poderes' && (
            <div className="space-y-2">
              {selecionada.poderes.length > 0 ? (
                selecionada.poderes.map((poder, i) => {
                  const [nome, ...resto] = poder.split(' — ')
                  return (
                    <div key={i} className="bg-grimoire-800 rounded-lg border border-grimoire-600 p-3">
                      <p className="font-cinzel text-gold text-sm font-semibold mb-1">{nome.trim()}</p>
                      {resto.length > 0 && (
                        <p className="font-crimson text-parchment-muted text-xs leading-relaxed">{resto.join(' — ')}</p>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="text-parchment-muted font-crimson text-sm text-center py-8">
                  Nenhum poder registrado para esta classe.
                </p>
              )}
            </div>
          )}

          {/* Aba Progressão */}
          {abaModal === 'progressao' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-crimson">
                <thead>
                  <tr className="border-b border-grimoire-600">
                    <th className="font-cinzel text-gold text-left py-2 pr-4">Nível</th>
                    <th className="font-cinzel text-gold text-left py-2">Habilidades</th>
                  </tr>
                </thead>
                <tbody>
                  {selecionada.progressao.map((prog, i) => (
                    <tr key={i} className={`border-b border-grimoire-700 ${i % 2 === 0 ? 'bg-grimoire-800/30' : ''}`}>
                      <td className="py-2 pr-4">
                        <div className="w-7 h-7 rounded-full bg-grimoire-700 border border-gold-800 flex items-center justify-center">
                          <span className="font-cinzel text-gold font-bold">{prog.nivel}</span>
                        </div>
                      </td>
                      <td className="py-2 text-parchment-muted">{prog.habilidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

function ClasseCard({ classe, onSelect }: { classe: Classe; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="group relative overflow-hidden rounded-xl border border-grimoire-600 hover:border-gold-700 bg-gradient-to-b from-abyss-800 to-abyss-900 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Imagem */}
      {classe.imagem && (
        <div className="h-44 overflow-hidden bg-abyss-950">
          <img
            src={classe.imagem}
            alt={classe.nome}
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
          <h3 className="font-cinzel font-bold text-base text-gold">{classe.nome}</h3>
          <div className="flex items-center gap-1 text-xs">
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 font-semibold">+{classe.pm_por_nivel} PM</span>
          </div>
        </div>

        <p className={`text-xs mb-2 font-cinzel ${getAtributoCor(classe.atributo)}`}>
          {classe.atributo}
        </p>

        <p className="text-parchment-muted text-xs font-crimson line-clamp-2 mb-2">{classe.descricao}</p>

        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-400">
            <BookOpen className="w-3 h-3" />
            {classe.habilidades_classe.length} hab.
          </span>
          <span className="flex items-center gap-1 text-parchment-muted">
            <Swords className="w-3 h-3" />
            {classe.poderes.length} poderes
          </span>
        </div>
      </div>
    </div>
  )
}
