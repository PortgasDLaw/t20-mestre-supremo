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
        'rounded-lg p-4 transition-all duration-150',
        glow && 'shadow-gold-sm',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        background: 'linear-gradient(180deg, #1a141e, #16111b)',
        border: '1px solid rgba(200,155,60,0.18)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.55)',
      }}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(200,155,60,0.55)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.65)'
      } : undefined}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(200,155,60,0.18)'
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.55)'
      } : undefined}
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
        {icon && <span style={{ color: '#C89B3C' }}>{icon}</span>}
        <div>
          <h3 className="font-cinzel font-semibold text-sm" style={{ color: '#E8DFCF', letterSpacing: '0.4px' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="font-crimson text-xs" style={{ color: '#a99c86' }}>{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
