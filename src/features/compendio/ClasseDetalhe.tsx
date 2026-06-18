import { Heart, Zap, Swords } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { EntityDetail } from '@/components/ui/EntityDetail'

interface HabilidadeClasse {
  nivel: number
  nome: string
  descricao: string
}

interface Progressao {
  nivel: number
  habilidade: string
}

export interface Classe {
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

const ATRIBUTO_COR: Record<string, string> = {
  'Inteligência': 'text-blue-400',
  'Carisma': 'text-purple-400',
  'Força': 'text-red-400',
  'Constituição': 'text-orange-400',
  'Destreza': 'text-green-400',
  'Sabedoria': 'text-yellow-400',
}

export function getAtributoCor(atributo: string): string {
  for (const [key, val] of Object.entries(ATRIBUTO_COR)) {
    if (atributo.includes(key)) return val
  }
  return 'text-gold'
}

export function ClasseDetalhe({ classe, onBack }: { classe: Classe; onBack: () => void }) {
  return (
    <EntityDetail
      breadcrumbRoot="Classes"
      onBack={onBack}
      accent="gold"
      title={classe.nome}
      image={classe.imagem}
      badges={
        <>
          <Badge variant="gold">{classe.atributo}</Badge>
          <Badge variant="blue">+{classe.pm_por_nivel} PM/nível</Badge>
        </>
      }
      subtitle={<span className="line-clamp-3">{classe.descricao}</span>}
      tabs={[
        {
          id: 'info',
          label: 'Informações',
          content: (
            <div className="space-y-4">
              <p className="font-crimson text-parchment leading-relaxed">{classe.descricao}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-grimoire-800/60 rounded-lg p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-2 uppercase tracking-wide">Perícias Obrigatórias</h4>
                  <div className="flex flex-wrap gap-1">
                    {classe.pericias_obrigatorias.map((p, i) => (
                      <Badge key={i} variant="gold">{p}</Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-grimoire-800/60 rounded-lg p-3">
                  <h4 className="font-cinzel text-gold text-xs mb-2 uppercase tracking-wide">Opções de Perícias</h4>
                  <p className="font-crimson text-parchment-muted text-sm">{classe.pericias_opcao}</p>
                </div>
              </div>

              <div className="bg-grimoire-800/60 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2 uppercase tracking-wide">Proficiências</h4>
                <p className="font-crimson text-parchment text-sm">{classe.proficiencias}</p>
              </div>

              {classe.linhagens && classe.linhagens.length > 0 && (
                <div>
                  <h4 className="font-cinzel text-purple-300 text-sm mb-2">Linhagens</h4>
                  <div className="space-y-2">
                    {classe.linhagens.map((lin, i) => (
                      <div key={i} className="bg-purple-950/30 border border-purple-800 rounded-lg p-3">
                        <p className="font-cinzel text-purple-200 text-sm font-semibold mb-1">{lin.nome}</p>
                        <p className="font-crimson text-parchment-muted text-sm leading-relaxed">{lin.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'habilidades',
          label: 'Habilidades',
          content: (
            <div className="space-y-2">
              {classe.habilidades_classe.map((hab, i) => (
                <div key={i} className="bg-grimoire-800/50 rounded-lg border border-grimoire-700 p-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold text-abyss-950 flex items-center justify-center text-xs font-cinzel font-bold flex-shrink-0">
                      {hab.nivel}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-cinzel text-parchment text-sm font-semibold">{hab.nome}</h4>
                      <p className="font-crimson text-parchment-muted text-sm mt-1 leading-relaxed">{hab.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: 'poderes',
          label: 'Poderes',
          content:
            classe.poderes.length > 0 ? (
              <div className="space-y-2">
                {classe.poderes.map((poder, i) => {
                  const [nome, ...resto] = poder.split(' — ')
                  return (
                    <div key={i} className="bg-grimoire-800/50 rounded-lg border border-grimoire-700 p-3">
                      <p className="font-cinzel text-gold text-sm font-semibold mb-1">{nome.trim()}</p>
                      {resto.length > 0 && (
                        <p className="font-crimson text-parchment-muted text-sm leading-relaxed">{resto.join(' — ')}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-parchment-muted font-crimson text-sm text-center py-8">
                Nenhum poder registrado para esta classe.
              </p>
            ),
        },
        {
          id: 'progressao',
          label: 'Progressão',
          content: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-crimson">
                <thead>
                  <tr className="border-b border-grimoire-600">
                    <th className="font-cinzel text-gold text-left py-2 pr-4 uppercase text-xs tracking-wide">Nível</th>
                    <th className="font-cinzel text-gold text-left py-2 uppercase text-xs tracking-wide">Habilidades</th>
                  </tr>
                </thead>
                <tbody>
                  {classe.progressao.map((prog, i) => (
                    <tr key={i} className={`border-b border-grimoire-700 ${i % 2 === 0 ? 'bg-grimoire-800/30' : ''}`}>
                      <td className="py-2 pr-4">
                        <div className="w-7 h-7 rounded-full bg-grimoire-700 border border-gold-800 flex items-center justify-center">
                          <span className="font-cinzel text-gold font-bold text-xs">{prog.nivel}</span>
                        </div>
                      </td>
                      <td className="py-2 text-parchment-muted">{prog.habilidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
      ]}
      sidebar={[
        {
          title: 'Atributos da Classe',
          icon: <Swords className="w-4 h-4" />,
          stats: [
            { label: 'Atributo-chave', value: <span className={getAtributoCor(classe.atributo)}>{classe.atributo}</span> },
            { label: 'PV Inicial', value: <span className="text-green-400">{classe.pv_inicial}</span> },
            { label: 'PV por Nível', value: <span className="text-green-400">+{classe.pv_por_nivel}</span> },
            { label: 'PM por Nível', value: <span className="text-blue-400">+{classe.pm_por_nivel}</span> },
          ],
        },
        {
          title: 'Resumo',
          icon: <Zap className="w-4 h-4" />,
          content: (
            <div className="space-y-1.5 font-crimson text-sm text-parchment-muted">
              <p className="flex items-center gap-2"><Heart className="w-3.5 h-3.5 text-green-400" /> {classe.habilidades_classe.length} habilidades de classe</p>
              <p className="flex items-center gap-2"><Swords className="w-3.5 h-3.5 text-gold" /> {classe.poderes.length} poderes</p>
            </div>
          ),
        },
      ]}
    />
  )
}
