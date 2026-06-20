import { cn } from '@/utils/cn'
import { asset } from '@/lib/asset'

export type AccentName = 'gold' | 'purple' | 'blue' | 'blood'

export const accentClasses: Record<AccentName, { text: string; border: string; borderSoft: string }> = {
  gold:   { text: 'text-gold',         border: 'border-gold',         borderSoft: 'border-gold-800/70' },
  purple: { text: 'text-purple-300',   border: 'border-purple-400',   borderSoft: 'border-purple-700/70' },
  blue:   { text: 'text-blue-300',     border: 'border-blue-400',     borderSoft: 'border-blue-800/70' },
  blood:  { text: 'text-blood-light',  border: 'border-blood-light',  borderSoft: 'border-blood-muted/70' },
}

export type Accent = 'gold' | 'purple' | 'blue' | 'blood'

interface OrnatePanelProps {
  children: React.ReactNode
  className?: string
  accent?: Accent
  corners?: boolean
  cornerSize?: string
  style?: React.CSSProperties
}

export function OrnatePanel({
  children,
  className,
  accent = 'gold',
  corners = true,
  cornerSize = 'w-14',
  style,
}: OrnatePanelProps) {
  void accent
  return (
    <div
      className={cn('relative rounded-lg shadow-inner-dark', className)}
      style={{
        background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
        ...style,
      }}
    >
      {corners && <OrnateCorners sizeClass={cornerSize} />}
      {children}
    </div>
  )
}

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

export function OrnateDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 my-3', className)}>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,155,60,0.35))' }} />
      <span style={{ color: '#C89B3C', fontSize: 10 }}>◆</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,155,60,0.35))' }} />
    </div>
  )
}

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
      className={cn('flex flex-col items-center justify-center rounded-md px-3 py-2 min-w-[3.5rem]', className)}
      style={{
        background: negative ? 'rgba(139,26,26,0.15)' : 'rgba(200,155,60,0.08)',
        border: `1px solid ${negative ? 'rgba(139,26,26,0.4)' : 'rgba(200,155,60,0.30)'}`,
      }}
    >
      <span
        className="font-cinzel font-bold text-xl leading-none"
        style={{ color: negative ? '#E05040' : '#E4C16A' }}
      >
        {value}
      </span>
      {abbr && (
        <span
          className="font-cinzel text-[0.6rem] uppercase tracking-wider mt-1"
          style={{ color: '#a99c86' }}
        >
          {abbr}
        </span>
      )}
    </div>
  )
}

export function StatBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between py-2"
      style={{ borderBottom: '1px solid rgba(200,155,60,0.10)' }}
    >
      <span
        className="font-cinzel text-[0.68rem] uppercase tracking-wide"
        style={{ color: '#a99c86' }}
      >
        {label}
      </span>
      <span className="font-crimson text-sm font-semibold" style={{ color: '#E8DFCF' }}>
        {value}
      </span>
    </div>
  )
}
