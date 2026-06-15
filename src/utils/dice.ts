export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollDice(count: number, sides: number, modifier = 0): { rolls: number[]; total: number } {
  const rolls = Array.from({ length: count }, () => rollDie(sides))
  const total = rolls.reduce((sum, r) => sum + r, 0) + modifier
  return { rolls, total }
}

export function parseDiceNotation(notation: string): { count: number; sides: number; modifier: number } | null {
  const match = notation.match(/^(\d+)d(\d+)([+-]\d+)?$/i)
  if (!match) return null
  return {
    count: parseInt(match[1]),
    sides: parseInt(match[2]),
    modifier: match[3] ? parseInt(match[3]) : 0,
  }
}

export function rollNotation(notation: string): { rolls: number[]; total: number; notation: string } | null {
  const parsed = parseDiceNotation(notation)
  if (!parsed) return null
  const result = rollDice(parsed.count, parsed.sides, parsed.modifier)
  return { ...result, notation }
}

export const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const

export function rollInitiative(dexMod = 0): number {
  return rollDie(20) + dexMod
}
