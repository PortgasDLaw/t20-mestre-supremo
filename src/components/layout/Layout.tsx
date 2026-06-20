import { lazy, Suspense, useEffect, useRef } from 'react'
import { Sidebar } from './Sidebar'
import { PageShell } from './PageShell'
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
const Distincoes = lazy(() => import('@/features/compendio/Distincoes'))
const DeusesMenores = lazy(() => import('@/features/compendio/DeusesMenores'))
const ItensMagicos = lazy(() => import('@/features/compendio/ItensMagicos'))
const PoderesConcedidos = lazy(() => import('@/features/compendio/PoderesConcedidos'))
const DevocaoAlternativa = lazy(() => import('@/features/compendio/DevocaoAlternativa'))
const RegrasOpcionais = lazy(() => import('@/features/compendio/RegrasOpcionais'))

// Páginas com layout próprio h-full (sem PageShell)
const FULL_PAGES: Record<string, React.ReactNode> = {
  racas:              <Racas />,
  classes:            <Classes />,
  equipamentos:       <Equipamentos />,
  magias:             <Magias />,
  ameacas:            <Ameacas />,
  condicoes:          <Condicoes />,
  devocaoAlternativa: <DeusesMenores />,           // aba "Deuses" → Glórienn + deuses menores
}

// Páginas que usam scroll simples (via PageShell com p-7)
const SHELL_PAGES: Record<string, React.ReactNode> = {
  dashboard:          <Dashboard />,
  distincoes:         <Distincoes />,
  deuses:             <DevocaoAlternativa />,      // aba "Devotos" → druidas, paladinos, vingadores
  itensMagicos:       <ItensMagicos />,
  poderesConcedidos:  <PoderesConcedidos />,
  regrasOpcionais:    <RegrasOpcionais />,
  encontros:          <GeradorEncontros />,
  combate:            <RastreadorCombate />,
  tabelas:            <TabelasMestre />,
  npcs:               <NPCs />,
  reinos:             <ReinosArton />,
  campanha:           <Campanha />,
  aventuras:          <GeradorAventuras />,
  ferramentas:        <FerramentasRapidas />,
  busca:              <BuscaUniversal />,
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
    <div className="flex h-screen overflow-hidden" style={{ background: '#0E0A12' }}>
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center flex-1">
            <span className="font-cinzel text-gold animate-pulse tracking-widest text-sm">
              Carregando...
            </span>
          </div>
        }>
          {FULL_PAGES[paginaAtual]
            ? FULL_PAGES[paginaAtual]
            : <PageShell>{SHELL_PAGES[paginaAtual] ?? <Dashboard />}</PageShell>
          }
        </Suspense>
      </main>
    </div>
  )
}
