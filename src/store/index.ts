import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CombatanteCombate, NPC, Sessao, Missao } from '../types'
import { rollDie } from '../utils/dice'

interface AppState {
  // Navegação
  paginaAtual: string
  setPaginaAtual: (pagina: string) => void

  // Combate
  combatentes: CombatanteCombate[]
  rodadaAtual: number
  combatanteAtivo: string | null
  cronometroAtivo: boolean
  segundosSessao: number
  adicionarCombatente: (c: Omit<CombatanteCombate, 'id'>) => void
  removerCombatente: (id: string) => void
  atualizarCombatente: (id: string, dados: Partial<CombatanteCombate>) => void
  proximoTurno: () => void
  ordenarIniciativa: () => void
  resetarCombate: () => void
  aplicarCondicao: (id: string, condicao: string) => void
  removerCondicao: (id: string, condicao: string) => void
  setCronometro: (ativo: boolean) => void
  tickCronometro: () => void

  // NPCs
  npcs: NPC[]
  adicionarNPC: (npc: Omit<NPC, 'id'>) => void
  removerNPC: (id: string) => void
  atualizarNPC: (id: string, dados: Partial<NPC>) => void

  // Campanha
  sessoes: Sessao[]
  missoes: Missao[]
  anotacoesRapidas: string
  adicionarSessao: (s: Omit<Sessao, 'id'>) => void
  adicionarMissao: (m: Omit<Missao, 'id'>) => void
  atualizarMissao: (id: string, dados: Partial<Missao>) => void
  setAnotacoes: (texto: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      paginaAtual: 'dashboard',
      setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),

      combatentes: [],
      rodadaAtual: 1,
      combatanteAtivo: null,
      cronometroAtivo: false,
      segundosSessao: 0,

      adicionarCombatente: (c) => {
        const id = `${Date.now()}-${Math.random()}`
        set((s) => ({ combatentes: [...s.combatentes, { ...c, id }] }))
      },

      removerCombatente: (id) =>
        set((s) => ({ combatentes: s.combatentes.filter((c) => c.id !== id) })),

      atualizarCombatente: (id, dados) =>
        set((s) => ({
          combatentes: s.combatentes.map((c) => (c.id === id ? { ...c, ...dados } : c)),
        })),

      proximoTurno: () => {
        const { combatentes, combatanteAtivo, rodadaAtual } = get()
        if (!combatentes.length) return
        const idx = combatentes.findIndex((c) => c.id === combatanteAtivo)
        const next = (idx + 1) % combatentes.length
        set({
          combatanteAtivo: combatentes[next].id,
          rodadaAtual: next === 0 ? rodadaAtual + 1 : rodadaAtual,
        })
      },

      ordenarIniciativa: () => {
        set((s) => ({
          combatentes: [...s.combatentes].sort((a, b) => b.iniciativa - a.iniciativa),
          combatanteAtivo: s.combatentes.length > 0 ? [...s.combatentes].sort((a, b) => b.iniciativa - a.iniciativa)[0].id : null,
          rodadaAtual: 1,
        }))
      },

      resetarCombate: () =>
        set({ combatentes: [], rodadaAtual: 1, combatanteAtivo: null }),

      aplicarCondicao: (id, condicao) =>
        set((s) => ({
          combatentes: s.combatentes.map((c) =>
            c.id === id && !c.condicoes.includes(condicao)
              ? { ...c, condicoes: [...c.condicoes, condicao] }
              : c
          ),
        })),

      removerCondicao: (id, condicao) =>
        set((s) => ({
          combatentes: s.combatentes.map((c) =>
            c.id === id ? { ...c, condicoes: c.condicoes.filter((co) => co !== condicao) } : c
          ),
        })),

      setCronometro: (ativo) => set({ cronometroAtivo: ativo }),
      tickCronometro: () => set((s) => ({ segundosSessao: s.segundosSessao + 1 })),

      npcs: [],
      adicionarNPC: (npc) => {
        const id = `npc-${Date.now()}`
        set((s) => ({ npcs: [...s.npcs, { ...npc, id }] }))
      },
      removerNPC: (id) => set((s) => ({ npcs: s.npcs.filter((n) => n.id !== id) })),
      atualizarNPC: (id, dados) =>
        set((s) => ({ npcs: s.npcs.map((n) => (n.id === id ? { ...n, ...dados } : n)) })),

      sessoes: [],
      missoes: [],
      anotacoesRapidas: '',

      adicionarSessao: (s) => {
        const id = `sessao-${Date.now()}`
        set((st) => ({ sessoes: [...st.sessoes, { ...s, id }] }))
      },

      adicionarMissao: (m) => {
        const id = `missao-${Date.now()}`
        set((s) => ({ missoes: [...s.missoes, { ...m, id }] }))
      },

      atualizarMissao: (id, dados) =>
        set((s) => ({ missoes: s.missoes.map((m) => (m.id === id ? { ...m, ...dados } : m)) })),

      setAnotacoes: (texto) => set({ anotacoesRapidas: texto }),
    }),
    { name: 't20-mestre-supremo' }
  )
)
