import { Shield, Star, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { AttributeChip } from '@/components/ui/Ornate'
import { EntityDetail } from '@/components/ui/EntityDetail'

interface Habilidade {
  nome: string
  descricao: string
}

export interface Raca {
  id: string
  nome: string
  tipo: string
  fonte?: string
  imagem: string
  atributos: string
  descricao: string
  habilidades: Habilidade[]
  deus?: string
  tamanho: string
  deslocamento: string
  idiomas?: string[]
}

/** Converte "Sab +2, Des +1, Int -1" em chips. Retorna null se for texto descritivo. */
function parseAtributos(str: string): { abbr: string; value: string }[] | null {
  const matches = [...str.matchAll(/([A-Za-zÀ-ú]{3})\s*([+-]\s*\d+)/g)]
  if (matches.length === 0) return null
  return matches.map(m => ({ abbr: m[1].toUpperCase(), value: m[2].replace(/\s/g, '') }))
}

export function RacaDetalhe({ raca, onBack }: { raca: Raca; onBack: () => void }) {
  const isRara = raca.tipo === 'rara'
  const accent = isRara ? 'purple' : 'gold'
  const chips = parseAtributos(raca.atributos)

  return (
    <EntityDetail
      breadcrumbRoot="Raças"
      onBack={onBack}
      accent={accent}
      title={raca.nome}
      image={raca.imagem}
      badges={
        <>
          <Badge variant={isRara ? 'purple' : 'gold'}>{isRara ? 'Raça Rara' : 'Raça Comum'}</Badge>
          {raca.fonte && <Badge variant="gray">{raca.fonte}</Badge>}
        </>
      }
      subtitle={<span className="line-clamp-3">{raca.descricao}</span>}
      hero={
        <div className="rounded-lg border border-grimoire-700 bg-abyss-900/60 p-3">
          <p className="font-cinzel text-[0.65rem] uppercase tracking-wider text-parchment-muted mb-2">
            Modificadores de Atributo
          </p>
          {chips ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <AttributeChip key={i} abbr={c.abbr} value={c.value} />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AttributeChip value="+1" />
              <AttributeChip value="+1" />
              <AttributeChip value="+1" />
              <span className="font-crimson text-sm text-parchment-muted ml-1">{raca.atributos}</span>
            </div>
          )}
        </div>
      }
      tabs={[
        {
          id: 'visao',
          label: 'Visão Geral',
          content: (
            <div className="space-y-4">
              <p className="font-crimson text-parchment leading-relaxed">{raca.descricao}</p>
              {raca.idiomas && raca.idiomas.length > 0 && (
                <div>
                  <p className="font-cinzel text-[0.7rem] uppercase tracking-wide text-parchment-muted mb-2">
                    Idiomas
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {raca.idiomas.map((idioma, i) => (
                      <Badge key={i} variant="gray">{idioma}</Badge>
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
            <div className="space-y-3">
              {raca.habilidades.map((hab, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-grimoire-700 bg-abyss-900/50 p-3 hover:border-gold-800/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className={isRara ? 'text-purple-400 mt-0.5' : 'text-gold mt-0.5'}>
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-cinzel font-semibold text-sm text-parchment">{hab.nome}</h4>
                      <p className="font-crimson text-sm text-parchment-muted mt-1 leading-relaxed">
                        {hab.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      sidebar={[
        {
          title: 'Características',
          icon: isRara ? <Star className="w-4 h-4" /> : <Shield className="w-4 h-4" />,
          stats: [
            { label: 'Tamanho', value: raca.tamanho },
            { label: 'Deslocamento', value: raca.deslocamento },
            { label: 'Atributos', value: raca.atributos },
            ...(raca.deus ? [{ label: 'Divindade', value: raca.deus }] : []),
            { label: 'Tipo', value: isRara ? 'Rara' : 'Comum' },
            ...(raca.fonte ? [{ label: 'Fonte', value: raca.fonte }] : []),
          ],
        },
        {
          title: 'Habilidades Raciais',
          chips: raca.habilidades.map(h => h.nome),
        },
      ]}
    />
  )
}
