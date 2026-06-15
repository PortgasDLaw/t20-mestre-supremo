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
          { pericia: 'Intuição', cd: 12, resultado: 'O personagem percebe que as crianças parecem... insubstanciais. Quase como se pudesse ver através delas brevemente. Algo não está certo.' }
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

**Percepção Passiva CD 12:** Os gárgulas têm olhos incrustados de obsidiana que realmente se movem, acompanhando os visitantes.

**Investigação CD 10:** A aldrava da porta tem inscrições desgastadas: "Família Durst — 754 do Calendário Baroviano."

**Interior — Hall Principal:**
Ao entrar, os personagens veem um hall de entrada com chão de mármore manchado, uma escadaria de madeira nobre subindo à esquerda, e dois corredores se abrindo à direita e à frente. Retratos de família cobrem as paredes — uma família aristocrática que ri de uma época mais próspera. O senhor Durst, de barba aparada, olha seriamente de seu retrato. A senhora Durst, bela mas de olhar vazio.

**Testes disponíveis:**
- **Misticismo CD 13:** O retrato da senhora Durst irradia uma leve aura de encantamento.
- **Percepção CD 11:** Há sangue velho e escurecido ao pé das escadas — antigo, mas presente.`
      },
      {
        id: 'andar-terreo',
        titulo: 'Áreas 3-7: Andar Térreo',
        tipo: 'exploration',
        conteudo: `**Área 3 — Covil dos Lobos:**
Seis lobos empalhados, posicionados como se prontos para atacar. Tapetes de pele de lobo cobrem o chão. Uma lareira fria ao fundo.

- **Investigação CD 13:** Há uma porta secreta atrás da estante de troféus (leva ao escritório de Durst).
- Se os personagens examinam a lareira: ouvem soluços suaves vindos de cima (é Rose ou Thorn guiando-os).

**Área 4 — Cozinha e Despensa:**
A cozinha está abandonada mas estranhamente organizada. Facas penduradas cuidadosamente. Uma panela com restos de um cozido de décadas atrás.

- **Sobrevivência/Percepção CD 10:** Rastros de roedores recentes — mas os ratos param abruptamente no centro da cozinha. Algo os assusta.
- **Investigação CD 12:** Há uma escotilha no chão da despensa (leva ao porão de provisões, depois à masmorra).

**Área 5 — Sala de Jantar:**
Uma mesa posta para seis, o jantar apodrecido ainda nos pratos. Uma vela de cera derretida ao centro, mas estranhamente ainda acesa com uma chama azulada.

- **Misticismo CD 11:** A chama azul é magia residual — uma "vela eterna" encantada, mas o encantamento está se dissipando.
- **Vontade CD 12 (se tocar a chama):** Visão de um banquete alegre, família Durst rindo — depois a visão esvaece e há sangue no jantar.

**Área 6 — Escritório de Durst:**
Uma mesa de carvalho com papéis e cartas. Estantes com livros encadernados em couro. Uma poltrona de couro rasgada pelo tempo.

- **Investigação CD 10:** As cartas revelam que Durst era um comerciante próspero mas obcecado com ocultismo. Uma carta menciona "nossa homenagem ao Senhor das Trevas."
- **Investigação CD 14:** Um compartimento secreto sob a mesa contém um **Diário de Elisabeth Durst** (fragmentos — veja aba de Itens) e 50 PO.

**Área 7 — Sala de Serviçais:**
Quatro camas simples, um baú trancado. Os serviçais fugiram há muito — levaram suas coisas mais valiosas.

- **Ladinagem CD 11:** O baú contém 10 PP e um **Frasco de Óleo Abençoado** (1d6 dano sagrado, uma vez).`
      },
      {
        id: 'segundo-andar',
        titulo: 'Áreas 8-13: Segundo Andar',
        tipo: 'exploration',
        conteudo: `**Área 8 — Corredor Superior:**
As paredes exibem mais retratos da família Durst ao longo do tempo. Os mais recentes mostram um semblante cada vez mais perturbado.

**Área 9 — Quarto de Hóspedes:**
Um quarto confortável mas empoeirado. Um baú no pé da cama.

