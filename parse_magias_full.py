import json
import re

with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_all.txt", "r", encoding="utf-8") as f:
    raw = f.read()

# Remove page markers
text = re.sub(r"=== PAGE \d+ ===", "", raw)

# Spell metadata block pattern
# Each spell begins with name in CAPS, followed by properties like:
# Escola de magia X X X
# Execução: ... Alcance: ... Alvo/Área/Efeito: ... Duração: ...
# Resistência: ...
# Then description text and Aprimoramentos

# Known spell names from tables (all circles, arcane and divine)
SPELL_LIST_ARCANA = {
    1: ["Adaga Mental", "Alarme", "Amedrontar", "Ampliar Sentidos", "Arma Mágica", "Armadura Arcana",
        "Bênção de Voo", "Bruma", "Camaleão", "Charme Pessoa", "Choque Elétrico", "Compreensão",
        "Conjurar Monstro", "Controlar Chamas", "Criar Água", "Dardo de Força", "Detectar Magia",
        "Disfarce", "Dominar Animal", "Explosão de Chamas", "Flutuação", "Força Fantasmal",
        "Iluminar", "Luz", "Mãos Mágicas", "Míssil Mágico", "Sono", "Torção Corporal"],
    2: ["Alterar Tamanho", "Amarras Etéreas", "Enfraquecer", "Imagem Ilusória", "Indetectável",
        "Invisibilidade", "Névoa Mental", "Paralisar", "Raio de Gelo", "Raio de Luz Solar",
        "Teia", "Terreno Ilusório", "Trovão"],
    3: ["Âncora Dimensional", "Contato Extraplanar", "Portal Arcano", "Telecinesia", "Voo",
        "Bola de Fogo", "Persona"],
    4: ["Alterar Memória", "Conjurar Elemental", "Controlar a Gravidade", "Imagem Perfeita",
        "Voragem Dimensional", "Paralisar (massa)"],
    5: ["Alterar Destino", "Controlar o Tempo", "Xagarashar"],
}

SPELL_LIST_DIVINA = {
    1: ["Abençoar Alimentos", "Acalmar Animal", "Bênção", "Castigar", "Causar Ferimentos",
        "Consagrar", "Controlar Plantas", "Criar Água", "Curar Ferimentos", "Detectar Alinhamento",
        "Domar Animal", "Orientação", "Proteção", "Remover Veneno", "Sagrar Arma"],
    2: ["Aliado Animal", "Auxílio", "Controlar Fogo", "Controlar Madeira", "Curar Ferimentos em Massa",
        "Invocar Relâmpago", "Silêncio", "Vitalidade"],
    3: ["Controlar Água", "Controlar Terra", "Criar Alimento", "Cura Plena", "Purificar",
        "Ressuscitar Animal"],
    4: ["Conjurar Mortos-Vivos", "Controlar o Clima", "Milagre Menor", "Ressuscitar"],
    5: ["Grande Cura", "Milagre", "Praga Divina", "Ressurreição Total"],
}

ESCOLA_MAP = {
    "Abjur": "Abjuração", "Adiv": "Adivinhação", "Encan": "Encantamento",
    "Evoc": "Evocação", "Iluso": "Ilusão", "Necro": "Necromancia",
    "Trans": "Transmutação", "Conv": "Conjuração", "Conj": "Conjuração",
    "Abjuração": "Abjuração", "Adivinhação": "Adivinhação",
    "Encantamento": "Encantamento", "Evocação": "Evocação",
    "Ilusão": "Ilusão", "Necromancia": "Necromancia",
    "Transmutação": "Transmutação", "Conjuração": "Conjuração",
    "Universal": "Universal",
}

def normalize_id(name):
    import unicodedata
    name = unicodedata.normalize("NFKD", name)
    name = "".join(c for c in name if not unicodedata.combining(c))
    name = name.lower().strip()
    name = re.sub(r"[^a-z0-9]+", "-", name)
    return name.strip("-")

