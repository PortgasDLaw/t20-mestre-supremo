export interface Condicao {
  id: string
  nome: string
  cor: string
  icone: string
  descricao: string
  penalidades: string[]
  interacoes: string[]
  remocao: string
}

export interface Arma {
  id: string
  nome: string
  categoria: 'arma'
  tipo: string
  preco: string
  peso: string
  dano: string
  critico: string
  alcance: string
  tipoDano: string
  propriedades: string[]
  descricao: string
}

export interface Armadura {
  id: string
  nome: string
  categoria: 'armadura'
  tipo: string
  preco: string
  peso: string
  bonus: string
  maxDes: string
  penalidade: string
  descricao: string
}

export interface Escudo {
  id: string
  nome: string
  categoria: 'escudo'
  tipo: string
  preco: string
  peso: string
  bonus: string
  penalidade: string
  descricao: string
}

export interface ItemGeral {
  id: string
  nome: string
  categoria: 'itemGeral'
  tipo: string
  preco: string
  peso: string
  descricao: string
}

export interface ItemMagico {
  id: string
  nome: string
  categoria: 'pocao' | 'pergaminho' | 'anel' | 'amuleto' | 'arma' | 'item'
  tipo: 'magico'
  preco: string
  peso: string
  descricao: string
  escola?: string
  requisito?: string
  circulo?: number
  dano?: string
  critico?: string
}

export type Equipamento = Arma | Armadura | Escudo | ItemGeral | ItemMagico

export interface Magia {
  id: string
  nome: string
  tipo: 'arcana' | 'divina'
  escola: string
  circulo: number
  pm: number
  execucao: string
  alcance: string
  duracao: string
  area: string
  resistencia: string
  descricao: string
  aprimoramentos: string[]
}

export interface Ataque {
  nome: string
  bônus: string
  dano: string
  critico: string
  tipo: string
  alcance?: string
}

export interface Ameaca {
  id: string
  nome: string
  nd: string
  tipo: string
  tamanho: string
  pv: number
  pm: number
  ca: number
  iniciativa: string
  atributos: Record<string, number | string>
  resistencias: { fortitude: number; reflexos: number; vontade: number }
  deslocamento: string
  ataques: Ataque[]
  habilidades: string[]
  tesouro: string
  taticas: string
  habitat: string
  descricao: string
}

export interface Reino {
  id: string
  nome: string
  tipo: string
  governo: string
  populacao: string
  cor: string
  historia: string
  descricao: string
  cidades: string[]
  religiao: string[]
  conflitos: string[]
  ganchos: string[]
}

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
