import type { NPC } from '@/types'
import { pickRandom } from '@/lib/random'

const nomesFantasia = {
  masculinos: ['Aldric', 'Bram', 'Caelan', 'Davan', 'Edric', 'Fynn', 'Gareth', 'Hector', 'Ivan', 'Jasper', 'Keiran', 'Loric', 'Maren', 'Nael', 'Owen', 'Piers', 'Quinn', 'Raven', 'Soren', 'Thane', 'Ulric', 'Vance', 'Wren', 'Xander', 'Yaron', 'Zane', 'Arath', 'Beren', 'Cedric', 'Darian'],
  femininos: ['Aelith', 'Brynn', 'Cara', 'Dael', 'Elara', 'Faye', 'Gwen', 'Helia', 'Isla', 'Jade', 'Kira', 'Lyra', 'Mira', 'Nora', 'Ora', 'Petra', 'Qira', 'Runa', 'Sable', 'Tara', 'Una', 'Vera', 'Wren', 'Xara', 'Yana', 'Zara', 'Alara', 'Brea', 'Calla', 'Deva'],
  sobrenomes: ['Pedranegra', 'Corvonévoa', 'Ferroduro', 'Lamafria', 'Olhochama', 'Punhodestino', 'Ventosilente', 'Coraçãosombra', 'Caminholuz', 'Pontadaespada', 'Escudoeterno', 'Mantocinza', 'Olhoestrela', 'Brasaluz', 'Sombraalta'],
} as const

const racas = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Gnomo', 'Meio-Elfo', 'Meio-Orc', 'Tiefling', 'Draconato'] as const
const classes = ['Guerreiro', 'Mago', 'Ladino', 'Clérigo', 'Ranger', 'Paladino', 'Bardo', 'Druida', 'Bárbaro', 'Feiticeiro', 'Monge', 'Arcanista'] as const

const personalidades = [
  'Sarcástico mas confiável em momentos de crise',
  'Extremamente curioso e falador demais',
  'Sério e direto ao ponto, sem rodeios',
  'Gentil e empático, ouve mais do que fala',
  'Desconfiado de estranhos, leal a amigos',
  'Ambicioso e calculista, sempre avalia vantagens',
  'Espirituoso e bem-humorado, descontrai situações tensas',
  'Melancólico com passado sombrio que não compartilha',
  'Entusiasmado e otimista, mesmo nas piores situações',
  'Frio e profissional, mantém distância emocional',
  'Ansioso e nervoso, mas competente quando necessário',
  'Arrogante mas reconhece mérito alheio em privado',
] as const

const motivacoes = [
  'Proteger sua família de uma ameaça oculta',
  'Recuperar um objeto roubado de grande valor sentimental',
  'Pagar uma dívida de honra com uma pessoa do passado',
  'Encontrar respostas sobre suas origens misteriosas',
  'Ganhar dinheiro suficiente para comprar terras e se aposentar',
  'Vingar a morte de um ser querido',
  'Provar ao mundo que é digno de respeito',
  'Seguir os ensinamentos de seu deus fielmente',
  'Acumular conhecimento e poder mágico',
  'Encontrar o amor verdadeiro em meio ao caos',
  'Escapar de um passado criminoso e recomeçar',
  'Ajudar os mais fracos, pois foi fraco no passado',
] as const

const segredos = [
  'Na verdade é agente de uma facção oculta',
  'Tem sangue nobre que esconde deliberadamente',
  'Cometeu um crime imperdoável que dorme sobre',
  'Sabe a localização de um tesouro que não contou a ninguém',
  'Está apaixonado por alguém inacessível ou proibido',
  'Viu algo que não devia e foi ameaçado a ficar em silêncio',
  'Não é humano — é um ser disfarçado',
  'Deve favores a uma organização criminosa',
  'Perdeu a memória de um período específico de sua vida',
  'Tem habilidade mágica que esconde com medo de perseguição',
  'Traiu amigos no passado e vive com a culpa',
  'Sabe que uma pessoa querida dos PJs é vilã',
] as const

const aparencias = [
  'Alto e esguio, com cicatriz vertical no rosto esquerdo',
  'Baixo e robusto, cabelos grisalhos apesar de jovem',
  'Olhos de cores diferentes — um verde, um âmbar',
  'Sempre usa capuz que esconde o rosto parcialmente',
  'Tatuagem tribal cobrindo braço esquerdo inteiro',
  'Cabelos completamente brancos, pele jovem — efeito mágico',
  'Coxeia levemente da perna direita por ferida antiga',
  'Dedos sempre manchados de tinta ou ervas',
  'Porte imponente, voz profunda que comanda atenção',
  'Aparência comum e esquecível — proposital ou não',
  'Olhos que brilham levemente em ambientes escuros',
  'Marcas de queimadura no pescoço, parcialmente cobertas',
] as const

