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
        conteudo: `As crianças que os personagens encontram fora da casa são **ilusões criadas pela própria Casa da Morte** — não os fantasmas reais. Elas parecem de carne e osso, mas desaparecem se forem atacadas ou forçadas a entrar na casa. Seu propósito é atrair os aventureiros para dentro.

Os **fantasmas reais de Rose e Thorn Durst** ficam no sótão da casa (Área 20 — Quarto das Crianças). Ao contrário das ilusões externas, os fantasmas reais **sabem que estão mortos**. Morreram de fome quando seus pais insanos os trancaram no sótão e se esqueceram deles.

**Rose (Rosavalda Durst)**, 10 anos: A mais velha e protetora. É ela quem fala mais. Faz perguntas diretas e observa os aventureiros com atenção.

**Thorn (Thornboldt Durst)**, 7 anos: O mais tímido. Segura a mão da irmã. Se os aventureiros se mostrarem amigáveis, ele relaxa um pouco e pode revelar detalhes sobre a casa.

**O que as ilusões externas sabem (mas não contam facilmente):**
- Há "um monstro" no porão fazendo "uivos terríveis" (na verdade os gritos das vítimas do culto)
- Seus pais mantêm o monstro preso no porão
- Há um bebê (Walter) no berçário do terceiro andar (falso — as crianças acreditam nisso, mas Walter já morreu)

**O que as ilusões NÃO sabem:**
- Que são ilusões criadas pela casa
- Que seus pais eram líderes de um culto dedicado a Strahd
- Que Walter morreu como sacrifício do culto

**Mecânica das ilusões:** Desaparecem se forem atacadas ou forçadas a entrar na casa. Personagens com Misticismo CD 14 que as inspecionem com cuidado notam que não projetam sombra corretamente e que o vento não mexe seus cabelos.

**Os fantasmas reais (Área 20):** São Pequenos, Leais e Bons. Têm 35 PV cada. Não têm a habilidade Aspecto Horripilante. Falam Comum. ND 3. Sabem que estão mortos e que morreram de fome trancados. Se perguntados sobre como chegar ao porão, Rose aponta para a casa de bonecas: "Há uma porta secreta no sótão." Temem ser abandonados — se personagens tentarem sair, tentam possuí-los.`
      }
    ]
  },
  {
    id: 'casa-da-morte',
    titulo: 'Casa da Morte',
    nivel: 'Nível 3',
    descricao: 'A Casa da Morte é o ponto de entrada na campanha. Originalmente projetada para os níveis 1-2, esta versão foi ajustada para personagens de nível 3 em Tormenta20. A casa tem 4 andares + porão + masmorra. O objetivo é atrair os personagens para dentro e usá-los como sacrifício.',
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
SE TENTAREM RASTREAR A ORIGEM: Sobrevivência CD 12 para seguir o rastro até a Suíte Master (Área 12) no segundo andar — mas o quarto está vazio, empoeirado. Nenhum corpo. O que quer que tenha sangrado aqui desapareceu há muito tempo.
NA FALHA: O personagem não nota nada além do chão sujo e empoeirado do hall.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'andar-terreo',
        titulo: 'Áreas 3-7: Andar Térreo',
        tipo: 'exploration',
        conteudo: `**Área 3 — Covil dos Lobos**
Sala forrada de painéis de carvalho no estilo de um recanto de caçador. Uma cabeça de veado montada acima da lareira, três lobos empalhados posicionados nos cantos. Tapetes de pele de lobo cobrem o chão. Duas poltronas acolchoadas ladeiam uma mesa de carvalho com um barril de vinho e dois cálices esculpidos. Dois armários: o do leste trancado (Ladinagem CD 15 — guarda bestas e virotes); o do norte destrancado com baralho de cartas e copos de vinho.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 25 — O Alçapão do Covil (ROTA DE RETORNO — NOTA DO MESTRE)

Este alçapão existe no canto sudoeste do assoalho. A casa o oculta com magia — CD 25 é intencional e praticamente intransponível descendo. Os personagens só o descobrem chegando de baixo (Área 32): empurrando de dentro, o alçapão abre facilmente. É a rota de fuga, não de entrada.

O MESTRE DIZ (só se passar na CD 25 descendo): "No canto sudoeste do assoalho, sua mão encontra uma tábua que não assenta corretamente. Com dificuldade extrema, você identifica um anel de ferro embutido rente à madeira — quase invisível, como se a própria casa não quisesse que você o visse."
NA FALHA: O personagem não encontra nada. A casa esconde bem o que não quer ser encontrado.
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
INVESTIGAÇÃO CD 10 — O Aparador (Criado-Mudo)

O MESTRE DIZ: "Na parede sul da cozinha há um painel de madeira. Ao examiná-lo, você encontra um aparador — um sistema de polias com uma bandeja de madeira suspensa por cordas. Há dois botões ao lado: um etiquetado com rabiscos desgastados que parecem dizer 'Quarto dos Serviçais', o outro 'Suíte Principal'. Um mecanismo de serviço para passar comida e itens entre os andares sem usar as escadas principais."

SE TESTAREM O APARADOR: A bandeja sobe e desce com um rangido enferrujado. Cabe uma pessoa pequena, ou uma criatura Médio agachada com Acrobacia CD 12 (falha = preso a meio caminho, requer Atletismo CD 12 para sair). Conecta a Área 7A (quarto dos serviçais) e Área 12A (suíte master).
SE PERGUNTAREM SE FAZ BARULHO: "Faz. Bastante. Qualquer criatura nos andares superiores com Percepção CD 10 ouve o rangido das polias."
NA FALHA: O personagem não nota o painel do aparador entre o caos da cozinha.
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

**Área 8 — Biblioteca (Escritório de Gustav Durst)**
Uma escrivaninha de mogno requintado e uma cadeira de encosto alto estão entre a entrada e a lareira. Estantes do chão ao teto alinham a parede sul. A gaveta da mesa guarda uma chave de ferro que destranca a Área 20 (Quarto das Crianças). Cortinas de veludo vermelho cobrem as janelas. Uma imagem emoldurada de um moinho de vento empoleirado sobre um penhasco rochoso está acima da lareira.

NOTA DO MESTRE: A biblioteca era onde Gustav passava suas noites. Esta seção usa os recursos investigativos da Biblioteca (Área 8 do livro) para contar a história dos Durst.

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

**Área 7 — Sala de Serviçais (Quartos dos Serviçais)**
Um quarto não decorado (Área 7A) contém um par de camas com colchões enchidos de palha. No pé de cada cama está um armário de calçados vazio. Uniformes bem limpos de empregados estão pendurados nos ganchos no armário adjacente (Área 7B).

CRIADO-MUDO: No canto da parede ocidental há um criado-mudo com um botão na parede ao lado. Pressionando o botão toca o sino minúsculo na cozinha (Área 4). No botão está um frasco pequeno de Água Benta (usado para curar Doru mais adiante — ver missão da Igreja de Barovia).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'segundo-andar',
        titulo: 'Áreas 6-13: Segundo Andar',
        tipo: 'exploration',
        conteudo: `**Área 6 — Salão Superior (Segundo Andar)**
As lâmpadas a óleo estão fixadas nas paredes deste elegante salão. Pendurado acima da lareira está um retrato emoldurado da família Durst: Gustav e Elisabeth com seus dois filhos sorridentes, Rose e Thorn. Embalado nos braços do pai está um bebê envolto, que a mãe olha com um toque de desprezo. Armaduras em pé flanqueiam portas de madeira nas paredes leste e oeste. Cada armadura segura uma lança e tem um elmo com viseira em forma de cabeça de lobo.

SE OS PERSONAGENS EXAMINAM OS PAINÉIS DAS PAREDES (Percepção CD 12): "Os jovens esculpidos nas portas não estão dançando — estão lutando contra enxames de morcegos. A arte foi deliberadamente perturbadora."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 7 — Quarto dos Empregados**
Um quarto não decorado contém um par de camas com colchões enchidos de palha. No pé de cada cama está um armário de calçados vazio. Uniformes bem limpos de empregados estão pendurados nos ganchos no armário adjacente.

O criado-mudo no canto da parede ocidental tem um botão na parede ao lado. Pressionando o botão toca o sino minúsculo na cozinha (Área 4).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 8 — Biblioteca**
O mestre da casa costumava passar muitas horas aqui antes de sua descida à loucura.
Cortinas de veludo vermelho cobrem as janelas. Uma escrivaninha de mogno requintado e uma cadeira de encosto alto estão entre a entrada e a lareira. Estantes do chão ao teto alinhadas na parede sul. A gaveta da mesa está vazia, exceto por uma chave de ferro que destranca a porta para a Área 20 (Quarto das Crianças no sótão).

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
PERCEPÇÃO CD 13 — A Porta Secreta da Biblioteca

O MESTRE DIZ: "Ao percorrer as prateleiras, sua atenção é fisgada por um volume de lombada vermelha que destoa dos demais — a cor viva demais, o couro em bom estado enquanto os vizinhos estão gastos. Você puxa o livro. Ele não sai da prateleira — mas gira, como uma alavanca. Com um clique abafado, uma seção inteira da estante se abre como porta, revelando um corredor escuro além."

NA FALHA CD 13: O personagem não nota o livro de lombada vermelha entre os outros volumes.
NOTA DO MESTRE: Esta é a única rota para a Área 9 (Sala Secreta). A Área 21 (Escada Secreta para a masmorra) só aparece DEPOIS que os personagens encontram a carta de Strahd na Área 9 — OU veem a réplica da porta na casa de bonecas (Área 20).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 9 — Sala Secreta (atrás da Biblioteca)**
Um corredor curto atrás da estante leva a uma pequena câmara sem janelas. Uma vela de cera na parede ilumina fracamente. No centro, uma escrivaninha com uma carta dobrada, lacrada com cera vermelha com o brasão de Von Zarovich. Ao lado, um baú de madeira reforçado com ferro, trancado (Ladinagem CD 15 ou Força CD 20 para forçar).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A CARTA DE STRAHD (leia em voz alta — ATIVA a Área 21)

"'À Família Durst — Servos Devotos do Conde Von Zarovich.

Vosso culto me agrada. Vossas oferendas foram recebidas. Em recompensa, vos concedo a proteção que pedistes — por enquanto. Continuai o trabalho. Alimentai a câmara abaixo de vossa casa com vidas, como acordado. O Ancestral não descansa sem sangue.

Sabeis o que é exigido. Não me decepcioneis.

Von Zarovich'

A letra é elegante, precisa, absolutamente desprovida de emoção. É uma carta de negócios. Para Strahd, os Durst eram ferramentas — não servos honrados."

SE OS PERSONAGENS LEREM A CARTA EM VOZ ALTA: Os personagens em silêncio por um momento. Então, na parede do corredor atrás deles, percebem que uma seção da madeira revela um contorno — a Área 21 (Escada Secreta) manifesta-se.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TESOURO NO BAÚ: 1.000 moedas de prata, 8 gemas de quartzo lapidadas (12 PO cada), 2 pergaminhos de magia (Bênção e Proteção Contra Venenos), um Símbolo Sagrado de prata simples (25 PO).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 10 — Conservatório**
Cortinas finas cobrem as janelas deste salão elegantemente decorado, com um lustre de bronze pendurado no teto. Cadeiras estofadas se alinham às paredes, e tapeçarias em vitrais retratam belos homens, mulheres e crianças cantando e tocando instrumentos. Um cravo com um banco repousa no canto noroeste. Perto da lareira está uma grande harpa permanente. Estatuetas de alabastro de dançarinos bem vestidos adornam a lareira — ao inspecionar, vê-se que várias são esculturas de esqueletos bem vestidos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 11 — Varanda do Segundo Andar**
Personagens que subam a escadaria de mármore vermelho até sua altura total chegam a uma varanda empoeirada com uma **armadura de placas negras** em pé contra uma parede, envolta em teias de aranha. Esta **armadura animada** ataca assim que recebe dano ou um personagem se aproxima a 1,5 metros dela. Luta até ser destruída.

NOTA DO MESTRE: A armadura animada tem ND 1 (T20): PV 33, Defesa 18, Ataque Soco +4 (1d6+2 impacto). Imune a veneno e doenças. Vulnerável a dano de trovão (dano dobrado).

Portas esculpidas com jovens dançantes — Percepção CD 12 revela que não estão dançando, mas lutando contra enxames de morcegos.

PORTA SECRETA: Uma porta secreta na parede oeste pode ser encontrada com Percepção CD 15. Abre facilmente para revelar uma escada de madeira cheia de teias de aranha que leva até o sótão.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 12 — Suíte Master (Quarto Principal dos Durst)**
Portas duplas com painéis de vitral (moinhos de vento). O quarto empoeirado tem cortinas cor de vinho, uma cama de dossel com cortinas bordadas e véus esfarrapados, guarda-roupas vazios, uma penteadeira com espelho e caixa de joias, e uma cadeira acolchoada. Tapete de pele de tigre em decomposição. Retrato coberto de poeira de Gustav e Elisabeth acima da lareira.

CRIADO-MUDO: Um criado-mudo no canto da parede ocidental tem um botão ao lado — toca o sino na cozinha (Área 4).

TESOURO — CAIXA DE JOIAS (na penteadeira): Caixa de prata com filigrana de ouro (75 PO). Contém três anéis de ouro (25 PO cada) e um colar de platina fina com pingente de topázio (750 PO).

NOTA DO MESTRE: Os corpos de Gustav e Elisabeth Durst NÃO estão aqui. Eles são Lívidos (wights) escondidos na masmorra (Área 34), onde protegem o baú com tesouros dos cultistas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 13 — Banheiro**
Uma banheira de madeira com pés de garras, um pequeno fogão de ferro com uma chaleira, e um barril sob uma torneira na parede leste. Uma cisterna no telhado coletava água da chuva, mas o encanamento já não funciona.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**TERCEIRO ANDAR — Áreas 14-16 e Sótão**

**Área 14 — Depósito (3º Andar)**
Uma cama delgada, um criado-mudo, um fogão de ferro pequeno, uma escrivaninha com tamborete, um guarda-roupa vazio, e uma cadeira de balanço. Uma boneca sorridente em vestido amarelo senta-se no parapeito da janela ao norte, coberta de teias de aranha como um véu de casamento.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 15 — Suíte da Babá da Família**
O quarto pertencia à babá da família. O dono da casa e a babá tiveram um caso, que levou ao nascimento de um bebê natimorto chamado Walter. O culto matou a babá pouco depois.

A menos que os personagens já a derrotaram no Depósito (Área 17), o **espírito da babá** assombra o quarto como um espectro. O espectro se manifesta e ataca quando um personagem abre a porta para o berçário (área 15B). Assemelha-se a uma jovem aterrorizada e esquelética — não pode falar nem ser interpelada.

PORTA SECRETA (atrás do espelho de corpo inteiro): Percepção CD 15. Abre para uma escada de madeira com teias de aranha que leva até o sótão.

O berçário tem um berço coberto com uma mortalha negra. Quando os personagens desenrolam o sudário, veem um pacote firmemente embrulhado do tamanho de um bebê — mas não há nada dentro.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 16 — Sótão de Pedra**
Este salão vazio está cheio de poeira e teias de aranha.

PORTA BLOQUEADA: A porta da Área 20 é mantida fechada com um cadeado. Sua chave está na Biblioteca (Área 8), mas também pode ser contornada com ferramentas de ladrões e Ladinagem CD 15.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 17 — Quarto de Repouso (Sótão)**
Esta câmara empoeirada está cheia de móveis antigos (cadeiras, casacos, espelhos de corpo, manequins de vestir), todos cobertos em lençóis brancos empoeirados. Perto de um fogão de ferro, embaixo de um dos lençóis, está um baú de madeira destrancado contendo os **restos mortais da babá da família**, envoltos em um lençol esfarrapado manchado de sangue seco. Medicina CD 14: a mulher foi esfaqueada até a morte por múltiplas feridas de faca.

Se os personagens perturbam os restos, o espectro da babá aparece e ataca (a menos que já tenha sido derrotada na Área 15).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 18 — Depósito (Sótão)**
Prateleiras empoeiradas com lençóis, cobertores dobrados e barras velhas de sabão. Uma **vassoura animada** encostada na parede mais distante da entrada — ataca qualquer criatura que se aproxime a 1,5 metros dela (ND 1/4, PV 15, Defesa 11, Ataque Pancada +3, 1d4+1 impacto).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 19 — Quarto de Repouso Vazio (Sótão)**
Contém uma cama pequena, uma mesa de cabeceira, uma cadeira de balanço, um guarda-roupa vazio e um pequeno fogão de ferro.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 20 — Quarto das Crianças (Sótão) — PONTO CRÍTICO**
A porta está trancada por fora (chave na Área 8 / Biblioteca, ou Ladinagem CD 15).

Este quarto contém uma janela fechada por tijolos, duas camas empoeiradas dimensionadas para crianças, uma caixa de brinquedos com moinhos de vento pintados nos lados, e uma **casa de bonecas** que é réplica perfeita da mansão Durst. Deitados no chão: **dois pequenos esqueletos** vestindo roupas esfarrapadas — são Rose e Thorn. O esqueleto de Thorn ainda embala a boneca de pelúcia.

CASA DE BONECAS (Percepção CD 15): Revela todas as portas secretas da casa, incluindo uma no sótão que leva a uma escada em espiral (réplica da Área 21).

**ROSE E THORN — OS FANTASMAS REAIS:**
Se a casa de bonecas ou o baú for perturbado, os fantasmas de Rose e Thorn aparecem. Ao contrário das ilusões externas, eles **sabem que estão mortos**. Se perguntados como morreram: "Nossos pais nos trancaram aqui para nos proteger do monstro no porão, e se esqueceram de nós." Se perguntados como chegar ao porão, Rose aponta para a casa de bonecas.

As crianças temem o abandono. Se um ou mais personagens tentarem sair, tentam possuí-los:
- **Possuído por Rose:** fraqueza "Eu gosto de estar no comando e fico com raiva quando outros me dizem o que fazer."
- **Possuído por Thorn:** fraqueza "Tenho medo de tudo, inclusive minha própria sombra, e choro de desespero quando as coisas não vêm até mim."
- Um personagem possuído não deixará a Casa da Morte nem entrará na masmorra. Os fantasmas podem ser intimidados a sair (Intimidação CD 11, ação padrão).
- **A única forma de colocar os espíritos em descanso** é levar seus restos mortais (esqueletos) às suas criptas na masmorra (Áreas 23E e 23F). As crianças não sabem disso.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 21 — Escada Secreta (ACESSO À MASMORRA)**
A porta e o eixo secretos não existem até que a casa os revele, o que ocorre de uma de duas formas:
1. Os personagens encontram a carta de Strahd na sala secreta atrás da biblioteca (Área 9).
2. Os personagens encontram a réplica da porta secreta na casa de bonecas (Área 20).

Uma vez revelada, os personagens a encontram automaticamente ao procurar na parede (sem teste necessário). A escada desce 15 metros até a Área 22.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**NOTA DE MESTRE — Quarto de Rose e Thorn (como antes era descrito incorretamente):**
O strahd-data.ts anterior chamava de "Área 11 — Quarto de Rose e Thorn" o que na verdade é a Área 20 (Sótão). O quarto onde os personagens podem encontrar os diários e objetos pessoais das crianças fica no sótão, trancado. A busca por pistas sobre a família Durst deve concentrar-se nas áreas 6-8 do segundo andar e nos escritórios.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Quarto de Rose e Thorn — Itens de Narrativa**
Os seguintes itens existem no quarto das crianças (Área 20) e podem ser encontrados ao examinar:

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

**Área 15B — Berçário (dentro da Suíte da Babá)**
O berçário fica atrás de uma porta dentro do quarto da babá (Área 15A). O espectro da babá se manifesta e ataca quando um personagem abre esta porta.

O berçário contém um berço coberto com uma mortalha negra. Quando os personagens desenrolam o sudário, veem um pacote firmemente embrulhado do tamanho de um bebê deitado no berço. Quem desembrulhar o cobertor não encontra nada dentro — o berço está vazio.

SE ROSE E THORN ESTÃO AQUI: Rose para na entrada. Em voz muito baixa, quase para si mesma: "Walter dormia aqui. Ele chorava muito à noite. Mamãe dizia que era cólica." Thorn fica atrás dela, não entra no quarto.

SE PERGUNTAREM QUEM ERA WALTER: "A carta de Strahd na Sala Secreta (Área 9) menciona que Gustav 'gerou um filho natimorto'. Walter era o bebê da babá — e os Durst o usaram no ritual do culto. A cripta de Walter (Área 23B) na masmorra está vazia, assim como este berço."

REAÇÃO DE ROSE E THORN SE OS PERSONAGENS CONCLUÍREM ISSO EM VOZ ALTA: Rose olha para o berço por um longo momento. "Não sabíamos," ela diz, finalmente. "Não sabíamos o que papai e mamãe faziam."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
      },
      {
        id: 'terceiro-andar',
        titulo: 'Áreas 12-21: Segundo/Terceiro Andares e Sótão — Pontos Narrativos',
        tipo: 'exploration',
        conteudo: `NOTA DO MESTRE: As áreas numeradas (12-21) já foram descritas na seção anterior com a numeração correta do livro original. Esta seção contém os scripts narrativos detalhados para os pontos de maior impacto emocional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**QUARTO PRINCIPAL (Área 12) — Tesouro e Pistas**
O quarto dos Durst está empoeirado e cheio de teias de aranha. Os Durst NÃO estão aqui — seus corpos (como Lívidos) aguardam na masmorra (Área 34), onde protegem o baú com os tesouros do culto.

TESOURO DA PENTEADEIRA — Caixa de joias de prata com filigrana de ouro (75 PO), contendo três anéis de ouro (25 PO cada) e um colar de platina com pingente de topázio (750 PO). Esses itens apodrecem se retirados da casa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**SUÍTE DA BABÁ (Área 15) — Espectro**
O espectro da babá ataca ao abrir a porta do berçário. Não pode falar nem ser interpelada — é pura fúria residual. ND 1, PV 22, Defesa 12. Apenas armas mágicas ou sagradas a afetam. Toque Necrótico +4 (1d6+2 dano).

SE ROSE E THORN ESTIVEREM COM OS PERSONAGENS neste momento: elas param na entrada e não entram. Thorn sussurra para Rose: "Eu ouvia choro aqui à noite." Rose não responde.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**SÓTÃO — DEPÓSITO COM RESTOS DA BABÁ (Área 17)**
Os restos da babá revelam (Medicina CD 14): morte por múltiplas facadas. Perturbá-los invoca o espectro se ainda não foi derrotado.

SE PERGUNTAREM QUEM A MATOU: Pelas evidências nos diários e cartas, Elisabeth Durst descobriu o caso do marido com a babá. A babá foi morta pelo culto após o nascimento de Walter.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**SÓTÃO — QUARTO DAS CRIANÇAS (Área 20) — SCRIPT EMOCIONAL**

DESCRIÇÃO AO ENTRAR (Leia em Voz Alta):
"Quando a porta do quarto finalmente cede, o que vocês encontram é pior do que qualquer monstro que possam ter imaginado. Dois esqueletos pequenos jazem no meio do chão — crianças, pelas dimensões dos ossos, usando roupas que vocês reconhecem das figuras que encontraram lá fora. O menor dos esqueletos ainda abraça uma boneca de pelúcia. Entre as duas camas infantis e os brinquedos empilhados, a única coisa que ainda se mantém intacta é uma casa de bonecas — uma réplica perfeita desta mansão. Em detalhes assustadores."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INVESTIGAÇÃO CD 10 — O Diário de Rose

O MESTRE DIZ: "Embaixo dos restos da cama de Rose, entre os brinquedos empurrados para trás, você encontra um diário pequeno com uma capa de couro cor-de-rosa desbotado. A caligrafia é infantil mas aplicada. As entradas mais recentes:"

LEIA EM VOZ ALTA: "'Mamãe e Papai foram para o porão e não voltaram. Faz três dias. Thorn e eu batemos na porta mas ela não abre. Thorn está com medo. Eu também estou, mas não posso mostrar porque sou a mais velha.' — Entrada seguinte, caligrafia mais tremida: 'Tentamos jantar com o que tinha na cozinha. Estamos com fome. Onde estão mamãe e papai?'"

SE PERGUNTAREM SE HÁ MAIS: "As últimas páginas escritas têm apenas: 'A casa faz barulhos à noite. Não saímos mais dos quartos.' Depois disso, as páginas estão em branco."
NA FALHA: O personagem não encontra o diário entre os destroços.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**MASMORRA — QUARTO DOS LÍDERES DO CULTO (Área 34) — OS LÍVIDOS**
ATENÇÃO: Gustav e Elisabeth Durst estão aqui, como Lívidos (mortos-vivos com inteligência), escondidos nas cavidades atrás das paredes de terra. Eles explodem e atacam se alguém remove itens do baú neste quarto.

ESTATÍSTICAS DOS LÍVIDOS (adaptados para T20, ND 3 cada):
PV: 45 | Defesa: 14 | Iniciativa: +2 | Deslocamento: 9m
- Garra +4 (1d6+3 necrótico): o alvo faz Fortitude CD 13 ou tem seu PV máximo reduzido pelo dano necrótico causado.
- Imunes a veneno e doenças. Vulneráveis a dano sagrado.

TESOURO NO BAÚ (Área 34): Manto da Proteção, 4 Poções de Cura, Cota de Malha, Kit de Refeição, Frasco de Fogo Alquímico, Lanterna de Foco, Ferramentas de Ladrão, e um Livro de Magias (capa amarela) com: Armadura Arcana, Disfarçar, Identificação, Mísseis Mágicos, Proteção Contra o Bem e o Mal (1° círculo); Arma Mágica, Imobilizar Pessoa, Invisibilidade, Visão no Escuro (2° círculo).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**MASMORRA — SANTUÁRIO DO SENHOR NEGRO (Área 31) — AS SOMBRAS**
Uma estátua de madeira pintada retrata Strahd — um homem magro e pálido de capa preta, mão esquerda apoiada na cabeça de um lobo, mão direita segurando uma esfera de cristal cinza esfumaçado. O orbe vale 25 PO e pode ser usado como foco arcano (não é mágico).

Se os personagens tocarem a estátua ou tomarem a esfera: **5 Sombras** (espíritos de antigos cultistas) se formam ao redor e atacam. Perseguem quem fugir além dos limites da sala.

SOMBRAS (T20, ND 1/2 cada): PV 16, Defesa 12, Toque de Força de Vida +4 (1d6+2 necrótico, reduz FOR do alvo pelo dano — alvo morre se FOR chegar a 0). Imunes a armas não-mágicas. Vulneráveis a dano sagrado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**MASMORRA — CÂMARA DO RITUAL (Área 38) — O CLÍMAX**
Esta é a câmara final. Ver seção separada.`
      },
      {
        id: 'porcao-masmorra',
        titulo: 'Áreas 22-38: A Masmorra',
        tipo: 'combat',
        conteudo: `Esta é a parte mais perigosa da Casa da Morte. A masmorra abaixo do sótão (acessada pela Escada Secreta, Área 21) é onde o culto dos Durst realizava seus rituais. O OBJETIVO FINAL É ESCAPAR — não necessariamente matar tudo.

CARACTERÍSTICAS DA MASMORRA: Túneis de 1,2m de largura × 2,1m de altura, suportados por vigas de madeira. Quartos de 2,4m de altura. Sem luz — personagens devem trazer fontes de luz próprias. Pegadas humanas centenárias no chão de terra.

CANTO FANTASMAGÓRICO: A partir do momento em que chegam à masmorra, os personagens ouvem um canto misterioso ecoando por toda parte. Impossível localizar a origem até alcançar a Área 38. As palavras só se tornam audíveis na Área 38: "Ele é o Ancestral. Ele é a Terra."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 22 — Acesso ao Nível de Masmorra**
A escada em espiral de madeira do sótão termina aqui. Um túnel estreito se estende para o sul antes de se ramificar para leste e oeste.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 23 — Criptas Familiares**
Várias criptas escavadas na terra, cada uma selada com uma laje de pedra (Atletismo CD 15 para remover; vantagem com pé-de-cabra).

- **23A — Cripta Vazia:** Laje em branco encostada na parede. Cripta vazia.
- **23B — Cripta de Walter:** Laje com "Walter Durst". Cripta vazia.
- **23C — Cripta de Gustav:** Caixão vazio em esquife de pedra.
- **23D — Cripta de Elisabeth:** Caixão vazio. Um enxame de centopeias irrompe da parede traseira se o caixão for perturbado.
- **23E — Cripta de Rose:** Caixão vazio. Se os restos de Rose (da Área 20) forem colocados aqui, o fantasma dela encontra paz.
- **23F — Cripta de Thorn:** Caixão vazio. Se os restos de Thorn (da Área 20) forem colocados aqui, o fantasma dele encontra paz.

NOTA DO MESTRE: Colocar os restos de Rose e Thorn em suas criptas é a única forma de finalmente libertar os espíritos das crianças. Cada personagem que ajudar a fazer isso ganha um ponto de Inspiração.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 24 — Quarto dos Iniciados no Culto**
Uma mesa de madeira e quatro cadeiras na extremidade leste. A oeste, quatro alcovas com paletes de palha mofadas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 25 — Poço e Quartos dos Cultistas**
Um poço de 1,2m de diâmetro desce 9m para uma cisterna com água. Um balde de madeira pende de mecanismo de corda-e-polia.

Cinco quartos laterais dos cultistas veteranos, cada um com cama e baú trancado (Ladinagem CD 15). TESOURO DOS BAÚS:
- **25A:** 11 PO e 60 PP em bolsa de pele humana.
- **25B:** Três ágatas musgo (10 PO cada) em tecido negro dobrado.
- **25C:** Tapa-olho de couro preto com carmelita costurada (50 PO).
- **25D:** Escova de cabelo de marfim com cerdas de prata (25 PO).
- **25E:** Espada prateada (110 PO).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 26 — Poço de Espinhos Oculto**
O canto fica mais alto neste túnel. Percepção CD 15: ausência de pegadas no chão. Busca por armadilhas: um poço de 1,5m × 3m de profundidade escondido sob tábuas apodrecidas cobertas de sujeira. O primeiro personagem a pisar cai: 1d6 impacto + 2d10 perfurante (espinhos no fundo).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 27 — Salão de Jantar dos Cultistas**
Uma simples mesa de madeira com longos bancos. Ossos humanoides mofados no chão — os restos dos vis banquetes do culto. No meio da parede sul há uma alcova escurecida (Área 28). Personagens que se aproximam a 1,5m da alcova provocam a criatura que se esconde lá.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 28 — Despensa com Grick**
Esta alcova abriga um **Grick** que desliza para atacar o primeiro personagem que entrar em seu alcance de 1,5m. PP abaixo de 12 = surpresa. A alcova está vazia (além do Grick).

GRICK (T20, ND 2): PV 27, Defesa 14, Iniciativa +2. Tentáculos +4 (2d6+2 perfurante). Resistência a armas não-mágicas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 29 — Encontrando os Ghouls (4 Ghouls)**
O canto é notavelmente mais alto ao norte. Quando um ou mais personagens atingem o ponto médio da interseção de quatro vias, **quatro ghouls** (ex-cultistas) se levantam do chão e atacam. Lutam até ser destruídos.

DESCRIÇÃO: "Do chão de terra, figuras erguem de onde você imaginaria ver apenas terra. Quatro formas — humanas na silhueta mas erradas no movimento, nos dentes, no olhar vazio. Cultistas que se tornaram o que adoravam."

ESTATÍSTICAS DOS GHOULS (T20, ajustados para Nível 3):
- PV: 40 cada | Defesa: 13 | Iniciativa: +2
- Garra +4 (1d6+2 cortante): alvo faz Fortitude CD 12 ou fica Paralisado por 1 round
- Mordida +4 (2d6+2 perfurante): APENAS contra Paralisado ou Incapacitado

DICA DE MESTRE: Quatro ghouls são ameaça séria para nível 3. Os ghouls tentarão paralisar primeiro, morder depois. Se o grupo tiver personagens paralisados, o combo pode ser letal. Sugira tacitamente retirada se mais de dois personagens estiverem paralisados ao mesmo tempo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 30 — Escadas para Baixo**
Escada de 6m que leva ao segundo nível subterrâneo. O canto se origina claramente de baixo. Personagens que descerem chegam à Área 35 (Relicário).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 31 — O Santuário do Senhor Negro**
Esqueletos mofados pendem de grilhões enferrujados nas paredes (decoração inofensiva). No centro, uma grande alcova contém uma estátua de madeira pintada de Strahd — homem magro e pálido com capa preta, mão esquerda apoiada na cabeça de um lobo, mão direita segurando uma **esfera de cristal cinza esfumaçado** (25 PO, foco arcano não-mágico).

Se os personagens tocarem a estátua ou tomarem a esfera: **5 Sombras** emergem e atacam (ver estatísticas na seção do Terceiro Andar). As Sombras perseguem além dos limites da sala.

PORTA ESCONDIDA (Percepção CD 10): Porta de madeira apodrecida sob camada de argila na parede leste. Abre para escadaria de pedra que sobe 3m até a Área 32.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 32 — Alçapão Oculto**
A escadaria termina em uma superfície com teto de 1,8m. Um **alçapão de madeira** está fechado aparafusado por este lado — empurrando revela o Covil dos Lobos (Área 3) acima. Uma vez aberto, permanece disponível como entrada/saída do calabouço.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 33 — Covil dos Líderes do Culto (Antessala)**
ATENÇÃO: A porta no canto sudoeste é um **Mímico** disfarçado. Qualquer criatura que toque a porta fica agarrada (Atletismo CD 14 para escapar). O Mímico ataca se agarrar alguém ou receber dano.

MÍMICO (T20, ND 2): PV 58, Defesa 12. Pseudópodo +5 (1d8+3 impacto + agarrado). Mordida +5 (1d8+3 perfurante). Imune a ácido e a condições de sono.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 34 — Quarto dos Líderes do Culto**
Uma grande cama de madeira com colchão de pena, guarda-roupa com vestes antigas, castiçais de ferro, uma caixa com 30 tochas e 15 velas, e um baú desbloqueado no pé da cama com tesouros.

**ENCONTRO — OS LÍVIDOS: Gustav e Elisabeth Durst**
Os lívidos estão escondidos nas cavidades atrás das paredes de terra. Explodem e atacam se qualquer item for removido do baú.

ESTATÍSTICAS DOS LÍVIDOS (T20, ND 3 cada):
PV: 45 | Defesa: 14 | Iniciativa: +2
- Garra Necrótica +4 (1d6+3 necrótico): Fortitude CD 13 ou PV máx reduzido pelo dano necrótico causado
- Imunes a veneno e doenças. Vulneráveis a dano sagrado.

TESOURO DO BAÚ: Manto da Proteção, 4 Poções de Cura, Cota de Malha, Kit de Refeição, Frasco de Fogo Alquímico, Lanterna de Foco, Ferramentas de Ladrão, e um **Livro de Magias** (capa amarela) com: 1°: Armadura Arcana, Disfarçar, Identificação, Mísseis Mágicos, Proteção Contra o Bem e o Mal; 2°: Arma Mágica, Imobilizar Pessoa, Invisibilidade, Visão no Escuro.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 35 — Relicário**
Treze nichos nas paredes com "relíquias" do culto (itens sem valor mágico, apenas sinistros): mão mumificada de goblin, faca esculpida em osso humano, punhal com crânio de rato no pomo, orbe de olho de nótico envernizado (20cm), aspergillum de osso, capa de pele de ghoul, sapo dissecado amarrado a uma vara (pode ser confundido com varinha de metamorfose), saco de guano de morcego, dedo de bruxa, estatueta de múmia, pingente de ferro com rosto de diabo, cabeça murcha de halfling, cofre com língua seca de lobo atroz.

O túnel ao sul desce em ângulo de 20° terminando numa ponte levadiça enferrujada (Área 37).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 36 — Prisão**
Grilhões enferrujados nas paredes de alcovas. Os prisioneiros já se foram — seus ossos estão no Salão de Jantar (Área 27).

PORTA SECRETA (Percepção CD 15): Puxa para revelar a Área 38 além.

TESOURO: Num esqueleto na parede (membro do culto que questionou a devoção cega), há um anel de ouro (25 PO) no dedo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Área 37 — Grade de Ferro (Portcullis)**
Uma grade de ferro enferrujada bloqueia completamente o túnel. Pode ser levantada com Atletismo CD 20 (Força), ou operada pela roda de madeira embutida na parede leste da Área 38. O chão ao redor está submerso em 60cm de água turva.`
      },
      {
        id: 'encontro-final',
        titulo: 'Área 38: Câmara do Ritual — O Clímax da Casa da Morte',
        tipo: 'combat',
        conteudo: `**Área 38 — Câmara do Ritual (CLÍMAX)**
Acessada pela Área 36 (porta secreta, Percepção CD 15) ou pela Área 37 (ponte levadiça). Esta é a câmara submersa.

DESCRIÇÃO (LEIA EM VOZ ALTA): "O canto cessa assim que vocês chegam nesta câmara de aproximadamente 12 metros × 12 metros. Paredes lisas de alvenaria com acústica excelente. Pilares de pedra sem cor suportam o teto de 4,8 metros. Uma abertura na parede oeste leva a uma caverna escura cheia de lixo. Água turva — 60 centímetros de profundidade — cobre a maior parte do chão. Escadas conduzem a bordas de pedra secas que abraçam as paredes. No meio da sala, mais escadas elevam-se para um estrado octogonal acima da água. Correntes enferrujadas com grilhões pendem do teto diretamente acima de um altar de pedra montado no estrado — esculpido com representações horríveis de carniçais agarrando, manchado de sangue seco. Uma roda de madeira está embutida na parede leste (opera a ponte levadiça da Área 37)."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LORGHOTH, O DECADENTE — A AMEAÇA OCULTA

Na abertura da parede oeste há uma alcova naturalmente formada. A pilha semi-submersa de refugo que a preenche é um **Arbusto Errante** que os cultistas apelidaram de Lorghoth, o Decadente. Ele está dormindo. Desperta se atacado ou se os personagens convocarem os cultistas e se recusarem a completar o ritual.

Natureza CD 15: um personagem de pé ao lado do montículo discerne a verdadeira natureza da criatura.

LORGHOTH (Arbusto Errante, T20, ND 4 ajustado para Nível 3): PV 80, Defesa 13, Iniciativa +1. Deslocamento: 9m (pode se espremer em túneis). Ramadas +6 (2d6+4 impacto). Espinhos (reação, 1d4+2 perfurante quando atingido em corpo-a-corpo). Regeneração: recupera 10 PV por turno se tiver pelo menos 1 PV (não funciona contra fogo ou ácido). Persegue personagens além da câmara, mas não deixa o calabouço.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"UM DEVE MORRER!"

Se qualquer personagem sobe ao topo do estrado:

LEIA EM VOZ ALTA: "O canto se ergue mais uma vez enquanto treze aparições escuras aparecem nas bordas que dominam a sala. Cada uma se assemelha a uma figura de túnica preta segurando uma tocha — mas o fogo da tocha é negro e parece atrair luz para ele. Onde você esperaria ver rostos só há vazio. 'Um deve morrer!', cantam, repetidamente. 'Um deve morrer! Um deve morrer!'"

AS APARIÇÕES SÃO INOFENSIVAS — não podem ser feridas, transformadas ou dissipadas.

MECÂNICA — OS PERSONAGENS TÊM DUAS ESCOLHAS:

**OPÇÃO 1 — APAZIGUAR O CULTO (Sacrificar uma criatura):**
Religião ou Intuição CD 11 para entender o que é exigido. Uma criatura deve morrer no altar. As aparições não se importam com o tipo de criatura, e não são enganadas por ilusões.
- Se o sacrifício for feito: as aparições desaparecem. A Casa da Morte não impede os personagens de sair. O canto "Ele é o Ancestral. Ele é a Terra" ecoa novamente. Strahd está ciente do sacrifício.
- AO SAIR: os personagens avançam para o Nível 4.

**OPÇÃO 2 — NEGAR O CULTO (Recusar o sacrifício):**
Se os personagens deixam o estrado sem fazer o sacrifício, o canto muda: "Lorghoth, o Decadente, nós o despertamos, levanta-te!" O Arbusto Errante desperta e ataca. Se os personagens fugirem para o andar superior, a Casa os ataca (ver seção da Fuga). Se Lorghoth for destruído, o canto para e as aparições desaparecem para sempre.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POSSESSÃO DE ROSE E THORN

NOTA: Os fantasmas de Rose e Thorn só tentam possuir personagens que tentem sair da casa antes de resolver a câmara do ritual. A possessão é ativada pelo medo do abandono das crianças, não pelo ritual em si.

Se os personagens possuídos pelos fantasmas chegarem à câmara do ritual — os fantasmas "acordam" para a realidade do que seus pais faziam, o que pode provocar uma crise emocional nos jogadores que os controlam. Role Intimidação CD 11 para os fantasmas saírem voluntariamente por choque — eles não queriam participar do que os pais faziam.`,
        recompensas: [
          'Tesouros dos baús dos cultistas (Área 25A-E e 34)',
          'Livro de Magias dos líderes do culto (Área 34)',
          'Anel de ouro da prisão (Área 36, 25 PO)',
          'Os personagens avançam para o Nível 4 ao sair da casa',
        ],
      },
      {
        id: 'fuga',
        titulo: 'Conclusão — A Casa Ataca ou Libera',
        tipo: 'combat',
        conteudo: `Há dois desfechos possíveis, dependendo do que aconteceu na Área 38:

---

## Se o Culto Foi Apaziguado (Sacrifício foi feito)

A Casa da Morte não tem vontade maligna contra um grupo disposto a sacrificar uma vida para apaziguar o culto. Uma vez feito o sacrifício, os personagens são livres para ir. **Ao sair da casa, os personagens avançam para o Nível 4.**

---

## Se o Culto Foi Negado (Personagens recusaram o sacrifício)

Se os personagens negaram o sacrifício ao culto e destruíram o Arbusto Errante (ou escaparam dele), **a Casa da Morte os ataca enquanto tentam sair**. Ao retornarem aos andares superiores, role iniciativa — os personagens descobrem várias mudanças arquitetônicas:

**Janelas Bloqueadas:** Todas as janelas têm tijolos agora. As paredes externas são impermeáveis a ataques de arma e magias de dano — não há como sair por ali.

**Portas Substituídas por Lâminas de Foice:** Todas as portas desapareceram, substituídas por lâminas de foice oscilantes. Para passar por uma porta:
- **Acrobacia CD 15** (Destreza): Passar ileso
- **Inteligência CD 15**: Um personagem que gaste 1 minuto observando as lâminas pode tentar aproveitar uma brecha momentânea no movimento repetitivo
- **Falha em qualquer teste:** O personagem sofre **2d10 de dano cortante** mas consegue passar mesmo assim
- As foices não podem ser desarmadas

**Fumaça Negra Venenosa:** Cada quarto com lareira, fogão ou forno está cheio de fumaça preta espessa. A sala fica fortemente obscurecida, e qualquer criatura que inicie seu turno na fumaça deve realizar um teste de **Fortitude CD 10** ou sofrer **1d10 de dano de veneno**.

**Paredes Quebradiças:** As paredes internas estão podres e frágeis. Cada seção de 1,5m tem **Defesa 5** e **5 PV**, e pode ser destruída com um teste de **Atletismo CD 10** (Força). Cada seção de parede destruída faz surgir um **enxame de ratos** que ataca. Os enxames não saem da casa.

**Instrução para o Mestre:** Mantenha o controle de iniciativa enquanto os personagens abrem caminho pelos andares. A ordem de combate cria tensão — cada porta é uma decisão, cada lareira é um perigo, cada parede destruída libera mais ratos.

---

## Conclusão

Uma vez que os personagens escapem (independentemente do método), **a casa não faz mais nada para prejudicá-los**.

Se os fantasmas de Rose e Thorn ainda estiverem presos na casa (seus restos não foram levados às criptas — Áreas 23E e 23F), eles podem aparecer brevemente acima da entrada, olhando com uma mistura de alívio e tristeza.

**Os personagens avançam para o Nível 4 ao sair da Casa da Morte.**`,
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
    localizacao: 'Área 12 — Suíte Master, caixa de joias na penteadeira',
    descricao: 'Anel de signatura com as iniciais entalhadas da família Durst. Item de valor histórico e narrativo — pertenceu a uma família de cultuadores que serviu a Strahd por gerações. Pode ser reconhecido por habitantes mais antigos de Barovia.',
    mecanica: 'Valor: 25 PO. Sem efeito mágico confirmado pelo livro. Item narrativo que pode ser expandido pelo Mestre como gancho de história. Os itens na caixa de joias apodrecem se retirados da casa.',
    observacoes: 'A caixa de joias está na penteadeira do quarto. Contém também os Brincos de Rubi (100 PO), três anéis de ouro (25 PO cada) e um colar de platina com pingente de topázio (750 PO). Gustav e Elisabeth NÃO estão no quarto — são Lívidos na Área 34.',
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
    localizacao: 'Área 9 — Sala Secreta, dentro do baú com pés de ferro (junto aos outros documentos dos Durst)',
    descricao: 'Livro pequeno encadernado em couro preto. Revela a progressão psicológica de Elisabeth — de mãe normal para cúmplice relutante de sacrifícios. As entradas finais revelam o sacrifício do bebê Walter e o horror de Elisabeth com o que a família se tornou. Narrativamente consistente com a carta de Strahd a Gustav encontrada no mesmo baú.',
    mecanica: 'Item narrativo (adição criativa). Confirma que Walter foi sacrificado ("o rito exigiu mais"). Revela que o culto Durst servia ativamente a Strahd com oferendas de sangue. Leitura em voz alta é momento dramático poderoso.',
    observacoes: 'Fragmentos para ler: "Gustav me prometeu que as crianças nunca saberiam..." / "Walter não sobreviveu ao rito. Gustav diz que foi necessário..." / "A culpa foi sua." NOTA: O diário de Elisabeth não está no livro original — é adição criativa consistente com o lore estabelecido pela carta de Strahd a Gustav.',
  },
  {
    id: 'diario-rose',
    nome: 'Diário de Rose Durst',
    tipo: 'documento',
    raridade: 'comum',
    capitulo: 'Casa da Morte',
    localizacao: 'Área 20 — Quarto das Crianças (Sótão), embaixo da cama de Rose (Investigação CD 10)',
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
    localizacao: 'Área 8 — Biblioteca, segunda prateleira (Misticismo CD 15 para detectar aura)',
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
    localizacao: 'Área 12 — Suíte Master, caixa de joias na penteadeira',
    descricao: 'Par de brincos de ouro com rubis engastados. Parte da coleção de joias de Elisabeth Durst — de qualidade aristocrática. Guardados na caixa de joias (prata com filigrana de ouro, valor 75 PO) junto com três anéis de ouro (25 PO cada) e um colar de platina com pingente de topázio (750 PO).',
    mecanica: 'Valor: 100 PO o par. Sem efeito mágico. Itens apodrecem se retirados da casa.',
    observacoes: 'A caixa de joias está na penteadeira do quarto. Gustav e Elisabeth Durst NÃO estão no quarto — são Lívidos na masmorra (Área 34).',
  },
]
