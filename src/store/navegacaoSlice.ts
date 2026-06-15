import type { StateCreator } from 'zustand'

export interface NavSlice {
  paginaAtual: string
  setPaginaAtual: (pagina: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNavSlice: StateCreator<any, [], [], NavSlice> = (set) => ({
  paginaAtual: 'dashboard',
  setPaginaAtual: (pagina) => set({ paginaAtual: pagina }),
})
