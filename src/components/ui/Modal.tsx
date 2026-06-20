import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { OrnatePanel, accentClasses, type AccentName } from '@/components/ui/Ornate'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  accent?: AccentName
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function Modal({ open, onClose, title, children, size = 'md', accent = 'gold' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,4,9,0.86)', backdropFilter: 'blur(5px)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <OrnatePanel
        accent={accent}
        className={cn('relative w-full animate-page-open', sizes[size])}
        style={{
          background: 'radial-gradient(130% 90% at 50% -8%, #251a2e 0%, #19121f 55%, #140e19 100%)',
          boxShadow: '0 44px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,155,60,0.30), inset 0 0 60px rgba(0,0,0,0.4)',
          borderRadius: 10,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(200,155,60,0.15)' }}
        >
          <h2
            className={cn('font-cinzel font-bold text-base', accentClasses[accent].text)}
            style={{ letterSpacing: '0.5px' }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors p-1 rounded"
            style={{ color: '#6e6356' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E8DFCF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6e6356')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </OrnatePanel>
    </div>
  )
}
