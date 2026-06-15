import { useStore } from '../../store'
import { cn } from '../../utils/cn'
import {
  LayoutDashboard, Sword, AlertTriangle, Sparkles, Skull, Dices,
  Shield, BookOpen, Users, Map, BookMarked, Wand2, Wrench, Search,
  ChevronLeft, ChevronRight, Flame, Feather, GraduationCap
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'racas', label: 'Raças', icon: Feather },
  { id: 'classes', label: 'Classes', icon: GraduationCap },
  { id: 'magias', label: 'Magias', icon: Sparkles },
  { id: 'equipamentos', label: 'Equipamentos', icon: Sword },
  { id: 'condicoes', label: 'Condições', icon: AlertTriangle },
  { id: 'ameacas', label: 'Ameaças', icon: Skull },
  { id: 'encontros', label: 'Gerador de Encontros', icon: Dices },
  { id: 'combate', label: 'Rastreador de Combate', icon: Shield },
  { id: 'tabelas', label: 'Tabelas do Mestre', icon: BookOpen },
  { id: 'npcs', label: 'NPCs', icon: Users },
  { id: 'reinos', label: 'Reinos de Arton', icon: Map },
  { id: 'campanha', label: 'Campanha', icon: BookMarked },
  { id: 'aventuras', label: 'Gerador de Aventuras', icon: Wand2 },
  { id: 'ferramentas', label: 'Ferramentas Rápidas', icon: Wrench },
  { id: 'busca', label: 'Busca Universal', icon: Search },
]

export function Sidebar() {
  const { paginaAtual, setPaginaAtual } = useStore()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'relative flex flex-col h-full border-r border-grimoire-600 bg-abyss-900 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-grimoire-600">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <Flame className="w-7 h-7 text-gold animate-flicker" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-cinzel font-bold text-gold text-sm leading-tight">T20</h1>
            <p className="font-cinzel text-parchment-muted text-xs">Mestre Supremo</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = paginaAtual === id
          return (
            <button
              key={id}
              onClick={() => setPaginaAtual(id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 group relative',
                active
                  ? 'bg-grimoire-700 text-gold border-r-2 border-gold'
                  : 'text-parchment-muted hover:bg-grimoire-800 hover:text-parchment'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-gold' : 'text-grimoire-500 group-hover:text-gold-600')} />
              {!collapsed && (
                <span className="font-crimson text-sm">{label}</span>
              )}
              {collapsed && (
                <div className="absolute left-14 bg-grimoire-700 text-parchment text-xs px-2 py-1 rounded border border-grimoire-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {label}
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-3 border-t border-grimoire-600 text-grimoire-500 hover:text-gold transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  )
}
