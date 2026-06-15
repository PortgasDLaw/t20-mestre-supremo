import type { StateCreator } from 'zustand'
import type { NPC } from '@/types'
import { generateId } from '@/lib/id'

export interface NpcSlice {
  npcs: NPC[]
  adicionarNPC: (npc: Omit<NPC, 'id'>) => void
  removerNPC: (id: string) => void
  atualizarNPC: (id: string, dados: Partial<NPC>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNpcSlice: StateCreator<any, [], [], NpcSlice> = (set) => ({
  npcs: [],

  adicionarNPC: (npc) => {
    const id = generateId('npc')
    set((s: NpcSlice) => ({ npcs: [...s.npcs, { ...npc, id }] }))
  },

  removerNPC: (id) =>
    set((s: NpcSlice) => ({ npcs: s.npcs.filter((n) => n.id !== id) })),

  atualizarNPC: (id, dados) =>
    set((s: NpcSlice) => ({ npcs: s.npcs.map((n) => (n.id === id ? { ...n, ...dados } : n)) })),
})
