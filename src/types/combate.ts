export interface CombatanteCombate {
  id: string
  nome: string
  iniciativa: number
  pv: number
  pvMax: number
  pm: number
  pmMax: number
  ca: number
  tipo: 'jogador' | 'monstro' | 'npc'
  condicoes: string[]
  notas: string
}
