import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'blood' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'gold', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'font-cinzel font-semibold rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 justify-center',
        variant === 'gold' && 'bg-gold text-abyss-950 hover:bg-gold-400 active:bg-gold-700',
        variant === 'blood' && 'bg-blood text-parchment hover:bg-blood-light active:bg-blood-dark',
        variant === 'ghost' && 'bg-transparent text-parchment-muted hover:text-parchment hover:bg-grimoire-700',
        variant === 'outline' && 'border border-gold-700 text-gold hover:bg-grimoire-700 bg-transparent',
        size === 'sm' && 'text-xs px-3 py-1.5',
        size === 'md' && 'text-sm px-4 py-2',
        size === 'lg' && 'text-base px-6 py-3',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
