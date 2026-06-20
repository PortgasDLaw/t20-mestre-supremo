import { cn } from '@/utils/cn'

const inputBase: React.CSSProperties = {
  width: '100%',
  background: '#15101a',
  border: '1px solid rgba(200,155,60,0.20)',
  borderRadius: 6,
  padding: '8px 12px',
  color: '#E8DFCF',
  fontFamily: "'EB Garamond', 'Crimson Text', Georgia, serif",
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.15s',
}

const inputFocus = { borderColor: 'rgba(200,155,60,0.55)' }

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export function Input({ className, icon, style, ...props }: InputProps) {
  if (icon) {
    return (
      <div className={cn('relative', className)}>
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#6e6356' }}
        >
          {icon}
        </div>
        <input
          style={{ ...inputBase, paddingLeft: 36, ...style }}
          onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
          {...props}
        />
      </div>
    )
  }
  return (
    <input
      className={className}
      style={{ ...inputBase, ...style }}
      onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, style, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn('resize-none', className)}
      style={{ ...inputBase, ...style }}
      onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export function Select({ className, options, style, ...props }: SelectProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        style={{
          ...inputBase,
          appearance: 'none',
          WebkitAppearance: 'none',
          paddingRight: 28,
          cursor: 'pointer',
          ...style,
        }}
        onFocus={e => Object.assign(e.currentTarget.style, inputFocus)}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(200,155,60,0.20)' }}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: '#1A141E', color: '#E8DFCF' }}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Seta customizada dourada */}
      <span
        className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
        style={{ color: '#C89B3C' }}
      >
        ▾
      </span>
    </div>
  )
}
