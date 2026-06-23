import { useStore } from '@/store'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/ui/Icon'
import { OrnateCorners } from '@/components/ui/Ornate'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type NavItem = {
  id: string
  label: string
  icon: string   // nome do arquivo PNG em /ui/ic*.png
  group?: string
}

const GROUP_ORDER = ['Compêndio', 'Mitos de Arton', 'Ferramentas', 'Campanha'] as const

const navItems: NavItem[] = [
  { id: 'dashboard',         label: 'Dashboard',            icon: 'icExplore' },
  { id: 'racas',             label: 'Raças',                icon: 'icFriend',       group: 'Compêndio' },
  { id: 'classes',           label: 'Classes',              icon: 'icHunter',       group: 'Compêndio' },
  { id: 'magias',            label: 'Magias',               icon: 'icKnowledge',    group: 'Compêndio' },
  { id: 'equipamentos',      label: 'Equipamentos',         icon: 'icPrecision',    group: 'Compêndio' },
  { id: 'condicoes',         label: 'Condições',            icon: 'icTough',        group: 'Compêndio' },
  { id: 'ameacas',           label: 'Ameaças',              icon: 'icDanger',       group: 'Compêndio' },
  { id: 'distincoes',        label: 'Distinções & Ritos',   icon: 'icBanner',       group: 'Mitos de Arton' },
  // devocaoAlternativa = antigo "Deuses & Devotos", agora "Deuses" (Glórienn em destaque)
  { id: 'devocaoAlternativa',label: 'Deuses',               icon: 'icWillpower',    group: 'Mitos de Arton' },
  // deuses = antigo "Deuses Menores", agora "Devotos"
  { id: 'deuses',            label: 'Devotos',              icon: 'icCompassion',   group: 'Mitos de Arton' },
  { id: 'itensMagicos',      label: 'Itens Mágicos',        icon: 'icTreasure',     group: 'Mitos de Arton' },
  { id: 'poderesConcedidos', label: 'Poderes Concedidos',   icon: 'icSignal',       group: 'Mitos de Arton' },
  { id: 'regrasOpcionais',   label: 'Regras Opcionais',     icon: 'icGear',         group: 'Mitos de Arton' },
  { id: 'encontros',         label: 'Gerador de Encontros', icon: 'icResearch',     group: 'Ferramentas' },
  { id: 'combate',           label: 'Rastreador de Combate',icon: 'icStrenght',     group: 'Ferramentas' },
  { id: 'tabelas',           label: 'Tabelas do Mestre',    icon: 'icBoring',       group: 'Ferramentas' },
  { id: 'aventuras',         label: 'Gerador de Aventuras', icon: 'icCourage',      group: 'Ferramentas' },
  { id: 'ferramentas',       label: 'Ferramentas Rápidas',  icon: 'icGear',         group: 'Ferramentas' },
  { id: 'busca',             label: 'Busca Universal',      icon: 'icResearch',     group: 'Ferramentas' },
  { id: 'npcs',              label: 'NPCs',                 icon: 'icFriend',       group: 'Campanha' },
  { id: 'reinos',            label: 'Reinos de Arton',      icon: 'icExplore',      group: 'Campanha' },
  { id: 'campanha',          label: 'Campanha',             icon: 'icBanner',       group: 'Campanha' },
]

export function Sidebar() {
  const { paginaAtual, setPaginaAtual } = useStore()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full flex-none transition-all duration-300 shadow-sidebar',
        collapsed ? 'w-16' : 'w-[278px]'
      )}
      style={{
        backgroundImage: 'url("/t20-mestre-supremo/Fundo Menu Lateral.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <OrnateCorners sizeClass={collapsed ? 'w-8' : 'w-12'} />

      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 select-none"
        style={{ borderBottom: '1px solid rgba(200,155,60,0.12)' }}
      >
        <Icon name="icKnowledge" size={28} color="#C89B3C" className="flex-shrink-0" />
        {!collapsed && (
          <div>
            <div className="font-cinzel font-bold text-sm leading-tight" style={{ color: '#E4C16A', letterSpacing: '1px' }}>
              Compêndio
            </div>
            <div className="font-cinzel font-semibold text-xs tracking-widest" style={{ color: '#9a8e7c', letterSpacing: '3px' }}>
              MESTRE
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
        {/* Dashboard (sem grupo) */}
        {navItems.filter(i => !i.group).map(item => (
          <NavButton
            key={item.id}
            item={item}
            active={paginaAtual === item.id}
            collapsed={collapsed}
            onClick={() => setPaginaAtual(item.id)}
          />
        ))}

        {/* Seções agrupadas */}
        {GROUP_ORDER.map(group => {
          const itens = navItems.filter(i => i.group === group)
          if (!itens.length) return null
          return (
            <div key={group} className="mt-2">
              {!collapsed && (
                <div className="flex items-center gap-2 px-3 py-1.5 select-none pointer-events-none">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,155,60,0.25))' }} />
                  <span className="font-cinzel text-[0.6rem] uppercase tracking-[2px]" style={{ color: '#6e6356' }}>
                    {group}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,155,60,0.25))' }} />
                </div>
              )}
              {collapsed && <div className="mx-3 my-2 h-px" style={{ background: 'rgba(200,155,60,0.12)' }} />}
              {itens.map(item => (
                <NavButton
                  key={item.id}
                  item={item}
                  active={paginaAtual === item.id}
                  collapsed={collapsed}
                  onClick={() => setPaginaAtual(item.id)}
                />
              ))}
            </div>
          )
        })}
      </nav>

      {/* Footer / versão */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: '1px solid rgba(200,155,60,0.10)' }}
      >
        {!collapsed && (
          <Icon name="icMedal" size={14} color="#6e6356" />
        )}
        {!collapsed && (
          <span className="font-cinzel text-[0.6rem] tracking-widest" style={{ color: '#5a5145' }}>
            v2.0 · T20 Mestre
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex items-center justify-center transition-colors"
          style={{ color: '#6e6356' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C89B3C')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6e6356')}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft className="w-4 h-4" />
          }
        </button>
      </div>
    </aside>
  )
}

function NavButton({ item, active, collapsed, onClick }: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const iconColor = active ? '#E4C16A' : '#857a68'

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-left relative transition-colors duration-150 group"
      style={{
        background: active ? 'rgba(200,155,60,0.10)' : 'transparent',
        boxShadow: active ? 'inset 3px 0 0 #C89B3C' : 'none',
        color: active ? '#E8DFCF' : '#a99c86',
        fontWeight: active ? 600 : 400,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(200,155,60,0.06)'
          e.currentTarget.style.color = '#E8DFCF'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#a99c86'
        }
      }}
    >
      <Icon
        name={item.icon}
        size={16}
        color={iconColor}
        className="flex-shrink-0 transition-none"
      />
      {!collapsed && (
        <span className="font-crimson text-[0.9rem]">{item.label}</span>
      )}
      {collapsed && (
        <div
          className="absolute left-14 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
          style={{ background: '#1A141E', color: '#E8DFCF', border: '1px solid rgba(200,155,60,0.25)' }}
        >
          {item.label}
        </div>
      )}
    </button>
  )
}
