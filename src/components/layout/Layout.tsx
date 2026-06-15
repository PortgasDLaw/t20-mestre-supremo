import { useEffect, useRef } from 'react'
import { Sidebar } from './Sidebar'
import { useStore } from '../../store'
import Dashboard from '../../pages/Dashboard'
import Equipamentos from '../../pages/Equipamentos'
import Condicoes from '../../pages/Condicoes'
import Magias from '../../pages/Magias'
import Ameacas from '../../pages/Ameacas'
import GeradorEncontros from '../../pages/GeradorEncontros'
import RastreadorCombate from '../../pages/RastreadorCombate'
import TabelasMestre from '../../pages/TabelasMestre'
import NPCs from '../../pages/NPCs'
import ReinosArton from '../../pages/ReinosArton'
import Campanha from '../../pages/Campanha'
import GeradorAventuras from '../../pages/GeradorAventuras'
import FerramentasRapidas from '../../pages/FerramentasRapidas'
import BuscaUniversal from '../../pages/BuscaUniversal'
import Racas from '../../pages/Racas'
import Classes from '../../pages/Classes'

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
          {pages[paginaAtual] ?? <Dashboard />}
        </div>
      </main>
    </div>
  )
}
