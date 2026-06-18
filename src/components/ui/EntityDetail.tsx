import { useState, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { OrnatePanel, StatBox, accentClasses, type AccentName } from '@/components/ui/Ornate'

/**
 * Scaffold genérico de página de detalhe (hero + abas + sidebar).
 *
 * Toda a APARÊNCIA do detalhe mora aqui — cada página do compêndio apenas
 * fornece os DADOS via props. Para restyling futuro (cores, molduras, layout),
 * edite este arquivo + Ornate.tsx + os tokens em tailwind.config.js.
 */

export interface DetailTab {
  id: string
  label: string
  content: ReactNode
}

export interface SidebarSection {
  title: string
  icon?: ReactNode
  /** Lista de características rótulo/valor. */
  stats?: { label: string; value: ReactNode }[]
  /** Conjunto de chips (ex: nomes de habilidades, tags). */
  chips?: ReactNode[]
  /** Conteúdo livre, caso a seção não seja stats/chips. */
  content?: ReactNode
}

export interface EntityDetailProps {
  /** Texto-raiz do breadcrumb, ex: "Raças". */
  breadcrumbRoot: string
  onBack: () => void
  accent?: AccentName
  title: string
  /** Imagem/retrato opcional. */
  image?: string
  /** Badges acima do título (tipo, fonte, etc). */
  badges?: ReactNode
  /** Linha de flavor em itálico sob o título. */
  subtitle?: ReactNode
  /** Bloco-destaque sob o subtítulo (ex: atributos, custo de magia). */
  hero?: ReactNode
  tabs: DetailTab[]
  sidebar?: SidebarSection[]
}

export function EntityDetail({
  breadcrumbRoot,
  onBack,
  accent = 'gold',
  title,
  image,
  badges,
  subtitle,
  hero,
  tabs,
  sidebar = [],
}: EntityDetailProps) {
  const [abaAtiva, setAbaAtiva] = useState(tabs[0]?.id)
  const ac = accentClasses[accent]
  const conteudoAba = tabs.find(t => t.id === abaAtiva)?.content ?? tabs[0]?.content

  return (
    <div className="animate-fade-in space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-cinzel">
        <button onClick={onBack} className="text-parchment-muted hover:text-gold transition-colors">
          {breadcrumbRoot}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-grimoire-500" />
        <span className={ac.text}>{title}</span>
      </nav>

      <div className={`grid grid-cols-1 gap-5 ${sidebar.length ? 'lg:grid-cols-3' : ''}`}>
        {/* Coluna principal */}
        <div className={sidebar.length ? 'lg:col-span-2 space-y-5' : 'space-y-5'}>
          <OrnatePanel accent={accent} className="p-5">
            <div className="flex flex-col sm:flex-row gap-5">
              {image && (
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className={`w-44 h-56 rounded-lg overflow-hidden border-2 ${ac.borderSoft} bg-abyss-950 shadow-gold-sm`}>
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover object-top"
                      onError={e => {
                        const el = e.target as HTMLImageElement
                        el.parentElement!.parentElement!.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0">
                {badges && <div className="flex flex-wrap items-center gap-2 mb-2">{badges}</div>}
                <h1 className={`font-cinzel font-bold text-3xl ${ac.text}`}>{title}</h1>
                {subtitle && (
                  <div className="font-crimson italic text-parchment-muted mt-2 leading-relaxed">
                    {subtitle}
                  </div>
                )}
                {hero && <div className="mt-4">{hero}</div>}
              </div>
            </div>

            {/* Abas */}
            {tabs.length > 0 && (
              <div className="mt-5">
                {tabs.length > 1 && (
                  <div className="flex flex-wrap gap-1 border-b border-grimoire-700">
                    {tabs.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setAbaAtiva(t.id)}
                        className={`px-4 py-2 font-cinzel text-xs uppercase tracking-wide transition-colors ${
                          abaAtiva === t.id
                            ? `${ac.text} border-b-2 ${ac.border} -mb-px`
                            : 'text-parchment-muted hover:text-parchment'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="pt-4">{conteudoAba}</div>
              </div>
            )}
          </OrnatePanel>
        </div>

        {/* Sidebar */}
        {sidebar.length > 0 && (
          <div className="space-y-5">
            {sidebar.map((sec, i) => (
              <OrnatePanel key={i} accent={accent} className="p-4">
                <h3 className="font-cinzel text-sm uppercase tracking-wide text-gold mb-3 flex items-center gap-2">
                  {sec.icon}
                  {sec.title}
                </h3>
                {sec.stats && sec.stats.map((s, j) => <StatBox key={j} label={s.label} value={s.value} />)}
                {sec.chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {sec.chips.map((c, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 rounded bg-grimoire-700 text-parchment-muted border border-grimoire-600 font-crimson"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                {sec.content}
              </OrnatePanel>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** Re-export utilitário comum para as páginas. */
export { Badge }
