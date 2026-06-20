import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple'
  className?: string
  onClick?: () => void
}

const variantStyles: Record<string, React.CSSProperties> = {
  gold:   { background: 'rgba(200,155,60,0.12)',  color: '#E4C16A', border: '1px solid rgba(200,155,60,0.35)' },
  blood:  { background: 'rgba(139,26,26,0.18)',   color: '#E05040', border: '1px solid rgba(139,26,26,0.45)' },
  gray:   { background: 'rgba(138,147,166,0.10)', color: '#8A93A6', border: '1px solid rgba(138,147,166,0.25)' },
  green:  { background: 'rgba(110,154,82,0.12)',  color: '#6E9A52', border: '1px solid rgba(110,154,82,0.35)' },
  blue:   { background: 'rgba(79,143,214,0.12)',  color: '#4F8FD6', border: '1px solid rgba(79,143,214,0.35)' },
  purple: { background: 'rgba(164,97,232,0.12)',  color: '#A461E8', border: '1px solid rgba(164,97,232,0.35)' },
}

export function Badge({ children, variant = 'gray', className, onClick }: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-cinzel', className, onClick && 'cursor-pointer')}
      style={{ letterSpacing: '0.5px', ...variantStyles[variant] }}
    >
      {children}
    </span>
  )
}
