import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'blood' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'gold', size = 'md', className, children, style, ...props }: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontWeight: 600,
    borderRadius: 5,
    transition: 'all 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    letterSpacing: '0.3px',
    cursor: 'pointer',
    border: 'none',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    gold: {
      background: 'linear-gradient(180deg, #d6a948, #b3852f)',
      color: '#120d16',
      boxShadow: '0 2px 8px rgba(200,155,60,0.3)',
    },
    blood: {
      background: '#8B1A1A',
      color: '#E8DFCF',
      boxShadow: '0 2px 8px rgba(139,26,26,0.3)',
    },
    ghost: {
      background: 'transparent',
      color: '#a99c86',
    },
    outline: {
      background: 'transparent',
      color: '#C89B3C',
      border: '1px solid rgba(200,155,60,0.45)',
    },
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: 11, padding: '6px 12px' },
    md: { fontSize: 13, padding: '8px 16px' },
    lg: { fontSize: 15, padding: '12px 24px' },
  }

  return (
    <button
      className={cn('disabled:opacity-50 disabled:cursor-not-allowed', className)}
      style={{ ...baseStyle, ...variantStyles[variant], ...sizeStyles[size], ...style }}
      onMouseEnter={e => {
        if (variant === 'gold') {
          e.currentTarget.style.filter = 'brightness(1.1)'
        } else if (variant === 'blood') {
          e.currentTarget.style.background = '#a52020'
        } else if (variant === 'ghost') {
          e.currentTarget.style.background = 'rgba(200,155,60,0.08)'
          e.currentTarget.style.color = '#E8DFCF'
        } else if (variant === 'outline') {
          e.currentTarget.style.background = 'rgba(200,155,60,0.08)'
        }
      }}
      onMouseLeave={e => {
        if (variant === 'gold') {
          e.currentTarget.style.filter = ''
        } else if (variant === 'blood') {
          e.currentTarget.style.background = '#8B1A1A'
        } else if (variant === 'ghost') {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#a99c86'
        } else if (variant === 'outline') {
          e.currentTarget.style.background = 'transparent'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}