- **Baú:** 12 PP, uma **Poção de Cura Menor** (cura 2d4+2 PV), um lenço de seda com as iniciais "G.A."

**Área 10 — Biblioteca:**
Centenas de volumes, a maioria sobre folclore do crime, magia sombria e história de Barovia.

- **Investigação CD 13 (1 hora):** Os personagens encontram um livro chamado "O Senhor de Ravenloft" — uma hagiografia adulatória de Strahd Von Zarovich. Menciona que ele fez um "pacto com as trevas" para não morrer.
- **Misticismo CD 15:** Um tomo em língua desconhecida (Abissal) está disfarçado como livro comum. Contém rituais de convocação de menor escalão.

**Área 11 — Quarto de Rose e Thorn:**
Um quarto infantil com duas camas pequenas, brinquedos e bonecas. Uma caixinha de música ainda tocará se a manivela for girada — uma melodia melancólica.

*Se Rose e Thorn acompanham os personagens:* Elas ficam quietas ao entrar. Rose aperta a mão da boneca da cama. Thorn vai até a janela e olha para fora.

- **Investigação CD 10:** Sob a cama de Rose, há um diário infantil. As entradas mais recentes dizem: "Mamãe e Papai desapareceram no porão. Fomos procurá-los mas a porta está trancada. Thorn está com medo. Eu também estou."
- A caixinha de música toca a melodia do tema da campanha. NPCs sensíveis a magia sentem uma tristeza profunda ao ouvi-la.

**Área 12 — Quarto de Walter (Berçário):**
O berçário está impecavelmente conservado por magia — completamente intocado pelo tempo que destruiu o resto da casa.

*Se Rose e Thorn estão aqui:* Elas param na porta. Rose sussurra: "Walter dormia aqui. Ele chorava muito."

O berçário está vazio. O berço de madeira finamente trabalhado tem uma manta de bebê dobrada perfeitamente. Uma móbile de pássaros prateados gira devagar sem vento.

- **Misticismo CD 12:** Aura de necromancia fraca no berçário inteiro.
- **Investigação CD 13:** Um medalhão de prata no berço com a inscrição "Walter — Filho Predileto." Vale 25 PO (mas carregar o medalhão causa pesadelos — Vontade CD 13 para dormir descansado).`
      },
      {
        id: 'terceiro-andar',
        titulo: 'Áreas 14-18: Terceiro Andar e Ático',
        tipo: 'exploration',
        conteudo: `**Área 14 — Quarto Principal de Durst:**
O quarto do casal Durst. Uma cama de dossel enorme, cortinas de veludo roxo desbotado.

*Encontro:* Os corpos mumificados de Gustav e Elisabeth Durst ainda estão na cama — sentados, de mãos dadas, com expressões de paz. Eles não são mortos-vivos (ainda). Mas se qualquer personagem tentar remover seus anéis ou objetos, os corpos se animam como **Zumbis** (ND 1 cada — reduzidos do ND original para personagens de nível 2).

**Itens no quarto:**
- Caixa de joias com **Anel de Signatura dos Durst** (25 PO) e **Brincos de Rubi** (100 PO total)
- Na escrivaninha: uma carta de Elisabeth para Gustav: "Você me prometeu que as crianças nunca saberiam. Mas ele quer mais. Ele sempre quer mais. O bebê não sobreviveu. A culpa foi sua."

**Área 15 — Quarto de Vestir:**
Roupas das décadas anteriores. Uma coleção de chapéus femininos elaborados.

- **Investigação CD 11:** Atrás de uma parede de roupas, há uma passagem secreta para o ático. Uma das paredes desliza se uma alavanca escondida for acionada.

**Área 16 — Ático:**
O ático está cheio de baús e móveis velhos empilhados. Teias de aranha em tudo. Uma janela quebrada deixa entrar um vento uivante.

*Encontro:* **1 Espírito Faminto (equivalente a Sombra, ND 1 T20)** — a manifestação do rancor de Elisabeth Durst. Ele ataca silenciosamente, mas recua se confrontado com luz sagrada ou símbolo divino.

