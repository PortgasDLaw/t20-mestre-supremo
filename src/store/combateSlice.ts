import type { StateCreator } from 'zustand'
import type { CombatanteCombate } from '@/types'
import { generateId } from '@/lib/id'

export interface CombateSlice {
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCombateSlice: StateCreator<any, [], [], CombateSlice> = (set, get) => ({
  combatentes: [],
  rodadaAtual: 1,
  combatanteAtivo: null,
  cronometroAtivo: false,
  segundosSessao: 0,

  adicionarCombatente: (c) => {
    const id = generateId('combatente')
    set((s: CombateSlice) => ({ combatentes: [...s.combatentes, { ...c, id }] }))
  },

  removerCombatente: (id) =>
    set((s: CombateSlice) => ({ combatentes: s.combatentes.filter((c) => c.id !== id) })),

  atualizarCombatente: (id, dados) =>
    set((s: CombateSlice) => ({
      combatentes: s.combatentes.map((c) => (c.id === id ? { ...c, ...dados } : c)),
    })),

  proximoTurno: () => {
    const { combatentes, combatanteAtivo, rodadaAtual } = get() as CombateSlice
    if (!combatentes.length) return
    const idx = combatentes.findIndex((c) => c.id === combatanteAtivo)
    const next = (idx + 1) % combatentes.length
    set({
      combatanteAtivo: combatentes[next].id,
      rodadaAtual: next === 0 ? rodadaAtual + 1 : rodadaAtual,
    })
  },

  ordenarIniciativa: () => {
    set((s: CombateSlice) => {
      const sorted = [...s.combatentes].sort((a, b) => b.iniciativa - a.iniciativa)
      return { combatentes: sorted, combatanteAtivo: sorted[0]?.id ?? null, rodadaAtual: 1 }
    })
  },

  resetarCombate: () => set({ combatentes: [], rodadaAtual: 1, combatanteAtivo: null }),

  aplicarCondicao: (id, condicao) =>
    set((s: CombateSlice) => ({
      combatentes: s.combatentes.map((c) =>
        c.id === id && !c.condicoes.includes(condicao)
          ? { ...c, condicoes: [...c.condicoes, condicao] }
          : c
      ),
    })),

  removerCondicao: (id, condicao) =>
    set((s: CombateSlice) => ({
      combatentes: s.combatentes.map((c) =>
        c.id === id ? { ...c, condicoes: c.condicoes.filter((co) => co !== condicao) } : c
      ),
    })),

  setCronometro: (ativo) => set({ cronometroAtivo: ativo }),
  tickCronometro: () => set((s: CombateSlice) => ({ segundosSessao: s.segundosSessao + 1 })),
})
