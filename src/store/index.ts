import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createCombateSlice, type CombateSlice } from './combateSlice'
import { createNpcSlice, type NpcSlice } from './npcSlice'
import { createCampanhaSlice, type CampanhaSlice } from './campanhaSlice'
import { createNavSlice, type NavSlice } from './navegacaoSlice'
import { appStateSchema } from './schemas'

export type AppState = NavSlice & CombateSlice & NpcSlice & CampanhaSlice

export const useStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createNavSlice(...args),
      ...createCombateSlice(...args),
      ...createNpcSlice(...args),
      ...createCampanhaSlice(...args),
    }),
    {
      name: 't20-mestre-supremo',
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const result = appStateSchema.safeParse(state)
        if (!result.success) {
          console.warn('[T20] Estado do localStorage corrompido — campos inválidos foram ignorados.', result.error.flatten())
        }
      },
    }
  )
)
