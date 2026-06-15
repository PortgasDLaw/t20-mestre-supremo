// ============================================================
// A MALDIÇÃO DE STRAHD — Guia do Mestre para Tormenta20
// Adaptado de D&D 5e para T20
// ============================================================

export interface GuiaSecao {
  id: string
  titulo: string
  nivel?: string
  descricao: string
  subsecoes: GuiaSubsecao[]
}

export interface GuiaSubsecao {
  id: string
  titulo: string
  nivel?: string
  descricao?: string
  tipo?: 'narration' | 'combat' | 'roleplay' | 'exploration' | 'warning' | 'tip' | 'secret'
  conteudo?: string
  subsecoes?: GuiaSubsecao[]
  encontros?: Encontro[]
  recompensas?: string[]
  itens?: string[]
  cd?: { pericia: string; cd: number; resultado: string }[]
}

export interface Encontro {
  nome: string
  nd: string
  quantidade: number
  nota?: string
}

export interface Monstro {
  id: string
  nome: string
  nd: string
  tipo: string
  tamanho: string
  pv: number
  defesa: number
  iniciativa: string
  deslocamento: string
  atributos: { for: number; des: number; con: number; int: number; sab: number; car: number }
  resistencias: { fortitude: string; reflexos: string; vontade: string }
  imunidades?: string[]
  resistenciaDano?: string[]
  sentidos?: string[]
  ataques: { nome: string; bonus: string; dano: string; tipo: string; descricao?: string }[]
  habilidades: { nome: string; descricao: string }[]
  acoes?: { nome: string; descricao: string }[]
  descricao: string
  localizacao?: string
}

export interface NPC {
  id: string
  nome: string
  titulo: string
  localizacao: string
  alinhamento: string
  personalidade: string
  aparencia: string
  objetivo: string
  segredo?: string
  falas: { situacao: string; fala: string }[]
  estatisticas?: {
    nd: string; pv: number; defesa: number
    pericias?: string
  }
}

export interface CartaTarokka {
  id: string
  naipe: string
  valor: string
  nome: string
  descricao: string
  significado: string
}

export interface TabelaCampanha {
  id: string
  titulo: string
  descricao: string
  colunas: string[]
  linhas: string[][]
  nota?: string
}

export interface Item {
  id: string
  nome: string
  tipo: 'artefato' | 'magico' | 'consumivel' | 'documento' | 'tesouro'
  raridade: 'comum' | 'incomum' | 'raro' | 'muito-raro' | 'lendario'
  capitulo: string
  localizacao: string
  descricao: string
  mecanica?: string
  observacoes?: string
}

// ============================================================
// GUIA COMPLETO — PASSO A PASSO
// ============================================================

