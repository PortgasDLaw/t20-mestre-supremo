import type { LucideIcon } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon: LucideIcon
  message: string
  hint?: string
  action?: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, message, hint, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <Icon className="w-12 h-12 text-grimoire-600 mx-auto mb-3" />
      <p className="font-cinzel text-parchment-muted">{message}</p>
      {hint && <p className="font-crimson text-parchment-dark text-sm mt-1">{hint}</p>}
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  )
}
