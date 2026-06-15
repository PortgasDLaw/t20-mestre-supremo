import type { StateCreator } from 'zustand'
import type { Sessao, Missao } from '@/types'
import { generateId } from '@/lib/id'

export interface CampanhaSlice {
  sessoes: Sessao[]
  missoes: Missao[]
  anotacoesRapidas: string
  adicionarSessao: (s: Omit<Sessao, 'id'>) => void
  adicionarMissao: (m: Omit<Missao, 'id'>) => void
  atualizarMissao: (id: string, dados: Partial<Missao>) => void
  setAnotacoes: (texto: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCampanhaSlice: StateCreator<any, [], [], CampanhaSlice> = (set) => ({
  sessoes: [],
  missoes: [],
  anotacoesRapidas: '',

  adicionarSessao: (s) => {
    const id = generateId('sessao')
    set((st: CampanhaSlice) => ({ sessoes: [...st.sessoes, { ...s, id }] }))
  },

  adicionarMissao: (m) => {
    const id = generateId('missao')
    set((s: CampanhaSlice) => ({ missoes: [...s.missoes, { ...m, id }] }))
  },

  atualizarMissao: (id, dados) =>
    set((s: CampanhaSlice) => ({
      missoes: s.missoes.map((m) => (m.id === id ? { ...m, ...dados } : m)),
    })),

  setAnotacoes: (texto) => set({ anotacoesRapidas: texto }),
})