def extract_property(text, prop_names):
    """Try to extract a property from the spell text block"""
    for prop in prop_names:
        pattern = rf"{prop}:\s*([^\n]+)"
        m = re.search(pattern, text, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return ""

def find_escola(text):
    for abbr, full in ESCOLA_MAP.items():
        if re.search(rf"\b{abbr}\b", text[:200]):
            return full
    return ""

def extract_pm(text):
    m = re.search(r"(\d+)\s*PM", text[:300])
    if m:
        return int(m.group(1))
    return 1

def find_spell_in_text(spell_name, fulltext):
    """Try to find a spell description block in the full text"""
    # Try exact name match followed by school info
    patterns = [
        rf"(?<!\w){re.escape(spell_name.upper())}(?!\w)",
        rf"(?<!\w){re.escape(spell_name)}(?!\w)",
    ]
    for pat in patterns:
        m = re.search(pat, fulltext, re.IGNORECASE)
        if m:
            # Get 2000 chars around the match
            start = max(0, m.start() - 50)
            end = min(len(fulltext), m.start() + 2000)
            return fulltext[start:end]
    return ""

# Build comprehensive spell database
ALL_SPELLS = []

# ============================
# MAGIAS ARCANAS - COMPLETAS
# ============================

def make_spell(id_, nome, tipo, escola, circulo, pm, execucao, alcance, alvo, duracao, resistencia, descricao, aprimoramentos=None):
    return {
        "id": id_ or normalize_id(nome),
        "nome": nome,
        "tipo": tipo,
        "escola": escola,
        "circulo": circulo,
        "pm": pm,
        "execucao": execucao,
        "alcance": alcance,
        "area": alvo,
        "duracao": duracao,
        "resistencia": resistencia,
        "descricao": descricao,
        "aprimoramentos": aprimoramentos or [],
    }

s = make_spell

# ARCANA 1
ALL_SPELLS += [
s("adaga-mental","Adaga Mental","arcana","Encantamento",1,1,"Padrão","Curto","1 criatura","Instantânea","Vontade anula",
  "Você dispara lâminas de energia mental que causam dano psíquico. A magia inflige 2d6 pontos de dano mental (não reduzido por RD) na criatura. O dano mental não pode ser curado por meios físicos — apenas por magia de cura.",
  ["+1 PM: aumenta o dano em +1d6."]),

s("alarme","Alarme","arcana","Abjuração",1,2,"1 minuto","Toque","Área de até 6m de raio","8 horas","Nenhuma",
  "Você cria um alarme mágico ao redor de uma área. Caso qualquer criatura (exceto você e aquelas que você designar no momento do lançamento) entre na área, o alarme dispara um som audível a até 18m de distância.",
  ["+2 PM: a duração aumenta para 24 horas.",
   "+3 PM: o alarme alerta você mentalmente (sem fazer barulho), independentemente da distância."]),

s("amedrontar","Amedrontar","arcana","Necromancia",1,1,"Padrão","Curto","1 criatura","Cena","Vontade anula",
  "A criatura fica com medo de você. Enquanto estiver com medo, ela sofre –2 em testes de ataque e perícias.",
  ["+2 PM: muda o alvo para criaturas em área de 6m de raio centrada em você.",
   "+5 PM: a criatura fica apavorada (foge na máxima velocidade, não podendo realizar outras ações)."]),

s("ampliar-sentidos","Ampliar Sentidos","arcana","Adivinhação",1,1,"Padrão","Pessoal","Você","Cena","—",
  "Você amplia um de seus sentidos. Escolha visão, audição ou olfato: visão concede visão no escuro 18m; audição concede +10 em Percepção auditiva; olfato permite rastrear pelo cheiro com bônus de +10 em Sobrevivência.",
  ["+1 PM: amplia mais um sentido além do escolhido."]),

s("arma-magica","Arma Mágica","arcana","Transmutação",1,1,"Movimento","Toque","1 arma","Cena","Nenhuma",
  "A arma tocada recebe +1 nas jogadas de ataque e dano. Ela passa a ser considerada mágica, ignorando RD que exige magia para ser ignorada.",
  ["+1 PM: aumenta o bônus em +1 (máximo +5).",
   "+1 PM: muda o alcance para curto.",
   "+2 PM: a arma causa 1d6 de dano extra de energia (ácido, elétrico, fogo ou frio, à sua escolha)."]),

s("armadura-arcana","Armadura Arcana","arcana","Abjuração",1,1,"Movimento","Pessoal","Você","Cena","—",
  "Uma armadura de força invisível e intangível envolve você, concedendo +4 na Defesa. Esse bônus não se acumula com armaduras físicas. Não funciona se você estiver usando armadura média ou pesada.",
  ["+1 PM: aumenta o bônus em +2 (máximo +10)."]),

s("bencao-de-voo","Bênção de Voo","arcana","Transmutação",1,2,"Movimento","Pessoal","Você","Cena","—",
  "Você ganha a capacidade de voar com deslocamento de 12m. Ao contrário do feitiço Voo, esta versão funciona em espaços fechados com teto suficientemente alto.",
  ["+2 PM: aumenta o deslocamento de voo para 18m."]),

s("bruma","Bruma","arcana","Conjuração",1,1,"Padrão","Curto","Cubo de 9m","Cena","—",
  "Uma névoa espessa envolve a área designada. Criaturas dentro da névoa ficam camufladas (20% de chance de falha em ataques contra elas). Vento forte dispersa a bruma.",
  ["+1 PM: aumenta o cubo em +3m de lado.",
   "+2 PM: a bruma também dificulta a respiração (Fortitude CD 15 ou fica enjoada)."]),

s("camaleon","Camaleão","arcana","Ilusão",1,1,"Movimento","Pessoal","Você","Cena","—",
  "Sua pele e roupa se adaptam ao ambiente ao redor, como um camaleão. Você recebe +10 em Furtividade e pode se camuflar mesmo sem cobertura.",
  ["+1 PM: pode estender o efeito para um aliado adjacente."]),

s("charme-pessoa","Charme Pessoa","arcana","Encantamento",1,1,"Padrão","Curto","1 humanoide","Cena","Vontade anula",
  "O humanoide alvo fica enfeitiçado por você. Ele trata você como um amigo próximo, agindo de forma prestativa. A criatura não fica sob seu controle absoluto. Se você ou seus aliados agirem de forma hostil contra a criatura, o efeito termina imediatamente.",
  ["+2 PM: a duração aumenta para 1 dia.",
   "+3 PM: muda o alvo para 1 criatura (qualquer tipo).",
   "+5 PM: muda a duração para permanente."]),

s("choque-eletrico","Choque Elétrico","arcana","Evocação",1,1,"Padrão","Toque","1 criatura","Instantânea","Reflexos reduz à metade",
  "Você gera uma descarga elétrica ao tocar a criatura. A magia inflige 1d6 pontos de dano elétrico por PM gasto.",
  ["+1 PM (rep.): aumenta o dano em 1d6."]),

s("compreensao","Compreensão","arcana","Adivinhação",1,1,"Padrão","Pessoal","Você","Cena","—",
  "Você pode ler, escrever, falar e entender qualquer idioma durante a cena, incluindo idiomas de criaturas monstruosas. Não permite usar itens mágicos que exijam treinamento específico.",
  []),

s("conjurar-monstro","Conjurar Monstro","arcana","Conjuração",1,1,"Padrão","Curto","1 monstro convocado","Concentração","—",
  "Você convoca um monstro de ND 1/2 ou inferior para lutar ao seu lado. O monstro age na iniciativa logo após você e obedece suas ordens simples. Quando a duração termina ou o monstro é reduzido a 0 PV, ele desaparece.",
  ["+1 PM: convoca um monstro de ND 1.",
   "+2 PM: convoca um monstro de ND 2.",
   "+3 PM: convoca um monstro de ND 3.",
   "+5 PM: convoca um monstro de ND 5.",
   "+1 PM: convoca 1d3 monstros do ND especificado."]),

s("controlar-chamas","Controlar Chamas","arcana","Transmutação",1,1,"Padrão","Curto","Fogo em área de 3m de raio","Cena","—",
  "Você controla chamas existentes na área. Pode aumentar (duplicar tamanho), diminuir ou extinguir o fogo. Também pode modelar as chamas em formas diversas ou movê-las até 3m por round.",
  ["+1 PM: pode criar fogo onde não existe (em material inflamável).",
   "+2 PM: pode controlar fogo em área de 9m de raio."]),

s("criar-agua","Criar Água","arcana","Conjuração",1,1,"Padrão","Toque","—","Permanente","—",
  "Você cria água pura suficiente para saciar a sede de até 3 criaturas por dia, ou aprox. 8 litros. A água aparece em um recipiente que você designar.",
  ["+1 PM: cria água suficiente para +3 criaturas (ou +8 litros)."]),

s("dardo-de-forca","Dardo de Força","arcana","Evocação",1,1,"Padrão","Curto","1 criatura","Instantânea","Nenhuma",
  "Você dispara um dardo de energia de força pura que acerta automaticamente a criatura alvo. Inflige 1d4+1 pontos de dano de força.",
  ["+1 PM: cria mais 1 dardo (cada dardo inflige 1d4+1, podem acertar alvos diferentes).",
   "+2 PM: os dardos causam 2d4+2 de dano cada."]),

s("detectar-magia","Detectar Magia","arcana","Adivinhação",1,1,"Padrão","Pessoal","Você","Cena","—",
  "Você consegue detectar a presença de magia em objetos e criaturas em alcance curto. Você sente se há magia presente e, com um teste bem-sucedido de Misticismo (CD 20), pode identificar a escola da magia.",
  ["+1 PM: detecta magia em alcance médio."]),

s("disfarce","Disfarce","arcana","Ilusão",1,1,"Padrão","Pessoal","Você","Cena","Não se aplica",
  "Você assume a aparência visual de qualquer humanoide de tamanho similar. A ilusão altera aparência física mas não altera sons, odores ou sensações ao toque. Criaturas que interagem com você podem tentar um teste de Investigação (CD 20) para perceber que algo está errado.",
  ["+1 PM: afeta também voz e odor.",
   "+2 PM: muda o alvo para 1 criatura tocada.",
   "+3 PM: você pode assumir aparência de qualquer criatura de tamanho Médio."]),

s("dominar-animal","Dominar Animal","arcana","Encantamento",1,1,"Padrão","Curto","1 animal","Cena","Vontade anula",
  "Você assume controle mental sobre um animal. Ele obedece suas ordens simples (atacar, fugir, ir a algum lugar) durante a cena. Ordens complexas ou contrárias à natureza do animal requerem novo teste de Vontade.",
  ["+2 PM: a duração aumenta para 1 dia.",
   "+5 PM: a duração se torna permanente."]),

s("explosao-de-chamas","Explosão de Chamas","arcana","Evocação",1,1,"Padrão","Pessoal","Área de 4,5m de raio centrada em você","Instantânea","Reflexos reduz à metade",
  "Uma explosão de chamas irradia de você em todas as direções. Inflige 1d6 pontos de dano de fogo por PM gasto a todas as criaturas na área. Você não sofre dano.",
  ["+1 PM (rep.): aumenta o dano em 1d6."]),

s("flutuacao","Flutuação","arcana","Transmutação",1,1,"Padrão","Curto","1 criatura","Cena","Vontade anula (não hostil)",
  "A criatura flutua até 1,5m acima do chão. Ela mantém seu deslocamento normal mas não pode escavar. Enquanto flutua, ataques de criatura no chão sofrem penalidade (a menos que tenham alcance).",
  ["+1 PM: aumenta a altura de flutuação para 3m."]),

s("forca-fantasmal","Força Fantasmal","arcana","Ilusão",1,1,"Padrão","Curto","1 criatura","Concentração","Vontade anula",
  "Você cria uma ilusão convincente de algo que amedronta a criatura. A criatura que falhar na resistência acredita na ilusão e age como se ela fosse real. Se a criatura 'atacar' a ilusão e notar que não está causando dano, pode tentar nova resistência.",
  ["+2 PM: a ilusão causa dano psíquico real (1d6 por round) se a criatura acreditar nela."]),

s("iluminar","Iluminar","arcana","Evocação",1,1,"Livre","Toque","Objeto","Cena","—",
  "O objeto tocado emite luz com intensidade equivalente à luz do dia em um raio de 6m e luz fraca em mais 6m além disso. A luz pode ser ativada ou desativada com ação livre.",
  ["+1 PM: a intensidade dobra (12m de luz plena, 12m de luz fraca)."]),

s("luz","Luz","arcana","Evocação",1,1,"Livre","Toque","Objeto","Cena","—",
  "O objeto toca emite luz suave em 6m de raio e luz ainda mais fraca em mais 6m além. Funciona como a magia Iluminar com menor intensidade. Pode ser lançada na forma de um facho de luz direcional.",
  ["+1 PM: a luz fica permanente até ser dispelida."]),

s("maos-magicas","Mãos Mágicas","arcana","Transmutação",1,1,"Movimento","Curto","Objeto de até 10kg","Concentração","—",
  "Você move e manipula um objeto não-segurado com força mágica invisível. Pode realizar tarefas simples que normalmente exigiriam mãos: abrir portas, pegar objetos, escrever, etc. Velocidade de manipulação é lenta (sem ser combate).",
  ["+1 PM: aumenta o peso máximo para 25kg.",
   "+2 PM: aumenta o peso máximo para 100kg.",
   "+1 PM: pode usar as mãos mágicas em combate (ataque de agarrar com bônus de Sabedoria)."]),

s("missil-magico","Míssil Mágico","arcana","Evocação",1,1,"Padrão","Médio","Até 5 mísseis","Instantânea","Nenhuma",
  "Você dispara mísseis de energia de força que acertam automaticamente. Você cria 1 míssil por PM gasto (máximo 5). Cada míssil inflige 1d4+1 pontos de dano de força. Você pode distribuir os mísseis entre múltiplos alvos visíveis.",
  []),

s("sono","Sono","arcana","Encantamento",1,1,"Padrão","Médio","Criaturas em área de 6m de raio","1 hora","Vontade anula",
  "Criaturas na área adormecem. Você pode afetar criaturas com um total de até 4 DV (afeta primeiro criaturas com menos PV). Criaturas adormecidas ficam indefesas. Dano ou barulho alto acorda a criatura imediatamente.",
  ["+1 PM: aumenta o total de DV afetados em +2.",
   "+2 PM: criaturas despertadas pelo dano adormecem novamente ao final do round."]),

s("torcao-corporal","Torção Corporal","arcana","Transmutação",1,1,"Padrão","Curto","1 criatura","Instantânea","Fortitude parcial",
  "Você torce e deforma o corpo da criatura magicamente. Inflige 2d6 pontos de dano e a criatura fica enjoada por 1 round. Se passar na resistência, sofre apenas o dano.",
  ["+1 PM: aumenta o dano em +1d6."]),
]

# ARCANA 2
ALL_SPELLS += [
s("alterar-tamanho","Alterar Tamanho","arcana","Transmutação",2,2,"Padrão","Curto","1 criatura","Cena","Fortitude anula",
  "A criatura aumenta ou diminui de tamanho em uma categoria. Aumentar (ex: Médio → Grande): +4 Força, –2 Destreza, –1 Defesa, +1 em rolagens de ataque e dano com armas corpo a corpo. Diminuir (ex: Médio → Pequeno): –4 Força, +2 Destreza, +1 Defesa, –1 em ataque e dano. Seus itens mudam junto.",
  ["+2 PM: muda o alvo para você (não requer resistência).",
   "+4 PM: altera o tamanho em duas categorias."]),

s("amarras-etereas","Amarras Etéreas","arcana","Conjuração",2,2,"Padrão","Médio","1 criatura","Cena","Vontade anula",
  "Algemas de força imaterial imobilizam a criatura alvo. Uma criatura imobilizada não pode se mover, mas ainda pode realizar outras ações. Para se libertar, a criatura precisa de um teste bem-sucedido de Atletismo (CD 20) como ação padrão.",
  ["+1 PM: aumenta a CD para se libertar em +5.",
   "+2 PM: a criatura fica completamente imobilizada (não pode realizar nenhuma ação)."]),

s("enfraquecer","Enfraquecer","arcana","Necromancia",2,2,"Padrão","Curto","1 criatura","Cena","Fortitude parcial",
  "A criatura sofre –4 em Força e Constituição. Se falhar totalmente na resistência (resultado 5 ou mais abaixo da CD), sofre –8 em cada. Criaturas reduzidas a Força 0 ficam indefesas.",
  ["+2 PM: muda o alvo para criaturas em área de 6m de raio."]),

s("imagem-ilusoria","Imagem Ilusória","arcana","Ilusão",2,2,"Padrão","Médio","Cubo de 3m de lado","Concentração","Inteligência anula",
  "Você cria uma imagem ilusória visual de qualquer objeto ou criatura dentro da área. A ilusão não produz sons, odores ou sensações ao toque. Criaturas que tocam ou interagem fisicamente com ela e falham na resistência continuam acreditando.",
  ["+1 PM: a ilusão inclui sons realistas.",
   "+2 PM: a ilusão inclui odores.",
   "+3 PM: a ilusão se torna permanente até ser dispelida."]),

s("indetectavel","Indetectável","arcana","Abjuração",2,2,"Movimento","Pessoal","Você","Cena","—",
  "Você fica indetectável por magia de adivinhação. Magias como Detectar Magia, Localizar Criatura e similares não podem encontrá-lo ou detectar sua magia.",
  ["+2 PM: muda o alvo para 1 criatura tocada."]),

s("invisibilidade","Invisibilidade","arcana","Ilusão",2,2,"Padrão","Toque","1 criatura ou objeto","Cena","—",
  "A criatura ou objeto fica completamente invisível. Ações ofensivas (atacar, lançar magia hostil) encerram o efeito imediatamente. Uma criatura invisível recebe +10 em Furtividade e ataques contra ela têm 50% de chance de falhar automaticamente.",
  ["+2 PM: a invisibilidade não é cancelada por ações ofensivas.",
   "+3 PM: muda o alvo para você e aliados em alcance curto."]),

s("nevoa-mental","Névoa Mental","arcana","Encantamento",2,2,"Padrão","Curto","1 criatura","Cena","Vontade anula",
  "A mente da criatura fica nublada e confusa. Ela sofre –5 em todos os testes de perícias baseadas em Inteligência, –5 em Vontade e não pode usar habilidades que exijam concentração.",
  ["+2 PM: reduz também a Inteligência em –2."]),

s("paralisar","Paralisar","arcana","Encantamento",2,2,"Padrão","Curto","1 humanoide","Cena","Vontade anula",
  "O humanoide fica paralisado (indefeso e incapaz de se mover ou agir). Ao final de cada um de seus turnos, pode tentar outra resistência de Vontade para escapar do efeito.",
  ["+3 PM: muda o alvo para qualquer criatura.",
   "+2 PM: a criatura não pode tentar novas resistências para escapar."]),

s("raio-de-gelo","Raio de Gelo","arcana","Evocação",2,2,"Padrão","Curto","1 criatura","Instantânea","Fortitude parcial",
  "Um raio de frio intenso atinge a criatura. Inflige 4d6 pontos de dano de frio. Se falhar na resistência, a criatura fica lenta (–2 em ataques, Defesa e Reflexos) por 1 round.",
  ["+2 PM: aumenta o dano em +2d6.",
   "+2 PM: se falhar na resistência, a criatura fica imobilizada por 1 round em vez de lenta."]),

s("raio-de-luz-solar","Raio de Luz Solar","arcana","Evocação",2,2,"Padrão","Médio","Raio de luz (1,5m de largura, 18m de comprimento)","Instantânea","Reflexos reduz à metade",
  "Um raio de luz solar concentrada queima tudo em sua linha. Inflige 4d6 pontos de dano de luz. Mortos-vivos e criaturas sensíveis à luz sofrem dano dobrado.",
  ["+2 PM: aumenta o dano em +2d6.",
   "+2 PM: criaturas que falharem na resistência ficam cegas por 1 round."]),

s("teia","Teia","arcana","Conjuração",2,2,"Padrão","Médio","Cubo de 6m de lado","Cena","Reflexos anula",
  "Você envolve a área em teias mágicas pegajosas. Criaturas na área ficam enredadas (–2 em ataques, –4 em Destreza, não podem correr). Para se mover enquanto enredadas, precisam de um teste de Atletismo ou Acrobacia (CD 20) a cada metro. Fogo destrói a teia em 1 round.",
  ["+1 PM: aumenta a CD dos testes para escapar em +5.",
   "+2 PM: criaturas que falharem na resistência ficam imobilizadas em vez de enredadas."]),

s("terreno-ilusorio","Terreno Ilusório","arcana","Ilusão",2,2,"1 minuto","Longo","Área de 12m de raio","Cena","Inteligência anula",
  "Você faz com que o terreno na área pareça completamente diferente do que é. Um campo pode parecer uma floresta, um abismo pode parecer um gramado plano, etc. A ilusão é estática e não muda.",
  ["+3 PM: a ilusão inclui sons e odores condizentes.",
   "+5 PM: a duração se torna permanente."]),

s("trovao","Trovão","arcana","Evocação",2,2,"Padrão","Médio","Linha de 18m","Instantânea","Fortitude reduz à metade",
  "Um trovão ensurdecedor se propaga em linha. Inflige 4d6 pontos de dano sônico a tudo em seu caminho. Criaturas que falharem na resistência ficam atordoadas por 1 round e ensurdecidas por 1 minuto.",
  ["+2 PM: aumenta o dano em +2d6.",
   "+1 PM: aumenta o comprimento da linha em +6m."]),
]

# ARCANA 3
ALL_SPELLS += [
s("ancora-dimensional","Âncora Dimensional","arcana","Abjuração",3,3,"Padrão","Médio","1 criatura ou portal dimensional","Cena","Vontade anula",
  "Você trava a criatura ao plano material. Ela fica impedida de usar qualquer habilidade de teleporte, viagem planar, deslocamento dimensional ou movimento extradimensional durante a cena.",
  ["+3 PM: afeta todas as criaturas em área de 9m de raio."]),

s("bola-de-fogo","Bola de Fogo","arcana","Evocação",3,3,"Padrão","Médio","Área de 9m de raio","Instantânea","Reflexos reduz à metade",
  "Uma bola de fogo explode no ponto designado, liberando uma explosão de calor intenso. Inflige 5d6 pontos de dano de fogo a todas as criaturas e objetos na área.",
  ["+2 PM: aumenta o dano em +2d6.",
   "+1 PM: aumenta o raio em +3m."]),

s("contato-extraplanar","Contato Extraplanar","arcana","Adivinhação",3,3,"1 minuto","Pessoal","Você","Concentração","—",
  "Você faz contato mental com uma inteligência extraplanar poderosa que pode responder perguntas. Você pode fazer 1 pergunta por round. A entidade responde com 'sim', 'não', 'provavelmente', 'improvável' ou 'desconhecido'. Há 10% de chance cumulativa por pergunta de perder 1 ponto de Sabedoria temporariamente (recuperado após 1 dia).",
  ["+2 PM: a entidade fornece respostas mais elaboradas (até uma frase)."]),

s("persona","Persona","arcana","Ilusão",3,1,"Padrão","Pessoal","Você","Cena","Não se aplica",
  "Você assume completamente a identidade de outra pessoa, incluindo aparência, voz, maneirismos e odor. Você pode imitar qualquer pessoa que já tenha visto. Testes para perceber que você está disfarçado têm CD 25 em vez de 20.",
  ["+2 PM: muda o alvo para 1 criatura tocada."]),

s("portal-arcano","Portal Arcano","arcana","Conjuração",3,3,"Padrão","Curto","—","1 round/nível","—",
  "Você cria um portal dimensional entre dois locais que você já visitou. O portal tem 3m de altura e 2m de largura. Qualquer criatura pode atravessá-lo em ambos os sentidos.",
  ["+5 PM: o portal pode conectar a locais em outros planos."]),

s("telecinesia","Telecinesia","arcana","Transmutação",3,3,"Padrão","Médio","1 objeto ou criatura","Concentração","Vontade anula",
  "Você move objetos ou criaturas com o poder da mente. Pode mover um objeto de até 200kg a uma velocidade de até 9m por round. Se usar contra criatura, ela pode resistir com Vontade; se falhar, fica suspenso no ar e você pode movê-la.",
  ["+2 PM: aumenta o peso máximo para 500kg.",
   "+2 PM: pode usar o objeto como arma de arremesso (dano 2d6, alcance médio).",
   "+3 PM: pode mover múltiplos objetos (total de peso máximo)."]),

s("voo","Voo","arcana","Transmutação",3,3,"Movimento","Toque","1 criatura","Cena","—",
  "A criatura tocada ganha a capacidade de voar com deslocamento de 18m e manobrabilidade boa. Se a magia acabar enquanto a criatura estiver no ar, ela cai suavemente (como sob efeito de Queda Suave).",
  ["+2 PM: muda o alvo para você e aliados em alcance curto.",
   "+1 PM: aumenta o deslocamento de voo em +6m.",
   "+2 PM: a manobrabilidade melhora para perfeita."]),
]

# ARCANA 4
ALL_SPELLS += [
s("alterar-memoria","Alterar Memória","arcana","Encantamento",4,4,"Padrão","Curto","1 criatura","Permanente","Vontade anula",
  "Você modifica as memórias da criatura. Pode: apagar memórias de um evento de até 5 minutos de duração; criar memórias falsas de um evento de até 5 minutos; ou alterar memórias existentes de até 5 minutos.",
  ["+2 PM: pode alterar memórias de até 1 hora de duração.",
   "+5 PM: pode apagar todas as memórias de um dia inteiro."]),

s("conjurar-elemental","Conjurar Elemental","arcana","Conjuração",4,4,"Padrão","Curto","1 elemental convocado","Cena","—",
  "Você convoca um elemental de tamanho Médio (ar, água, fogo ou terra) para servir você. O elemental age em sua iniciativa e obedece suas ordens.",
  ["+2 PM: conjura um elemental de tamanho Grande.",
   "+4 PM: conjura um elemental de tamanho Enorme.",
   "+2 PM: conjura 1d3 elementais de tamanho Médio."]),

s("controlar-gravidade","Controlar a Gravidade","arcana","Transmutação",4,4,"Padrão","Médio","Área de 9m de raio","Concentração","Vontade anula",
  "Você altera a gravidade em uma área. Pode: inverter (criaturas caem em direção ao teto, sofrendo dano de queda); aumentar (criaturas ficam lentas, –6m em deslocamento, –2 em ataques); ou reduzir (criaturas flutam até 1,5m, podem saltar até 9m).",
  ["+3 PM: a área aumenta para 18m de raio."]),

s("imagem-perfeita","Imagem Perfeita","arcana","Ilusão",4,4,"Padrão","Médio","Cubo de 6m de lado","Concentração","Inteligência anula",
  "Como Imagem Ilusória, mas a ilusão afeta todos os sentidos: visual, auditivo, olfativo e tátil. É praticamente indistinguível da realidade. Apenas interação física intensa (tentar atravessar uma parede ilusória) revela a ilusão.",
  ["+3 PM: a ilusão se torna permanente."]),

s("voragem-dimensional","Voragem Dimensional","arcana","Conjuração",4,4,"Padrão","Longo","1 criatura","Instantânea","Vontade anula",
  "Uma fissura dimensional se abre e engole a criatura, lançando-a em um espaço entre os planos. A criatura desaparece por 1d6 rounds, depois reaparece no espaço mais próximo disponível ao local original.",
  ["+2 PM: você escolhe onde a criatura reaparece (dentro de alcance longo)."]),
]

# ARCANA 5
ALL_SPELLS += [
s("alterar-destino","Alterar Destino","arcana","Adivinhação",5,5,"Reação","Curto","1 criatura","Instantânea","—",
  "Você intervém no destino de uma criatura. Use como reação após um dado ser rolado mas antes de aplicar o resultado. Pode: fazer um ataque que errou acertar (ou vice-versa); fazer um teste que falhou passar (ou vice-versa); maximizar ou minimizar um dano rolado.",
  []),

s("controlar-tempo","Controlar o Tempo","arcana","Transmutação",5,7,"Padrão","Pessoal","Você","Especial","—",
  "Você para o tempo para todas as criaturas e objetos ao seu redor. Durante esse período (1d4+1 rounds), outras criaturas ficam paralisadas, projéteis se imobilizam no ar e você pode agir normalmente. Ao final, o tempo retoma de onde parou.",
  []),

s("xagarashar","Xagarashar","arcana","Evocação",5,4,"Padrão","Longo","Área de 9m de raio","Instantânea","Reflexos reduz à metade",
  "Uma tempestade de energia mágica pura explode no ponto designado. A magia inflige 10d6 pontos de dano de energia (escolha o tipo no momento do lançamento: ácido, elétrico, frio ou fogo) a todas as criaturas na área.",
  ["+2 PM: aumenta o dano em +2d6."]),
]

# ======================
# MAGIAS DIVINAS
# ======================

# DIVINA 1
ALL_SPELLS += [
s("abençoar-alimentos","Abençoar Alimentos","divina","Transmutação",1,1,"Padrão","Toque","Alimentos e bebidas para até 6 pessoas","Permanente","—",
  "Você abençoa alimentos e bebidas, purificando-os e tornando-os nutritivos. Alimentos abençoados curam 1 PV por porção consumida e removem venenos e doenças naturais presentes nos alimentos. Criaturas malignas ou mortos-vivos não recebem benefício dos alimentos abençoados.",
  ["+1 PM: afeta alimentos para +6 pessoas adicionais.",
   "+2 PM: cada porção cura 1d6 PV em vez de 1.",
   "+3 PM: os alimentos também removem as condições envenenado e enfermo de quem os consumir."]),

s("acalmar-animal","Acalmar Animal","divina","Encantamento",1,1,"Padrão","Curto","1 animal","Cena","Vontade anula",
  "O animal fica prestativo em relação a você. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe +10 nos testes de Adestramento e Diplomacia que fizer contra o animal.",
  ["+1 PM: muda o alcance para médio.",
   "+1 PM: muda o alvo para 1 monstro ou espírito com Int –5 ou –4.",
   "+2 PM: aumenta o número de alvos em +1.",
   "+5 PM: muda o alvo para 1 monstro ou espírito. Requer 3º círculo."]),

s("bencao","Bênção","divina","Encantamento",1,1,"Padrão","Curto","Aliados em área de 9m de raio","Cena","—",
  "Você abençoa seus aliados na área com o favor divino. Eles recebem +1 nas jogadas de ataque e em todas as resistências.",
  ["+1 PM: aumenta o bônus em +1.",
   "+1 PM: aliados também recebem +1d4 de dano nos ataques.",
   "+2 PM: muda o alcance para médio."]),

s("castigar","Castigar","divina","Evocação",1,1,"Padrão","Toque","1 criatura","Instantânea","Fortitude reduz à metade",
  "Você canaliza energia divina em um toque poderoso. A criatura sofre 1d8 + seu modificador de Sabedoria (ou Carisma) de dano sagrado (contra criaturas malignas) ou profano (contra criaturas benignas).",
  ["+1 PM: aumenta o dano em +1d8.",
   "+2 PM: muda o alcance para curto."]),

s("causar-ferimentos","Causar Ferimentos","divina","Necromancia",1,1,"Padrão","Toque","1 criatura viva","Instantânea","Vontade reduz à metade",
  "Você canaliza energia negativa para ferir uma criatura viva. Inflige 1d8 + seu atributo de magia pontos de dano. Se usado contra mortos-vivos, cura-os em vez de ferir.",
  ["+1 PM: aumenta o dano em +1d8.",
   "+2 PM: muda o alcance para curto."]),

s("consagrar","Consagrar","divina","Evocação",1,1,"1 minuto","Toque","Área de 9m de raio centrada no ponto tocado","Dia","Nenhuma",
  "A área fica consagrada à sua divindade. Mortos-vivos e criaturas do alinhamento oposto ao da sua divindade sofrem –1 em todos os testes e nas resistências dentro da área. Aliados que compartilham o alinhamento da divindade recebem +1 em testes de Vontade.",
  ["+2 PM: mortos-vivos sofrem –2 nos testes dentro da área.",
   "+3 PM: a duração aumenta para semana.",
   "+5 PM: a duração aumenta para permanente."]),

s("controlar-plantas","Controlar Plantas","divina","Transmutação",1,1,"Padrão","Médio","Plantas em área de 9m de raio","Concentração","—",
  "Você controla plantas naturais na área. Pode fazer com que ramos e raízes se movam para enredar criaturas (Reflexos CD Sab para evitar), criar cobertura vegetal, abrir passagem em vegetação densa, dobrar e moldar plantas em formas úteis.",
  ["+1 PM: aumenta a área em +3m de raio.",
   "+2 PM: pode controlar plantas-criaturas com Int –5 ou –4."]),

s("curar-ferimentos","Curar Ferimentos","divina","Evocação",1,1,"Padrão","Toque","1 criatura viva","Instantânea","Vontade anula (não hostil)",
  "A criatura recupera 1d8 + seu modificador de atributo de magia (Sabedoria ou Carisma) em PV. Se usada contra mortos-vivos, causa dano sagrado equivalente em vez de curar.",
  ["+1 PM: aumenta a cura em +1d8.",
   "+2 PM: muda o alcance para curto.",
   "+5 PM: muda o alvo para aliados em área de 6m de raio."]),

s("detectar-alinhamento","Detectar Alinhamento","divina","Adivinhação",1,1,"Padrão","Pessoal","Você","Cena","—",
  "Você detecta o alinhamento de criaturas e objetos mágicos em alcance curto. Sente a intensidade do alinhamento (Ordeiro/Neutro/Caótico). Com Misticismo CD 15, pode detectar também Bem/Mal se houver.",
  ["+1 PM: detecta especificamente se a criatura é Boa ou Má além do eixo Ordem/Caos."]),

s("domar-animal","Domar Animal","divina","Encantamento",1,1,"Padrão","Curto","1 animal","Permanente","Vontade anula",
  "O animal fica domesticado e obediente a você. Pode ser treinado como um animal doméstico. O animal é leal até a morte mas não age contra sua natureza básica.",
  ["+3 PM: pode afetar monstros bestas com Int –4 ou –3."]),

s("orientacao","Orientação","divina","Adivinhação",1,1,"Livre","Toque","1 criatura","1 minuto","—",
  "Você concede orientação divina à criatura. Ela recebe +1 em um único teste à sua escolha feito durante a duração da magia.",
  ["+1 PM: aumenta o bônus em +1.",
   "+2 PM: a criatura pode rolar o teste duas vezes e usar o melhor resultado."]),

s("protecao","Proteção","divina","Abjuração",1,1,"Padrão","Toque","1 criatura","Cena","—",
  "A criatura recebe +2 na Defesa e nas resistências contra criaturas de um tipo especificado por você (aberrações, animais, construtos, mortos-vivos, etc.).",
  ["+1 PM: aumenta o bônus em +2.",
   "+2 PM: muda o alvo para aliados em alcance curto."]),

s("remover-veneno","Remover Veneno","divina","Evocação",1,1,"Padrão","Toque","1 criatura ou objeto","Instantânea","—",
  "Remove um veneno ou doença natural da criatura. A criatura também é curada de qualquer dano de atributo causado pelo veneno ou doença.",
  ["+2 PM: neutraliza também venenos e doenças mágicas."]),

s("sagrar-arma","Sagrar Arma","divina","Transmutação",1,1,"Movimento","Toque","1 arma","Cena","Nenhuma",
  "A arma fica sagrada (ou profana, se sua divindade for maligna). Ela causa +1d6 de dano sagrado (ou profano) extra contra criaturas do alinhamento oposto. Também é considerada mágica para fins de RD.",
  ["+1 PM: aumenta o dano extra em +1d6.",
   "+2 PM: a arma também recebe +1 nas jogadas de ataque e dano."]),
]

# DIVINA 2
ALL_SPELLS += [
s("aliado-animal","Aliado Animal","divina","Encantamento",2,2,"1 minuto","Pessoal","Você","Permanente","—",
  "Um animal se torna seu companheiro leal e permanente. Você ganha um animal companheiro de ND igual à metade do seu nível (mínimo 1). O animal obedece suas ordens e melhora conforme você ganha níveis.",
  ["+3 PM: o animal companheiro é de ND igual ao seu nível."]),

s("auxilio","Auxílio","divina","Encantamento",2,2,"Padrão","Toque","1 criatura","Cena","—",
  "A criatura recebe +1 nas jogadas de ataque, em todas as resistências e ganha +1d8 PV temporários (que são removidos ao final da cena).",
  ["+1 PM: o bônus aumenta em +1 e os PV temporários aumentam em +1d8."]),

s("controlar-fogo","Controlar Fogo","divina","Evocação",2,2,"Padrão","Curto","Fogo em área de 9m de raio","Concentração","—",
  "Você controla chamas existentes na área. Pode aumentar (dobra tamanho), diminuir ou extinguir o fogo. Pode modelar as chamas, criar paredes de fogo de até 6m de comprimento (3d6 de dano de fogo a quem atravessa, Reflexos CD 15 reduz à metade).",
  ["+1 PM: pode criar fogo onde não existe (em material inflamável dentro do alcance).",
   "+2 PM: criaturas que falharem nos Reflexos ao atravessar uma parede de fogo pegam fogo (1d6 dano por round até apagado)."]),

s("controlar-madeira","Controlar Madeira","divina","Transmutação",2,2,"Padrão","Médio","Objetos de madeira em área de 9m de raio","Concentração","Vontade anula (objetos segurados)",
  "Você controla madeira na área. Pode dobrar, torcer ou quebrar objetos de madeira, criar barreiras de madeira de até 3m, ou fazer raízes e galhos crescerem para enredar criaturas (Reflexos CD Sab).",
  ["+2 PM: pode controlar árvores vivas (como se fossem apenas madeira não-mágica)."]),

s("curar-ferimentos-em-massa","Curar Ferimentos em Massa","divina","Evocação",2,3,"Padrão","Curto","Aliados em área de 6m de raio","Instantânea","Vontade anula (não hostil)",
  "Todos os aliados na área recuperam 1d8 + seu modificador de atributo de magia PV.",
  ["+1 PM: aumenta a cura em +1d8."]),

s("invocar-relampago","Invocar Relâmpago","divina","Evocação",2,2,"Padrão","Longo","Relâmpagos (1 por round)","Concentração","Reflexos reduz à metade",
  "Você invoca nuvens de tempestade sobrenaturais. A cada round, como ação livre, você pode chamar um relâmpago que atinge um ponto dentro do alcance, infligindo 3d6 de dano elétrico em raio de 1,5m.",
  ["+2 PM: o dano aumenta para 5d6 por relâmpago.",
   "+1 PM: você pode chamar 2 relâmpagos por round."]),

s("silencio","Silêncio","divina","Ilusão",2,2,"Padrão","Médio","Área de 6m de raio","Concentração","Vontade anula (criaturas)",
  "Nenhum som pode ser criado ou transmitido dentro da área de efeito. Criaturas dentro da área não conseguem lançar magias com componente verbal. Ideal para evitar alarmes e comunicação.",
  ["+2 PM: criaturas dentro da área também ficam ensurdecidas mesmo que passem na resistência."]),

s("vitalidade","Vitalidade","divina","Evocação",2,2,"Padrão","Toque","1 criatura","Cena","—",
  "A criatura recupera 1d8 PV e fica energizada: recebe +2 em For e Con durante a cena.",
  ["+1 PM: aumenta a cura em +1d8 e o bônus em +1."]),
]

# DIVINA 3
ALL_SPELLS += [
s("controlar-agua","Controlar Água","divina","Transmutação",3,3,"Padrão","Longo","Massa de água em área de 30m de raio","Concentração","—",
  "Você controla água na área. Pode elevar ou rebaixar o nível em até 3m por round (máximo 9m de diferença), criar correntes e redemoinho, ou dividir águas criando um corredor seco de até 3m de largura.",
  ["+2 PM: você pode caminhar sobre a superfície da água durante a cena.",
   "+3 PM: a área de controle aumenta para 90m de raio."]),

s("controlar-terra","Controlar Terra","divina","Transmutação",3,3,"Padrão","Médio","Terra em área de 9m de raio","Concentração","Reflexos anula (enredar)",
  "Você controla pedra e terra na área. Pode criar tremores (criaturas fazem Reflexos CD Sab ou caem), elevar ou rebaixar o terreno em até 1,5m, criar paredes de terra de até 1,5m de altura e 6m de comprimento, ou fazer o chão prender criaturas.",
  ["+2 PM: pode mover e modelar pedra sólida (criar esculturas, selar portas de pedra, etc.).",
   "+3 PM: cria um tremor de terra que afeta área de 18m de raio."]),

s("criar-alimento","Criar Alimento","divina","Conjuração",3,2,"1 minuto","Toque","—","1 dia","—",
  "Você cria alimentos e bebidas simples mas nutritivos suficientes para alimentar até 15 pessoas por um dia completo.",
  ["+1 PM: alimenta +15 pessoas.",
   "+3 PM: o alimento equivale a uma refeição revitalizante (remove fadiga e exaustão)."]),

s("cura-plena","Cura Plena","divina","Evocação",3,3,"Padrão","Toque","1 criatura","Instantânea","Vontade anula (não hostil)",
  "A criatura recupera todos os seus PV. Remove também as condições envenenado, doente e abalado.",
  ["+2 PM: muda o alcance para curto.",
   "+5 PM: muda o alvo para aliados em área de 6m de raio."]),

s("purificar","Purificar","divina","Evocação",3,2,"Padrão","Toque","1 criatura ou área de 9m de raio","Instantânea","Fortitude anula",
  "Remove maldições e estados negativos mágicos. Também limpa venenos, doenças e contaminações sobrenaturais. Maldições mais poderosas podem exigir testes de Misticismo para serem removidas.",
  ["+3 PM: remove também maldições lançadas por feiticeiros de 10º nível ou acima."]),

s("ressuscitar-animal","Ressuscitar Animal","divina","Necromancia",3,3,"1 minuto","Toque","1 animal morto","Instantânea","—",
  "Você traz um animal de volta à vida. O animal deve ter morrido há no máximo 1 dia por nível do lançador. Retorna com 1 PV e fica fragilizado por 1 semana (–2 em todos os testes). Requer o corpo intacto.",
  ["+2 PM: o prazo máximo aumenta para 1 semana por nível."]),
]

# DIVINA 4
ALL_SPELLS += [
s("conjurar-mortos-vivos","Conjurar Mortos-Vivos","divina","Necromancia",4,4,"Padrão","Curto","Mortos-vivos convocados","Cena","—",
  "Você convoca mortos-vivos para servi-lo. Pode conjurar mortos-vivos com ND total igual ao seu nível (ex: 8º nível = ND 8 total, como dois ND 4 ou oito ND 1). Os mortos-vivos seguem suas ordens e desaparecem ao final da cena.",
  ["+2 PM: aumenta o ND total disponível em +2.",
   "+5 PM: os mortos-vivos permanecem por 1 hora."]),

s("controlar-clima","Controlar o Clima","divina","Transmutação",4,4,"10 minutos","Especial","Área de 1,5km de raio","4 horas","—",
  "Você controla o clima em uma enorme área. Pode criar tempestades com raios (1d6 dano/round a quem estiver ao ar livre), neblina densa (visibilidade 6m), ventos fortes (desvantagem em ataques com projéteis), chuva ou neve intensa (-2 em Percepção), calor extremo ou frio extremo. Leva 1d4x10 minutos para o clima mudar.",
  ["+3 PM: a duração aumenta para 8 horas.",
   "+5 PM: a área aumenta para 5km de raio."]),

s("milagre-menor","Milagre Menor","divina","Evocação",4,5,"Padrão","Especial","Especial","Especial","Especial",
  "Você pede um favor menor à sua divindade. O milagre menor pode: duplicar os efeitos de qualquer magia divina de até 3º círculo; criar um efeito único com poder equivalente (aprovado pelo Mestre); ou conceder um bônus de +4 em qualquer teste para o qual sua divindade é protetora. A divindade pode negar se a relação com o devoto não for boa.",
  []),

s("ressuscitar","Ressuscitar","divina","Necromancia",4,5,"10 minutos","Toque","1 criatura morta","Instantânea","—",
  "Você traz uma criatura de volta à vida. Ela deve ter morrido há no máximo 1 semana por nível do lançador. A criatura retorna com 1 PV e perde 1 ponto permanente de Constituição. Criaturas que morreram de velhice não podem ser ressuscitadas por esta magia.",
  ["+5 PM: o prazo máximo não tem limite.",
   "+3 PM: a criatura retorna sem perder pontos de Constituição."]),
]

# DIVINA 5
ALL_SPELLS += [
s("grande-cura","Grande Cura","divina","Evocação",5,6,"Padrão","Curto","Aliados em área de 9m de raio","Instantânea","—",
  "Todos os aliados na área recuperam todos os seus PV e são completamente curados de qualquer condição negativa não permanente (venenos, doenças, maldições de nível inferior ao 5º círculo, etc.).",
  []),

s("milagre","Milagre","divina","Evocação",5,10,"Padrão","Especial","Especial","Especial","Especial",
  "Você pede a intervenção direta da sua divindade. O milagre pode: duplicar qualquer magia divina sem limite de círculo; restaurar à vida alguém que morreu há qualquer tempo; remover qualquer maldição ou doença, incluindo as permanentes; transformar uma área de até 30m de raio de acordo com a vontade da divindade; ou criar qualquer outro efeito com o poder de um deus (aprovado pelo Mestre). A divindade pode exigir uma missão, sacrifício ou prova de fé em troca.",
  []),

s("praga-divina","Praga Divina","divina","Necromancia",5,6,"Padrão","Longo","1 criatura ou área de 30m de raio","Permanente","Fortitude anula",
  "Você amaldiçoa com uma praga divina. O efeito é determinado pela sua divindade e pode incluir doenças sobrenaturais, maldições, transformações físicas, ou outros efeitos permanentes. A praga só pode ser removida por Milagre ou pela intervenção de um ser divino poderoso.",
  []),

s("ressurreicao-total","Ressurreição Total","divina","Necromancia",5,8,"10 minutos","Toque","1 criatura morta","Instantânea","—",
  "Você traz uma criatura de volta à vida sem nenhuma restrição de tempo, mesmo que o corpo esteja destruído (desde que tenha algum fragmento). A criatura retorna com todos os seus PV, sem perda de Constituição e sem penalidades. Pode trazer de volta criaturas que morreram de velhice, recriando o corpo em sua forma jovem adulta.",
  []),
]

print(f"Total de magias: {len(ALL_SPELLS)}")

# Organize by type and circle
from collections import Counter
summary = Counter((s["tipo"], s["circulo"]) for s in ALL_SPELLS)
for key in sorted(summary.keys()):
    print(f"  {key[0].capitalize()} {key[1]}º círculo: {summary[key]} magias")

# Save JSON as plain array to match existing Magias.tsx expectation
with open(r"C:\VS.Projetos\t20-mestre-supremo\src\data\magias.json", "w", encoding="utf-8") as f:
    json.dump(ALL_SPELLS, f, ensure_ascii=False, indent=2)

print("\nJSON salvo com sucesso!")
print(f"Arquivo: src/data/magias.json")
