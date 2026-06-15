import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple'
  className?: string
  onClick?: () => void
}

const variants = {
  gold: 'bg-gold-950 text-gold border-gold-800',
  blood: 'bg-blood-dark text-blood-light border-blood-muted',
  gray: 'bg-grimoire-700 text-parchment-muted border-grimoire-600',
  green: 'bg-green-950 text-green-400 border-green-900',
  blue: 'bg-blue-950 text-blue-400 border-blue-900',
  purple: 'bg-purple-950 text-purple-400 border-purple-900',
}

export function Badge({ children, variant = 'gray', className, onClick }: BadgeProps) {
  return (
    <span onClick={onClick} className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-crimson border', variants[variant], className, onClick && 'cursor-pointer')}>
      {children}
    </span>
  )
}