- **Recompensa:** Um baú escondido atrás de uma pilha de móveis contém **100 PO, uma Poção de Cura (cura 2d4+4 PV)** e uma **Espada Curta +1** com a inscrição "Família Durst" (pertencia a Rose).`
      },
      {
        id: 'porcao-masmorra',
        titulo: 'Áreas 19-28: O Porão e a Masmorra',
        tipo: 'combat',
        conteudo: `Esta é a parte mais perigosa da Casa da Morte. A masmorra abaixo do porão é onde o culto dos Durst realizava seus rituais. **O objetivo final é escapar — não necessariamente matar tudo.**

---
**Área 19 — Escada para o Porão:**
Uma escada de pedra desce para a escuridão. Cheiro de terra úmida e algo mais — carne em decomposição.

**Área 20 — Celeiro de Provisões:**
Barris e prateleiras com provisões apodrecidas. Mas também:
- Uma porta de ferro trancada (Ladinagem CD 13 ou Força CD 16 para forçar)
- 3 tochas e um isqueiro no chão

**Área 21 — Poço:**
Um poço de pedra. A água está pura mas fria.

**Área 22 — Corredor dos Cultistas:**
As paredes têm afrescos desbotados de figuras em mantos pretos circundando um altar. Os cultistas que aparecem nos afrescos têm rostos borrados.

*Encontro:* **3 Cultistas-Esqueleto (ND 1/2 cada)** patrulham esse corredor. Adaptados para T20:
- PV: 13 cada
- Defesa: 13 (ossos + postura)
- Ataque: Adaga Enferrujada +2 (1d4 perfurante)
- Imunes a veneno, doenças, efeitos de cansaço
- Vulneráveis a dano sagrado

**Área 23 — Sala de Tortura:**
Instrumentos de tortura enferrujados. Dois ganchos no teto ainda têm correntes.

*Encontro:* **2 Espíritos Atormentados (ND 1 cada)** — fantasmas de cultistas que foram punidos. Eles atacam qualquer ser vivo. Só podem ser feridos por magia, prata ou ataques sagrados.

**Área 24 — Câmara de Sacrifícios:**
O ponto central da masmorra. Um altar de pedra negra manchado de sangue seco. Runas entalhadas ao redor do altar brilham levemente de vermelho.

- **Misticismo CD 14:** As runas são de controle menor — uma versão menor de submissão a Strahd. O altar foi usado para canalizar o poder de sacrifícios em direção a Ravenloft.
- **Religião/Misticismo CD 16:** Consagrar o altar com água benta ou uma magia divina o purifica, e todos os Esqueletos e Espíritos na masmorra são imediatamente destruídos.

**Área 25 — Câmara do Relicário:**
Três pedestais com itens malditos:
1. Um crânio de criança (runa de maldição — quem tocar faz Vontade CD 13 ou fica com –2 em testes de Vontade por 1 dia)
2. Um medalhão de prata (vale 30 PO, mas é furtado e volta para cá em 1d4 dias)
3. Uma faca cerimonial (1d4 cortante, conta como mágica contra mortos-vivos)

**Área 26 — Covil da Guarda:**
*Encontro:* **2 Ghoul (ND 2 T20 cada)**. Para personagens de nível 2, esses são os inimigos mais perigosos até agora. Os Ghouls foram os últimos cultistas que morreram na masmorra.

**Estatísticas dos Ghouls (adaptado para T20, nível 2):**
- PV: 36 cada (reduzido de 45 para balancear nível 2)
- Defesa: 13
- Iniciativa: +2
- Ataque de Garra: +4 (1d6+2 cortante) — alvo faz Fortitude CD 11 ou fica paralisado por 1 round
- Mordida: +4 (2d6+2 perfurante) — apenas contra criatura incapacitada ou paralisada

**Dica de mestre:** Os Ghouls tentam paralisar um personagem e então usar a mordida — esse combo pode ser fatal para personagens de nível 2. Avise subtilmente que fugir é uma opção.`
      },
      {
        id: 'encontro-final',
        titulo: 'Área 27-28: O Monstro e a Fuga',
        tipo: 'combat',
        conteudo: `**Área 27 — Câmara do Ritual:**
