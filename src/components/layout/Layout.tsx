import { lazy, Suspense, useEffect, useRef } from 'react'
import { Sidebar } from './Sidebar'
import { useStore } from '@/store'

const Dashboard = lazy(() => import('@/features/campanha/Dashboard'))
const Equipamentos = lazy(() => import('@/features/compendio/Equipamentos'))
const Condicoes = lazy(() => import('@/features/compendio/Condicoes'))
const Magias = lazy(() => import('@/features/compendio/Magias'))
const Ameacas = lazy(() => import('@/features/compendio/Ameacas'))
const GeradorEncontros = lazy(() => import('@/features/combate/GeradorEncontros'))
const RastreadorCombate = lazy(() => import('@/features/combate/RastreadorCombate'))
const TabelasMestre = lazy(() => import('@/features/compendio/TabelasMestre'))
const NPCs = lazy(() => import('@/features/campanha/NPCs'))
const ReinosArton = lazy(() => import('@/features/compendio/ReinosArton'))
const Campanha = lazy(() => import('@/features/campanha/Campanha'))
const GeradorAventuras = lazy(() => import('@/features/ferramentas/GeradorAventuras'))
const FerramentasRapidas = lazy(() => import('@/features/ferramentas/FerramentasRapidas'))
const BuscaUniversal = lazy(() => import('@/features/ferramentas/BuscaUniversal'))
const Racas = lazy(() => import('@/features/compendio/Racas'))
const Classes = lazy(() => import('@/features/compendio/Classes'))

const pages: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  racas: <Racas />,
  classes: <Classes />,
  equipamentos: <Equipamentos />,
  condicoes: <Condicoes />,
  magias: <Magias />,
  ameacas: <Ameacas />,
  encontros: <GeradorEncontros />,
  combate: <RastreadorCombate />,
  tabelas: <TabelasMestre />,
  npcs: <NPCs />,
  reinos: <ReinosArton />,
  campanha: <Campanha />,
  aventuras: <GeradorAventuras />,
  ferramentas: <FerramentasRapidas />,
  busca: <BuscaUniversal />,
}

export function Layout() {
  const { paginaAtual, cronometroAtivo, tickCronometro } = useStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (cronometroAtivo) {
      intervalRef.current = setInterval(tickCronometro, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [cronometroAtivo, tickCronometro])

  return (
    <div className="flex h-screen bg-abyss-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gothic-pattern">
        <div className="min-h-full p-6 animate-fade-in">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="font-cinzel text-gold animate-pulse">Carregando...</div>
            </div>
          }>
            {pages[paginaAtual] ?? <Dashboard />}
          </Suspense>
        </div>
      </main>
    </div>
  )
}
