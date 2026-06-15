import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  onClick?: () => void
}

export function Card({ children, className, glow, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-abyss-800 border border-grimoire-600 rounded-lg p-4',
        glow && 'shadow-gold-sm hover:shadow-gold transition-shadow',
        onClick && 'cursor-pointer hover:border-gold-700 transition-colors',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        {icon && <span className="text-gold">{icon}</span>}
        <div>
          <h3 className="font-cinzel font-semibold text-parchment text-sm">{title}</h3>
          {subtitle && <p className="text-parchment-muted text-xs font-crimson">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
