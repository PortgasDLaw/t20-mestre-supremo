export interface NPC {
  id: string
  nome: string
  raca: string
  classe: string
  personalidade: string
  motivacao: string
  segredo: string
  aparencia: string
  notas: string
}

export interface Sessao {
  id: string
  numero: number
  data: string
  titulo: string
  resumo: string
  npcsPresentes: string[]
  locais: string[]
  itensUsados: string[]
  conquistas: string[]
}

export interface Missao {
  id: string
  titulo: string
  descricao: string
  objetivos: string[]
  recompensa: string
  status: 'ativa' | 'concluida' | 'falhou' | 'pendente'
  npcsRelacionados: string[]
}
