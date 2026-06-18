import { cn } from '@/utils/cn'
import { asset } from '@/lib/asset'

export type AccentName = 'gold' | 'purple' | 'blue' | 'blood'

/**
 * Mapa central de classes por accent. Centralizar aqui significa que uma
 * futura troca de paleta/estilo acontece num único lugar (junto do tailwind.config).
 */
export const accentClasses: Record<AccentName, { text: string; border: string; borderSoft: string }> = {
  gold: { text: 'text-gold', border: 'border-gold', borderSoft: 'border-gold-800/70' },
  purple: { text: 'text-purple-300', border: 'border-purple-400', borderSoft: 'border-purple-700/70' },
  blue: { text: 'text-blue-300', border: 'border-blue-400', borderSoft: 'border-blue-800/70' },
  blood: { text: 'text-blood-light', border: 'border-blood-light', borderSoft: 'border-blood-muted/70' },
}

/**
 * Painel ornamentado no estilo grimório de Tormenta 20.
 * Borda dourada com flourishes nos quatro cantos e textura sutil.
 */
export type Accent = 'gold' | 'purple' | 'blue' | 'blood'

export function OrnatePanel({
  children,
  className,
  accent = 'gold',
  corners = true,
  cornerSize = 'w-14',
}: {
  children: React.ReactNode
  className?: string
  accent?: Accent
  /** Exibe os cantos ornamentais (PNG). Desative em painéis pequenos. */
  corners?: boolean
  /** Classe Tailwind de largura dos cantos (ex: 'w-10', 'w-16'). */
  cornerSize?: string
}) {
  // accent mantido na API para compatibilidade; o visual agora vem só dos cantos.
  void accent

  return (
    <div
      className={cn(
        'relative rounded-lg bg-gradient-to-b from-abyss-800 to-abyss-900 bg-gothic-pattern shadow-inner-dark',
        className
      )}
    >
      {corners && <OrnateCorners sizeClass={cornerSize} />}
      {children}
    </div>
  )
}

/**
 * Cantos ornamentais (arte PNG em public/ui/canto-*.png) ancorados nos 4 vértices
 * do container `relative` mais próximo; o miolo é transparente. Servem de moldura
 * (substituem a borda retangular). Reutilizável em painéis, sidebar, etc.
 */
export function OrnateCorners({ sizeClass = 'w-14' }: { sizeClass?: string }) {
  const base = cn('absolute h-auto pointer-events-none select-none z-10', sizeClass)
  return (
    <>
      <img src={asset('ui/canto-tl.png')} alt="" aria-hidden className={cn(base, 'top-0 left-0')} />
      <img src={asset('ui/canto-tr.png')} alt="" aria-hidden className={cn(base, 'top-0 right-0')} />
      <img src={asset('ui/canto-bl.png')} alt="" aria-hidden className={cn(base, 'bottom-0 left-0')} />
      <img src={asset('ui/canto-br.png')} alt="" aria-hidden className={cn(base, 'bottom-0 right-0')} />
    </>
  )
}

/** Divisória decorativa com losango central (como na imagem de referência). */
export function OrnateDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-800/60" />
      <span className="text-gold-600 text-xs">◆</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-800/60" />
    </div>
  )
}

/** Chip de modificador de atributo, ex: "+1" / "DES +2". */
export function AttributeChip({
  abbr,
  value,
  className,
}: {
  abbr?: string
  value: string
  className?: string
}) {
  const negative = value.startsWith('-')
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-md border px-3 py-2 min-w-[3.5rem]',
        negative
          ? 'border-blood-muted bg-blood-dark/40'
          : 'border-gold-800/70 bg-gold-950/40',
        className
      )}
    >
      <span
        className={cn(
          'font-cinzel font-bold text-xl leading-none',
          negative ? 'text-blood-light' : 'text-gold'
        )}
      >
        {value}
      </span>
      {abbr && (
        <span className="font-cinzel text-[0.6rem] uppercase tracking-wider text-parchment-muted mt-1">
          {abbr}
        </span>
      )}
    </div>
  )
}

/** Pequena caixa de característica (Tamanho, Deslocamento, etc). */
export function StatBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-grimoire-700 py-2 last:border-0">
      <span className="font-cinzel text-[0.7rem] uppercase tracking-wide text-parchment-muted">
        {label}
      </span>
      <span className="font-crimson text-sm text-parchment font-semibold">{value}</span>
    </div>
  )
}
