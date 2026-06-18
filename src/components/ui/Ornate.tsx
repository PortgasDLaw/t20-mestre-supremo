import { cn } from '@/utils/cn'

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
}: {
  children: React.ReactNode
  className?: string
  accent?: Accent
}) {
  const ring = {
    gold: 'border-gold-800/60',
    purple: 'border-purple-700/60',
    blue: 'border-blue-800/60',
    blood: 'border-blood-muted/70',
  }[accent]
  const corner = {
    gold: 'border-gold-600',
    purple: 'border-purple-500',
    blue: 'border-blue-500',
    blood: 'border-blood-light',
  }[accent]

  return (
    <div
      className={cn(
        'relative rounded-lg border bg-gradient-to-b from-abyss-800 to-abyss-900 bg-gothic-pattern shadow-inner-dark',
        ring,
        className
      )}
    >
      <Corners className={corner} />
      {children}
    </div>
  )
}

/** Flourishes em L nos quatro cantos. */
function Corners({ className }: { className: string }) {
  const base = 'absolute w-4 h-4 pointer-events-none'
  return (
    <>
      <span className={cn(base, 'top-1.5 left-1.5 border-t-2 border-l-2 rounded-tl-sm', className)} />
      <span className={cn(base, 'top-1.5 right-1.5 border-t-2 border-r-2 rounded-tr-sm', className)} />
      <span className={cn(base, 'bottom-1.5 left-1.5 border-b-2 border-l-2 rounded-bl-sm', className)} />
      <span className={cn(base, 'bottom-1.5 right-1.5 border-b-2 border-r-2 rounded-br-sm', className)} />
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