const tavernas = {
  adjetivos: ['O Corvo', 'O Cervo', 'A Espada', 'O Dragão', 'A Coroa', 'O Ancião', 'A Lua', 'O Sol', 'A Pedra', 'O Lobo'],
  substantivos: ['Prateado', 'Dourado', 'Sombrio', 'Dançante', 'Adormecido', 'Perdido', 'Feliz', 'Furioso', 'Tranquilo', 'Bêbado'],
} as const

const grilhoes = [
  'Baú com moedas e joias (valor variável)',
  'Arma mágica de valor moderado',
  'Pergaminho com mapa para local desconhecido',
  'Estatueta de jade de deus antigo',
  'Livro de feitiços com 1d4 magias novas',
  'Chave de propósito desconhecido',
  'Amuleto com poder adormecido',
  'Diário de aventureiro com informações valiosas',
  'Cristal que brilha perto de magia',
  'Bolsa de pó com efeito mágico não identificado',
] as const

const ganchos = [
  'Um mercador foi roubado e quer recuperar sua mercadoria',
  'Rumores de um dragão awoke próximo à cidade',
  'Criança desaparecida na floresta proibida',
  'Artefato sagrado foi roubado do templo',
  'Nobre contrata escolta para missão perigosa',
  'Assassino misterioso está mirando figuras importantes',
  'Portal dimensional está desestabilizando a região',
  'Guilda dos ladrões tomou controle de bairro',
] as const

const viloes = [
  'Mago renegado buscando poder proibido',
  'Nobre corrupto explorando camponeses',
  'Culto das Trevas invocando demônio',
  'Lich buscando o próprio phylactery perdido',
  'Dragão que quer dominar a região',
  'Assassino misterioso cumprindo contrato',
  'Vampiro construindo exército de mortos-vivos',
  'Tirano militar com exército superior',
] as const

const objetivos = [
  'Recuperar o artefato antes do ritual ser completado',
  'Eliminar o líder da operação',
  'Expor a conspiração publicamente',
  'Proteger o inocente até o julgamento',
  'Destruir o portal dimensional',
  'Libertar os prisioneiros',
  'Encontrar a fraqueza do inimigo',
  'Coletar provas suficientes para a autoridade agir',
] as const

const recompensas = [
  '500 TO e um favor de uma guilda poderosa',
  'Item mágico de valor moderado + 200 TO',
  'Informação sobre um tesouro escondido',
  'Título de nobreza menor em reconhecimento',
  'Treinamento com mestre de renome',
  '1.000 TO e passagem para onde quiserem',
  'Posse de uma propriedade na cidade',
  'Gratidão eterna de uma organização influente',
] as const

const plotTwists = [
  'O contratante é, na verdade, o verdadeiro vilão',
  'A vítima orquestrou o próprio desaparecimento',
  'Há dois grupos com o mesmo objetivo — um deles é pior',
  'O artefato buscado não existe; era isca para uma armadilha',
  'Um dos NPC aliados é espião do lado inimigo',
  'A ameaça vem de dentro — alguém do grupo está comprometido',
  'O vilão tem motivos compreensíveis e pode ser redimido',
  'Resolver o problema cria outro, ainda maior',
] as const

const tiposSalas = [
  'Corredor longo (possível patrulha)', 'Câmara vazia (mas com sinais de uso)',
  'Sala com armadilha mecânica', 'Câmara de guarda', 'Sala do tesouro (guardada)',
  'Câmara com puzzle', 'Sala do chefe', 'Câmara inundada',
  'Corredor em T com escolha', 'Sala de ritual',
] as const

function gerarNomeCompleto(): string {
  const isMasculino = Math.random() > 0.5
  const nomes = isMasculino ? nomesFantasia.masculinos : nomesFantasia.femininos
  return `${pickRandom(nomes)} ${pickRandom(nomesFantasia.sobrenomes)}`
}

export function gerarNPC(): Omit<NPC, 'id'> {
  return {
    nome: gerarNomeCompleto(),
    raca: pickRandom(racas),
    classe: pickRandom(classes),
    personalidade: pickRandom(personalidades),
    motivacao: pickRandom(motivacoes),
    segredo: pickRandom(segredos),
    aparencia: pickRandom(aparencias),
    notas: '',
  }
}

export function gerarNomeTaverna(): string {
  return `${pickRandom(tavernas.adjetivos)} ${pickRandom(tavernas.substantivos)}`
}

export function gerarTesouro(): string {
  return pickRandom(grilhoes)
}

export function gerarNome(): string {
  return gerarNomeCompleto()
}

export function gerarAventura() {
  return {
    gancho: pickRandom(ganchos),
    vilao: pickRandom(viloes),
    objetivo: pickRandom(objetivos),
    recompensa: pickRandom(recompensas),
    plotTwist: pickRandom(plotTwists),
  }
}

export function gerarMasmorra(): string[] {
  const quantidade = 5 + Math.floor(Math.random() * 5)
  return Array.from({ length: quantidade }, () => pickRandom(tiposSalas))
}
