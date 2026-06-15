import { z } from 'zod'

const combatanteSchema = z.object({
  id: z.string(),
  nome: z.string(),
  iniciativa: z.number(),
  pv: z.number(),
  pvMax: z.number(),
  pm: z.number(),
  pmMax: z.number(),
  ca: z.number(),
  tipo: z.enum(['jogador', 'monstro', 'npc']),
  condicoes: z.array(z.string()),
  notas: z.string(),
})

const npcSchema = z.object({
  id: z.string(),
  nome: z.string(),
  raca: z.string(),
  classe: z.string(),
  personalidade: z.string(),
  motivacao: z.string(),
  segredo: z.string(),
  aparencia: z.string(),
  notas: z.string(),
})

const sessaoSchema = z.object({
  id: z.string(),
  numero: z.number(),
  data: z.string(),
  titulo: z.string(),
  resumo: z.string(),
  npcsPresentes: z.array(z.string()),
  locais: z.array(z.string()),
  itensUsados: z.array(z.string()),
  conquistas: z.array(z.string()),
})

const missaoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descricao: z.string(),
  objetivos: z.array(z.string()),
  recompensa: z.string(),
  status: z.enum(['ativa', 'concluida', 'falhou', 'pendente']),
  npcsRelacionados: z.array(z.string()),
})

export const appStateSchema = z.object({
  paginaAtual: z.string().default('dashboard'),
  combatentes: z.array(combatanteSchema).default([]),
  rodadaAtual: z.number().default(1),
  combatanteAtivo: z.string().nullable().default(null),
  cronometroAtivo: z.boolean().default(false),
  segundosSessao: z.number().default(0),
  npcs: z.array(npcSchema).default([]),
  sessoes: z.array(sessaoSchema).default([]),
  missoes: z.array(missaoSchema).default([]),
  anotacoesRapidas: z.string().default(''),
})

export type ValidatedState = z.infer<typeof appStateSchema>
