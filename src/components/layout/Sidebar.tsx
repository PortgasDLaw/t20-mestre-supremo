import { useStore } from '@/store'
import { cn } from '@/utils/cn'
import {
  LayoutDashboard, Sword, AlertTriangle, Sparkles, Skull, Dices,
  Shield, BookOpen, Users, Map, BookMarked, Wand2, Wrench, Search,
  ChevronLeft, ChevronRight, Flame, Feather, GraduationCap, Star, Crown, Gem, ScrollText, Zap
} from 'lucide-react'
import { useState } from 'react'

type NavItem = { id: string; label: string; icon: React.ElementType; group?: string }

const GROUP_ORDER = ['Compêndio', 'Mitos de Arton', 'Ferramentas', 'Campanha'] as const

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'racas', label: 'Raças', icon: Feather, group: 'Compêndio' },
  { id: 'classes', label: 'Classes', icon: GraduationCap, group: 'Compêndio' },
  { id: 'magias', label: 'Magias', icon: Sparkles, group: 'Compêndio' },
  { id: 'equipamentos', label: 'Equipamentos', icon: Sword, group: 'Compêndio' },
  { id: 'condicoes', label: 'Condições', icon: AlertTriangle, group: 'Compêndio' },
  { id: 'ameacas', label: 'Ameaças', icon: Skull, group: 'Compêndio' },
  { id: 'distincoes', label: 'Distinções & Ritos', icon: Star, group: 'Mitos de Arton' },
  { id: 'deuses', label: 'Deuses Menores', icon: Crown, group: 'Mitos de Arton' },
  { id: 'devocaoAlternativa', label: 'Deuses & Devotos', icon: Shield, group: 'Mitos de Arton' },
  { id: 'itensMagicos', label: 'Itens Mágicos', icon: Gem, group: 'Mitos de Arton' },
  { id: 'poderesConcedidos', label: 'Poderes Concedidos', icon: Zap, group: 'Mitos de Arton' },
  { id: 'regrasOpcionais', label: 'Regras Opcionais', icon: ScrollText, group: 'Mitos de Arton' },
  { id: 'encontros', label: 'Gerador de Encontros', icon: Dices, group: 'Ferramentas' },
  { id: 'combate', label: 'Rastreador de Combate', icon: Shield, group: 'Ferramentas' },
  { id: 'tabelas', label: 'Tabelas do Mestre', icon: BookOpen, group: 'Ferramentas' },
  { id: 'npcs', label: 'NPCs', icon: Users, group: 'Campanha' },
  { id: 'reinos', label: 'Reinos de Arton', icon: Map, group: 'Campanha' },
  { id: 'campanha', label: 'Campanha', icon: BookMarked, group: 'Campanha' },
  { id: 'aventuras', label: 'Gerador de Aventuras', icon: Wand2, group: 'Ferramentas' },
  { id: 'ferramentas', label: 'Ferramentas Rápidas', icon: Wrench, group: 'Ferramentas' },
  { id: 'busca', label: 'Busca Universal', icon: Search, group: 'Ferramentas' },
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
        {/* Itens sem grupo (ex: Dashboard) */}
        {navItems.filter(item => !item.group).map(item => (
          <NavButton key={item.id} item={item} active={paginaAtual === item.id} collapsed={collapsed} onClick={() => setPaginaAtual(item.id)} />
        ))}

        {/* Seções agrupadas */}
        {GROUP_ORDER.map(group => {
          const itens = navItems.filter(item => item.group === group)
          if (itens.length === 0) return null
          return (
            <div key={group} className="mt-3">
              {!collapsed && (
                <h2 className="px-4 pb-1 font-cinzel text-[0.65rem] uppercase tracking-widest text-gold-700">
                  {group}
                </h2>
              )}
              {collapsed && <div className="mx-3 my-2 h-px bg-grimoire-700" />}
              {itens.map(item => (
                <NavButton key={item.id} item={item} active={paginaAtual === item.id} collapsed={collapsed} onClick={() => setPaginaAtual(item.id)} />
              ))}
            </div>
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

function NavButton({ item, active, collapsed, onClick }: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const { icon: Icon, label } = item
  return (
    <button
      onClick={onClick}
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
}