export const GUIA_CAMPANHA: GuiaSecao[] = [
  // ── 1. INTRODUÇÃO ──────────────────────────────────────────
  {
    id: 'introducao',
    titulo: 'Introdução: O Chamado de Barovia',
    descricao: 'Antes de começar, leia este parágrafo em voz alta para os jogadores:',
    subsecoes: [
      {
        id: 'texto-abertura',
        titulo: 'Texto de Abertura (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"Uma névoa espessa e fria envolve seus pés enquanto vocês caminham pela estrada. O céu está encoberto de nuvens pesadas e cinzentas, bloqueando qualquer vestígio de sol. As árvores à beira do caminho parecem mortas, seus galhos retorcidos como dedos esqueléticos. Então, emergindo da neblina, dois pequenos vultos se aproximam. São crianças — uma menina e um menino, talvez oito e dez anos, respectivamente. Seus rostos são pálidos como papel, os olhos arregalados de medo. A menina segura a mão do irmão com força.

A menina fala primeiro, sua voz tremendo: 'Moços, por favor! Nosso bebê irmão está preso em nossa casa. Há um monstro escondido no porão. Por favor, nos ajudem!'

O menino aponta para uma mansão imponente no topo de uma colina. A construção exala um ar de decadência e tristeza, suas janelas como olhos ocos olhando para baixo, julgando-os."`,
        cd: [
          { pericia: 'Intuição', cd: 12, resultado: 'O MESTRE DIZ (apenas para aquele jogador): "Há algo errado com as crianças. Quando a menina se move, você jura ver a árvore atrás dela por um segundo — como se ela fosse levemente transparente. A luz não bate nelas da mesma forma que bate em você. E quando o vento passa, os cabelos delas não se mexem." — SE O PERSONAGEM AVISAR OS OUTROS: Os outros podem fazer Misticismo CD 14 para confirmar: "Sim. São espíritos. Fantasmas — mas claramente não sabem que estão mortos. Não são hostis. Ainda." — SE CONFRONTAREM AS CRIANÇAS DIRETAMENTE SOBRE ISSO: As crianças ficam confusas. Rose olha para as próprias mãos. Thorn recua um passo. "O que vocês estão dizendo?" Elas genuinamente não sabem. Não é o momento certo para revelar — guard this revelation for the ritual chamber.' },
        ]
      },
      {
        id: 'prefacio-mestre',
        titulo: 'Notas para o Mestre',
        tipo: 'tip',
        conteudo: `As crianças são os **fantasmas de Rose e Thorn Durst**, filhos dos Dursts — a família que habitava a Casa da Morte. Elas não sabem que estão mortas. Querem lure os aventureiros para dentro da casa.

**Rose (Rosalynn Durst)**, 10 anos: A mais velha e protetora. É ela quem fala mais. Faz perguntas diretas e observa os aventureiros com atenção.

**Thorn (Thornboldt Durst)**, 8 anos: O mais tímido. Segura a mão da irmã. Se os aventureiros se mostrarem amigáveis, ele relaxa um pouco e pode revelar detalhes sobre a casa.

**O que elas sabem (mas não contam facilmente):**
- Há "um monstro" no porão (é o cultista que eles chamam de "A Sombra")
- Seus pais dormem no quarto principal, mas não acordam há muito tempo
- O bebê Walter fica no berçário no 3º andar
- Elas têm um gatinho chamado Barbas

**O que elas NÃO sabem:**
- Que estão mortas
- Que seus pais eram líderes de um culto dedicado a Strahd
- Que Walter morreu há séculos`
      }
    ]
  },
  {
    id: 'casa-da-morte',
    titulo: 'Casa da Morte',
    nivel: 'Nível 2 (adaptado)',
    descricao: 'A Casa da Morte é o ponto de entrada na campanha. Originalmente projetada para os níveis 1-2, esta versão foi ajustada para personagens de nível 2 em Tormenta20. A casa tem 4 andares + porão + masmorra. O objetivo é lure os personagens para dentro e usá-los como sacrifício.',
    subsecoes: [
      {
        id: 'exterior',
        titulo: 'Área 1-2: Fachada e Entrada Principal',
        tipo: 'exploration',
        conteudo: `**Descrição (leia em voz alta):**
"A mansão Durst se ergue três andares acima de vocês, seu acabamento em pedra escura coberto por décadas de musgo. Dois gárgulas de pedra flanqueiam o portão de ferro enferrujado — e vocês têm quase certeza de que seus olhos de pedra seguiram os movimentos de vocês à medida que se aproximavam. A porta principal é de carvalho maciço com dobradiças de ferro, ornamentada com uma aldrava em forma de leão com um anel na boca."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERCEPÇÃO PASSIVA CD 12 — Os Gárgulas Vivos
Qualquer personagem com PP 12+ nota automaticamente.

O MESTRE DIZ: "Algo está errado com as estátuas. Os olhos delas — você percebe agora — não são de pedra comum. São de obsidiana polida, escura como a noite, e eles se movem. Lentamente. Mas inegavelmente. Acompanham cada passo de vocês pelo jardim. Quando vocês param diante da porta, as duas cabeças giram — audível o rangido de pedra sobre pedra — para encarar o grupo diretamente."

SE PERGUNTAREM SE ATACAM: "Eles observam. Apenas observam. Por enquanto."
SE TENTAREM FALAR COM ELES: Nenhuma resposta. Os olhos de obsidiana simplesmente seguem o movimento.
SE TENTAREM QUEBRAR OS OLHOS: Os gárgulas resistem como pedra normal (mas a casa vai "lembrar" dessa agressão — fantasmas ficam mais agressivos no andar superior).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 10 — A Aldrava de Leão

O MESTRE DIZ: "Você limpa a ferrugem da garganta do leão com o polegar e encontra letras minúsculas gravadas no metal escurecido: 'Família Durst — 754 do Calendário Baroviano.' A data foi gravada com cuidado e orgulho. Quem construiu esta casa queria que todos soubessem de quem ela era."

O QUE SIGNIFICA: 754 do C.B. tem mais de dois séculos. A família Durst habitou — e morreu — aqui há muito tempo. A inscrição é o que restou deles.
NA FALHA: O personagem vê a aldrava enferrujada mas não percebe a inscrição desgastada.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Interior — Hall Principal:**
Ao entrar, os personagens veem um hall de entrada com chão de mármore manchado, uma escadaria de madeira nobre subindo à esquerda, e dois corredores se abrindo à direita e à frente. Retratos de família cobrem as paredes — uma família aristocrática que ri de uma época mais próspera. O senhor Durst, de barba aparada, olha seriamente de seu retrato. A senhora Durst, bela mas de olhar vazio.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 13 — O Retrato de Elisabeth Durst

O MESTRE DIZ: "Você sente a magia antes mesmo de focar no quadro — uma aura sutil, persistente, que emana apenas do retrato da senhora Durst. Não é ilusão. Não é maldição. É percepção: um feitiço de vigilância antigo mas ainda ativo. O retrato foi encantado para ver, registrar e lembrar tudo que acontece neste hall. Os olhos pintados da senhora Durst não seguem você por truque artístico — eles realmente enxergam."

SE PERGUNTAREM O QUE ISSO IMPLICA: "Elisabeth Durst era uma praticante considerável — não uma aprendiz. E escolheu vigiar especificamente este hall. A questão é: para quem ela enviava o que via? E alguém ainda está 'do outro lado' desse feitiço, assistindo vocês agora?"
SE TENTAREM DESTRUIR O QUADRO: O feitiço se dissipa com um rangido etéreo — como um grito abafado. Os outros retratos no hall ficam levemente tortos, como perturbados.
NA FALHA: O personagem não percebe nada especial — apenas uma pintura velha de uma mulher de olhar distante.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERCEPÇÃO CD 11 — O Rastro de Sangue

O MESTRE DIZ: "Sob a sujeira de décadas, você distingue manchas escuras no mármore ao pé da escada. Sangue — envelhecido, seco, enegrecido pelo tempo. Mas ao seguir com o olhar, percebe que não é apenas uma poça. É um rastro. Começa no terceiro degrau da escada, desce, e vai em direção à porta principal... terminando abruptamente a menos de três metros de onde você está. Quem sangrava tentou alcançar a saída. Não chegou."

SE PERGUNTAREM DE ONDE VEM O RASTRO: "O rastro sobe a escada até o segundo andar. No topo, há uma mancha maior — onde a pessoa estava parada por algum tempo antes de tentar descer."
SE TENTAREM RASTREAR A ORIGEM: Sobrevivência CD 12 para seguir o rastro até o Quarto Principal (Área 14), onde os corpos dos Durst ainda estão.
NA FALHA: O personagem não nota nada além do chão sujo e empoeirado do hall.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'andar-terreo',
        titulo: 'Áreas 3-7: Andar Térreo',
        tipo: 'exploration',
        conteudo: `**Área 3 — Covil dos Lobos**
Seis lobos empalhados, posicionados como se prontos para atacar. Tapetes de pele de lobo cobrem o chão. Uma lareira fria ao fundo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 13 — A Porta Secreta

O MESTRE DIZ: "Ao examinar a estante de troféus, você percebe uma inconsistência: o canto traseiro direito não toca a parede. Há uma folga de alguns centímetros — e quando você pressiona o painel de madeira ao lado, ele cede com um clique. A estante inteira desliza lentamente para o lado, revelando uma passagem estreita coberta de poeira. Do outro lado, você consegue ver uma escrivaninha e estantes de livros."

SE PERGUNTAREM PARA ONDE LEVA: "Para o escritório privado de Durst — uma sala que claramente não era para ser encontrada facilmente."
NA FALHA: O personagem não nota nada incomum na estante — apenas troféus velhos e poeira.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SE OS PERSONAGENS EXAMINAM A LAREIRA: "Quando vocês se aproximam da lareira fria e apagada, o silêncio da casa é quebrado por um som vindo de cima — leve, intermitente. Soluços. De criança. Vêm do segundo andar." (É Rose ou Thorn, guiando os personagens para cima.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 4 — Cozinha e Despensa**
A cozinha está abandonada mas estranhamente organizada. Facas penduradas cuidadosamente. Uma panela com restos de um cozido de décadas atrás.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOBREVIVÊNCIA ou PERCEPÇÃO CD 10 — Os Rastros Que Somem

O MESTRE DIZ: "Ao examinar o chão, você encontra rastros de roedores — pequenas pegadas na poeira. Recentes. Mas ao segui-los pelo chão da cozinha, você percebe algo perturbador: os rastros param abruptamente no centro do cômodo. Não há parede ali, não há buraco, não há saída. Os ratos simplesmente... pararam. E não voltaram."

SE PERGUNTAREM O QUE ISSO SIGNIFICA: "Algo no centro desta cozinha — algo que você não consegue ver ou sentir — aterroriza os ratos ao ponto de fazê-los parar completamente. Animais têm sentidos que humanos não têm."
NA FALHA: O personagem não nota nada além de uma cozinha velha e empoeirada.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 12 — A Escotilha da Despensa

O MESTRE DIZ: "Entre os barris vazios e as prateleiras com provisões apodrecidas, você move uma tábua do piso que ressoa de forma diferente ao ser pisada. Embaixo dela, uma escotilha de madeira — com um anel de ferro para puxar. O cheiro que sobe quando você a abre é de terra úmida, mofo e algo mais: carne velha. Abaixo está uma escada de pedra descendo para a escuridão."

SE PERGUNTAREM PARA ONDE LEVA: "Para o porão de provisões — e abaixo dele, se os rumores das crianças estão certos, para onde fica o 'monstro'."
NA FALHA: O personagem não nota a escotilha entre o caos da despensa.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 5 — Sala de Jantar**
Uma mesa posta para seis, o jantar apodrecido ainda nos pratos. Uma vela de cera derretida ao centro, mas estranhamente ainda acesa com uma chama azulada.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 11 — A Chama Azul

O MESTRE DIZ: "A chama azul não é natural — você reconhece a assinatura de magia persistente nela. É uma 'vela eterna': um encantamento que impede a vela de se apagar ou o combustível de acabar. Mas o encantamento está falhando — a chama pulsa de forma irregular, como um coração com arritmia. Ainda ardendo após décadas, mas não por muito mais tempo."

SE PERGUNTAREM QUEM FEZ: "Um encantador competente. Não magia poderosa, mas requer conhecimento sólido. Alguém nesta casa sabia o que estava fazendo com magia arcana."
NA FALHA: O personagem acha a chama estranha mas não consegue identificar a magia por trás dela.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VONTADE CD 12 — Tocar a Chama Azul (se um personagem tocar)

O MESTRE DIZ (para o jogador que tocou): "No momento em que seus dedos tocam a chama — fria como gelo, não quente — a sala desaparece. Você está em um banquete. Esta mesma mesa, mas carregada de comida e vinho, velas douradas acesas, risadas e música. Uma família: o senhor Durst levanta uma taça, a senhora Durst sorri para duas crianças pequenas, e um bebê dorme num berço próximo. A cena é calorosa, feliz, perfeita."

"Então a visão racha como vidro quebrado. Você está de volta à sala de jantar podre. Mas por um fragmento de segundo, antes de tudo voltar ao normal, você vê a mesma mesa — com a família ainda sentada. Imóveis. Com sangue."

SUCESSO NA VONTADE: O personagem vê a visão mas não fica abalado.
FALHA NA VONTADE: O personagem fica Abalado por 1d4 rounds (–2 em todos os testes). A visão foi vívida demais.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 6 — Escritório de Durst**
Uma mesa de carvalho com papéis e cartas. Estantes com livros encadernados em couro. Uma poltrona de couro rasgada pelo tempo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 10 — As Cartas de Gustav Durst

O MESTRE DIZ: "As cartas na mesa de Durst pintam um retrato progressivo de obsessão. As mais antigas falam de negócios, lucros, família. As do meio mencionam 'estudos noturnos' e 'novas filosofias'. As mais recentes — e estas, a tinta está irregular, a caligrafia pressionada — falam abertamente: 'Nossa homenagem ao Senhor das Trevas avança. Os ritos exigem mais do que oferecemos. Elisabeth compreende. As crianças não precisam saber.'"

SE PERGUNTAREM SOBRE O 'SENHOR DAS TREVAS': "O título é inequívoco para quem conhece Barovia — é como os cultistas chamam Strahd. Durst e sua esposa faziam oferendas a um vampiro. E suas crianças não sabiam."
NA FALHA: O personagem folheia as cartas mas não consegue extrair informação clara da escrita desgastada.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 14 — O Compartimento Secreto

O MESTRE DIZ: "Ao examinar a mesa de perto, você nota que uma das gavetas é mais rasa por dentro do que por fora. Pressiona o fundo da gaveta e ele cede — um compartimento oculto. Dentro: um livro pequeno encadernado em couro preto (um diário, pela aparência), e uma bolsa de couro com 50 moedas de ouro."

CONTEÚDO DO DIÁRIO DE ELISABETH DURST (leia fragmentos em voz alta):
- "Gustav me prometeu que as crianças nunca saberiam. O Senhor das Trevas exige mais a cada lua. Obedecemos porque não há escolha — não obediência, é sobrevivência."
- "Thorn perguntou por que papai vai ao porão toda noite. Disse que é trabalho. A inocência das crianças é o único bem que nos resta."
- "Walter não sobreviveu ao rito. Gustav diz que foi necessário. Não consigo olhar para o berçário. Não consigo olhar para Gustav."

SE PERGUNTAREM QUEM É WALTER: "O nome aparece no diário sem mais contexto — mas menciona um berçário no terceiro andar. Walter parece ser... uma criança. A terceira criança dos Durst."
NA FALHA: O personagem não encontra o compartimento secreto.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 7 — Sala de Serviçais**
Quatro camas simples, um baú trancado. Os serviçais fugiram há muito — levaram suas coisas mais valiosas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LADINAGEM CD 11 — O Baú dos Serviçais

O MESTRE DIZ: "A fechadura está enferrujada mas cede. Dentro do baú: roupas velhas dobradas com cuidado, um espelho de bolso quebrado — e embaixo de tudo, uma bolsa com 10 peças de prata e um frasco de vidro lacrado com cera vermelha. Dentro do frasco, um líquido que brilha levemente dourado: óleo abençoado. Alguém entre os serviçais era devoto o suficiente para guardar isso."

SE PERGUNTAREM SOBRE OS SERVIÇAIS: "As camas e os pertences sugerem que fugiram às pressas — deixando roupas mas levando dinheiro. Quem saiu antes dos Durst desaparecerem sabia que algo estava errado. Sabedoria."
NA FALHA: O baú resiste. Pode tentar Força CD 15 para arrombar (mas faz barulho).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'segundo-andar',
        titulo: 'Áreas 8-13: Segundo Andar',
        tipo: 'exploration',
        conteudo: `**Área 8 — Corredor Superior**
As paredes exibem mais retratos da família Durst ao longo do tempo. Os mais recentes mostram um semblante cada vez mais perturbado.

SE OS PERSONAGENS EXAMINAM OS RETRATOS: "Os retratos contam uma história silenciosa. Os mais antigos mostram um casal jovem e soridente — o senhor Durst com olhos animados, a senhora Durst com um sorriso genuíno, duas crianças pequenas ao lado. Os retratos seguintes são mais formais, mais distantes. Nos mais recentes, os olhos do senhor Durst têm uma intensidade estranha — quase fanática. A senhora Durst, bela como sempre, olha para longe de qualquer coisa no quadro. Como se olhasse para algo que não deveria existir."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 9 — Quarto de Hóspedes**
Um quarto confortável mas empoeirado. Um baú no pé da cama.

O baú está destrancado. Contém: 12 peças de prata, uma Poção de Cura Menor (cura 2d4+2 PV), e um lenço de seda branca com as iniciais bordadas em fio azul: "G.A."

SE PERGUNTAREM SOBRE "G.A.": "As iniciais não pertencem a nenhum Durst. Um hóspede, talvez — alguém que veio visitar e deixou algo para trás. Ou alguém que não teve chance de levar consigo."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 10 — Biblioteca**
Centenas de volumes, a maioria sobre folclore do crime, magia sombria e história de Barovia.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 13 (1 hora de pesquisa) — O Senhor de Ravenloft

O MESTRE DIZ: "Após uma hora vasculhando as prateleiras, você encontra um volume que se destaca: 'O Senhor de Ravenloft — Uma Homenagem', encadernado em couro vermelho escuro. Ao contrário dos outros livros empoeirados, este foi lido muitas vezes — as páginas têm marcações, sublinhados, anotações nas margens com a mesma caligrafia das cartas do escritório de Durst."

CONTEÚDO CHAVE (leia em voz alta): "O livro é uma hagiografia — um elogio glorificado — de Strahd Von Zarovich. Descreve-o como 'o protetor eterno de Barovia, que sacrificou sua humanidade pelo bem do povo.' Uma anotação de Durst na margem diz: 'Não sacrificou — elevou-se. O Senhor transcendeu a morte humana por mérito próprio. Nós faremos nossa parte.'"

O QUE ISSO REVELA: Durst não apenas sabia sobre Strahd — ele o venerava. O culto dos Durst existia para 'servir' ao Conde.
NA FALHA (ou sem tempo): O personagem encontra livros interessantes mas nada específico em pouco tempo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 15 — O Tomo Abissal Disfarçado

O MESTRE DIZ: "Sua atenção é fisgada por uma anomalia — um volume na segunda prateleira irradia uma aura de dissimulação. A capa diz 'Histórias Populares de Barovia', mas quando você o abre, as páginas estão em um idioma completamente diferente — denso, anguloso, que você reconhece como Abissal. O livro está se fingindo de ser outra coisa."

SE TIVEREM ALGUÉM QUE LÊ ABISSAL: "O tomo contém três rituais de convocação menor — para chamar espíritos subservientes, sombras vinculadas, e ecos de mortos. Não são rituais poderosos, mas mostram que alguém nesta casa não apenas estudava ocultismo — o praticava ativamente."
SE NINGUÉM LER ABISSAL: "Vocês podem levar o tomo — pode ser valioso para alguém que compreenda a língua, ou para vender a um mago."
NA FALHA (CD 15 é difícil): O personagem não percebe nada diferente no livro disfarçado.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 11 — Quarto de Rose e Thorn**
Um quarto infantil com duas camas pequenas, brinquedos e bonecas. Uma caixinha de música ainda tocará se a manivela for girada.

SE ROSE E THORN ACOMPANHAM OS PERSONAGENS: "As crianças ficam paradas na entrada. Rose aperta a mão da boneca que está na cama como se reconhecesse o objeto. Thorn vai devagar até a janela e olha para fora — para a neblina. Nenhuma das duas fala. É o primeiro sinal de que algo diferente está acontecendo com elas."

SE GIRAREM A MANIVELA DA CAIXINHA DE MÚSICA: "A melodia que sai é simples, de caixinha, algumas notas apenas — mas há algo na progressão de acordes que provoca uma tristeza inexplicável. Como se a música estivesse carregada de algo além de som. [Use aqui a música tema da campanha.] Personagens com Misticismo 2+ percebem que a melodia tem traços de magia emocional — não encantamento, apenas... memória. A música guarda a memória do quarto."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 10 — O Diário de Rose

O MESTRE DIZ: "Embaixo da cama de Rose, entre os brinquedos empurrados para trás, você encontra um diário pequeno com uma capa de couro cor-de-rosa desbotado. A caligrafia é infantil mas aplicada. As entradas mais recentes:"

LEIA EM VOZ ALTA: "'Mamãe e Papai foram para o porão e não voltaram. Faz três dias. Thorn e eu batemos na porta mas ela não abre. Thorn está com medo. Eu também estou, mas não posso mostrar porque sou a mais velha.' — Entrada seguinte, caligrafia mais tremida: 'Tentamos jantar com o que tinha na cozinha. Estamos com fome. Onde estão mamãe e papai?'"

SE PERGUNTAREM SE HÁ MAIS: "As últimas páginas escritas têm apenas: 'A casa faz barulhos à noite. Não saímos mais dos quartos.' Depois disso, as páginas estão em branco."
NA FALHA: O personagem não encontra o diário embaixo da cama.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 12 — Quarto de Walter (Berçário)**
O berçário está impecavelmente conservado por magia — completamente intocado pelo tempo que destruiu o resto da casa.

SE ROSE E THORN ESTÃO AQUI: Rose para na entrada. Em voz muito baixa, quase para si mesma: "Walter dormia aqui. Ele chorava muito à noite. Mamãe dizia que era cólica." Thorn fica atrás dela, não entra no quarto.

O berço de madeira finamente trabalhado tem uma manta de bebê dobrada perfeitamente. Uma móbile de pássaros prateados gira devagar — sem vento, sem razão visível.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 12 — A Aura do Berçário

O MESTRE DIZ: "Você sente a magia antes mesmo de cruzar a soleira — e é diferente de tudo que encontrou na casa até agora. Não é vigilância como no retrato, não é dissimulação como no tomo. É necromancia. Fraca, residual, mas inegável. Algo morreu neste quarto. E parte desse algo ainda está aqui, presa entre os planos — não como espírito consciente, apenas como... eco. Como a impressão de uma dor que nunca foi resolvida."

SE PERGUNTAREM SOBRE A MÓBILE: "A móbile de pássaros prateados gira sem vento, sem mecanismo visível. Ela gira porque o eco de necromancia neste quarto cria um campo de energia mínimo — movimento sem causa, perturbação sem propósito. Como o quarto não quer ser esquecido."
NA FALHA: O personagem entra no quarto e sente um frio incomum, mas nada mais específico.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 13 — O Medalhão de Walter

O MESTRE DIZ: "No centro do berço, quase escondido sob a manta, há um medalhão de prata em uma corrente fina. Ao virar, você lê a inscrição gravada no verso: 'Walter — Filho Predileto. Que descanse no amor eterno dos Durst.' A data gravada é de há mais de dois séculos."

SE PEGAREM O MEDALHÃO: Vale 25 PO, mas toda vez que o portador dormir carregando o medalhão, faz Vontade CD 13. Na falha: pesadelos — acorda sem benefício de descanso longo e com –1 em todos os testes até o próximo descanso.
SE PERGUNTAREM QUEM ERA WALTER: "O medalhão e o diário de Elisabeth no escritório convergem para a mesma conclusão: Walter era o filho mais novo dos Durst — um bebê. E ele morreu aqui, neste quarto. O diário diz que 'o rito exigiu mais'. Walter foi um sacrifício."

REAÇÃO DE ROSE E THORN SE OS PERSONAGENS CONCLUÍREM ISSO EM VOZ ALTA: Rose olha para o berço por um longo momento. "Não sabíamos," ela diz, finalmente. "Não sabíamos o que papai e mamãe faziam."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'terceiro-andar',
        titulo: 'Áreas 14-18: Terceiro Andar e Ático',
        tipo: 'exploration',
        conteudo: `**Área 14 — Quarto Principal de Durst**
O quarto do casal Durst. Uma cama de dossel enorme, cortinas de veludo roxo desbotado.

DESCRIÇÃO (LEIA EM VOZ ALTA): "O quarto principal é o mais bem preservado da casa — como se o tempo hesitasse antes de entrar. A cama de dossel é enorme, com cortinas de veludo roxo desbotado. E na cama, sentados lado a lado, de mãos dadas, estão dois corpos. Mumificados, encolhidos pelos anos, mas com expressões surpreendentes: paz. Quase beatitude."

ENCONTRO POTENCIAL: Os corpos mumificados de Gustav e Elisabeth Durst. Eles não são mortos-vivos (ainda). Mas se qualquer personagem tentar remover seus anéis ou objetos, os corpos se animam como Zumbis (ND 1 cada). Mostre sinais de alerta: os dedos se curvam, os olhos abrem.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERCEPÇÃO ou MISTICISMO CD 11 — O Estado dos Corpos

O MESTRE DIZ (se perguntarem sobre os corpos): "Há algo errado com a forma como eles estão posicionados. Corpos não se sentam assim naturalmente — foram colocados. Alguém os arrumou nessa posição deliberadamente, de mãos dadas, como se dormissem juntos. E ainda usam seus anéis e joias."

SE TENTAREM EXAMINAR SEM TOCAR (Medicina/Sobrevivência CD 12): "Os corpos parecem mumificados por algum processo não natural — a preservação é boa demais para décadas de abandono. Magia residual os manteve assim."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ITENS NO QUARTO:
- Caixa de joias na escrivaninha: Anel de Signatura dos Durst (25 PO — também serve como chave para uma porta no Castelo Ravenloft) e Brincos de Rubi (100 PO total).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 10 — A Carta de Elisabeth

O MESTRE DIZ: "Na escrivaninha, dobrada ao meio mas sem envelope, há uma carta com a caligrafia da senhora Durst — reconhecível pelas anotações no escritório. Ela é endereçada a Gustav, mas nunca foi entregue — ou Gustav a leu e a deixou aqui."

LEIA EM VOZ ALTA: "'Gustav. Você me prometeu que as crianças nunca saberiam. Mas ele quer mais. Ele sempre quer mais. O bebê não sobreviveu ao rito e você diz que foi necessário. Eu digo que foi assassinato. A culpa foi sua. E quando as crianças crescerem e descobrirem o que fizemos — e elas vão descobrir — que os deuses nos perdoem porque eu não conseguirei me perdoar.'"

SE ROSE E THORN ESTIVEREM PRESENTES E OS PERSONAGENS LEREM EM VOZ ALTA: Rose fica completamente imóvel. Depois, em voz baixa: "Então Walter não ficou doente. Eles o mataram." Os fantasmas começam a perder a forma por um momento — perturbados pela revelação.
NA FALHA: O personagem vê a carta mas a caligrafia está desgastada demais para ler completamente.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 15 — Quarto de Vestir**
Roupas das décadas anteriores. Uma coleção de chapéus femininos elaborados.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 11 — A Passagem Secreta

O MESTRE DIZ: "Entre os vestidos empilhados e as capas de época, sua mão encontra algo que não devia estar ali: uma alavanca de ferro, pequena, escondida atrás de um enfeite de chapéu. Você a puxa, e uma seção inteira da parede dos fundos desliza para dentro — revelando uma passagem estreita coberta de teias de aranha que sobe por uma escada de madeira para o ático acima."

SE PERGUNTAREM POR QUE EXISTE: "Um compartimento secreto para o ático. Alguém queria poder subir sem ser visto — ou precisava de uma rota de fuga que outros na casa não soubessem."
NA FALHA: O personagem não percebe a alavanca entre a profusão de roupas e acessórios.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 16 — Ático**
O ático está cheio de baús e móveis velhos empilhados. Teias de aranha em tudo. Uma janela quebrada deixa entrar um vento uivante.

ENCONTRO: 1 Espírito Faminto (Sombra, ND 1) — a manifestação do rancor de Elisabeth Durst. Ataca silenciosamente, mas recua se confrontado com luz sagrada ou símbolo divino mostrado com confiança.

COMO O ESPÍRITO SE COMPORTA: "A temperatura no ático despenca de repente. Sua respiração forma névoa. Algo escorrega pelas sombras entre os móveis empilhados — não bem visível, uma escuridão mais escura que as outras sombras. E então você sente: uma mão fria que não existe toca seu ombro."

SE USAREM LUZ SAGRADA OU SÍMBOLO DIVINO: "O espírito recua para as sombras mais profundas, sibilando. Não foge completamente — mas mantém distância enquanto a luz estiver presente."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 12 — O Baú Escondido

O MESTRE DIZ: "Atrás de uma pilha instável de móveis velhos e baús vazios, há um baú diferente — menor, mais reforçado, com uma fechadura de qualidade. Como se alguém o tivesse escondido deliberadamente aqui, atrás de tudo."

CONTEÚDO: 100 PO, uma Poção de Cura (cura 2d4+4 PV), e uma espada curta com lâmina ligeiramente encurvada e cabo decorado. Gravado na lâmina: "Família Durst". Esta espada é +1 e pertencia a Rose — foi guardada aqui para protegê-la, nunca chegou às mãos da criança.

SE ROSE ESTIVER PRESENTE E VER A ESPADA: "A expressão do fantasma de Rose muda de forma sutil — como reconhecimento. 'Papai disse que eu teria isso quando crescesse. Disseram que eu era forte para uma menina.' Uma pausa. 'Nunca cresci.'"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'porcao-masmorra',
        titulo: 'Áreas 19-28: O Porão e a Masmorra',
        tipo: 'combat',
        conteudo: `Esta é a parte mais perigosa da Casa da Morte. A masmorra abaixo do porão é onde o culto dos Durst realizava seus rituais. O OBJETIVO FINAL É ESCAPAR — não necessariamente matar tudo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 19 — Escada para o Porão**
Uma escada de pedra desce para a escuridão.

DESCRIÇÃO (LEIA EM VOZ ALTA): "A escada de pedra desce mais fundo do que deveria ser possível para uma casa de três andares. O cheiro que sobe é de terra úmida e algo mais — carne velha, e abaixo disso, algo que você reconhece instintivamente como sangue. Muita coisa sangrou aqui."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 20 — Celeiro de Provisões**
Barris e prateleiras com provisões apodrecidas.

ITENS DISPONÍVEIS: Uma porta de ferro trancada (Ladinagem CD 13 ou Força CD 16 para forçar). 3 tochas e um isqueiro no chão — alguém as deixou aqui intencionalmente. As provisões nos barris apodreceram há décadas.

SE ENCONTRAREM AS TOCHAS: "As tochas e o isqueiro estão num canto, como se colocados para quem descesse precisar de luz. Os cultistas planejavam isso."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 21 — Poço**
Um poço de pedra. A água está pura mas fria.

SE TESTAREM A ÁGUA (Medicina/Sobrevivência CD 10): "A água está estranhamente pura — fria como neve derretida, sem odor ou cor. Alguma magia a mantém assim. Pode ser bebida com segurança."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 22 — Corredor dos Cultistas**
As paredes têm afrescos desbotados de figuras em mantos pretos circundando um altar.

DESCRIÇÃO (LEIA EM VOZ ALTA): "As paredes do corredor são cobertas de afrescos — pinturas antigas mas claramente intencionais. Figuras em mantos pretos formam um círculo ao redor de um altar escuro, braços estendidos. Mas os rostos foram deliberadamente apagados — raspados da parede. Quem pintou isso não queria que os adoradores fossem identificados."

ENCONTRO — 3 CULTISTAS-ESQUELETO (ND 1/2 cada):
- PV: 13 cada | Defesa: 13 | Ataque: Adaga Enferrujada +2 (1d4 perfurante)
- Imunes a veneno, doenças, cansaço | Vulneráveis a dano sagrado

COMO APRESENTAR O ENCONTRO: "O silêncio do corredor é quebrado por um som de arrastar — osso contra pedra. Três figuras esqueléticas em trapos de manto preto viram para vocês. Não há inteligência nos crânios vazios — apenas a memória do ritual que os anima."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 23 — Sala de Tortura**
Instrumentos de tortura enferrujados. Dois ganchos no teto ainda têm correntes.

DESCRIÇÃO (LEIA EM VOZ ALTA): "A sala é pequena e baixa. Ferramentas enferrujadas penduradas nas paredes — pinças, ganchos, lâminas de corte — cada uma de um propósito que você preferiria não imaginar. Dois ganchos de ferro no teto ainda têm correntes — grossas, compridas o suficiente para suspender uma pessoa. As manchas no chão de pedra são inconfundíveis."

ENCONTRO — 2 ESPÍRITOS ATORMENTADOS (ND 1 cada):
- Só podem ser feridos por magia, prata ou ataques sagrados
- Atacam qualquer ser vivo com dor irracional

COMO APRESENTAR: "A temperatura cai de repente. Das sombras nos cantos, algo começa a se formar — não exatamente visível, mais como ausência de luz. E então você ouve: choro. Não de criança, não de adulto — algo entre os dois. A dor nesse som é real."

SE TENTAREM FALAR COM OS ESPÍRITOS: "Eles não respondem com palavras. Apenas dor. Eles não têm mais consciência — são o eco do que sofreram aqui, sem memória de quem foram."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 24 — Câmara de Sacrifícios**
O ponto central da masmorra. Um altar de pedra negra manchado de sangue seco. Runas entalhadas ao redor do altar brilham levemente de vermelho.

DESCRIÇÃO (LEIA EM VOZ ALTA): "A câmara abre de repente para um espaço maior. No centro, um altar de pedra negra polida — imenso para um porão, projetado para impressionar. Manchas escuras cobrem toda a superfície. E no chão ao redor, entalhadas na pedra, runas que pulsam com uma luz vermelha fraca e intermitente. Como um coração ainda batendo."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 14 — As Runas do Altar

O MESTRE DIZ: "As runas são de controle e canalização — uma magia de submissão. Cada vez que sangue era derramado neste altar, a energia desse sacrifício era capturada e enviada — como uma oferenda — para algo muito mais poderoso. Para alguém que mora em um castelo no topo de uma falésia. Strahd não apenas aceitava adoração abstrata: recebeu poder real destes ritos por décadas."

SE PERGUNTAREM QUANTO PODER: "Impossível calcular com precisão. Mas o altar foi usado regularmente por anos. Strahd é mais poderoso por causa desta câmara — e de câmaras como esta espalhadas por Barovia."
NA FALHA: O personagem sente que as runas são perigosas e mágicas, mas não consegue decifrar seu propósito.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RELIGIÃO ou MISTICISMO CD 16 — Consagrar o Altar

O MESTRE DIZ (se tentarem purificar com água benta ou magia divina): "Quando a água benta toca a pedra do altar, as runas reagem — a pulsação vermelha acelera, como se resistindo, e então começa a se apagar progressivamente, runa por runa, a partir do ponto de contato. Um som ressoa por toda a masmorra: um grito que não é de ser vivo, não é de morto-vivo — é do próprio rito sendo dissolvido."

EFEITO: Todos os Esqueletos e Espíritos na masmorra são imediatamente destruídos — você ouve um estrondo abafado de ossos caindo nos corredores. A câmara fica em silêncio. As runas apagam completamente.

NA FALHA: A tentativa de consagração não tem efeito. O altar resiste. Seria necessário mais poder divino — ou alguém com maior graduação em Religião.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 25 — Câmara do Relicário**
Três pedestais com itens malditos.

DESCRIÇÃO (LEIA EM VOZ ALTA): "Três pedestais de pedra em uma sala pequena, cada um com um item diferente apresentado como se fosse precioso. A sala tem uma qualidade de exibição — como um museu de coisas que não deveriam existir."

PEDESTAL 1 — CRÂNIO DE CRIANÇA:
"Um crânio pequeno, claramente de criança. Gravado nele, mal visível, uma runa."
Quem tocar: Vontade CD 13 ou fica com –2 em testes de Vontade por 1 dia. O MESTRE DIZ ao personagem que falhou: "Quando seus dedos tocam o osso, um frio que não é temperatura sobe pelo braço. Por um instante, você sente algo olhando de dentro de você — avaliando."

PEDESTAL 2 — MEDALHÃO DE PRATA:
"Um medalhão oval em prata, sem inscrição. Parece completamente normal."
Vale 30 PO — mas se retirado do pedestal, desaparece em 1d4 dias e retorna ao pedestal misteriosamente. Misticismo CD 12: aura de transmutação/encantamento de âncora.

PEDESTAL 3 — FACA CERIMONIAL:
"Uma faca de cabo ornamentado com símbolos que combinam com as runas do altar. A lâmina tem um fio excelente para sua idade."
1d4 cortante, conta como mágica contra mortos-vivos. Não é maldita — apenas sinistras.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 26 — Covil da Guarda**
ENCONTRO — 2 GHOULS (ND 2 cada). Para personagens de nível 2, esses são os inimigos mais perigosos até agora.

COMO APRESENTAR: "Do escuro à frente vêm dois sons: primeiro um farejado, depois um rangido de dentes. Duas figuras se ajoelham no corredor — humanas na forma mas não no movimento, nos dentes, no olhar sem pupila. Ghouls. Os últimos cultistas que morreram aqui, transformados pelo rito que os consumiu."

ESTATÍSTICAS DOS GHOULS (T20, balanceado para nível 2):
- PV: 36 cada | Defesa: 13 | Iniciativa: +2
- Garra +4 (1d6+2 cortante): alvo faz Fortitude CD 11 ou fica Paralisado por 1 round
- Mordida +4 (2d6+2 perfurante): APENAS contra Paralisado ou Incapacitado

DICA CRUCIAL DE MESTRE: Os Ghouls vão tentar paralisar primeiro, morder depois. Esse combo pode matar um personagem de nível 2 em dois rounds. Se o grupo estiver em perigo real, avise sutilmente in-game: "Um dos Ghouls recua brevemente ao ver vocês recuando — eles são oportunistas, não berserkers. Fugir é uma opção."

SE FUGIREM: Os Ghouls não perseguem além de sua área territorial. Param no limite do corredor, farejando o ar.`
      },
      {
        id: 'encontro-final',
        titulo: 'Área 27-28: O Monstro e a Fuga',
        tipo: 'combat',
        conteudo: `**Área 27 — Câmara do Ritual**
A câmara central. Um círculo de ritual de 6m de diâmetro gravado no chão de pedra. Doze estacas de madeira ao redor do círculo — nove têm esqueletos acorrentados. Três estão vazias.

DESCRIÇÃO (LEIA EM VOZ ALTA): "A câmara maior que vocês já viram nesta casa se abre. Um círculo de ritual imenso, gravado com precisão perturbadora no chão de pedra. Doze estacas de madeira ao redor do perímetro — nove têm correntes. E nessas correntes... esqueletos humanos, ainda presos. Três estacas estão vazias, com correntes abertas. Como se estivessem esperando."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CENA DE ROSE E THORN — A REVELAÇÃO FINAL

Se as crianças estão com os personagens:

Rose para na entrada. Sua voz muda — a de uma criança de dez anos se torna algo mais vazio, mais antigo.

LEIA EM VOZ ALTA (voz de Rose): "O monstro precisa de sangue. Sempre precisou. Meus pais... trouxeram pessoas assim. Aventureiros. Para satisfazer o rito." *(pausa)* "Nós... precisávamos de alguém para nos substituir. As três estacas vazias — eram para nós. Para Rose. Para Thorn. Para..." *(a voz quebra)* "...para Walter. Mas Walter já estava..."

*(outra pausa, mais longa)*

"Desculpem. Nós não sabíamos que estávamos fazendo isso quando chamamos vocês. Nós apenas queríamos sair daqui. Mas a casa... a casa não permite saída sem o rito."

Os dois fantasmas se dissipam — e imediatamente cada personagem sente algo tentando entrar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VONTADE CD 13 — Possessão pelos Fantasmas de Rose e Thorn

O MESTRE DIZ (para cada jogador, individualmente): "Você sente algo empurrar contra sua mente — não com violência, mas com desespero. Uma presença pequena, assustada, que apenas quer sair daqui. Que quer sentir um corpo de novo. Que não está tentando te machucar — mas não consegue se controlar."

SUCESSO: "Você resiste. O fantasma escorrega sem conseguir entrar. Você sente brevemente — por um segundo — o que é ter medo há décadas sem poder ir a lugar algum. Depois passa."

FALHA (possuído por 1 hora): "Algo encontra uma fresta e entra. Você ainda é você — mas há outra voz nos seus pensamentos. Uma criança. Confusa. Que às vezes faz sua mão se mover de formas que você não planejou. Que às vezes sussurra: 'Por favor, nos ajudem a sair.'"

MECÂNICA DA POSSESSÃO: O personagem possuído age normalmente, mas o Mestre pode pedir Vontade CD 11 em momentos dramáticos. Na falha, a criança temporariamente "toma o controle" por 1 round — geralmente tentando correr para a saída.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENCONTRO BOSS — A SOMBRA DE STRAHD (Specter Menor, ND 3):
Um fragmento da sombra de Strahd aprisionado no ritual — não o próprio Conde, mas poder suficiente para matar personagens de nível 2.

COMO APRESENTAR: "Do centro do círculo de ritual, a escuridão se condensa. Não é trevas — é ausência de luz com forma própria. A figura que emerge é humanóide mas errada: muito alta, bordas que desfocam, olhos que são apenas dois pontos de vermelho frio. E quando fala, a voz vem de dentro da cabeça de todos simultâneamente: 'Sangue. O rito pede sangue. Vocês escolheram entrar. Vocês escolheram ser a oferta.'"

ESTATÍSTICAS (balanceado para Nível 2):
- PV: 45 | Defesa: 12 (incorpóreo) | Iniciativa: +6 | Deslocamento: 18m (voo)
- IMUNIDADES: Veneno, doenças, condições físicas, dano de armas não-mágicas
- VULNERABILIDADE: Dano sagrado (dano DOBRADO)
- Toque Corrompido +5: 3d6 necrótico — reduz PV máximos do alvo pelo dano causado
- Drenar Vida (recarga 5-6): Todos em 4,5m fazem Vontade CD 13 ou perdem 2d6 PV máximos

DICA CRUCIAL: Se um personagem chegar a 0 PV máximos por Drenar Vida, morre — não apenas fica inconsciente. Avise os jogadores que os PV máximos estão sendo reduzidos.

SE USAREM A ESPADA CURTA +1 DO ÁTICO: O dano mágico afeta a Sombra normalmente.
SE USAREM A FACA CERIMONIAL: Conta como mágica contra ela.
SE USAREM A ÁGUA BENTA ou ÓLEO ABENÇOADO: Dano normal + vulnerabilidade sagrada = excelente opção.

QUANDO A SOMBRA É DESTRUÍDA: "A figura se dissolve com um som que não é bem um grito — é mais como quando você apaga uma vela: um sopro, e então escuridão novamente. O círculo de ritual no chão para de pulsar. O ar na câmara fica simplesmente... frio. E silencioso. Muito silencioso."`,
        recompensas: [
          '300 PO divididos (tesouros da câmara)',
          'Faca Cerimonial dos Durst (conta como mágica vs mortos-vivos)',
          'Os personagens atingem Nível 3 ao sair da casa',
        ],
      },
      {
        id: 'fuga',
        titulo: 'A Grande Fuga — A Casa Desmorona',
        tipo: 'combat',
        conteudo: `Após a Sombra ser destruída (ou se os personagens fugirem), a casa começa a **desmoronar**. Os personagens têm **5 rounds** para chegar à porta principal.

**Round a round:**
- Round 1-2: Tetos rachando, detritos caindo. Reflexos CD 10 ou 1d6 dano de impacto.
- Round 3-4: Paredes cedendo. Atletismo/Acrobacia CD 12 para avançar com movimento completo, ou move-se a metade.
- Round 5: A entrada principal abre sozinha — a casa os libera. Quem ainda estiver dentro recebe 2d6 impacto e pode tentar Atletismo CD 14 para se jogar para fora.

**Epílogo:**
Os personagens sobreviventes estão do lado de fora. Rose e Thorn, em forma de fantasma, aparecem brevemente acima da entrada.

*Rose (voz suave):* "Obrigada por tentar. Tomara que alguém possa nos salvar um dia."

Os fantasmas desaparecem. Os personagens sobem de nível — ao saírem da Casa da Morte, atingem o **Nível 3**.`,
      },
    ]
  },

  // ── 3. VILA DE BAROVIA ─────────────────────────────────────
  {
    id: 'vila-barovia',
    titulo: 'Vila de Barovia',
    nivel: 'Nível 3',
    descricao: 'A Vila de Barovia é o primeiro assentamento que os personagens encontram após escapar da Casa da Morte. É um lugar sem esperança — casas fechadas, moradores assustados, ruas vazias. Os locais principais são a Taverna Sangue de Vinho, a Casa do Burgomaster, a Igreja e a Loja de Bildrath.',
    subsecoes: [
      {
        id: 'barovia-chegada',
        titulo: 'Chegada à Vila (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"A névoa envolve as ruas lamacentas como dedos de um espectro. As casas estão fechadas, janelas cobertas com tábuas, portas trancadas. Alguém chora em algum lugar — uma criança, talvez. Uma placa quebrada bate no vento: 'Vila de Barovia — Fundada 351 do C.B.' Um cachorro esquelético levanta a cabeça para vocês e então corre para as sombras."

A vila parece morta. Não há mercado, não há música, não há luz além da tênue que escapa pelas frestas das janelas mais corajosas. A névoa não apenas cobre o chão — ela parece consumir os sons, tornar tudo mais silencioso do que deveria ser.`,
        cd: [
          { pericia: 'Percepção', cd: 12, resultado: 'O MESTRE DIZ: "Ao examinar as casas em volta, você percebe olhos. Frestas de janelas entreabertas. Cortinas que se movem brevemente e param. Os moradores de Barovia estão observando vocês — com uma mistura de medo e algo que parece perigosamente próximo de esperança. Ninguém sai. Ninguém fala. Mas estão assistindo." — SE ACENAR PARA ALGUÉM: A fresta fecha imediatamente. Mas depois de um momento, abre de novo, um pouquinho mais larga.' },
          { pericia: 'Sobrevivência', cd: 10, resultado: 'O MESTRE DIZ: "Nas ruas lamacentas, entre os rastros de pés descalços e pisadas de animais, você vê algo diferente: marcas de cascos pesados, organizados, em fileiras. Cavalos com ferradura, não os animais meio selvagens que os camponeses usam. Cavaleiros treinados. E são recentes — menos de duas horas. Alguém patrulhou estas ruas esta noite a cavalo." — O QUE ISSO SIGNIFICA: Os Cavaleiros da Noite de Strahd monitoram a vila regularmente. Os personagens já foram notados.' },
        ]
      },
      {
        id: 'taverna-sangue-vinho',
        titulo: 'Taverna Sangue de Vinho',
        tipo: 'roleplay',
        conteudo: `**Descrição (Leia em Voz Alta):**
"Um único feixe de luz lança uma iluminação pela praça principal, esse brilho parece como um pilar sólido na névoa pesada. Acima da entrada falha, uma placa paira precariamente torta, proclamando que esta é a Taverna Sangue na Videira. O edifício da taverna tem cerca de 18 metros quadrados. Uma inspeção da placa revela que originalmente era 'Sangue da Videira' — um 'n' foi riscado sobre um 'd'. Esta taverna já foi finamente decorada, mas a qualidade decaiu ao longo dos anos. Um fogo ardente na lareira oferece um calor precário para as poucas almas amontoadas lá dentro. Isso inclui o barman, três Vistani sentados juntos e um homem chamado Ismark Kolyanovich — que vem a ser o filho do burgomestre da vila, Kolyan Indirovich."

---
**ARIK, o barman:**
Um homem de meia-idade, cabelos grisalhos e olhar vazio. Serve bebida em silêncio, sem fazer perguntas, sem responder a muitas. Foi traumatizado pela perda de sua família para os servos de Strahd anos atrás. Não está assustado — está quebrado.

*Se os personagens pedirem informações:* Arik aponta para Ismark sem dizer uma palavra.

*Se perguntarem sobre Strahd:* Ele congela por um momento, então coloca o copo cuidadosamente e vai para o depósito. Demora cinco minutos para voltar. Não responde à pergunta.

---
**OS TRÊS VISTANI:**
Madam Boldanova e suas duas sobrinhas. São informantes voluntários de Strahd em troca de proteção para a caravana. Eles podem ser gentis e prestativos com informações verdadeiras — mas tudo o que os personagens revelarem será relatado ao Conde.

*Boldanova:* *(sorrindo amplamente)* "Forasteiros! Que raridade. Sentem-se, sentem-se. Barovia não tem visitantes desde... bem. Desde há muito. De onde vêm? Como chegaram aqui?"

---
**ENCONTRO COM ISMARK:**
Ismark se aproxima dos personagens por conta própria após observá-los por alguns minutos.

*Ismark:* "Forasteiros. Que os deuses os protejam — porque nenhum de nós aqui consegue. Vocês vieram de fora de Barovia? Então... ainda há um mundo além desta névoa?"

*(Se os personagens confirmam)* "Preciso de sua ajuda. Minha irmã, Ireena — Strahd a quer. Ele já a mordeu duas vezes. Na terceira... ela se tornará uma delas. Preciso levá-la a Valaki — é mais seguro do que aqui. Mas não consigo fazer isso sozinho. E não confio nos Vistani." *(olha discretamente para a mesa dos três Vistani)*

**O que Ismark oferece:** 200 PO adiantados + teto e refeições enquanto estiverem na vila.`,
        cd: [
          { pericia: 'Intuição', cd: 13, resultado: 'O MESTRE DIZ: "Os três Vistani parecem descontraídos — risos discretos, vinho na mão. Mas você percebe padrões: um deles \'examina a xícara\' enquanto seus olhos deslizam regularmente para vocês. Outro faz perguntas sobre de onde vieram com curiosidade excessiva para um estranho entediado." — O QUE FAZER COM ISSO: Qualquer informação pessoal que os personagens reverem na taverna será reportada a Strahd. Jogue com isso — Strahd aparecerá sabendo coisas que só os Vistani ouviram.' },
          { pericia: 'Intuição', cd: 11, resultado: 'O MESTRE DIZ: "Ismark escolhe suas palavras com cuidado — mas quando diz o nome \'Ireena\', há uma fratura no controle. A voz desce um tom, fica mais tensa. Quando ele fala de Strahd indo até ela duas vezes, suas mãos apertam a caneca com mais força do que precisa." — SE PERGUNTAREM DIRETAMENTE SE ELE ESTÁ BEM: "\'Bem\' não é uma palavra que existe em Barovia. Mas se vocês ajudarem minha irmã a chegar a Valaki... posso aprender a usar a palavra novamente."' },
        ]
      },
      {
        id: 'bildrath-mercadorias',
        titulo: 'Bildrath Mercadorias — A Loja do Avarento',
        tipo: 'exploration',
        conteudo: `**Descrição:**
Uma placa entalhada em madeira diz "BILDRATH MERCADORIAS" acima de uma porta robusta com cadeado externo. A loja é a única aberta além da taverna — e Bildrath claramente lucra com isso.

**Bildrath Cantemir** é um homem gordo de sessenta anos, com nariz avermelhado e dedos curtos. Não tem empatia pela situação dos personagens — vê oportunidade. Vende itens de aventura à sua disposição, mas apenas os que custam menos de 25 PO no mercado normal, e cobra **dez vezes o preço padrão**.

*Bildrath:* "Não há outra loja em quilômetros, forasteiros. Posso cobrar o que quiser. Não gostou? Voltem para a névoa."

**Parriwimple (Paripe)** — O sobrinho de Bildrath. Enorme, mais alto do que qualquer personagem, simples de mente mas gentil. Fica perto de Bildrath como guarda-costas. Se os personagens tentarem roubar ou intimidar Bildrath, Paripe intervém com tristeza mas firmeza: *"Tio disse pra eu não deixar ninguém machucar a loja."* (Força +4, PV 45)

---
**💡 DICA PARA O MESTRE:** Bildrath não negocia preço. Mas Paripe pode ser abordado separadamente — um personagem carismático que tratar Paripe com gentileza pode convencer o sobrinho a pedir ao tio um "desconto especial" (15% de desconto, Diplomacia CD 14).`,
      },
      {
        id: 'casa-burgomaster',
        titulo: 'Casa do Burgomaster — Kolyan Indirovich',
        tipo: 'roleplay',
        conteudo: `**Descrição (Leia em Voz Alta):**
"A mansão do burgomestre fica no centro da vila, maior e mais bem conservada que as casas vizinhas — mas ainda assim com janelas entaipadas e marcas arranhadas nas portas. Marcas de garras. Muitas delas. Na varanda, uma vela acesa lança uma luz anêmica sobre uma placa: 'Kolyan Indirovich — Burgomestre da Vila de Barovia'."

---
**A Situação:**
Kolyan Indirovich, o burgomestre e pai de Ismark e Ireena, **morreu recentemente** — de coração partido, dizem alguns. De medo e exaustão, dizem outros. O corpo está em um caixão na sala principal, aguardando enterro na igreja.

Ismark pede aos personagens que ajudem a levar o corpo para a **Igreja de São Andral** antes de partirem com Ireena — deixar o pai sem enterro sagrado é impensável para ele.

*Ismark (no corredor, em voz baixa):* "Meu pai morreu tentando proteger Ireena. Escreveu cartas ao Barão de Valaki, ao Padre Donavich, até a Van Richten — ninguém veio. No fim, a preocupação o consumiu." *(pausa)* "Pelo menos posso dar a ele um enterro decente."`,
        cd: [
          { pericia: 'Medicina (Sobrevivência)', cd: 12, resultado: 'O MESTRE DIZ: "Ao examinar o corpo, você nota algo além da causa óbvia de morte. As olheiras fundas marcadas no rosto mesmo após a morte — semanas de privação de sono. Os músculos encolhidos, a pele ressecada além do que a idade explicaria. Kolyan Indirovich não morreu de coração partido no sentido poético. Ele foi consumido — por semanas de vigília, de patrulhar, de ficar entre seu povo e a escuridão sem poder fazer nada. Morreu de exaustão total." — SE CONTAREM PARA ISMARK: Ele fecha os olhos por um momento. "Ele nunca dormia quando Strahd vinha. Ficava acordado esperando. Protegendo." Uma pausa longa. "Que pelo menos descanse agora."' },
        ]
      },
      {
        id: 'igreja-barovia',
        titulo: 'Igreja de São Andral — Padre Donavich',
        tipo: 'roleplay',
        conteudo: `**Descrição (Leia em Voz Alta):**
"A igreja é a construção mais antiga da vila — pedra negra e janelas com vitrais tão velhos que as cores desbotaram até tons de cinza. A porta principal está destrancada. Dentro, velas iluminam bancos vazios. Um padre ajoelhado ao altar reza em voz alta, sua voz quebrando a cada frase: '...que você nos perdoe, que você nos proteja, que você...' Ele não ouve quando vocês entram."

---
**PADRE DONAVICH:**
Um homem de cinquenta anos, cabelos brancos apesar da pouca idade, olhos vermelhos de choro. Seu filho, **Doru**, foi transformado em **Vampiro Lacaio** (Nosferatu menor) por Strahd durante uma tentativa de invasão ao castelo. Doru está agora preso na cripta abaixo da igreja.

Donavich reza dia e noite pedindo a Khalmyr (divindade da justiça em Tormenta) que salve sua alma ou dê coragem para fazer o que precisa ser feito — mas não consegue matar o próprio filho.

**O que ele pedirá aos personagens:**
1. *(Primeiro)* "Doru está sofrendo. Eu ouço os gritos durante o dia. Ele luta contra o monstro que se tornou. Por favor — deçam à cripta e... libertem-no. Da única forma que existe."
2. *(Se relutantes)* "Ou... talvez possam curá-lo? Há um ritual de purificação — precisaria de água benta e uma prece sincera a divindades da luz. Nunca tentei porque ele... ele me morde sempre que me aproximo."

**DORU** *(na cripta abaixo)*:
Um jovem pálido e faminto, acorrentado. Alterna entre choros de arrependimento e fúria vampírica. Se os personagens interagirem com cuidado (Diplomacia CD 15), Doru lúcido pode revelar: *"O Castelo... há uma forma de entrar pela biblioteca nordeste. Strahd recebe os convidados no salão principal, mas o quarto do caixão fica..."* — então ele perde a lucidez e ataca.

**Estatísticas de Doru (Nosferatu Menor, ND 1):**
- PV: 22 • Defesa: 13 • Ataque: Mordida +3 (1d6+2 + Vontade CD 11 ou atordoado 1 round)`,
        cd: [
          { pericia: 'Religião (Misticismo)', cd: 13, resultado: 'O MESTRE DIZ: "Ao observar Doru, você percebe algo que um leigo perderia: ele resiste. A transformação vampírica está incompleta porque alguma parte de Doru ainda luta. Nos momentos lúcidos — que ficam mais raros — ele não é o monstro, é o filho de Donavich tentando se segurar. Isso significa que há uma janela, estreita e que se fechará em breve, para reverter o processo." — COMO CURAR DORU: Ritual de purificação requer 3 frascos de água benta (os personagens têm 1 do baú dos serviçais; os outros dois podem ser conseguidos com Padre Donavich ou comprados nos Vistani). Mais: expor Doru à luz solar por 1 minuto enquanto a água benta age. Ele vai gritar. Vai parecer que está morrendo. Mas se resistir, a luz purifica o que a escuridão começou. — SE PERGUNTAREM O QUE ACONTECE SE FALHAR: "Se a transformação completar antes de tentar ou se o ritual for interrompido... Doru vira vampiro completo e Donavich terá que fazer o que ele mais teme."' },
        ],
        recompensas: [
          'Se Doru for curado: Donavich oferece uma Poção de Cura Maior como gratidão + abençoa a arma de um personagem por 1 sessão (+1d4 dano sagrado)',
          'Se Doru for destruído: Donavich fica em paz. Pode fornecer informações sobre rituais de proteção contra vampiros.',
        ]
      },
      {
        id: 'ireena-barovia',
        titulo: 'Encontro com Ireena Kolyana',
        tipo: 'roleplay',
        conteudo: `Ireena está no andar superior da casa do Burgomaster. A porta está trancada por dentro — ela só abre após Ismark apresentar os personagens pessoalmente.

**Aparência:** Cabelos ruivos intensos, olhos verdes que parecem analisar tudo. Dois ferimentos cicatrizados no pescoço, cuidadosamente cobertos por um lenço. Veste roupas práticas de viagem — não as de uma dama. Carrega uma adaga curta na cintura e uma mochila já parcialmente arrumada.

**Personalidade:** Ireena não é uma vítima passiva. Está **furiosa** com sua situação e quer agir, não ser protegida. Vai testar os personagens imediatamente.

---
**FALA DE IREENA — Primeira Reunião:**

*"Não preciso de babás. Preciso de aliados. Há diferença."* *(olha cada personagem diretamente nos olhos)*

*"Se vierem comigo, é porque escolheram ajudar Barovia — não porque Ismark pagou vocês. Isso fica claro desde agora."*

*(pausa, mais suave)* *"Mas já que estão aqui... há algo que precisam saber sobre Strahd. Ele não ataca diretamente. Ele testa. Enviará servos, monstros, armadilhas mentais — para ver do que vocês são feitos. Quando vier pessoalmente, será porque decidiu que vocês merecem sua atenção. E isso é bom e ruim ao mesmo tempo."*

---
**Se um personagem perguntar sobre as mordidas:**
*"Duas vezes ele esteve aqui. A segunda vez eu o vi claramente — seus olhos. Não são os olhos de um monstro. São os olhos de alguém que sofre há séculos."* *(para, toca o pescoço distraidamente)* *"Não sei o que isso significa. Prefiro não pensar muito."*

---
**Segredo (Mestre):** Ireena sente que reconhece Strahd de alguma forma. Tem sonhos com um jardim ensolarado, um jovem de cabelos escuros chamando seu nome — mas o nome não é o dela. Ela é a reencarnação de Tatyana, o amor perdido de Strahd séculos atrás.`,
        cd: [
          { pericia: 'Intuição', cd: 15, resultado: 'O MESTRE DIZ: "Ao observar Ireena com cuidado, você percebe uma camada que ela esconde bem. Ela não está apenas furiosa ou corajosa — ela está com medo. Mas não de Strahd chegar. É um medo de si mesma. Quando ela toca o pescoço distraidamente e faz uma pausa em sua própria frase, você vê: ela está com medo do que sente. Como se algo dentro dela reconhecesse o Conde de uma forma que ela não consegue explicar e que a apavora mais do que qualquer vampiro poderia." — SE CONFRONTAREM IREENA COM ESSA OBSERVAÇÃO: Por um segundo, o controle dela vacila. "Eu não quero falar sobre isso." Uma pausa. "Às vezes sonho com um jardim. Sol de verdade — não a luz cinza de Barovia. Um homem que conheço mas que nunca vi. Que diz meu nome mas... não é meu nome." Ela para. "Não quero falar sobre isso."' },
        ]
      },
    ]
  },

  // ── 4. CAMPO DE TSER POOL ──────────────────────────────────
  {
    id: 'tser-pool',
    titulo: 'Campo de Tser Pool — Madame Eva',
    nivel: 'Nível 3',
    descricao: 'Uma comunidade Vistani a nordeste de Barovia, às margens do lago Tser. É aqui que Madame Eva realizará a leitura das cartas Tarokka — revelando onde estão os três artefatos que os personagens precisam para derrotar Strahd.',
    subsecoes: [
      {
        id: 'tser-chegada',
        titulo: 'Chegada ao Campo Vistani (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"À medida que se aproximam do lago, o cheiro de lenha queimando e especiarias desconhecidas corta a névoa. Luz e cor surgem de repente: tendas de vermelho, laranja e roxo dispostas em círculo ao redor de uma fogueira alta. Risos de crianças ecoam. Uma mulher canta em língua desconhecida, sua voz grave e melódica. Cavalos e carroças ornamentadas estão estacionados ao redor. Os Vistani não parecem ter medo de Strahd — de fato, parecem ser o único grupo em Barovia que age como se o mundo ainda pudesse ser alegre."

O campo tem cerca de trinta Vistani. São hospitaleiros com estranhos — algo extraordinariamente raro em Barovia. Oferecem comida (guisado apimentado), vinho baroviano e lugar para descansar.`,
        cd: [
          { pericia: 'Intuição', cd: 13, resultado: 'O MESTRE DIZ: "A hospitalidade dos Vistani é genuína — eles realmente gostam de companhia, realmente oferecem o melhor que têm. Mas há algo nos olhares trocados, na forma como o anfitrião principal memoriza os detalhes que vocês compartilham. Eles estão observando. Não com malícia — com profissionalismo. Cada detalhe sobre vocês: quem são, de onde vêm, o que procuram, será reportado ao Conde. Não porque o odeiam, mas porque esse é o acordo que mantém as caravanas Vistani seguras em Barovia." — SE OS PERSONAGENS PERGUNTAREM DIRETAMENTE A UM VISTANI: "O Conde nos protege. Nós o informamos. É um acordo antigo e honesto — ambos os lados cumprem. Não é traição, é comércio."' },
        ]
      },
      {
        id: 'madame-eva-encontro',
        titulo: 'Madame Eva — O Encontro',
        tipo: 'roleplay',
        conteudo: `Madame Eva habita a maior tenda do campo, ao fundo. Dois jovens Vistani guardam a entrada mas se afastam quando os personagens se aproximam — como se Eva os esperasse.

**Descrição (Leia em Voz Alta):**
"A anciã Vistani levanta os olhos para vocês. Não com surpresa — como se já esperasse exatamente vocês. A tenda cheira a ervas secas e cera de vela. No centro, uma mesa circular coberta de veludo escarlate suporta um baralho de cartas ornamentadas. A luz de três velas projeta sombras dançantes nas paredes da tenda."

Eva é uma mulher de mais de cem anos — ninguém ao certo sabe quantos. Dobrada sobre um bastão de madeira esculpida. Mas seus olhos, quando encontram os dos personagens, são de uma jovem — ou de algo muito mais velho do que qualquer pessoa na mesa.

*Madame Eva:* *(em voz baixa, mas completamente nítida)* "Venham. Já vi vocês em meus sonhos. Sombras que lutam contra a Noite Eterna. Sentem-se, sentem-se."

*(pausa, olhando cada personagem de cima a baixo)*

*"Mas antes de começarmos — saibam: não leio o **futuro**. Leio as possibilidades. O que as cartas mostram é o que **pode ser**, se vocês tiverem coragem de alcançá-lo."*`
      },
      {
        id: 'leitura-tarokka',
        titulo: 'A Leitura das Cartas (Script Completo)',
        tipo: 'roleplay',
        conteudo: `Eva embaralha as cartas lentamente, murmurand em Vistani, os olhos fechados. Então as abre na mesa — uma a uma.

---
**PRIMEIRA CARTA — O Símbolo Sagrado:**
*(vira a carta, pausa)*
*"O Cinco de Glifos... O Druida. Uma figura que toca a natureza e a morte com igual familiaridade."*

*(inclina a cabeça, como ouvindo algo)*

*"O que procuram para purificar o Símbolo Sagrado... dorme em uma **torre esquecida a nordeste**, perto do Lago Zarovich. A Torre de Van Richten. Um homem que lutou contra as trevas por décadas o escondeu lá, antes de partir. Mas cuidado — a torre não está mais sozinha."*

---
**SEGUNDA CARTA — O Tomo de Strahd:**
*(vira outra carta, e sua expressão endurece levemente)*
*"O Um de Gládios — O Vingador. Uma lâmina que julga."*

*(olha diretamente para Ismark, se ele estiver presente)*

*"O Tomo de Strahd — seus pensamentos mais sombrios, escritos de sua própria mão — está onde a luz tenta em vão manter a escuridão do lado de fora. O **Mosteiro de São Andral**, em Valaki. Uma moça foi levada para lá. Ela carrega o tomo sem saber."*

*(Ismark se levanta bruscamente — "Ireena?" Eva apenas acena com a cabeça, lentamente)*

---
**TERCEIRA CARTA — A Espada Solar:**
*(vira a terceira carta, e permanece em silêncio por um longo momento)*
*"O Mago — Mestre de Estrelas. O poder das estrelas forjado em aço."*

*(inspira fundo)*

*"A Espada Solar, a única arma que pode ferir Strahd em sua forma **verdadeira**, espera no **Templo de Âmbar**, nas montanhas ao sul. Mas esse lugar é antigo. Mais antigo que Strahd. Mais antigo que Barovia."*

*(olha cada personagem nos olhos, um por um)*

*"Os poderes que dormem lá são famintos. Eles farão **ofertas**. Eles sempre fazem. Não aceitem o que oferecerem — não importa o preço que prometam. Não importa o quanto pareça razoável."*

---
**Encerramento:**
*(coloca as mãos sobre as cartas)*

*"Há mais uma coisa que as cartas me mostram. Strahd Von Zarovich não é simplesmente um monstro. Ele é um **prisioneiro** — tanto quanto qualquer um em Barovia. Mas prisioneiros desesperados são os mais perigosos. Não subestimem o que alguém fará para acabar com o próprio sofrimento."*

*(fecha os olhos)*

*"Agora vão. As cartas disseram o que precisavam dizer."*`,
        cd: [
          { pericia: 'Intuição', cd: 12, resultado: 'O MESTRE DIZ: "Ao observar Madame Eva durante a leitura, você procura sinais de performance — o que um charlatão faria. Não encontra. Não há hesitação calculada, não há verificação de reação do público. Ela está reportando o que vê com a mesma seriedade que um médico reporta um diagnóstico. Para ela, as cartas são tão reais quanto qualquer coisa neste mundo." — SE TENTAREM DESAFIÁ-LA: "Não acredita? Não importa. As cartas não precisam da sua fé para serem verdade. O destino é indiferente à crença."' },
          { pericia: 'Misticismo', cd: 15, resultado: 'O MESTRE DIZ: "As cartas no baralho de Eva irradiam algo que você raramente sente — divinação verdadeira. Não ilusão, não truque arcano, não probabilidade calculada. Alguém ou algo maior do que Eva usa ela como canal. Seja lá qual for a fonte desse poder — deuses, destino, forças além da compreensão — é real. O que as cartas dizem tem peso cosmológico, não apenas simbólico." — SE PERGUNTAREM QUAL É A FONTE DO PODER: Eva apenas sorri levemente. "As cartas respondem ao que é. A fonte... é tudo que já foi e que ainda será. Isso é suficiente?"' },
        ]
      },
      {
        id: 'informacoes-vistani',
        titulo: 'Informações Disponíveis no Campo',
        tipo: 'tip',
        conteudo: `Os Vistani compartilham informações voluntariamente (ou por 25-50 PO para as mais específicas):

**Gratuitas:**
- "Valaki fica dois dias a oeste. Fiquem na estrada principal — a floresta mata quem se perde."
- "Strahd raramente ataca em campo aberto. Prefere que seus servos façam o trabalho sujo."
- "O Conde tem fraquezas — água corrente, luz solar, estaca no coração. Mas ele sabe disso também, e evita todas."

**Por 25 PO:**
- "Um velho caçador de monstros passou por aqui há dois meses. Chapéu grande, carroça discreta. Mencionou a torre ao norte."
- "O Templo de Âmbar fica nas montanhas a sudoeste de Valaki. A trilha começa após o vilarejo de Krezk."

**Por 50 PO:**
- "Strahd tem um caixão no ponto mais baixo do castelo — na masmorra. Enquanto o caixão existir, ele sempre voltará."
- "A Espada Solar pertencia ao irmão de Strahd, Sergei. O espírito de Sergei ainda habita a espada. Ele quer que o irmão descanse."

**Dica do Mestre:** Os Vistani vão reportar tudo ao Strahd — incluindo o que os personagens revelarem sobre si mesmos. Use isso para mostrar que Strahd sempre parece um passo à frente.`
      },
    ]
  },

  // ── 5. VALAKI ──────────────────────────────────────────────
  {
    id: 'valaki',
    titulo: 'Valaki — A Cidade Fechada',
    nivel: 'Nível 4',
    descricao: 'Valaki é a maior cidade de Barovia, governada com mão de ferro pelo Barão Vargas Vallakovich. Todos devem aparecer felizes — por decreto. É aqui que o grupo deve proteger Ireena, recuperar o Tomo de Strahd do Mosteiro de São Andral, e possivelmente construir uma coalizão contra Strahd.',
    subsecoes: [
      {
        id: 'valaki-chegada',
        titulo: 'Chegada a Valaki (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"Muralhas de madeira — altas, com estacas apontando para cima — surgem da névoa. A estrada leva até um portão pesado guardado por quatro soldados com armadura de couro e lanças. Atrás das muralhas, vocês ouvem o som de música — estranhamente animada para um lugar que parece uma fortaleza. E então veem a placa acima do portão:

'EM VALAKI, TODOS SÃO ALEGRES. QUEM NÃO FOR ALEGRE SERÁ PUNIDO.'

Abaixo, em letras menores: 'Por Decreto do Barão Vargas Vallakovich, Protetor de Valaki e Defensor da Alegria.'"

Os guardas olham para vocês sem sorriso. Há uma tensão estranha neles — como pessoas que foram obrigadas a fingir por tempo demais e já não sabem mais o que é real.`
      },
      {
        id: 'pousada-lua-azul',
        titulo: 'Pousada da Lua Azul — Base de Operações',
        tipo: 'exploration',
        conteudo: `A melhor hospedagem de Valaki — o que não é difícil, pois é a única.

Proprietários: Urwin Martikov e sua esposa Danika. Amigáveis, prestativos. Secretamente são Wereravens (metamorfos-corvo) e membros da resistência "Os Guardiões da Pena".

Urwin (ao receberem os personagens): "Bem-vindos à Lua Azul. Primeira hospedagem em Barovia que não quer que vocês sirvam de jantar para alguém." (ri levemente do próprio humor negro)

PREÇOS: Quarto duplo (noite): 1 PO | Quarto individual: 2 PO | Refeição: 5 TC | Vinho de Valaki: 3 TC | Vinho Premium Martikov: 5 TC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GANHAR A CONFIANÇA DOS MARTIKOV

Os Martikov testam os visitantes de forma sutil antes de revelar qualquer coisa.

TESTE 1 — INTUIÇÃO CD 12 para perceber que estão sendo avaliados:
O MESTRE DIZ: "Urwin e Danika são quentes e amigáveis — mas você percebe um padrão nas perguntas deles. 'De onde vêm? Já estiveram no Castelo? O que acham do Barão?' São perguntas de conversa casual, mas feitas com atenção. Eles estão formando uma opinião sobre vocês."

TESTE 2 — Os personagens precisam demonstrar claramente que são contra Strahd:
- Mencionar que vieram para ajudar Barovia/derrotar Strahd: Urwin para o que está fazendo e olha para Danika brevemente. Um olhar que diz tudo.
- Mencionar os artefatos: A postura dos dois muda — ficam mais diretos, menos cautelosos.

DEPOIS DE CONFIAR (Diplomacia CD 13 ou demonstração clara de oposição a Strahd):
Urwin (voz mais baixa, quando estão sozinhos): "Vou ser honesto com vocês porque me parece que são honestos com a gente. Somos o que alguns chamam de Guardiões da Pena. Metamorfos-corvo. E não somos os únicos em Barovia resistindo ao Conde." (pausa) "Se precisarem de informação, rota segura, ou uma ala de corvos mensageiros — contem conosco."

O QUE OS MARTIKOV PODEM FORNECER:
- Mapa de rotas seguras evitando patrulhas de Strahd
- Localização de outros Wereravens (aliados potenciais no confronto final)
- Informações detalhadas sobre o Barão e a situação política em Valaki
- Amuleto do Corvo (ver tabela de tesouros)`,
      },
      {
        id: 'mosteiro-sao-andral',
        titulo: 'Mosteiro de São Andral — O Tomo de Strahd',
        tipo: 'combat',
        conteudo: `O Mosteiro de São Andral é uma fortaleza religiosa no centro de Valaki. O Padre Lucian Petrovich a administra — sério, justo, e atualmente em pânico silencioso.

A SITUAÇÃO: Os Ossos de São Andral — relíquias sagradas que criam um campo de proteção contra vampiros — foram roubados. Sem eles, o campo está enfraquecendo. Strahd sabe. Seus servos vêm esta noite.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 12 — Quem Roubou os Ossos?

O MESTRE DIZ: "Ao investigar discretamente os funcionários do mosteiro, você percebe um padrão — Milivoj, o coveiro jovem, evita o olhar do Padre Lucian. Quando você o encontra na cripta, ele está nervoso demais para ser inocente."

SE CONFRONTAREM MILIVOJ (direto): Ele nega. Diplomacia CD 13 ou Intimidação CD 14 para confessar.
DIPLOMACIA SUCESSO: "Eu precisava do dinheiro. Minha família... minha família está passando fome. O carpinteiro Henrick me pagou bem. Eu não sabia que ele ia usar para isso. Juro." (Está dizendo a verdade — foi enganado sobre o propósito.)
INTIMIDAÇÃO SUCESSO: Milivoj confessa com medo, mas fica ressentido. Pode complicar as coisas depois.
NA FALHA: Os personagens não conseguem identificar Milivoj como suspeito facilmente — podem tentar outros NPCs do mosteiro (qualquer um pode apontar para ele com Diplomacia CD 10).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECUPERAR OS OSSOS — Henrick van der Voort, Carpinteiro

Henrick está em sua oficina, apavorado. Um vampiro servo de Strahd o coagiu com ameaças à família. Os ossos estão numa caixa de madeira sob a bancada de trabalho.

COMO ABORDÁ-LO: Henrick não é vilão — é uma vítima com medo demais para raciocinar bem.
DIPLOMACIA CD 11: "Eu... eu só queria proteger minha família. O que vem à noite é pior do que qualquer coisa que vocês possam me fazer." (Entrega os ossos.)
SE DEMONSTRAREM QUE PODEM PROTEGÊ-LO: Vantagem na rolagem. Ele entrega os ossos E informa o nome e descrição do vampiro que o coagiu.
COMBATE (se tentarem forçar): Henrick tem um machado de carpinteiro mas não tem treinamento. 18 PV, Defesa 10. Prefere fugir.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESTAURAR O CAMPO: Quando os ossos voltam à cripta, o Padre Lucian os coloca no relicário. O campo de proteção se restaura visivelmente — uma onda de luz branca suave pulsa pelo mosteiro inteiro.

O MESTRE DIZ: "Vocês sentem a diferença imediatamente. Como se o ar ficasse mais limpo, mais leve. E do lado de fora, algures na noite, vocês ouvem — ou imaginam ouvir — um som de frustração. Um uivo curto e cortado. Strahd soube que a janela fechou."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O TOMO DE STRAHD — Biblioteca do Mosteiro

INVESTIGAÇÃO CD 15 (ou Misticismo CD 12 para sentir a aura primeiro):

O MESTRE DIZ com Misticismo CD 12: "Algo na parede leste da biblioteca irradia uma aura fraca mas inegável — magia de ocultação. Alguém escondeu algo aqui com a intenção de que não fosse encontrado facilmente."

O MESTRE DIZ com Investigação CD 15: "Ao examinar a parede, você encontra uma seção de tijolos que soa diferente quando tocada — oco atrás. Com algum esforço, os tijolos se soltam, revelando um nicho. Dentro: um livro encadernado em couro preto, com runas douradas gravadas na capa."

AO ABRIR O TOMO: "Quando você abre o livro, as runas na capa brilham brevemente — como se reconhecessem mãos não-autorizadas. O conteúdo é escrito com uma caligrafia precisa, elegante, que você reconhece de documentos históricos: a caligrafia de Strahd. São seus pensamentos. Suas frustrações. Seus planos. E em um capítulo marcado com fita vermelha: a localização e descrição exata de seu caixão."

O QUE O TOMO REVELA (resumo para o Mestre ler fragmentos): "O caixão fica no nível mais baixo do Castelo Ravenloft — a Câmara do Caixão, abaixo das masmorras. Protegido por guardas e armadilhas. Se o caixão for destruído antes de destruir Strahd, ele não pode se regenerar após ser ferido fatalmente."`,
        encontros: [
          { nome: 'Vampiro Lacaio (servidor de Strahd)', nd: '5', quantidade: 2, nota: 'Aparecem à noite se o campo de proteção não for restaurado' },
        ],
        recompensas: [
          'Tomo de Strahd (artefato chave da campanha)',
          'Bênção de São Andral: personagens que dormirem no mosteiro recuperam PV máximos + são imunes a Encanto de vampiros por 24h',
          '150 PO de doação do Padre Lucian',
        ]
      },
      {
        id: 'barao-vallakovich',
        titulo: 'O Barão Vallakovich — Governo de Medo',
        tipo: 'tip',
        conteudo: `O **Barão Vargas Vallakovich** governa Valaki com a convicção absoluta de que realizar "Festivais da Felicidade" semanais manterá Strahd afastado. Qualquer cidadão pego sem sorrir durante um festival é preso por "atitudes anti-Valaki".

**Personalidade:** Não é malévolo — é genuinamente louco. Acredita que está salvando seu povo. Isso o torna mais perigoso do que um tirano comum.

**Irto Lukovich (Conselheiro):** O verdadeiro poder por trás do Barão. Ambicioso e corrupto, usa o medo do Barão a Strahd para manter controle.

**Duas abordagens para os personagens:**
1. **Ignorar o Barão** — Foquem no Mosteiro, ajudem os Wereravens, saiam logo.
2. **Derrubar o Barão** — Construir coalizão com cidadãos insatisfeitos, expor Irto, instalar uma liderança mais justa. **Consequência:** Strahd, sem a estabilidade do Barão como "guarda-cachorro", pode acelerar seus planos.

**Dica do Mestre:** Não é necessário resolver Valaki completamente. O importante é: recuperar o Tomo e garantir a segurança de Ireena. O resto é material extra para grupos que queiram explorar mais.`
      },
    ]
  },

  // ── 6. TORRE DE VAN RICHTEN ────────────────────────────────
  {
    id: 'torre-van-richten',
    titulo: 'Torre de Van Richten',
    nivel: 'Nível 5-6',
    descricao: 'A Torre de Van Richten fica em uma colina isolada perto do Lago Zarovich, a nordeste de Valaki. Aqui está o Símbolo Sagrado — o primeiro dos três artefatos revelados por Madame Eva. A torre é protegida por um campo de força e pode conter o próprio Van Richten.',
    subsecoes: [
      {
        id: 'torre-chegada',
        titulo: 'Chegada à Torre (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"Uma torre de pedra sobe cinco andares acima de uma colina pelada, à beira do Lago Zarovich. A pedra é antiga mas bem conservada — alguém a manteve. Ao redor da base, restos de uma carriola queimada e ossos de cavalos. No topo da torre, uma luz fraca pisca como um farol.

Ao se aproximarem da porta, vocês sentem uma resistência invisível — como caminhar contra um vento forte que não existe. O campo de força é palpável."`,
        cd: [
          { pericia: 'Misticismo', cd: 12, resultado: 'O MESTRE DIZ: "O campo de força que resiste à sua passagem é magia de abjuração — e ao analisá-lo você percebe algo importante: foi projetado especificamente para barrar mortos-vivos e entidades sem vida. Você, vivo, é apenas colateral — o campo te empurra porque não consegue categorizar forasteiros bem, mas não foi feito para parar pessoas de carne e osso." — OPÇÕES PARA ENTRAR: (1) Força CD 15 para empurrar através da resistência — dói, mas funciona. (2) Frase "Eu invoco a proteção de Rudolph Van Richten" dita em voz alta. (3) A Flauta de Van Richten com os Vistani do Tser Pool — desativa completamente. (4) Misticismo CD 20 para disromper magicamente (10 minutos; falha em CD 15 ou menos: 2d8 dano elétrico a todos em 3m).' },
        ]
      },
      {
        id: 'torre-campo-forca',
        titulo: 'Desativando o Campo de Força',
        tipo: 'exploration',
        conteudo: `O campo pode ser desativado de três formas:

**1. A Flauta de Van Richten:**
Uma flauta de madeira entalhada que Van Richten deixou escondida com os Vistani do Campo de Tser Pool. Madame Eva pode revelar sua localização se os personagens pedirem (Diplomacia CD 10 ou fazendo uma doação de 50 PO ao acampamento).

**2. A Frase de Desativação:**
*"Eu invoco a proteção de Rudolph Van Richten."*
Deve ser dita em voz alta na porta. Se Van Richten ainda estiver na torre, ele responde de dentro — geralmente com desconfiança.

**3. Força Bruta:**
Misticismo CD 20 para analisar e disromper o campo (demora 10 minutos de trabalho arcano). Falha em CD 15 ou menos: o campo pulsa e todos em 3m fazem Reflexos CD 14 ou tomam 2d8 de dano elétrico.`,
      },
      {
        id: 'torre-interior',
        titulo: 'Interior da Torre',
        tipo: 'exploration',
        conteudo: `**Térreo:** Resto de acampamento. Uma lareira fria. Notas rabiscadas em dezenas de folhas espalhadas — pesquisa sobre vampiros, lobisomens, liches. Desordenado mas meticuloso.

SE EXAMINAREM AS NOTAS (Investigação CD 10): "As folhas espalhadas formam um sistema de pesquisa que alguém interrompeu no meio — tabelas de vulnerabilidades, cronogramas de atividade, mapas de rota. O autor estava compilando inteligência sobre Strahd especificamente. E a última folha, rabiscada às pressas: 'Ela chegou. Não posso ficar mais.'"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2º ANDAR — Biblioteca Compacta
Livros sobre monstruologia, história de Barovia, rituais de proteção.

INVESTIGAÇÃO CD 12 — O Livro de Fraquezas Vampíricas:
O MESTRE DIZ: "Entre os volumes, você encontra um com páginas marcadas e anotações densas — 'Fraquezas Vampíricas: Um Estudo Empírico por R. Van Richten.' As marcações são de alguém que leu o livro várias vezes, sublinhando com urgência."

CONTEÚDO CHAVE (leia fragmentos): "'Luz solar não apenas dana — incapacita. Um vampiro exposto não consegue usar habilidades mágicas enquanto a luz o toca. Água corrente não pode ser cruzada sem custo — cada round em contato causa 20 de dano. Estaca no caixão: paralisação total, não morte. A morte permanente exige decapitação e dissipação da cabeça.' — Anotação no fim: 'Strahd especificamente: mais rápido que qualquer vampiro que estudei. Adapta táticas em tempo real. Não repita uma abordagem que falhou — ele aprende.'"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3º ANDAR — Quarto de Van Richten
Uma cama de campanha, um baú trancado, mantimentos para semanas.

LADINAGEM CD 13 — O Baú de Van Richten:
O MESTRE DIZ: "A fechadura é de qualidade superior — feita para não ceder facilmente. Quando você a abre, encontra dentro: uma bolsa com 200 moedas de ouro, um diário encadernado em couro marrom com 'R.V.R.' gravado, e uma carta dobrada endereçada a 'Ezmerelda'."

O QUE ESTÁ NA CARTA (incompleta, não enviada): "'Ezmerelda. Sei que você está em Barovia. Sei que está procurando por mim. Não me ache — não por orgulho, mas por segurança sua. O que você aprendeu comigo é suficiente para sobreviver. O que eu sei sobre Strahd agora é suficiente para...'" A carta para aí. Não foi terminada.

SE PERGUNTAREM QUEM É EZMERELDA: "O nome não aparece nos outros documentos. Uma aluna, talvez. Alguém que Van Richten treinou. E aparentemente ela também está em Barovia — e Van Richten não quer ser encontrado por ela."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4º ANDAR — Observatório
Telescópio improvisado com vista perfeita para o Castelo Ravenloft na falésia distante.

SE USAREM O TELESCÓPIO: "Você aponta o telescópio para o Castelo Ravenloft no horizonte. Nas notas ao lado — datas, horários, observações: 'Saída às 23h47. Retorno às 4h12. Saída às... padrão irregular nos últimos dias. Como se algo perturbasse a rotina.' Van Richten estava mapeando os horários de saída de Strahd."

MISTICISMO CD 13 — O QUE AS NOTAS REVELAM: "Strahd tem uma janela de vulnerabilidade: cerca de 4 horas antes do amanhecer, ele sempre retorna ao castelo — obrigatoriamente, por alguma razão. Atacar durante esse retorno seria pegar um vampiro em movimento e com tempo limitado."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOPO (5º Andar) — A Caixa
Um cofre de madeira forrado de veludo vermelho, com tranca de prata.

DESCRIÇÃO AO ABRIR: "Dentro do cofre, em veludo vermelho, descansa um objeto simples: um disco de prata do tamanho de uma mão, com o sol entalhado no centro irradiando raios. É o Símbolo Sagrado — e quando você o pega, ele está quente. Não morno — quente, como se aquecido por um sol que não existe neste local coberto de névoa."

MISTICISMO CD 10: "Ao empunhar o Símbolo, você sente algo que Barovia nunca ofereceu: presença divina genuína. Não forte — apenas um fio, como uma vela distante. Mas ela está lá. E ela empurra de volta contra a escuridão que permeia tudo aqui."`,
        recompensas: [
          'Símbolo Sagrado (prato de prata abençoado): +2 em testes de Religião; 1x/combate causar +1d6 dano sagrado',
          'Diário de Van Richten: +5 em testes de Misticismo sobre mortos-vivos por 1 semana',
          '200 PO no baú de Van Richten',
        ]
      },
      {
        id: 'van-richten-presente',
        titulo: 'Se Van Richten Estiver na Torre',
        tipo: 'roleplay',
        conteudo: `Van Richten pode estar na torre disfarçado como "Alanik Ray" — um velho viajante, chapéu largo, capa gasta. Ele não se identifica imediatamente.

Van Richten (como Alanik, descendo a escada com uma tocha): "Não me procuravam a mim. Vieram pela caixa. Certo?"

(Se os personagens explicarem a situação)

"Madame Eva enviou vocês." (não é pergunta) "Strahd deve ser derrotado. Eu também tentei, uma vez. Perdi meu filho. Perdi meus alunos. Perdi décadas tentando — e Barovia continua na névoa."

(pausa, olhando para a caixa)

"Mas se Eva viu algo diferente em vocês... talvez a escuridão finalmente pague sua dívida."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTUIÇÃO CD 13 — "Alanik" Sabe Demais

O MESTRE DIZ: "Ao conversar com 'Alanik Ray, vendedor de ervas', você começa a notar inconsistências. Ele conhece os nomes dos servos específicos de Strahd. Ele descreve as fraquezas vampíricas com precisão clínica, não com folclore. Quando você menciona a Torre, ele sabe exatamente qual andar tem o que. Nenhum vendedor de ervas sabe essas coisas."

SE CONFRONTAREM COM ISSO: Van Richten para. Olha para vocês por um longo momento. Então, com um suspiro que carrega décadas: "Rudolph Van Richten. Sim. Aquele Van Richten." (tom absolutamente exausto) "Decepcionados que sou apenas um velho? Bom. Velhos sobrevivem porque não têm mais nada a perder."

NA FALHA: "Alanik" permanece no disfarce com sucesso. Os personagens podem pegar a caixa e partir sem descobrir quem realmente falam.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Van Richten pode:
- Revelar sua identidade se confrontado ou se confiar nos personagens
- Oferecer o Diário de Caça a Vampiros (localizado no baú do 3º andar)
- Compartilhar que Ezmerelda d'Avenir está em Barovia — e pode ser contatada como aliada poderosa
- Acompanhar brevemente o grupo se a confiança for estabelecida (Diplomacia CD 16)

SEGREDO DE VAN RICHTEN: Ele acidentalmente libertou os vampiros que mataram toda uma aldeia quando tentava vingar a morte de seu filho. Não vai admitir isso facilmente — mas um personagem empático que perceber sua culpa pode extrair a história (Intuição CD 15, depois Diplomacia CD 14 para criar espaço seguro para ele falar).`
      },
    ]
  },

  // ── 7. TEMPLO DE ÂMBAR ─────────────────────────────────────
  {
    id: 'templo-ambar',
    titulo: 'Templo de Âmbar',
    nivel: 'Nível 7-8',
    descricao: 'O Templo de Âmbar é o local mais perigoso de Barovia além do Castelo Ravenloft. Fica no topo de uma montanha nas Terras Altas, acessível por uma trilha glacial. Aqui estão aprisionados fragmentos de poderes divinos corrompidos — e a Espada Solar.',
    subsecoes: [
      {
        id: 'templo-trilha',
        titulo: 'A Trilha das Montanhas',
        tipo: 'exploration',
        conteudo: `A trilha para o templo começa em Krezk e sobe pelos Picos de Barovia — terreno glacial, ventos cortantes, precipícios.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESAFIOS DA TRILHA

ALTITUDE (cada hora de subida):
Fortitude CD 12 ou 1 nível de Fadiga (–1 em todos os testes por nível; máximo 5 = inconsciente).
SUCESSO NA PREPARAÇÃO (Sobrevivência CD 14, antes de subir): "Você conhece as montanhas bem o suficiente para guiar o grupo — ritmo adequado, respiração controlada, paradas estratégicas. O grupo todo recebe +3 nos testes de altitude durante esta subida."
FALHA REPETIDA: Personagens com 3+ níveis de Fadiga estão em perigo — precisam descansar ou serão arrastados de volta à base involuntariamente.

NEVASCAS REPENTINAS (1d6 por hora — em 1 ou 2 acontece):
PERCEPÇÃO CD 13: "Você percebe a mudança no vento dez minutos antes — uma virada súbita, o céu mais pesado. Nevasca vindo. Há uma formação rochosa a 200 metros que pode servir de abrigo."
FALHA: A nevasca chega sem aviso. Todos fazem Fortitude CD 11 ou perdem 1d4 PV de hipotermia e mais 1 nível de Fadiga.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHEGADA AO TEMPLO (LEIA EM VOZ ALTA):
"O templo emerge da neblina como se sempre tivesse estado lá — mas vocês têm certeza de que não estava. É imenso: colunas de âmbar translúcido do chão ao teto, cada uma com três metros de diâmetro. E dentro de cada coluna... formas. Sombras de algo aprisionado. Que se move. Que observa."

"E então vem o que é impossível ignorar: vocês ouvem seus próprios nomes. Não em voz alta — dentro das cabeças de vocês. Pronunciados com precisão perfeita, com a inflexão exata de alguém que conhece vocês desde sempre."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERCEPÇÃO CD 12 — As Formas nas Colunas

O MESTRE DIZ: "Ao se aproximar de uma das colunas de âmbar, você vê com clareza o que está dentro. Uma forma — vaguely humanoide, mas grande, densa, como feita de sombra comprimida. Ela se move lentamente dentro do âmbar, como um peixe num aquário, e seus olhos — que não são olhos — se voltam para você com reconhecimento total. Ela sabe que você está lá. E está esperando há muito tempo."

SE TENTAREM FALAR COM AS FORMAS: "Uma das entidades responde — não em palavras que você ouve, mas em sensações. Uma emoção que não é a sua: satisfação, antecipação, fome. Você sentiu o que ela sente ao ver você chegar."`,
        encontros: [
          { nome: 'Gólem de Gelo', nd: '6', quantidade: 1, nota: 'Guarda a entrada principal do templo' },
          { nome: 'Bruxa Noturna', nd: '5', quantidade: 1, nota: 'Habita a ala norte — pode ser negociada' },
        ]
      },
      {
        id: 'templo-susurros',
        titulo: 'Os Sussurros dos Vestígios',
        tipo: 'warning',
        conteudo: `ATENÇÃO DO MESTRE: Esta é a parte mais psicologicamente pesada da campanha. Prepare ofertas personalizadas para CADA personagem baseado no que você conhece das histórias deles. A eficácia desta cena depende de quão pessoal for cada oferta.

Os Vestígios são entidades aprisionadas nos sarcófagos de âmbar — fragmentos de divindades corrompidas, poderes primordiais. Eles não podem sair, mas se comunicam diretamente na mente dos visitantes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMO OS SUSSURROS FUNCIONAM

AO ENTRAR NO TEMPLO:
O MESTRE DIZ (para todos, ao mesmo tempo): "Vocês ouvem seus nomes — mas não com os ouvidos. É como se alguém dentro de vocês soubesse como se chamar pela voz da sua própria mente. E junto com o nome, uma frase. Diferente para cada um de vocês."

Diga a cada jogador sua oferta individualmente, em voz baixa ou por escrito — as outras personagens não ouvem. Os jogadores têm que decidir sem saber o que os outros estão ouvindo.

MECÂNICA — VONTADE CD 15:
- SUCESSO: O personagem reconhece a manipulação e resiste. O sussurro para para aquele round.
- FALHA: A oferta ressoa. O personagem não precisa aceitar, mas começa a pensar sobre ela. +2 no CD para esse personagem nos rounds seguintes.
- ACEITAR VOLUNTARIAMENTE: O personagem ganha um poder imediato (veja abaixo), mas desenvolve Corrupção física progressiva.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXEMPLOS DE OFERTAS (personalize para cada personagem)

Para o GUERREIRO/COMBATENTE que perdeu alguém em batalha:
"Você nunca mais precisa perder alguém. Eu posso te dar força para proteger a todos — sempre. Cada inimigo que te enfrenta é derrotado. Cada aliado que você cobre, vive. Nunca mais lamentar. Nunca mais falhar. Basta aceitar."

Para o MAGO/ARCANA que busca conhecimento:
"Eu sei tudo. Cada segredo de Barovia, de Strahd, do Templo, dos Vestígios. Posso revelar tudo agora — os três artefatos, a localização do caixão, a fraqueza que nenhum texto menciona. Uma aceitação, e a escuridão de Barovia torna-se transparente para você."

Para o CLÉRIGO/DEVOTO que perdeu um ente querido:
"[Nome da pessoa morta] está do lado de fora. Esperando. Não no Além — aqui, neste plano, entre os Vestígios que aprisionamos. Eu posso te levar a ele/ela agora. Vocês podem conversar. Você pode dizer o que nunca disse. Basta aceitar."

Para o LADINO/SOBREVIVENTE com passado difícil:
"Você passou a vida inteira dependendo de outros para sobreviver. Eu posso fazer com que nunca mais precise de ninguém. Autossuficiência absoluta. Imunidade a traição, a dor, a dependência. Nunca mais vulnerável. Nunca mais à mercê de quem você precisa."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SE UM PERSONAGEM ACEITAR A OFERTA

O MESTRE DIZ (imediatamente, para aquele jogador): "Algo entra em você. Não como invasão — como chave que encontra fechadura. Por um momento você vê o que a entidade é: vasto, antigo, absolutamente indiferente a você como indivíduo. Você é uma ferramenta. E então o poder vem — e é real."

PODER GANHO (escolha baseada na oferta):
- Proteção: +1d6 em todos os danos por 30 dias
- Conhecimento: Um segredo verdadeiro revelado instantaneamente
- Contato com mortos: Uma conversa real com o familiar falecido (3 perguntas, ele responde)
- Autonomia: Imunidade a Encanto e Medo por 30 dias

CORRUPÇÃO FÍSICA (imediata e permanente até cura especial):
Role 1d6: (1) Unhas enegrecidas, (2) Olhos com íris branca, (3) Cabelos caem — crescem de volta prateados, (4) Sombra não coincide com movimentos, (5) Temperatura corporal cai — sempre frio ao toque, (6) Não reflete em espelhos

CONSEQUÊNCIA MECÂNICA: Cada vez que a corrupção é exibida, a entidade pode sussurrar novamente — com CD de Vontade 2 pontos mais difícil do que da última vez. Aceitar uma segunda vez causa segunda corrupção. Três corrupções: a transformação é irreversível sem intervenção divina de alto nível.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DICA DO MESTRE: O pacto de Strahd com um dos Vestígios é o que criou a maldição de Barovia. Ele aceitou a oferta de imortalidade — e ficou preso aqui até hoje como consequência. Quando os personagens virem Strahd pela primeira vez, eles entenderão em carne própria o que aceitaram.`
      },
      {
        id: 'espada-solar-camara',
        titulo: 'A Câmara da Espada Solar',
        tipo: 'combat',
        conteudo: `No coração do templo, após superar os guardiões e resistir aos sussurros, os personagens chegam a uma câmara circular de âmbar puro.

DESCRIÇÃO (LEIA EM VOZ ALTA): "A câmara é perfeitamente circular, paredes e teto de âmbar polido que reflete a luz das velas em mil fragmentos dourados. No centro, elevado sobre um pedestal de pedra branca, um sarcófago de âmbar translúcido contém algo que pulsa com luz própria — uma luz dourada, quente, que parece impossível neste lugar sombrio. Quando vocês se aproximam, o sarcófago se abre sozinho. E dentro... uma espada. Simples em forma, extraordinária em presença. A lâmina parece conter luz solar aprisionada. E então vocês ouvem uma voz — jovem, masculina, exausta: 'Finalmente. Eu esperava... muito tempo.'"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
O ESPÍRITO DE SERGEI VON ZAROVICH — Diálogo Completo

O irmão de Strahd habita a espada. Foi assassinado por ele no dia de seu casamento com Tatyana — o evento que desencadeou o pacto com os Vestígios. Sergei não está com raiva — está em paz, mas tem trabalho a fazer.

APRESENTAÇÃO (o Mestre fala como Sergei):
"Meu nome é Sergei Von Zarovich. Irmão de Strahd. E eu sei o que vocês vieram buscar." (pausa) "Tomem a espada. Ela sempre foi de vocês — eu apenas a guardei."

SE PERGUNTAREM SOBRE STRAHD:
"Meu irmão não nasceu monstro. Nasceu homem — brilhante, ambicioso, incapaz de aceitar limitações. Quando eu casei com Tatyana... ele não conseguiu suportar. A raiva e o luto o consumiram, e nessa condição, os Vestígios o encontraram. Eles sempre encontram os mais brilhantes nos momentos mais fracos."

SE PERGUNTAREM SE ELE ODEIA STRAHD:
"Não. Nunca consegui. Ele me matou e eu ainda o amava. Isso talvez seja fraqueza — ou talvez seja o que me manteve aqui, na espada, esperando por vocês, em vez de descansar." (pausa) "Barovia precisa ser libertada. E meu irmão precisa ser... terminado. Não punido — terminado. Há diferença."

SE PERGUNTAREM O QUE ACONTECE QUANDO STRAHD FOR DERROTADO:
"Ele descansará. Finalmente. E eu..." (uma pausa, como se pensando) "...acho que também poderei ir. Precisamos um do outro para isso, meu irmão e eu. Mesmo no fim."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTICISMO CD 12 — Ao Empunhar a Espada Solar pela Primeira Vez

O MESTRE DIZ: "Quando seus dedos fecham em torno do cabo, a espada responde. A luz na lâmina pulsa e expande — um brilho caloroso que faz as sombras no templo recuarem. E em sua mente, como um mapa desenhado por memória: uma câmara no nível mais baixo do Castelo Ravenloft. Um caixão de pedra. A localização exata do caixão de Strahd — como se a espada sempre soubesse e esperasse apenas o momento certo para compartilhar."

NA FALHA: O personagem sente o calor da espada mas não recebe a visão — talvez precise de mais tempo com ela, ou o Mestre pode dar a informação mais tarde.`,
        encontros: [
          { nome: 'Lich Menor (Guardião)', nd: '8', quantidade: 1, nota: 'O guardião da câmara final. Imune a magia não-sagrada, 120 PV. Derrota quando a Espada Solar é pega.' },
        ],
        recompensas: [
          'Espada Solar (Espada Longa +3): emite luz solar em 6m; +2d8 dano sagrado/radiante vs mortos-vivos; suprime regeneração de vampiros na área',
          '500 PO em tesouro na câmara',
          'Conhecimento do paradeiro do caixão de Strahd (Misticismo CD 12 ao empunhar a espada pela primeira vez)',
        ]
      },
    ]
  },

  // ── 8. CASTELO RAVENLOFT ───────────────────────────────────
  {
    id: 'castelo-ravenloft',
    titulo: 'Castelo Ravenloft — O Confronto Final',
    nivel: 'Nível 9-10',
    descricao: 'O Castelo Ravenloft é o lar de Strahd Von Zarovich — uma fortaleza imensa no topo de uma falésia de 300m, conectada ao mundo por uma única ponte de pedra. Esta é a fase final da campanha. Os personagens têm os três artefatos e agora devem enfrentar o Conde em seu próprio domínio.',
    subsecoes: [
      {
        id: 'castelo-chegada',
        titulo: 'Chegada ao Castelo (Leia em Voz Alta)',
        tipo: 'narration',
        conteudo: `"O Castelo Ravenloft emerge da névoa como um dente negro contra o céu cinza. A ponte de pedra que o conecta à terra firme parece suspensa no ar — a falésia abaixo desce para escuridão total. Corvos pousam nas torres e nos parapeitos, observando em silêncio.

Quando o primeiro personagem pisa na ponte, um trovão ressoa — embora o céu esteja sem nuvens. Dentro do castelo, algures, um órgão começa a tocar. A música é bela e melancólica — e vocês reconhecem a melodia. É a mesma da caixinha de música no quarto de Rose e Thorn.

Strahd sabe que vocês estão aqui. Ele sempre sabe."`
      },
      {
        id: 'convite-strahd',
        titulo: 'A Proposta de Strahd',
        tipo: 'roleplay',
        conteudo: `Antes do confronto final, Strahd sempre oferece aos personagens a oportunidade de um encontro civilizado. Uma carta os aguarda no grande salão:

*"Prezados visitantes,*

*Vocês são os forasteiros mais interessantes que Barovia recebeu em décadas. Isso me intriga. Jantem comigo esta noite. Conversemos como civilizados. Afinal — matança prematura é tão... entediante.*

*Strahd Von Zarovich*

*P.S.: Tragam a moça de cabelos ruivos. Eu insisto."*

---
**O Jantar com Strahd (Opcional mas Altamente Recomendado):**
Se os personagens aceitarem, Strahd os recebe no salão de banquetes com um jantar elaborado. Ele é um anfitrião perfeito — educado, inteligente, até encantador. Mas cada palavra carrega subtexto.

*Strahd (ao entrarem):* "Bem-vindos ao meu lar. Não se preocupem com as correntes e as sombras — são apenas decoração de uma época mais sombria. Sou um homem civilizado."

*(olha para Ireena/Tatyana, e sua expressão muda por uma fração de segundo)*

*"E você... você finalmente voltou. Sempre volta."*

*(para os personagens, retomando compostura)*

*"Seus companheiros? Compreensível que viesse acompanhada. Mas saibam — ninguém me protege de mim mesmo. Esse é o verdadeiro peso da imortalidade."*

**Strahd durante o jantar:**
- Faz perguntas inteligentes sobre o mundo exterior (ele não pode sair de Barovia)
- Testa os personagens com dilemas morais disfarçados de conversa
- Demonstra conhecimento sobre cada personagem — Ele estudou vocês
- Se confrontado sobre seus crimes: *"Vocês chamam de crimes o que eu chamo de necessidade. Barovia existe por causa de mim. Sem minha mão — mesmo de ferro — já teria sido consumida pelas trevas que eu mantenho afastadas."*`,
        cd: [
          { pericia: 'Intuição', cd: 14, resultado: 'O MESTRE DIZ: "Ao observar Strahd durante o jantar, você procura a performance do vilão que justifica seus crimes. Não encontra. Quando ele fala de Barovia como sua responsabilidade, quando descreve séculos de \'proteção\' — você vê convicção genuína. Ele realmente acredita. Isso o torna mais perigoso e mais trágico do que se fosse apenas mal por escolha." — SE CONFRONTAREM ELE COM ISSO: "Você lê pessoas bem. Sim. Eu não me justificativo — eu explico. Há diferença. Um tirano que sabe que é tirano tem consciência. Eu tenho algo mais complicado: certeza."' },
          { pericia: 'Intuição', cd: 17, resultado: 'O MESTRE DIZ: "Há um momento — brevíssimo — quando Strahd olha para Ireena. O controle perfeito falha por uma fração de segundo. Você vê: não é obsessão. É culpa. Ele sabe. Ele sabe exatamente o que é, o que faz a ela, o que fez a Tatyana. E isso o consome da mesma forma que o Vestígio o consumiu — ele está preso dentro da sua própria monstruosidade sem conseguir sair." — SE UM PERSONAGEM AGIR COM BASE NISSO (confrontar Strahd com gentileza): Por um momento surpreendente, Strahd fica quieto. Quando responde, a voz está um tom mais baixa: "Você é perspicaz demais para seu próprio bem. E certo demais para o meu conforto."' },
        ]
      },
      {
        id: 'confronto-final',
        titulo: 'O Confronto Final — Três Fases de Strahd',
        tipo: 'combat',
        conteudo: `O confronto com Strahd ocorre quando os personagens estiverem prontos — ou quando Strahd decidir que já não há razão para esperar.

LOCAL: A Câmara do Trono ou a Câmara do Caixão (porão). Combate no caixão é mais perigoso mas permite destruir Strahd permanentemente sem ele usar Evasão Nebulosa para escapar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 1 — O CONQUISTADOR (209 PV → 130 PV)

POSTURA: Strahd é quase entediado. Avalia os personagens como um mestre de xadrez avalia peças. Usa magia de controle e a Garra Longa flutuante — não usa Mordida ainda. Quer ver do que são feitos.

ABERTURA DO COMBATE (LEIA EM VOZ ALTA):
"Strahd Von Zarovich caminha para vocês como se o combate fosse uma conversa que ele já sabe como vai terminar. 'Então chegamos a isso. Esperava que vocês fossem mais... inventivos. Mas tudo bem. Uma dança antes da capitulação é sempre bem-vinda.'"

MAGIAS DESTA FASE: Bola de Fogo CD 18 (dano de área), Sono (incapacitar um personagem), Invisibilidade (reposicionar), Imagem Espelhada (3 cópias dificultam acertos).

COMPORTAMENTO: Nunca ataca o mesmo personagem duas vezes seguidas sem razão. Prioriza alvos com luz sagrada ou a Espada Solar — quer neutralizá-los primeiro.

FALAS DURANTE FASE 1:
- Após esquivar de um ataque forte: "Boa. Vi três aventureiros usarem exatamente esse movimento. Nenhum deles sobreviveu para tentar de novo."
- Quando um personagem o acerta com a Espada Solar: (pausa curta) "Ah. Sergei. Então você conseguiu chegar ao Templo de Âmbar. Inteligente."
- Quando usa Imagem Espelhada: "Qual de mim é real? A pergunta filosófica favorita de Barovia."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 2 — O MONSTRO (130 PV → 60 PV)

MUDANÇA DE COMPORTAMENTO (LEIA EM VOZ ALTA quando atingir 130 PV):
"Pela primeira vez no combate, a compostura de Strahd racha. Não muito — uma fresta. Mas você a viu: quando a Espada Solar o atingiu desta vez, ele recuou meio passo. Não por tática. Por dor. E nos olhos vermelhos, por uma fração de segundo, algo diferente: reconhecimento."

"'Vocês... realmente vieram preparados.' (olha para a Espada Solar) 'Sergei. Meu irmão ainda insiste em me perseguir mesmo de além-túmulo.'"

MECÂNICA DESTA FASE: Strahd convoca Filhos da Noite (2d4 Morcegos Gigantes ou 3d4 Ratos de Masmorra). Começa a usar Mordida — especialmente contra personagens com PV baixo. Usa Forma de Névoa para reposicionar.

FALAS DURANTE FASE 2:
- Quando convoca servos: "Meus filhos. Aprendam com o espetáculo — é raro ver combatentes desta qualidade."
- Quando usa Mordida: (sem fala — este ato é visceral, não elegante. O silêncio é mais perturbador.)
- Quando usa Encanto: "Você luta bem. Gostaria que estivesse do meu lado. Por que não... reconsiderar?"
- Se um personagem resistir ao Encanto: "Força de vontade admirável. Ou fé. Ambas são qualidades que respeito."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 3 — O DESESPERO (abaixo de 60 PV)

TRANSIÇÃO (LEIA EM VOZ ALTA quando atingir 60 PV):
"A calculista de Strahd some. Os ataques agora são fúria — mas não a fúria de quem quer vencer. A fúria de quem está cansado de continuar. Há uma palavra para o que você vê no rosto dele agora: alívio."

POSTURA: Ele para de se proteger completamente. Ataca com tudo que tem — mas não usa mais Resistência Lendária para evitar testes. Como se aceitasse que chegou a hora.

FALA CENTRAL (quando gravemente ferido, ~30 PV):
"Então... é assim. Séculos. Tatyana sempre fugia. Sempre escolhia outra vida em vez de mim. E agora..." (olha para Ireena, se ela estiver presente) "...você novamente me escapa. Pela última vez."

(longa pausa — Strahd está genuinamente exausto)

"Façam. Por favor. Libertem-me desta prisão. Eu... estou... cansado de existir assim. Cansado há muito tempo."

SE OS PERSONAGENS HESITAREM:
"Não se tornem sentimentais por mim. Eu escolhi isso. Escolhi o poder em vez do amor, o domínio em vez da paz. Paguei cada segundo desses séculos. Agora é hora de pagar o último."

SE UM PERSONAGEM PERGUNTAR SE ELE TEM ARREPENDIMENTO:
Por um momento longo, Strahd não responde. Então: "Arrependimento é para quem acredita que poderia ter escolhido diferente. Eu... (pausa) ...sim. Sim. Deveria ter deixado Tatyana ir."

SE IREENA ESTIVER PRESENTE E FALAR COM ELE ANTES DO GOLPE FINAL:
Strahd a olha. Por um segundo — o último — ele não é o vampiro. É um homem muito velho que cometeu um erro muito grande e viveu séculos carregando. "Tatyana. Em todas as suas vidas... você foi sempre mais corajosa que eu." (fecha os olhos) "Acabem com isso."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DICAS DE MESTRE PARA O COMBATE

- Use as Resistências Lendárias (3/dia) sabiamente — reserve para quando os personagens quase matarem Strahd antes da hora dramática
- A Espada Solar causa +2d8 dano sagrado/radiante E suprime regeneração de vampiros na área de luz — crucial para a duração do combate
- Se os personagens tentaram destruir o caixão primeiro (Área 37 da masmorra): Strahd não pode usar Evasão Nebulosa — ele deve lutar até o fim ou morrer tentando alcançar onde o caixão costumava estar
- Se os personagens foram ao caixão primeiro sem destruir servos: 4 Vampiros Lacaios aparecem para defender Strahd nesta fase`,
        encontros: [
          { nome: 'Strahd Von Zarovich', nd: '16', quantidade: 1, nota: 'Ver ficha completa no Bestiário. Use Resistência Lendária com sabedoria — reserve para testes críticos.' },
          { nome: 'Vampiro Lacaio (servos)', nd: '5', quantidade: 4, nota: 'Aparecem na Fase 2 se os personagens não destruíram os lacaios durante a exploração do castelo' },
        ]
      },
      {
        id: 'apos-strahd',
        titulo: 'Após a Derrota de Strahd',
        tipo: 'narration',
        conteudo: `**Leia em Voz Alta:**
"Quando Strahd cai, algo muda em Barovia imediatamente. A névoa — a névoa que sempre esteve lá, que sempre estava em tudo — começa a recuar. Lentamente primeiro, depois em ondas. Pelas janelas do castelo, vocês veem algo que provavelmente não esperavam ver aqui: o céu.

O sol está se pondo no horizonte. E é a coisa mais bonita que já viram."

---
**O que acontece:**
- A maldição de Barovia começa a se desfazer gradualmente (tomará dias para dissipar completamente)
- Os mortos-vivos menores perdem a coesão e se desfazem
- Os barovianos começam a sair de suas casas com cautela
- Pássaros — pássaros reais, coloridos — aparecem pela primeira vez em anos

**Ireena e Sergei:**
Ireena sente a presença de Sergei. O espírito do irmão de Strahd, finalmente liberto do caixão pela derrota do vampiro, materializa-se brevemente — uma figura de luz.

*Sergei (para Ireena):* "Tatyana. Você viveu tantas vidas tentando alcançar a paz. Agora... você pode descansar. Ou continuar. A escolha, desta vez, é inteiramente sua."

**Ireena pode escolher:**
1. **Partir com Sergei** para o plano astral — sua alma finalmente em repouso
2. **Ficar** como Ireena Kolyana, livre pela primeira vez de verdade, com uma vida inteira à sua frente

**Epílogo:**
Os personagens são os primeiros em séculos a sair de Barovia livremente. As histórias que contam sobre o Conde derrotado se espalham pelos Reinos. Em Arton, bardos compõem canções sobre os **Libertadores de Barovia**.

E às vezes, em sonhos, os personagens ainda ouvem um órgão tocando — melodioso, melancólico, distante.`
      },
    ]
  },
]

// ============================================================
// BESTIÁRIO — MONSTROS ADAPTADOS PARA TORMENTA20
// ============================================================

export const BESTIARIO: Monstro[] = [
  {
    id: 'strahd',
    nome: 'Strahd Von Zarovich',
    nd: '16',
    tipo: 'Morto-Vivo (Solo)',
    tamanho: 'Médio',
    pv: 209,
    defesa: 19,
    iniciativa: '+10',
    deslocamento: '12m, escalar 12m',
    atributos: { for: 4, des: 4, con: 5, int: 5, sab: 2, car: 4 },
    resistencias: { fortitude: '+11', reflexos: '+10', vontade: '+8' },
    imunidades: ['veneno', 'doenças', 'cansaço', 'condições físicas de imobilidade (se não for através de água corrente ou luz solar)'],
    resistenciaDano: ['necrótico', 'veneno', 'corte/perfuração/impacto de armas não-mágicas'],
    sentidos: ['Visão às cegas 9m', 'Visão no escuro 36m', 'Percepção Passiva 22'],
    ataques: [
      { nome: 'Garras', bonus: '+10', dano: '1d8+4', tipo: 'Cortante', descricao: 'Pode agarrar o alvo (Atletismo CD 18 para escapar).' },
      { nome: 'Mordida', bonus: '+10', dano: '2d6+5d6+4', tipo: 'Perfurante + Necrótico', descricao: 'PV máximo reduzido pelo dano necrótico. Strahd recupera PV igual ao necrótico causado.' },
      { nome: 'Garra Longa +2', bonus: '+12', dano: '1d8+6', tipo: 'Cortante', descricao: 'Espada mágica +2. Pode flutuar via Espada Dançante.' }
    ],
    habilidades: [
      { nome: 'Resistência Lendária (3/Dia)', descricao: 'Se Strahd falhar em um teste de resistência, ele pode optar por ser bem-sucedido no lugar.' },
      { nome: 'Regeneração', descricao: 'Strahd recupera 25 PV no início do seu turno se tiver ao menos 1 PV. Se sofrer dano sagrado/radiante, recupera 10 PV a menos na próxima ativação.' },
      { nome: 'Escalar Paredes', descricao: 'Pode escalar superfícies difíceis, incluindo tetos, sem precisar fazer testes.' },
      { nome: 'Fraquezas Vampíricas', descricao: 'Proibição de entrar em residência sem convite. Água corrente: 20 dano ácido ao terminar turno. Estaca no Coração: paralisado se estaca for cravada enquanto incapacitado no caixão. Luz Solar: 20 dano sagrado por round, –5 em ataques e testes, regeneração não funciona.' },
      { nome: 'Conjuração (CD Misticismo 18, +10 em ataques)', descricao: '1° Círculo: Detectar Magia, Nevoa, Sono. 2°: Invisibilidade, Imagem Espelhada. 3°: Bola de Fogo, Conjurar Mortos-Vivos. 4°: Portal Dimensional, Invisibilidade Superior. 5°: Passo Distante. Além disso, Manto das Trevas Sombrias (escuridão mágica que o acompanha).' }
    ],
    acoes: [
      { nome: 'Encanto (Ação Padrão)', descricao: 'Alvo humanoide visível em 9m. Vontade CD 17 ou fica enfeitiçado por 24h, tratando Strahd como amigo de confiança.' },
      { nome: 'Forma de Névoa (Ação Padrão)', descricao: 'Transforma-se em névoa. Imune a dano não-sagrado, voo 36m, passa por qualquer abertura. Retorna como ação livre.' },
      { nome: 'Forma de Fera (Ação Bônus)', descricao: 'Transforma-se em morcego ou lobo. Vel. 9m voo/natação. Não pode usar Garra Longa.' },
      { nome: 'Espada Dançante (Ação Bônus)', descricao: 'A Garra Longa flutua e ataca independentemente (pode atacar até 3 vezes em locais diferentes).' },
      { nome: 'Evasão Nebulosa (Reação)', descricao: 'Ao chegar a 0 PV, transforma-se em névoa em vez de cair. Deve alcançar seu caixão em 2 horas ou morre.' },
      { nome: 'Filhos da Noite (1/Dia)', descricao: 'Convoca 2d4 enxames de morcegos/ratos ou 3d6 lobos. Chegam em 1d4 rounds.' },
      { nome: 'Ações Lendárias (3/round)', descricao: 'Mover (1 ação): move sem provocar ataques. Atacar (1): Garras ou Garra Longa. Mordida (2): usa Mordida. Purificar Sangue (2): remove uma condição.' }
    ],
    descricao: 'O Conde Strahd Von Zarovich é o Senhor das Trevas de Barovia — um vampiro de poder imenso que fez um pacto com as forças das trevas séculos atrás. Ele não é simplesmente malévolo; é um ser preso em uma tragédia eterna de seu próprio fazer, buscando a reencarnação de seu amor perdido (Tatyana) em cada nova geração.',
    localizacao: 'Castelo Ravenloft'
  },
  {
    id: 'vampiro-lacaio',
    nome: 'Vampiro Lacaio',
    nd: '5',
    tipo: 'Morto-Vivo',
    tamanho: 'Médio',
    pv: 72,
    defesa: 16,
    iniciativa: '+4',
    deslocamento: '9m, escalar 9m',
    atributos: { for: 4, des: 4, con: 3, int: 1, sab: 1, car: 1 },
    resistencias: { fortitude: '+6', reflexos: '+7', vontade: '+4' },
    imunidades: ['veneno', 'doenças'],
    resistenciaDano: ['corte/perfuração/impacto de armas não-mágicas'],
    sentidos: ['Visão no escuro 18m'],
    ataques: [
      { nome: 'Garra', bonus: '+7', dano: '2d6+4', tipo: 'Cortante', descricao: 'Se dois ataques de garra acertarem no mesmo turno, o alvo fica agarrado (Atletismo CD 15 para escapar).' },
      { nome: 'Mordida', bonus: '+7', dano: '1d6+4', tipo: 'Perfurante + Necrótico', descricao: 'Só contra agarrado. O alvo reduz PV máximo pelo necrótico causado.' }
    ],
    habilidades: [
      { nome: 'Regeneração', descricao: 'Recupera 10 PV por turno se tiver ao menos 1 PV. Não funciona com dano sagrado.' },
      { nome: 'Fraqueza Vampírica (simplificada)', descricao: 'Luz solar: 20 dano sagrado por round. Água corrente: 10 dano ácido por round.' },
      { nome: 'Escalar Paredes', descricao: 'Pode escalar superfícies difíceis sem testes.' }
    ],
    descricao: 'Humanos ou humanoides que foram mortos pela mordida de um vampiro e enterrados, tornando-se servos do vampiro que os criou.',
    localizacao: 'Castelo Ravenloft, Vila de Barovia'
  },
  {
    id: 'ghoul',
    nome: 'Ghoul',
    nd: '2',
    tipo: 'Morto-Vivo',
    tamanho: 'Médio',
    pv: 36,
    defesa: 13,
    iniciativa: '+2',
    deslocamento: '9m',
    atributos: { for: 2, des: 2, con: 0, int: -2, sab: 0, car: -3 },
    resistencias: { fortitude: '+2', reflexos: '+4', vontade: '+3' },
    imunidades: ['veneno', 'doenças', 'cansaço'],
    sentidos: ['Visão no escuro 18m'],
    ataques: [
      { nome: 'Garra', bonus: '+4', dano: '1d6+2', tipo: 'Cortante', descricao: 'Alvo faz Fortitude CD 11 ou fica paralisado por 1 round (não funciona em elfos e mortos-vivos).' },
      { nome: 'Mordida', bonus: '+4', dano: '2d6+2', tipo: 'Perfurante', descricao: 'Apenas contra criatura incapacitada, paralisada ou inconsciente.' }
    ],
    habilidades: [
      { nome: 'Faro Necrótico', descricao: 'Vantagem em testes de Percepção baseados em olfato para detectar criaturas vivas.' }
    ],
    descricao: 'Mortos-vivos voraces que se alimentam de carne humana. Os Ghouls da Casa da Morte são os cultistas originais que morreram nos rituais do porão.',
    localizacao: 'Casa da Morte (porão), Floresta de Svalich'
  },
  {
    id: 'esqueleto-cultista',
    nome: 'Esqueleto Cultista',
    nd: '1/2',
    tipo: 'Morto-Vivo',
    tamanho: 'Médio',
    pv: 13,
    defesa: 13,
    iniciativa: '+2',
    deslocamento: '9m',
    atributos: { for: 0, des: 2, con: 0, int: -4, sab: -2, car: -3 },
    resistencias: { fortitude: '+0', reflexos: '+4', vontade: '+0' },
    imunidades: ['veneno', 'doenças', 'cansaço'],
    sentidos: ['Visão no escuro 18m'],
    ataques: [
      { nome: 'Adaga Enferrujada', bonus: '+2', dano: '1d4', tipo: 'Perfurante' }
    ],
    habilidades: [
      { nome: 'Vulnerabilidade ao Sagrado', descricao: 'Sofre dano dobrado de fontes de dano sagrado.' }
    ],
    descricao: 'Restos reanimados dos cultistas que serviram a família Durst. Sem inteligência, apenas seguem ordens residuais gravadas em seus ossos pelo ritual.',
    localizacao: 'Casa da Morte (masmorra)'
  },
  {
    id: 'espirito-atormentado',
    nome: 'Espírito Atormentado',
    nd: '1',
    tipo: 'Morto-Vivo (Incorpóreo)',
    tamanho: 'Médio',
    pv: 22,
    defesa: 12,
    iniciativa: '+4',
    deslocamento: '9m (voo)',
    atributos: { for: -5, des: 4, con: 0, int: 0, sab: 0, car: -1 },
    resistencias: { fortitude: '+2', reflexos: '+6', vontade: '+2' },
    imunidades: ['veneno', 'doenças', 'condições físicas', 'dano de armas não-mágicas'],
    resistenciaDano: ['ácido', 'fogo', 'elétrico', 'trovão'],
    sentidos: ['Visão no escuro 18m'],
    ataques: [
      { nome: 'Toque Frio', bonus: '+4', dano: '2d6', tipo: 'Necrótico', descricao: 'Dano não pode ser reduzido por RD física.' }
    ],
    habilidades: [
      { nome: 'Incorpóreo', descricao: 'Pode se mover através de objetos sólidos mas terminar o turno dentro de um objeto causa 1d10 de dano de força.' },
      { nome: 'Vulnerabilidade ao Sagrado', descricao: 'Sofre dano dobrado de fontes de dano sagrado ou radiante.' }
    ],
    descricao: 'O eco espiritual de cultistas que morreram traumatizados. Eles não têm vontade própria — apenas dor e raiva residuais que os mantêm neste plano.',
    localizacao: 'Casa da Morte, Castelo Ravenloft'
  },
  {
    id: 'lobo',
    nome: 'Lobo de Barovia',
    nd: '1',
    tipo: 'Besta',
    tamanho: 'Grande',
    pv: 25,
    defesa: 13,
    iniciativa: '+3',
    deslocamento: '12m',
    atributos: { for: 3, des: 3, con: 1, int: -3, sab: 1, car: -2 },
    resistencias: { fortitude: '+3', reflexos: '+5', vontade: '+3' },
    sentidos: ['Visão no escuro 9m', 'Olfato aguçado (+5 em Percepção olfativa)'],
    ataques: [
      { nome: 'Mordida', bonus: '+5', dano: '1d6+3', tipo: 'Perfurante', descricao: 'Alvo médio ou menor faz Reflexos CD 11 ou cai.' }
    ],
    habilidades: [
      { nome: 'Tática de Matilha', descricao: '+2 em ataques se um aliado estiver adjacente ao alvo.' },
      { nome: 'Sentido de Strahd', descricao: 'Lobos de Barovia obedecem Strahd instintivamente. Comandados por ele, têm +2 em todos os testes.' }
    ],
    descricao: 'Os lobos de Barovia são maiores e mais inteligentes que os lobos normais. Servem Strahd e podem ser convocados por ele.',
    localizacao: 'Floresta de Svalich, Castelo Ravenloft'
  },
  {
    id: 'lobisomem',
    nome: 'Lobisomem de Barovia',
    nd: '3',
    tipo: 'Humanoide Metamórfico',
    tamanho: 'Médio/Grande',
    pv: 54,
    defesa: 12,
    iniciativa: '+3',
    deslocamento: '9m (12m em forma híbrida)',
    atributos: { for: 4, des: 3, con: 3, int: 0, sab: 0, car: 0 },
    resistencias: { fortitude: '+5', reflexos: '+5', vontade: '+2' },
    imunidades: [],
    resistenciaDano: ['corte/perfuração/impacto de armas não-mágicas não-prateadas'],
    sentidos: ['Visão no escuro 18m', 'Olfato aguçado'],
    ataques: [
      { nome: 'Mordida (forma híbrida/lobo)', bonus: '+6', dano: '2d6+4', tipo: 'Perfurante', descricao: 'Alvo humanoide faz Fortitude CD 13 ou contrai licantropia.' },
      { nome: 'Garras (forma híbrida)', bonus: '+6', dano: '1d8+4', tipo: 'Cortante' }
    ],
    habilidades: [
      { nome: 'Licantropia', descricao: 'Humanos mordidos fazem Fortitude CD 13 ou contraem a licantropia. Efeito completo em 3 dias.' },
      { nome: 'Transformação', descricao: 'Pode se transformar em lobo ou forma híbrida como ação livre.' }
    ],
    descricao: 'Alguns barovianos foram amaldiçoados com licantropia pelos Filhos da Noite de Strahd. Outros se juntaram voluntariamente. Eles patrulham as florestas.',
    localizacao: 'Floresta de Svalich, arredores de Valaki'
  },
  {
    id: 'hag-noturna',
    nome: 'Bruxa Noturna (Night Hag)',
    nd: '5',
    tipo: 'Aberração',
    tamanho: 'Médio',
    pv: 68,
    defesa: 14,
    iniciativa: '+2',
    deslocamento: '9m',
    atributos: { for: 2, des: 2, con: 3, int: 3, sab: 2, car: 2 },
    resistencias: { fortitude: '+6', reflexos: '+5', vontade: '+5' },
    imunidades: ['veneno', 'encantamento', 'medo'],
    sentidos: ['Visão no escuro 36m', 'Percepção Passiva 16'],
    ataques: [
      { nome: 'Garra', bonus: '+5', dano: '2d6+2', tipo: 'Cortante + Necrótico' },
      { nome: 'Olho Maligno (3/dia)', bonus: '+5', dano: '—', tipo: 'Encantamento', descricao: 'Uma criatura em 18m faz Vontade CD 14 ou fica amedrontada por 1 hora. Não funciona em plena luz do dia.' }
    ],
    habilidades: [
      { nome: 'Andança Etérea', descricao: 'Pode se mover para o Plano Etéreo como ação livre e retornar igualmente.' },
      { nome: 'Pesadelo Mágico', descricao: 'Se a vítima dorme, a bruxa pode invadir seus sonhos. A vítima não descansa (sem recuperação de PV por descanso longo) a menos que faça Vontade CD 14.' }
    ],
    descricao: 'Bruxas das trevas que se alimentam de almas. Algumas servem Strahd, outras simplesmente aproveitam o medo que Barovia oferece.',
    localizacao: 'Floresta de Svalich, poços de pântano'
  }
]

// ============================================================
// NPCS — PERSONAGENS DE SUPORTE
// ============================================================

export const NPCS: NPC[] = [
  {
    id: 'strahd-npc',
    nome: 'Strahd Von Zarovich',
    titulo: 'Conde e Senhor das Trevas de Barovia',
    localizacao: 'Castelo Ravenloft (mas pode aparecer em qualquer lugar)',
    alinhamento: 'Leal e Maligno',
    personalidade: 'Sofisticado, aristocrático, profundamente melancólico. Não é cruel por prazer — é cruel por dor. Inteligente ao extremo, testa os personagens antes de revelar sua força total. Sente genuína nostalgia pela vida que perdeu.',
    aparencia: 'Alto, pálido como mármore, olhos vermelhos que brilham no escuro. Cabelos pretos, penteados para trás. Veste trajes de nobreza negros impecáveis, uma capa longa. Um sorriso que não alcança os olhos.',
    objetivo: 'Recuperar Tatyana (Ireena). No fundo, talvez, encontrar uma saída de sua própria maldição.',
    segredo: 'Strahd quer morrer. Ele está preso em Barovia por séculos e a existência que tem não é vida — é uma sentença. Mas sua natureza vampírica o compele a continuar existindo.',
    falas: [
      {
        situacao: 'Primeiro encontro (geralmente em um jantar no castelo)',
        fala: '"Bem-vindos ao meu lar. Sirvam-se — o vinho é genuíno, garanto. Sou um anfitrião mais civilizado do que minha reputação sugere. Sentem-se. Conversemos como iguais... por enquanto."'
      },
      {
        situacao: 'Quando os personagens ameaçam matar Strahd',
        fala: '"Matar-me? Tentaram antes. Muitos, com muito mais convicção e poder do que vocês. Estou aqui. Eles não estão mais. Mas... entre nós... esperem o tempo certo. Talvez eu não lute tanto quanto esperam."'
      },
      {
        situacao: 'Quando vê Ireena pela primeira vez',
        fala: '"Tatyana." *(pausa longa, olhando-a)* "Você sempre foi linda. Sempre tentou fugir. Sempre voltou." *(vira para os personagens)* "Ela me pertence. Isso não é ameaça — é fato histórico."'
      },
      {
        situacao: 'Quando está perdendo a batalha final',
        fala: '"Então... é desta vez. Eu... estou cansado. Séculos de escuridão, de esperar, de querer algo que nunca posso ter. Acabem com isso. Por favor. Nem eu nem Barovia merecemos mais esta existência."'
      },
      {
        situacao: 'Quando testa os personagens durante a campanha (aparece disfarçado ou através de mensagens)',
        fala: '"Mensageiro para os aventureiros: O Conde os convida ao Castelo Ravenloft para um jantar na próxima lua cheia. A recusa será interpretada como descortesia — e descortesia tem consequências em Barovia."'
      },
      {
        situacao: 'Sobre Barovia',
        fala: '"Barovia é minha. Cada pedra, cada árvore, cada pessoa. Eu não gerei isso por maldade — a terra simplesmente reconhece seu senhor. Não podem tirar isso de mim... mas talvez possam me tirar disso."'
      }
    ],
    estatisticas: {
      nd: '16', pv: 209, defesa: 19,
      pericias: 'Misticismo +15, Furtividade +14, Percepção +12, Religião +10'
    }
  },
  {
    id: 'ireena',
    nome: 'Ireena Kolyana',
    titulo: 'Filha do Burgomaster / Reencarnação de Tatyana',
    localizacao: 'Vila de Barovia → Valaki → Mosteiro de São Andral',
    alinhamento: 'Leal e Bom',
    personalidade: 'Corajosa, direta, um pouco arrogante quando se sente subestimada. Tem senso de humor seco. Leal aos seus aliados até a morte. Às vezes fica distante — nesses momentos, está tendo memórias de "outra vida" que não entende.',
    aparencia: 'Jovem de 20 e poucos anos. Cabelos ruivos que chegam aos ombros, olhos verdes intensos. Veste roupas práticas de viagem, uma adaga na cintura. Dois ferimentos cicatrizados no pescoço.',
    objetivo: 'Sobreviver. Encontrar um lugar seguro em Barovia. Eventualmente, entender por que Strahd a persegue.',
    segredo: 'É a reencarnação de Tatyana — a noiva que Strahd amou e perdeu para seu irmão Sergei séculos atrás. Em suas memórias mais profundas, ela reconhece Strahd, e isso a apavora.',
    falas: [
      {
        situacao: 'Primeiro encontro',
        fala: '"Não preciso de babás. Ismark me enviou ajuda antes — sempre fugiram quando os lobos uivavam. Se vierem comigo, é porque escolheram — não porque foram pagos. Isso importa para mim."'
      },
      {
        situacao: 'Durante a viagem, se alguém a trata com condescendência',
        fala: '"Sei usar uma adaga. Sei montar. Conheço estas estradas melhor que qualquer de vocês. Então, por favor... tratem-me como aliada, não como carga."'
      },
      {
        situacao: 'Tendo um flashback/memória de Tatyana (acontece perto de Strahd ou no Castelo)',
        fala: '"Eu... *(toca o próprio pescoço)* ...conheço este lugar. Nunca estive aqui, mas... conheço. Há algo em mim que reconhece ele. Isso me apavora mais do que Strahd em si."'
      },
      {
        situacao: 'Se os personagens perguntam sobre os ferimentos no pescoço',
        fala: '"Ele apareceu duas vezes. Não como monstro — como... cavaleiro. Gentil, quase. Disse que eu era bonita. Que pertencia com ele. Depois vi apenas escuridão e acordei com esses ferimentos. A próxima vez... Padre Donavich disse que a terceira vez é a última."'
      },
      {
        situacao: 'Após a derrota de Strahd (final)',
        fala: '"*(olhando para onde Strahd estava)* Era monstro. Era vilão. Mas... havia algo humano nele que não consigo ignorar. Uma dor que eu quase entendia." *(pausa)* "Talvez agora ele possa descansar. E Barovia com ele."'
      }
    ],
    estatisticas: {
      nd: '—', pv: 38, defesa: 14,
      pericias: 'Atletismo +3, Intuição +4, Percepção +4'
    }
  },
  {
    id: 'madame-eva',
    nome: 'Madame Eva',
    titulo: 'Anciã Vistani, Leitora do Destino',
    localizacao: 'Campo de Tser Pool (norte de Barovia)',
    alinhamento: 'Neutro',
    personalidade: 'Misteriosa, sábia, com um humor obscuro. Fala em metáforas. Parece fraca e idosa, mas quando seus olhos se fixam em alguém, é como ser visto por algo muito mais antigo e mais poderoso.',
    aparencia: 'Anciã minúscula, encolhida sobre um bastão de madeira ornamentado com ossos de pássaro. Pele enrugada como pergaminho, olhos cor de ámbar que brilham com sua própria luz. Coberta de xales coloridos sobrepostos.',
    objetivo: 'Manter o equilíbrio. Ela não escolhe vencedor — ela aponta o caminho. Se Strahd for libertado, a terra será libertada.',
    segredo: 'Madame Eva é a encarnação de Katarina, meia-irmã de Strahd, que fez um pacto para permanecer em Barovia como guardiã. Ela é muito mais poderosa do que aparenta.',
    falas: [
      {
        situacao: 'Recebendo os personagens',
        fala: '"Ah. Os caminhantes da névoa. Já vi seus rostos em sonhos. Venham, venham. As cartas esperam." *(faz um gesto lento para as cadeiras)* "Sirvam-se de vinho. A leitura leva tempo... e tempo é o que mais temos em Barovia."'
      },
      {
        situacao: 'Durante a leitura (tom profético)',
        fala: '"As cartas não mentem. Mas as cartas também não são simples. Uma carta pode significar dez coisas diferentes para dez pessoas diferentes. O que vejo em vocês... é possibilidade. Rara em Barovia."'
      },
      {
        situacao: 'Se os personagens perguntam se Strahd pode ser derrotado',
        fala: `"'Derrotado' é uma palavra interessante. Pode ser derrotado no campo de batalha. Pode ser morto — sim, a morte pode encontrá-lo. Mas libertado?" *(pausa)* "Isso é diferente. A libertação... exige que alguém compreenda. Não apenas que alguém vença."`
      },
      {
        situacao: 'Se os personagens pedem mais informações sobre o Templo de Âmbar',
        fala: '"O Templo de Âmbar é mais antigo que Strahd. Mais antigo que Barovia. Os poderes que dormem lá são famintos — e astutos. Eles farão ofertas. Eles sempre fazem." *(olha intensamente)* "A pergunta não é se terão coragem de rejeitar. A pergunta é se terão sabedoria para saber o que está sendo oferecido."'
      }
    ]
  },
  {
    id: 'ismark',
    nome: 'Ismark Kolyanovich',
    titulo: 'Filho do Burgomaster de Barovia',
    localizacao: 'Vila de Barovia',
    alinhamento: 'Neutro e Bom',
    personalidade: 'Honesto, corajoso, mas desesperado. Sente o peso de não ter conseguido proteger sua irmã. Não é combatente excepcional, mas tem coragem de sobra. Tende a culpar-se por tudo.',
    aparencia: 'Homem de 30 anos, ombros largos, barba curta. Parece ter dormido mal por semanas — olheiras fundas, roupas amassadas. Carrega uma espada longa ao quadril.',
    objetivo: 'Proteger Ireena. Manter o que resta de esperança em Barovia vivo.',
    segredo: 'Ismark sabe mais sobre os planos de Strahd do que admite. Ele interceptou correspondências e sabe que Strahd está planejando algo maior — mas teme que revelar isso afugente os aventureiros.',
    falas: [
      {
        situacao: 'Pedindo ajuda',
        fala: '"Já vi aventureiros antes. Todos chegam cheios de esperança, prometendo derrotar o Conde. E todos..." *(para, endurece o olhar)* "...mas vocês chegaram da Casa da Morte e ainda estão de pé. Talvez sejam diferentes. Minha irmã precisa ser levada para longe de Barovia — ou ao menos para um lugar onde as garras de Strahd não a alcancem tão facilmente."'
      },
      {
        situacao: 'Sobre Strahd',
        fala: '"Ele não é apenas violência. Isso tornaria tudo mais simples. Ele... joga. Testa. Faz coisas gentis às vezes — não por bondade, mas para ver como você responde. Para aprender o que você é feito. Por isso ele é perigoso."'
      }
    ],
    estatisticas: {
      nd: '2', pv: 28, defesa: 15,
      pericias: 'Atletismo +4, Intimidação +3, Percepção +2'
    }
  },
  {
    id: 'van-richten',
    nome: 'Rudolph Van Richten',
    titulo: 'Caçador de Vampiros / disfarçado como "Alanik Ray"',
    localizacao: 'Torre de Van Richten (nordeste do Lago Zarovich)',
    alinhamento: 'Neutro e Bom',
    personalidade: 'Reservado, amargurado, mas com um código de honra inabalável. Tende a subestimar os outros enquanto super-analisa os problemas. Carrega trauma imenso — perdeu todos que amou por causa de Strahd.',
    aparencia: 'Idoso de 70 anos, mas com a postura e os movimentos de alguém 30 anos mais novo. Cabelos brancos, olhos cinzas penetrantes. Veste roupas modestas de viajante, um chapéu de abas largas. Nunca sem uma estaca de madeira no cinto.',
    objetivo: 'Destruir Strahd. Mas também parte dele quer fazer as pazes com o passado e morrer em paz — ele tem anos, não décadas.',
    segredo: 'Van Richten fez algo terrível no passado: ao tentar vingar a morte de seu filho, libertou acidentalmente os vampiros que destruíram toda uma aldeia. Vive com essa culpa.',
    falas: [
      {
        situacao: 'Primeiro encontro (disfarçado)',
        fala: '"Alanik Ray, vendedor de ervas. Não me interesso por aventuras nem por vampiros. Especialmente não por vampiros." *(uma pausa)* "Por que vocês estão me olhando assim?"'
      },
      {
        situacao: 'Após a identidade ser revelada',
        fala: '"Van Richten. Sim. Aquele Van Richten." *(tom cansado)* "Decepcionados que sou apenas um velho? Bom. Velhos sobrevivem porque não têm mais nada a perder — e isso nos torna perigosos de formas que nenhum jovem herói compreende ainda."'
      },
      {
        situacao: 'Passando conhecimento sobre Strahd',
        fala: '"Strahd tem fraquezas. Todo vampiro tem. Luz solar, água corrente, estaca no caixão — o usual. Mas Strahd especificamente..." *(abre um diário desgastado)* "...ele é muito mais inteligente que o vampiro médio. Ele adapta suas táticas. Ele aprende. Se ele os testar uma vez e vocês sobreviverem, a próxima abordagem será diferente. Nunca dois ataques iguais."'
      }
    ],
    estatisticas: {
      nd: '6', pv: 65, defesa: 16,
      pericias: 'Misticismo +9, Investigação +8, Percepção +7, Religião +8'
    }
  },
  {
    id: 'padre-donavich',
    nome: 'Padre Donavich',
    titulo: 'Sacerdote da Igreja de Barovia',
    localizacao: 'Igreja de Barovia, Vila de Barovia',
    alinhamento: 'Neutro e Bom (mas abalado)',
    personalidade: 'Um homem de fé que está perdendo essa fé. Ama seu filho, mas o que seu filho se tornou é um abismo que ele não consegue cruzar. Oscila entre culpa desesperada e raiva surda.',
    aparencia: 'Homem de 60 anos, cabelos brancos despenteados, batina preta rasgada. Olhos vermelhos de noites sem dormir. Tremor leve nas mãos.',
    objetivo: 'Salvar seu filho Doru, que foi transformado em vampiro. Mas também cumprir seu dever como padre, e esses dois objetivos estão em conflito permanente.',
    segredo: 'Doru, seu filho, está preso no porão da igreja, transformado em vampiro lacaio. Donavich alimenta-o com seu próprio sangue há meses, rezando por um milagre.',
    falas: [
      {
        situacao: 'Quando os personagens entram na igreja',
        fala: '"Fechem a porta! Depressa!" *(após fechá-la)* "Desculpem. Os lobos... eles ouvem as orações de manhã e ficam agitados." *(uma pausa)* "Ou talvez seja a coisa no porão que os agita. Não tenho mais certeza de nada."'
      },
      {
        situacao: 'Sobre seu filho Doru',
        fala: '"Meu filho foi a Ravenloft com outros jovens estúpidos cheios de ideias heróicas. Voltou como..." *(a voz falha)* "...ainda tenho esperança. Os deuses não abandonam seus servos. Não podem." *(pausa)* "Já tentei rezar há semanas. O silêncio é ensurdecedor."'
      },
      {
        situacao: 'Se os personagens oferecem ajuda com Doru',
        fala: '"Ele ainda está lá dentro. Às vezes ouço meu filho, não o monstro — a risada dele, a voz que eu reconheço. Talvez..." *(hesita)* "...talvez haja uma cura. Não conheço nenhuma. Mas vocês viajaram mais que eu. Há alguma esperança para os mortos-vivos que ainda guardam algo de si mesmos?"'
      }
    ]
  }
]

// ============================================================
// TABELAS DA CAMPANHA
// ============================================================

export const TABELAS: TabelaCampanha[] = [
  {
    id: 'encontros-floresta',
    titulo: 'Encontros Aleatórios — Floresta de Svalich',
    descricao: 'Role 1d12 ao entrar na floresta ou ao viajar por mais de 1 hora. Resultado de 1-6: sem encontro.',
    colunas: ['d12', 'Encontro', 'ND', 'Notas'],
    linhas: [
      ['7', '1d4 Lobos de Barovia', '1', 'Observam o grupo, atacam apenas se provocados ou com fome'],
      ['8', '1 Lobisomem disfarçado de camponês', '3', 'Pede ajuda, depois ataca à noite'],
      ['9', '2d4 Corvos gigantes', '1/4', 'Podem ser aliados (Wereravens disfarçados) — Diplomacia CD 12'],
      ['10', 'Carroça Vistani abandonada', '—', 'Contém mantimentos, 1d6 PO e uma carta enigmática'],
      ['11', '1d3 Esqueletos patrulhando', '1/2', 'Enviados por Strahd para monitorar os personagens'],
      ['12', 'Strahd em forma de lobo (observando)', '—', 'Ele observa, não ataca — ainda. Percepção CD 18 para notar.']
    ],
    nota: 'Se o resultado for Strahd, ele está testando os personagens. Mostre-o brevemente, depois ele desaparece na névoa.'
  },
  {
    id: 'encontros-barovia',
    titulo: 'Encontros na Vila de Barovia',
    descricao: 'Roll 1d8 ao entrar em áreas não exploradas da vila ou ao ficar até tarde da noite.',
    colunas: ['d8', 'Encontro', 'Notas'],
    linhas: [
      ['1-2', 'Villager chorando em casa fechada', 'Se os personagens interagem: perdeu familiar para Strahd esta semana'],
      ['3', 'Grupo de 3 Zumbis barovianos', 'ND 1 cada — foram camponeses'],
      ['4', 'Criança pedindo ajuda (armadilha)', 'Criança real, mas acompanhada de 2 Vampiros Lacaios esperando na sombra'],
      ['5', 'Mensagem de Strahd', 'Um corvo entrega carta convidando para jantar em Ravenloft'],
      ['6', 'Boato de um Vistani', 'Informa sobre localização de um dos artefatos (role na tabela de rumores)'],
      ['7', 'Cavaleiro Negro (Cavaleiro do Cavalo Negro)', 'ND 4 — servo de Strahd monitorando os personagens'],
      ['8', 'Cão de Barovia (Dire Wolf)', 'ND 2 — pede ajuda... está ferido e perdido']
    ]
  },
  {
    id: 'rumores',
    titulo: 'Tabela de Rumores de Barovia',
    descricao: 'Quando os personagens conversam com NPCs em tavernas, mercados ou igrejas, role 1d10 para determinar qual rumor ouvem.',
    colunas: ['d10', 'Rumor', 'Verdadeiro?'],
    linhas: [
      ['1', '"Dizem que o Conde Strahd pode aparecer em qualquer forma — como lobo, como morcego, até como névoa."', 'Verdadeiro'],
      ['2', '"Há um caçador de vampiros em Barovia — velho, com chapéu. Dizem que ele derrotou Strahd uma vez."', 'Parcialmente verdadeiro'],
      ['3', '"A água benta não afeta Strahd — ele é velho demais."', 'Falso — água corrente ainda o afeta'],
      ['4', '"A Madame Eva sabe de tudo que acontece em Barovia. Mas ela não escolhe lados."', 'Verdadeiro'],
      ['5', '"O Templo de Âmbar foi selado por magos antigos. Quem entrar ficará louco."', 'Parcialmente verdadeiro'],
      ['6', '"Strahd tem um irmão — Sergei. O espírito de Sergei ainda vaga pelo castelo."', 'Verdadeiro'],
      ['7', '"Há uma espada que pode matar Strahd permanentemente. Brilha como o sol."', 'Verdadeiro'],
      ['8', '"Os Vistani são espiões de Strahd. Não confiem neles."', 'Parcialmente falso — apenas alguns'],
      ['9', '"O Barão de Valaki sabe como sair de Barovia mas guarda o segredo."', 'Falso'],
      ['10', '"Ireena Kolyana é a reencarnação de Tatyana — o amor perdido de Strahd."', 'Verdadeiro']
    ]
  },
  {
    id: 'tesouros',
    titulo: 'Tabela de Tesouros de Barovia',
    descricao: 'Itens mágicos e especiais encontrados durante a campanha.',
    colunas: ['Item', 'Localização', 'Efeito'],
    linhas: [
      ['Símbolo Sagrado da Coroa de Prata', 'Torre de Van Richten', '+2 em testes de Religião; +1d6 dano sagrado contra mortos-vivos 1x/combate'],
      ['Tomo de Strahd', 'Mosteiro de São Andral', 'Contém segredos de Strahd; leitura dá vantagem em testes de Misticismo sobre vampiros por 1 semana'],
      ['Espada Solar (Espada Longa +3)', 'Templo de Âmbar', 'Emite luz solar; +2d8 dano sagrado/radiante contra mortos-vivos; suprime regeneração de vampiros'],
      ['Diário de Van Richten', 'Torre de Van Richten', '+5 em testes de Misticismo sobre mortos-vivos por 1 semana (pode ser lido)'],
      ['Faca Cerimonial dos Durst', 'Casa da Morte', '1d4 cortante + conta como mágica contra mortos-vivos; maldita (Vontade CD 12 para lançar fora)'],
      ['Anel de Signatura dos Durst', 'Casa da Morte — quarto principal', 'Sem efeito mágico; pode ser vendido por 25 PO ou usado como chave para porta secreta no castelo'],
      ['Osso de São Andral', 'Mosteiro de São Andral', 'Enquanto no mosteiro, cria campo que impede vampiros de entrar (quebrado se roubado)'],
      ['Cristal de Visão de Strahd', 'Castelo Ravenloft — biblioteca', 'Permite visualizar qualquer lugar em Barovia; mas Strahd sabe quando está sendo usado'],
      ['Amuleto do Corvo', 'Com os Wereravens em Valaki', 'Permite comunicação com corvos (mensagens simples); 1x/dia avisar aliados de perigo']
    ]
  },
  {
    id: 'cartas-tarokka',
    titulo: 'Todas as Cartas Tarokka — Referência Completa',
    descricao: 'Abaixo estão todas as cartas do baralho Tarokka, com seus possíveis significados na campanha. As cartas marcadas com ★ são as que Madame Eva revelará nesta campanha (resultados fixos).',
    colunas: ['Naipe/Valor', 'Nome', 'Significado na Campanha'],
    linhas: [
      ['Glifos 1 — Ilusionista', 'Mestre das Ilusões', 'Artefato escondido por truques e magia'],
      ['Glifos 2 — Augurador', 'Sonhador', 'Artefato em lugar associado a sonhos ou profecias'],
      ['Glifos 3 — Émulo', 'Seguidor', 'Artefato guardado por um servo fiel'],
      ['Glifos 4 — Traidor', 'Trânsfuga', 'Artefato em posse de alguém que mudou de lado'],
      ['★ Glifos 5 — Druida', 'Guardião da Natureza', 'SÍMBOLO SAGRADO na Torre de Van Richten'],
      ['Glifos 6 — Bruxo', 'Mestre das Trevas', 'Artefato onde a magia das trevas é mais forte'],
      ['Glifos 7 — Feiticeiro', 'Portador de Segredos', 'Artefato com um Vistani ou mago solitário'],
      ['Glifos 8 — Escriba', 'Cronista', 'Artefato em biblioteca ou arquivo'],
      ['Glifos 9 — Profeta', 'Visionário', 'Artefato em alto templo ou observatório'],
      ['Glifos Mestre — Arcanista', 'Mestre de Estrelas', '—'],
      ['★ Gládios 1 — Vingador', 'Espírito Leal', 'TOMO DE STRAHD no Mosteiro de São Andral'],
      ['Gládios 2 — Guerreiro', 'Campeão', 'Artefato guardado por lutador ou guerreiro'],
      ['Gládios 3 — Mercenário', 'Contratado', 'Artefato com alguém motivado por ganho pessoal'],
      ['Gládios 4 — Monge', 'Asceta', 'Artefato em mosteiro ou templo isolado'],
      ['Gládios 5 — Mago', 'Conjurador', 'Artefato perto de portal ou nexo mágico'],
      ['Gládios 6 — Nobre', 'Aristocrata', 'Artefato escondido em mansão nobre'],
      ['Gládios 7 — Soldado', 'Guardião', 'Artefato protegido por tropa ou exército'],
      ['Gládios 8 — Renegado', 'Fugitivo', 'Artefato com alguém em fuga'],
      ['Gládios 9 — Paladino', 'Campeão Sagrado', 'Artefato em lugar associado a ordem sagrada'],
      ['Gládios Mestre — Senhor', 'Soberano Guerreiro', '—'],
      ['Estrelas 1 — Ladino', 'Furtivo', 'Artefato roubado ou escondido por um ladrão'],
      ['Estrelas 2 — Ranger', 'Caçador', 'Artefato nas profundezas da floresta'],
      ['Estrelas 3 — Bardo', 'Contador de Histórias', 'Artefato com artistas itinerantes ou em teatro'],
      ['Estrelas 4 — Inventor', 'Criador', 'Artefato em oficina ou laboratório'],
      ['Estrelas 5 — Mago', 'Aprendiz', 'Artefato em escola ou torre de estudo'],
      ['Estrelas 6 — Mago', 'Arcanista', 'Artefato em círculo mágico antigo'],
      ['Estrelas 7 — Monge', 'Guardião da Verdade', 'Artefato em mosteiro de ordem sábia'],
      ['Estrelas 8 — Profeta', 'Portador da Luz', 'Artefato no lugar mais iluminado de Barovia'],
      ['Estrelas 9 — Místico', 'Sábio', 'Artefato com o sábio mais velho de Barovia'],
      ['★ Estrelas Mestre — Mago', 'Mestre de Estrelas', 'ESPADA SOLAR no Templo de Âmbar'],
      ['Moedas 1 — Camponês', 'Plebeu', 'Artefato em humilde lar de plebeu'],
      ['Moedas 2 — Comerciante', 'Mercador', 'Artefato em loja ou mercado'],
      ['Moedas 3 — Estalajadeiro', 'Anfitrião', 'Artefato em pousada ou taverna'],
      ['Moedas 4 — Ourives', 'Artesão', 'Artefato com artesão especializado'],
      ['Moedas 5 — Usurário', 'Ganancioso', 'Artefato custando algo precioso para obter'],
      ['Moedas 6 — Criado', 'Servo', 'Artefato com um servo ou escudeiro'],
      ['Moedas 7 — Pilhador', 'Ladrão', 'Artefato roubado de coleção maior'],
      ['Moedas 8 — Fazendeiro', 'Trabalhador', 'Artefato enterrado em campo ou fazenda'],
      ['Moedas 9 — Fantasma', 'Fantasma da Esperança', 'Artefato guardado por espírito benevolente'],
      ['Moedas Mestre — Destino', 'Fio do Destino', '—']
    ]
  }
]

// ============================================================
// ITENS DA CAMPANHA
// ============================================================

export const ITENS: Item[] = [
  // ── ARTEFATOS LENDÁRIOS ───────────────────────────────────
  {
    id: 'espada-solar',
    nome: 'Espada Solar',
    tipo: 'artefato',
    raridade: 'lendario',
    capitulo: 'Templo de Âmbar',
    localizacao: 'Câmara central do Templo de Âmbar — pedestal de âmbar translúcido',
    descricao: 'Espada Longa +3 que contém o espírito de Sergei Von Zarovich, irmão de Strahd. A lâmina emite luz solar genuína e é a única arma capaz de ferir Strahd em sua forma verdadeira. Quando empunhada pela primeira vez, o espírito de Sergei fala e revela a localização do caixão de Strahd no Castelo Ravenloft.',
    mecanica: '+3 para ataque e dano. Emite luz solar em 6m de raio. +2d8 dano sagrado/radiante contra mortos-vivos. Suprime regeneração de vampiros enquanto estiverem na área de luz. Vampiros na luz não conseguem usar habilidades mágicas.',
    observacoes: 'O guardião da câmara (Lich Menor, ND 8, 120 PV) é derrotado automaticamente quando a espada é pega. Ao empunhá-la: Misticismo CD 12 para receber visão da localização exata do caixão de Strahd.',
  },
  {
    id: 'simbolo-sagrado',
    nome: 'Símbolo Sagrado de Ravenkind',
    tipo: 'artefato',
    raridade: 'lendario',
    capitulo: 'Torre de Van Richten',
    localizacao: 'Cofre de veludo vermelho no 5º andar (topo) da Torre de Van Richten',
    descricao: 'Um prato de prata do tamanho de uma mão com o sol entalhado no centro irradiando raios. Van Richten o escondeu no topo da torre antes de partir. Quando segurado, está quente — como aquecido por um sol que não existe em Barovia. Emana uma presença divina genuína, rara nesta terra amaldiçoada.',
    mecanica: '+2 em testes de Religião. 1x/combate: causar +1d6 dano sagrado adicional num ataque declarado. Misticismo CD 10: sentir presença divina que empurra ativamente contra a escuridão baroviana.',
    observacoes: 'Um dos três artefatos da profecia de Madame Eva. Carta: Cinco de Glifos — Druida. O cofre abre sozinho quando tocado por mãos com intenção honesta contra Strahd.',
  },
  {
    id: 'tomo-de-strahd',
    nome: 'Tomo de Strahd',
    tipo: 'artefato',
    raridade: 'lendario',
    capitulo: 'Valaki — Mosteiro de São Andral',
    localizacao: 'Mosteiro de São Andral, Valaki — em posse de Ireena Kolyana (ela não sabe o que é)',
    descricao: 'Os pensamentos mais sombrios de Strahd escritos em sua própria mão — um diário filosófico de séculos. Contém confissões sobre seu pacto com os Vestígios do Templo de Âmbar, reflexões sobre a maldição de Barovia, e a tragédia de Tatyana. Ireena o carrega como herança da família adotiva sem conhecer seu conteúdo.',
    mecanica: 'Leitura do tomo (1 sessão): vantagem em testes de Misticismo sobre vampiros por 1 semana. Revela fraquezas específicas de Strahd que não constam em nenhum outro texto. Pode ser lido multiple vezes — cada leitura revela uma camada mais profunda.',
    observacoes: 'Um dos três artefatos da profecia. Carta: Um de Gládios — Vingador. A leitura é emocionalmente pesada — Strahd escreve com lucidez sobre seus próprios crimes. Personagens empáticos podem ganhar perspectiva sobre como tentar redimi-lo em vez de apenas destruí-lo.',
  },
  // ── ITENS MÁGICOS ─────────────────────────────────────────
  {
    id: 'espada-curta-durst',
    nome: 'Espada Curta +1 (Família Durst)',
    tipo: 'magico',
    raridade: 'incomum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 16 — Ático, baú escondido atrás da pilha de móveis (Investigação CD 12)',
    descricao: 'Espada curta com lâmina ligeiramente encurvada e cabo decorado. "Família Durst" está gravado na lâmina. Pertencia a Rose Durst — seu pai a guardou no ático para quando ela crescesse. Ela nunca cresceu. Se Rose estiver presente quando encontrada, ela reconhece a espada com melancolia.',
    mecanica: '+1 para ataque e dano. Conta como arma mágica — eficaz contra criaturas imunes a armas não-mágicas como a Sombra na câmara ritual.',
    observacoes: 'O baú também contém 100 PO e uma Poção de Cura (2d4+4 PV). Cena especial se Rose estiver presente: "Papai disse que eu teria isso quando crescesse. Nunca cresci."',
  },
  {
    id: 'faca-cerimonial',
    nome: 'Faca Cerimonial dos Durst',
    tipo: 'magico',
    raridade: 'incomum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 25 — Câmara do Relicário, terceiro pedestal',
    descricao: 'Uma faca de cabo ornamentado com símbolos que combinam com as runas do altar de sacrifício. A lâmina tem um fio excelente para sua idade. Usada nos rituais do culto Durst por décadas para oferecer sangue a Strahd. Não é amaldiçoada — apenas sinistra.',
    mecanica: '1d4 dano cortante. Conta como arma mágica contra mortos-vivos. Combinada com Óleo Abençoado: a unção dura 2 rounds adicionais nesta lâmina (total 3 rounds de +1d4 sagrado).',
    observacoes: 'Item de recompensa da câmara ritual (junto com 300 PO). Lembre os jogadores que a Sombra é vulnerável a armas mágicas — esta faca é uma opção boa se encontrada antes do encontro.',
  },
  {
    id: 'flauta-van-richten',
    nome: 'Flauta de Van Richten',
    tipo: 'magico',
    raridade: 'raro',
    capitulo: 'Torre de Van Richten',
    localizacao: 'Campo de Tser Pool — escondida com os Vistani por Van Richten antes de partir',
    descricao: 'Uma flauta de madeira entalhada com runas de proteção gravadas ao longo do corpo. Van Richten a deixou com os Vistani como seguro caso precisasse de ajuda para entrar na torre. Madame Eva pode revelar sua localização (Diplomacia CD 10 ou doação de 50 PO ao acampamento).',
    mecanica: 'Tocar na entrada da Torre: desativa completamente o campo de força. Afastar mortos-vivos (ND ≤ 2) em 9m por 1 minuto (1x/dia, Vontade CD 13 para resistir). A música é incomumente melancólica.',
    observacoes: 'Uma das três formas de entrar na torre. Alternativas: frase "Eu invoco a proteção de Rudolph Van Richten" (gratuita) ou Misticismo CD 20 força bruta (10 minutos, falha em ≤15: 2d8 elétrico em todos em 3m).',
  },
  {
    id: 'anel-signatura-durst',
    nome: 'Anel de Signatura dos Durst',
    tipo: 'magico',
    raridade: 'incomum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 14 — Quarto Principal, caixa de joias na escrivaninha (não nos corpos)',
    descricao: 'Anel de signatura com as iniciais entalhadas da família Durst. Parece sem efeito mágico — mas é a chave para uma porta secreta no Castelo Ravenloft. Os personagens provavelmente não saberão disso até chegarem ao castelo.',
    mecanica: 'Abre um mecanismo de porta secreta específico no Castelo Ravenloft quando inserido. Pode ser vendido por 25 PO se os personagens não perceberem a utilidade — seria uma perda significativa mais tarde.',
    observacoes: 'ATENÇÃO: Tentar remover joias dos corpos mumificados os anima como Zumbis (ND 1 cada). Os itens estão na escrivaninha — seguro de pegar. A caixa também contém Brincos de Rubi (100 PO).',
  },
  {
    id: 'amuleto-corvo',
    nome: 'Amuleto do Corvo',
    tipo: 'magico',
    raridade: 'incomum',
    capitulo: 'Valaki',
    localizacao: 'Com a família Martikov (Wereravens) na Taverna do Corvo Azul, Valaki',
    descricao: 'Amuleto de prata com um corvo em voo gravado, feito pelos Guardiões da Pena. Os Martikov o oferecem apenas a aliados de confiança comprovada que se oponham genuinamente a Strahd. Não está à venda.',
    mecanica: 'Comunicação com corvos em linha de visão (mensagens simples, sem custo). 1x/dia: enviar corvo mensageiro a um aliado conhecido — chega em ≈10 minutos se em Barovia. Corvos podem fazer scouting, avisar de emboscadas, rastrear alvos.',
    observacoes: 'Requer ganhar confiança dos Martikov: Diplomacia CD 13 ou demonstrar claramente oposição a Strahd (mencionar os artefatos já muda a postura deles). Os Martikov são Wereravens e parte dos Guardiões da Pena.',
  },
  {
    id: 'osso-sao-andral',
    nome: 'Osso de São Andral',
    tipo: 'magico',
    raridade: 'raro',
    capitulo: 'Valaki — Mosteiro de São Andral',
    localizacao: 'Cripta do Mosteiro — roubado por Milivoj (coveiro), entregue ao carpinteiro Henrick',
    descricao: 'Relíquia sagrada do santo fundador do mosteiro. Enquanto na cripta consagrada, cria um campo de proteção que impede vampiros e seus servos de entrar. Foi roubado a mando de Strahd: Milivoj (coveiro) foi enganado pelo carpinteiro Henrick e não sabia para que serviria.',
    mecanica: 'Enquanto na cripta do mosteiro: campo sagrado em 30m que impede vampiros e mortos-vivos de entrar. Efeito quebrado se removido do local consagrado. A missão é recuperá-lo antes da noite — os servos de Strahd vêm ao cair da escuridão.',
    observacoes: 'Confrontar Milivoj com gentileza (Diplomacia CD 13): ele confessa ter vendido para Henrick sem saber o propósito. Confissão via intimidação funciona mas cria ressentimento. O Tomo de Strahd está com Ireena no mosteiro.',
  },
  {
    id: 'cristal-visao',
    nome: 'Cristal de Visão de Strahd',
    tipo: 'magico',
    raridade: 'muito-raro',
    capitulo: 'Castelo Ravenloft',
    localizacao: 'Biblioteca nordeste do Castelo Ravenloft',
    descricao: 'Esfera de cristal perfeita que Strahd usa para monitorar Barovia. Permite visualizar qualquer lugar dentro dos limites da névoa baroviana com claridade total. Contrapartida: Strahd recebe notificação instantânea quando alguém além dele usa o cristal.',
    mecanica: 'Concentração (1 ação): visualizar qualquer local em Barovia. Sem limite de distância. Cada uso alerta Strahd imediatamente — ele sabe quem está usando e pode ver a cena também.',
    observacoes: 'Usar no castelo é extremamente arriscado (Strahd provavelmente está perto). Fora do castelo pode ser valioso para scouting tático — mas sempre há o custo de alertar o Conde.',
  },
  // ── CONSUMÍVEIS ───────────────────────────────────────────
  {
    id: 'pocao-cura-menor',
    nome: 'Poção de Cura Menor',
    tipo: 'consumivel',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 9 — Quarto de Hóspedes, baú no pé da cama (destrancado)',
    descricao: 'Frasco de líquido vermelho alaranjado que brilha levemente. Deixada por um hóspede dos Durst — um dos poucos itens ainda utilizáveis na mansão abandonada.',
    mecanica: 'Ação: consumir. Cura 2d4+2 PV.',
    observacoes: 'O baú também contém 12 peças de prata e um Lenço de Seda "G.A." (mistério narrativo).',
  },
  {
    id: 'pocao-cura',
    nome: 'Poção de Cura',
    tipo: 'consumivel',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 16 — Ático, baú escondido (mesmo baú da Espada Curta +1)',
    descricao: 'Frasco maior que a Menor, com líquido carmesim mais intenso. Guardada no baú de Rose no ático — junto à sua espada que nunca chegou às suas mãos.',
    mecanica: 'Ação: consumir. Cura 2d4+4 PV.',
    observacoes: 'Investigação CD 12 para encontrar o baú atrás da pilha de móveis velhos.',
  },
  {
    id: 'pocao-cura-maior',
    nome: 'Poção de Cura Maior',
    tipo: 'consumivel',
    raridade: 'incomum',
    capitulo: 'Vila de Barovia',
    localizacao: 'Recompensa do Padre Donavich — oferecida se Doru for curado',
    descricao: 'Poção de qualidade superior que Donavich guardava para emergências. Ele a oferece com profunda gratidão se os personagens conseguirem curar seu filho Doru da semi-transformação vampírica antes que seja tarde demais.',
    mecanica: 'Ação: consumir. Cura 4d4+4 PV.',
    observacoes: 'Para receber: ritual de purificação de Doru (3 frascos de água benta + exposição à luz solar por 1 minuto). Misticismo CD 13 para identificar que a transformação ainda é reversível. Donavich também abençoa uma arma (+1d4 sagrado por 1 sessão).',
  },
  {
    id: 'oleo-abencado',
    nome: 'Óleo Abençoado',
    tipo: 'consumivel',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 7 — Sala de Serviçais, baú trancado (Ladinagem CD 11 ou Força CD 15)',
    descricao: 'Frasco de vidro lacrado com cera vermelha, líquido dourado que brilha levemente. Deixado por um serviçal devoto que saiu da casa antes do colapso da família Durst — uma das poucas pessoas que sobreviveu por ter ido embora a tempo.',
    mecanica: 'Ação: ungir arma. +1d4 dano sagrado por 1 minuto e conta como mágica contra mortos-vivos. Ou arremessar como projétil (ação de ataque): Reflexos CD 10, acerto causa 2d6 sagrado direto em mortos-vivos.',
    observacoes: 'Excelente recurso para o combate com a Sombra na câmara ritual — onde armas não-mágicas são ineficazes. O baú também contém 10 peças de prata.',
  },
  {
    id: 'agua-benta',
    nome: 'Água Benta',
    tipo: 'consumivel',
    raridade: 'comum',
    capitulo: 'Múltiplos Locais',
    localizacao: 'Comprável: Padre Donavich (Vila de Barovia) ou Vistani (Campo de Tser Pool, ≈5 PO/frasco)',
    descricao: 'Água consagrada por sacerdote devoto. Em Barovia, tem propriedades reais — não apenas simbólicas — devido à presença de forças sombrias genuínas que reagem ao sagrado.',
    mecanica: 'Ação de ataque (arremesso, alcance 9m): 2d6 dano sagrado contra mortos-vivos (sem teste de resistência). Ritual de cura de Doru: 3 frascos + luz solar por 1 minuto. Consagrar altar (Religião/Misticismo CD 16): destrói todos mortos-vivos na masmorra imediatamente.',
    observacoes: 'Para curar Doru, os personagens têm 1 frasco da sala de serviçais (Área 7). Os outros dois: Padre Donavich ou Vistani. Total 3 frascos necessários para o ritual.',
  },
  // ── DOCUMENTOS ────────────────────────────────────────────
  {
    id: 'diario-elisabeth',
    nome: 'Diário de Elisabeth Durst',
    tipo: 'documento',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 6 — Escritório, compartimento secreto sob gaveta (Investigação CD 14)',
    descricao: 'Livro pequeno encadernado em couro preto. Revela a progressão psicológica de Elisabeth — de mãe normal para cúmplice relutante de sacrifícios. As entradas finais revelam o sacrifício do bebê Walter e o horror de Elisabeth com o que a família se tornou.',
    mecanica: 'Item narrativo. Confirma que Walter foi sacrificado ("o rito exigiu mais"). Revela que o culto Durst servia ativamente a Strahd com oferendas de sangue. Leitura em voz alta é momento dramático poderoso.',
    observacoes: 'Fragmentos para ler: "Gustav me prometeu que as crianças nunca saberiam..." / "Walter não sobreviveu ao rito. Gustav diz que foi necessário..." / "A culpa foi sua." O compartimento também contém 50 PO.',
  },
  {
    id: 'diario-rose',
    nome: 'Diário de Rose Durst',
    tipo: 'documento',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 11 — Quarto de Rose e Thorn, embaixo da cama de Rose (Investigação CD 10)',
    descricao: 'Diário pequeno com capa de couro cor-de-rosa desbotado. Caligrafia infantil mas aplicada. As últimas entradas documentam os dias em que Rose tentava ser corajosa para Thorn enquanto os pais não voltavam do porão.',
    mecanica: 'Item narrativo. Máximo impacto emocional se lido em voz alta enquanto Rose e Thorn estão presentes. Pode aprofundar a empatia dos jogadores com os fantasmas das crianças.',
    observacoes: 'Última entrada: "A casa faz barulhos à noite. Não saímos mais dos quartos." — Depois disso, páginas em branco. Se lido para os fantasmas, Rose fica imóvel e Thorn vai para a janela. Nenhuma das duas fala.',
  },
  {
    id: 'diario-van-richten',
    nome: 'Diário de Van Richten',
    tipo: 'documento',
    raridade: 'incomum',
    capitulo: 'Torre de Van Richten',
    localizacao: '3º andar da Torre de Van Richten — baú com tranca de prata',
    descricao: 'Décadas de pesquisa de Rudolph Van Richten sobre monstros de Barovia, com foco em vampiros. Inclui táticas, fraquezas conhecidas, comportamentos de Strahd especificamente, e notas pessoais sobre tentativas fracassadas de derrotá-lo.',
    mecanica: '+5 em testes de Misticismo relacionados a mortos-vivos por 1 semana (1 sessão de leitura). Informação chave: "Strahd adapta táticas em tempo real. Nunca repita uma abordagem que falhou — ele aprende."',
    observacoes: 'Van Richten pode oferecer o diário voluntariamente se os personagens ganharem sua confiança (ele está na torre disfarçado como "Alanik Ray"). Intuição CD 13 para perceber que "Alanik" sabe coisas demais para um vendedor de ervas.',
  },
  {
    id: 'tomo-abissal',
    nome: 'Tomo Abissal Disfarçado',
    tipo: 'documento',
    raridade: 'incomum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 10 — Biblioteca, segunda prateleira (Misticismo CD 15 para detectar aura)',
    descricao: 'Volume com capa dizendo "Histórias Populares de Barovia", mas as páginas estão escritas em Abissal. Usa magia de dissimulação para esconder o conteúdo. As páginas têm marcas de uso — alguém na casa Durst praticava esses rituais ativamente.',
    mecanica: 'Contém três rituais de convocação menor (espíritos subservientes, sombras vinculadas, ecos de mortos). Requer leitura em Abissal. Valor de venda: 50-100 PO para mago ou estudioso de ocultismo.',
    observacoes: 'Misticismo CD 15 para detectar a aura de dissimulação. Prova que os Durst não apenas estudavam magia sombria — a praticavam. Personagens sem Abissal podem levar o tomo e procurar um tradutor em Valaki.',
  },
  // ── TESOUROS ──────────────────────────────────────────────
  {
    id: 'brincos-rubi',
    nome: 'Brincos de Rubi',
    tipo: 'tesouro',
    raridade: 'incomum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 14 — Quarto Principal, caixa de joias na escrivaninha',
    descricao: 'Par de brincos de ouro com rubis engastados. Parte da coleção de joias de Elisabeth Durst — de qualidade aristocrática. Guardados na escrivaninha junto ao Anel de Signatura dos Durst.',
    mecanica: 'Valor: 100 PO o par. Sem efeito mágico.',
    observacoes: 'Os itens estão na escrivaninha — não nos corpos. Tentar retirar joias dos corpos mumificados os anima como Zumbis (ND 1 cada).',
  },
  {
    id: 'medalhao-walter',
    nome: 'Medalhão de Walter Durst',
    tipo: 'tesouro',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 12 — Berçário, escondido sob a manta no berço (Investigação CD 13)',
    descricao: 'Medalhão de prata em corrente fina. Verso gravado: "Walter — Filho Predileto. Que descanse no amor eterno dos Durst." Data de mais de dois séculos. Pertencia ao bebê Walter — o filho que os Durst sacrificaram no ritual. A preservação mágica do berçário também o conservou.',
    mecanica: 'Valor: 25 PO. MALDITO: Portador que dorme com o medalhão faz Vontade CD 13. Na falha: pesadelos — acorda sem benefício de descanso longo e com –1 em todos os testes até o próximo descanso.',
    observacoes: 'Poderoso momento narrativo se Rose e Thorn estiverem presentes e os personagens concluírem em voz alta que Walter foi sacrificado. Rose: "Não sabíamos." A maldição some se o medalhão for descartado ou consagrado com Água Benta.',
  },
  {
    id: 'lenco-seda',
    nome: 'Lenço de Seda "G.A."',
    tipo: 'tesouro',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 9 — Quarto de Hóspedes, baú no pé da cama',
    descricao: 'Lenço de seda branca com iniciais bordadas em fio azul: "G.A." Pertencia a um hóspede dos Durst — alguém que visitou a mansão e não voltou para buscá-lo, ou não teve chance de fazê-lo.',
    mecanica: 'Sem efeito mágico. Valor: 5 PO (seda de qualidade). Mistério narrativo — as iniciais "G.A." não são explicadas na campanha oficial.',
    observacoes: 'O Mestre pode expandir: um parente que investigou os Durst e desapareceu, um servo que foi embora, ou um aliado de Strahd. Uma subquestão opcional interessante para grupos curiosos.',
  },
]
