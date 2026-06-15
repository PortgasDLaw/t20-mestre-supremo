import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export function Input({ className, icon, ...props }: InputProps) {
  if (icon) {
    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-grimoire-500">{icon}</div>
        <input
          className={cn(
            'w-full bg-abyss-900 border border-grimoire-600 rounded px-3 py-2 pl-9 text-parchment placeholder-parchment-dark text-sm font-crimson focus:outline-none focus:border-gold-700 transition-colors',
            className
          )}
          {...props}
        />
      </div>
    )
  }
  return (
    <input
      className={cn(
        'w-full bg-abyss-900 border border-grimoire-600 rounded px-3 py-2 text-parchment placeholder-parchment-dark text-sm font-crimson focus:outline-none focus:border-gold-700 transition-colors',
        className
      )}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full bg-abyss-900 border border-grimoire-600 rounded px-3 py-2 text-parchment placeholder-parchment-dark text-sm font-crimson focus:outline-none focus:border-gold-700 transition-colors resize-none',
        className
      )}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full bg-abyss-900 border border-grimoire-600 rounded px-3 py-2 text-parchment text-sm font-crimson focus:outline-none focus:border-gold-700 transition-colors',
        className
      )}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
