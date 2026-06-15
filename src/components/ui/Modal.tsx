import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        'relative w-full bg-abyss-800 border border-grimoire-600 rounded-lg shadow-xl animate-fade-in',
        sizes[size]
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-grimoire-600">
          <h2 className="font-cinzel font-bold text-gold text-base">{title}</h2>
          <button onClick={onClose} className="text-grimoire-500 hover:text-parchment transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Body */}
        <div className="p-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