A câmara central. Um círculo de ritual de 6m de diâmetro gravado no chão de pedra. Doze estacas de madeira ao redor do círculo — nove têm esqueletos acorrentados. Três estão vazias.

Ao entrar, Rose e Thorn (se presentes) param na entrada. Rose diz, com voz diferente — mais velha, mais vazia:

*"O monstro precisa de sangue. Sempre precisou. Nós... precisávamos de alguém para nos substituir. Desculpem."*

As crianças desaparecem — e seus fantasmas tentam **possuir** os personagens (Vontade CD 13 ou o personagem é possuído pelo fantasma da criança por 1 hora).

*Encontro Boss:* **A Sombra de Strahd (Specter menor, ND 3)** — um fragmento de sua sombra aprisionado no ritual, não o próprio Strahd.

**Estatísticas (Specter Menor, ND 3 — adaptado para Nível 2):**
- PV: 45 • Defesa: 12 (incorpóreo) • Iniciativa: +6 • Desloc.: 18m (voo)
- Imune a: Veneno, doenças, condições físicas, dano de armas não-mágicas
- Vulnerável a: Dano sagrado (dano dobrado)
- Toque Corrompido: +5 (3d6 necrótico) — reduz PV máximos do alvo pelo dano causado
- Drenar Vida (recarga 5-6): Todos em 4,5m fazem Vontade CD 13 ou perdem 2d6 PV máximos`,
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
          { pericia: 'Percepção', cd: 12, resultado: 'O personagem nota rostos espreitando pelas frestas das janelas. Os moradores observam os personagens com uma mistura de medo e... esperança frágil.' },
          { pericia: 'Sobrevivência', cd: 10, resultado: 'Há rastros de cavalos pesados nas ruas lamacentas — recentes. Cavaleiros patrulharam essa rua esta noite.' },
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
          { pericia: 'Intuição', cd: 13, resultado: 'Os três Vistani estão fingindo relaxar. Um deles regularmente olha para os personagens enquanto parece examinar a xícara.' },
          { pericia: 'Intuição', cd: 11, resultado: 'Ismark está desesperado mas tenta esconder. A voz dele vacila ao mencionar o nome de Ireena.' },
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
          { pericia: 'Medicina (Sobrevivência)', cd: 12, resultado: 'O corpo tem marcas sutis de exaustão extrema e privação de sono prolongada. Ele não dormia há semanas antes de morrer.' },
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
          { pericia: 'Religião (Misticismo)', cd: 13, resultado: 'Um personagem divino reconhece que Doru ainda resiste à transformação completa. Há uma janela estreita para um ritual de purificação — mas requer água benta concentrada (3 frascos) e expô-lo à luz solar por 1 minuto.' },
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
          { pericia: 'Intuição', cd: 15, resultado: 'Ireena está com medo, mas não de Strahd — está com medo de si mesma. Como se tivesse medo do que pode se tornar ou do que sente quando pensa nele.' },
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
          { pericia: 'Intuição', cd: 13, resultado: 'A hospitalidade é genuína — mas os Vistani também observam os personagens com cuidado. Eles certamente irão reportar a presença dos forasteiros a Strahd, não por maldade, mas porque é o acordo deles com o Conde.' },
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
          { pericia: 'Intuição', cd: 12, resultado: 'Madame Eva acredita genuinamente em cada palavra que disse. Ela não está encenando — está reportando o que vê nas cartas com total seriedade.' },
          { pericia: 'Misticismo', cd: 15, resultado: 'As cartas irradiam uma aura de divinação legítima. Seja qual for a fonte do poder de Eva, é real e poderoso.' },
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

**Proprietários:** **Urwin Martikov** e sua esposa **Danika**. Amigáveis, prestativo, oferecem boas refeições e camas limpas. Secretamente são **Wereravens** (metamorfos-corvo) e membros do grupo de resistência "Os Guardiões da Pena" — aliados contra Strahd.

*Urwin:* "Bem-vindos à Lua Azul. Primeira hospedagem em Barovia que não quer que vocês sirvam de jantar para alguém." *(ri levemente do próprio humor negro)*

**Preços na Pousada:**
- Quarto duplo (por noite): 1 PO
- Quarto individual: 2 PO
- Refeição completa: 5 TC (Tibares de Cobre)
- Vinho de Valaki (garrafa): 3 TC
- Vinho Premium Martikov: 5 TC

**Como ganhar a confiança dos Martikov:**
1. Não mencionar que são wereavens (eles testam discretamente com perguntas)
2. Mostrar que estão contra Strahd
3. Se perguntados diretamente após desenvolver confiança: "Há outros como nós em Barovia. Não estão sozinhos."

**Se os Martikov confiarem nos personagens:** Podem compartilhar localização de outros Wereravens, fornecer informações sobre o Barão, e potencialmente ajudar com o plano final contra Strahd.`,
      },
      {
        id: 'mosteiro-sao-andral',
        titulo: 'Mosteiro de São Andral — O Tomo de Strahd',
        tipo: 'combat',
        conteudo: `O Mosteiro de São Andral é uma fortaleza religiosa no centro de Valaki. O **Padre Lucian Petrovich** a administra — um homem sério mas justo.

**A Situação:**
- Os Ossos de São Andral — relíquias sagradas que criam um campo de proteção que impede vampiros de entrar — foram roubados do mosteiro.
- Sem as relíquias, o campo de proteção está enfraquecendo.
- Ireena foi trazida aqui para proteção (e o Tomo de Strahd estava escondido nas paredes pelo próprio Van Richten décadas atrás).

**Quem roubou os ossos:** **Milivoj**, o coveiro do mosteiro — ele os vendeu para **Henrick van der Voort**, o carpinteiro, que os esconde em sua oficina. Henrick foi coagido por um vampiro servo de Strahd.

**A Quest:**
1. Descobrir quem roubou os ossos (Investigação CD 12 — Milivoj hesita mas confessa com Diplomacia CD 13)
2. Recuperar os ossos de Henrick (Combat ou Diplomacia — Henrick está aterrorizado e coopera facilmente)
3. Restaurar o campo de proteção antes que Strahd envie seus servos esta noite

**O Tomo de Strahd:**
Escondido dentro de uma parede falsa na biblioteca do mosteiro. Um personagem com Investigação CD 15 (ou Misticismo CD 12 para sentir a aura) o encontra. É um livro encadernado em couro preto com runas gravadas — ao abri-lo, as runas brilham. Conteúdo: os pensamentos mais sombrios, planos e segredos de Strahd, incluindo a localização de seu caixão.`,
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
          { pericia: 'Misticismo', cd: 12, resultado: 'O campo de força é magia de abjuração poderosa — projetada para impedir mortos-vivos, não necessariamente os vivos. Um personagem vivo pode tentar empurrar através dela (Força CD 15).' },
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

**2º Andar:** Uma biblioteca compacta. Livros sobre monstruologia, história de Barovia, rituais de proteção. **Investigação CD 12:** Um livro com páginas marcadas — "Fraquezas Vampíricas: Um Estudo Empírico por R. Van Richten."

**3º Andar:** Quarto de Van Richten. Uma cama de campanha, um baú (trancado — Ladinagem CD 13), mantimentos. **No baú:** 200 PO, um Diário de Caça a Vampiros, e uma carta incompleta para um destinatário chamado "Ezmerelda".

**4º Andar:** Observatório. Telescópio improvisado com vista para Ravenloft. Notas sobre os padrões de saída de Strahd.

**Topo (5º Andar):** A caixa. Um cofre de madeira forrada de veludo vermelho, com tranca de prata. Dentro: o **Símbolo Sagrado** — um prato circular de prata pura com o sol entalhado. Irradia luz fraca e calor.`,
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
        conteudo: `Van Richten pode estar na torre disfarçado como **"Alanik Ray"** — um velho viajante, chapéu largo, capa gasta. Ele não se identifica imediatamente.

*Van Richten (como Alanik):* *(descendo a escada, segurando uma tocha, olhando os personagens com cansaço)* "Não me procuravam a mim. Vieram pela caixa. Certo?"

*(Se os personagens explicarem a situação)*

*"Madame Eva enviou vocês."* *(não é pergunta)* *"Strahd deve ser derrotado. Eu também tentei, uma vez. Perdi meu filho. Perdi meus alunos. Perdi décadas tentando — e Barovia continua na névoa."*

*(pausa, olhando para a caixa)*

*"Mas se Eva viu algo diferente em vocês... talvez a escuridão finalmente pague sua dívida."*

**Van Richten pode:**
- Revelar sua identidade real se os personagens o pressionarem gentilmente (Intuição CD 13 para perceber que "Alanik" sabe demais para ser um viajante comum)
- Oferecer o Diário de Caça a Vampiros
- Eventualmente, dependendo da confiança construída, acompanhar brevemente o grupo

**Segredo de Van Richten:** Sua ex-aluna, **Ezmerelda d'Avenir**, também está em Barovia. Eles tiveram um desentendimento — mas ela pode ser uma aliada poderosa para os personagens.`
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

**Desafios da Trilha:**
- **Altitude (cada hora de subida):** Fortitude CD 12 ou 1 nível de fadiga. Personagens com Sobrevivência 3+ podem preparar o grupo (Sobrevivência CD 14 = todos têm +3 nos testes de altitude).
- **Nevascas Repentinas:** 1d6 chance por hora de viagem. Percepção CD 13 para ter aviso com 10 minutos — tempo suficiente para encontrar abrigo.
- **Encontros na Montanha:** ND ajustados para nível 7-8 — Gólens de Gelo (ND 6), Lobos Fantasmas (ND 4), Bruxa Noturna (ND 5).

**Chegada ao Templo (Leia em Voz Alta):**
"O templo emerge da neblina como se sempre tivesse estado lá — mas vocês têm certeza de que não estava. É imenso: colunas de âmbar translúcido do chão ao teto, cada uma com três metros de diâmetro. E dentro de cada coluna... formas. Sombras de algo aprisionado. Que se move. Que observa. Que **sussurra seus nomes**."`,
        encontros: [
          { nome: 'Gólem de Gelo', nd: '6', quantidade: 1, nota: 'Guarda a entrada principal do templo' },
          { nome: 'Bruxa Noturna', nd: '5', quantidade: 1, nota: 'Habita a ala norte — pode ser negociada' },
        ]
      },
      {
        id: 'templo-susurros',
        titulo: 'Os Sussurros dos Vestígios',
        tipo: 'warning',
        conteudo: `**ATENÇÃO DO MESTRE:** Esta é a parte mais psicologicamente pesada da campanha. Cada personagem receberá uma oferta personalizada. Prepare algo específico para cada jogador — baseado no que você conhece dos personagens.

**Os Vestígios** são entidades aprisionadas nos sarcófagos de âmbar — fragmentos de divindades corrompidas, poderes primordiais, horrores cósmicos. Eles não podem sair dos sarcófagos, mas podem se comunicar.

**Como os Sussurros Funcionam:**
- **Ao entrar:** Cada personagem ouve um sussurro em sua mente oferecendo poder. **Vontade CD 15** para ignorar neste round.
- **Por cada round adicional no templo:** CD de Vontade acumula +2 para quem já falhou uma vez.
- **Aceitar a oferta:** O personagem ganha um poder imediatamente (escolha do mestre), mas desenvolve uma corrupção física (unhas pretas, olhos brancos, etc.) e fica mais suscetível a ofertas futuras.

**Exemplos de Ofertas:**
- "Imortalidade. Nunca mais perder quem você ama."
- "Poder para proteger a todos. Nenhum inimigo poderá te machucar."
- "Respostas. Todo segredo de Barovia revelado agora."
- "Ele está esperando você do outro lado. Seu [familiar morto]. Posso te levar a ele."

**Dica:** O pacto de Strahd com um dos Vestígios é o que criou a maldição de Barovia. Strahd aceitou a oferta de imortalidade — e está preso aqui até hoje como consequência.`
      },
      {
        id: 'espada-solar-camara',
        titulo: 'A Câmara da Espada Solar',
        tipo: 'combat',
        conteudo: `No coração do templo, após superar os guardiões e resistir aos sussurros, os personagens chegam a uma câmara circular de âmbar puro.

**Descrição (Leia em Voz Alta):**
"A câmara é perfeitamente circular, paredes e teto de âmbar polido que reflete a luz das velas em mil fragmentos dourados. No centro, elevado sobre um pedestal de pedra branca, um sarcófago de âmbar translúcido contém algo que pulsa com luz própria — uma luz dourada, quente, que parece impossível neste lugar sombrio.

Quando vocês se aproximam, o sarcófago se abre sozinho. E dentro... uma espada. Simples em forma, extraordinária em presença. A lâmina parece conter luz solar aprisionada. E então vocês ouvem uma voz — jovem, masculina, exausta: 'Finalmente. Eu esperava... muito tempo.'"

**O Espírito de Sergei Von Zarovich:**
O irmão de Strahd habita a espada. Ele foi assassinado por Strahd no dia de seu casamento com Tatyana — o evento que desencadeou o pacto com os Vestígios. Sergei não está com raiva — está em paz, mas ainda tem trabalho a fazer.

*Sergei:* "Meu irmão precisa ser libertado. Não destruído — **libertado**. Eu o amava. Ainda o amo. O que ele se tornou é o resultado de uma dor que eu não pude curar em vida. Se vocês o derrrotarem com esta espada... ele poderá finalmente descansar."`,
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
          { pericia: 'Intuição', cd: 14, resultado: 'Strahd genuinamente acredita que está protegendo Barovia. Ele não é apenas um vilão se justificando — ele está convicto.' },
          { pericia: 'Intuição', cd: 17, resultado: 'Quando Strahd olha para Ireena, há algo além de obsessão no rosto dele. Há culpa. Ele sabe que o que faz a ela é errado.' },
        ]
      },
      {
        id: 'confronto-final',
        titulo: 'O Confronto Final — Três Fases de Strahd',
        tipo: 'combat',
        conteudo: `O confronto com Strahd ocorre quando os personagens estiverem prontos — ou quando Strahd decidir que já não há razão para esperar.

**LOCAL:** A Câmara do Trono ou a Câmara do Caixão (no porão) se os personagens encontrarem o caixão primeiro. Combate no caixão é mais perigoso mas permite destruir Strahd permanentemente.

---
**FASE 1 — O CONQUISTADOR (209 PV, comportamento dominante):**
Strahd testa os personagens. Usa magia (Bola de Fogo CD 18, Sono, Invisibilidade, Imagem Espelhada) e sua Garra Longa flutuante (Espada Dançante). Não usa Mordida ainda — está avaliando. Sua postura é de superioridade quase entediada.

*Strahd (no início do combate):* "Então chegamos a isso. Esperava que vocês fossem mais... inventivos. Mas tudo bem. Uma dança antes da capitulação é sempre bem-vinda."

---
**FASE 2 — O MONSTRO (abaixo de 130 PV):**
Strahd convoca Filhos da Noite (2d4 Morcegos Gigantes + 3d4 Ratos de Masmorra). Usa Mordida, Encanto, transforma-se em névoa para se reposicionar. A compostura começa a quebrar.

*Strahd (ao ser ferido seriamente):* "Vocês... realmente vieram preparados." *(olha para a Espada Solar com reconhecimento)* "Sergei. Meu irmão ainda insiste em me perseguir mesmo de além-túmulo."

---
**FASE 3 — O DESESPERO (abaixo de 60 PV):**
Strahd para de ser calculado. Ataca com fúria mas também com algo que parece... alívio. Como se parte dele quisesse que isso acabasse. Esta fase é a mais emocionalmente poderosa.

*Strahd (gravemente ferido):* "Então... é assim. Séculos. Tatyana sempre fugia. E agora..." *(olha para os personagens, depois para Ireena)* "...você novamente me escapa. Pela última vez."

*(long pause — Strahd está genuinamente exausto)*

*"Façam-no. Libertem-me desta prisão. Eu... estou... cansado."*

**Se os personagens hesitarem:** *"Não se tornem sentimentais por mim. Eu escolhi isso. Escolhi o poder em vez do amor, séculos atrás. Paguei o preço. Agora é hora de pagar o último."*`,
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
      ['Gládios 1 — Vingador', '★ Espírito Leal', 'TOMO DE STRAHD no Mosteiro de São Andral'],
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
