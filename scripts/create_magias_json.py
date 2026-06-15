import json
import re

# Read extracted text
with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_all.txt", "r", encoding="utf-8") as f:
    raw = f.read()

# Also read the spell list (tables)
with open(r"C:\VS.Projetos\t20-mestre-supremo\magias_full.txt", "r", encoding="utf-8") as f:
    lista = f.read()

# ---- BUILD SPELL CATALOG FROM TABLES (magias_full.txt) ----
# We'll store: nome -> {tipo, escola, circulo}
catalogo = {}

# Parse arcane table lines like: Nome Tipo Escola 1 PM
circulo_atual = None
tipo_atual = None
escola_map = {
    "Abjur": "Abjuração", "Adiv": "Adivinhação", "Encan": "Encantamento",
    "Evoc": "Evocação", "Ilusão": "Ilusão", "Ilusao": "Ilusão",
    "Necro": "Necromancia", "Trans": "Transmutação", "Conv": "Convocação",
    "Abjuração": "Abjuração", "Adivinhação": "Adivinhação",
    "Encantamento": "Encantamento", "Evocação": "Evocação",
    "Necromancia": "Necromancia", "Transmutação": "Transmutação",
    "Convocação": "Convocação"
}

lines = lista.split("\n")
for line in lines:
    line = line.strip()
    if "ARCANAS DE 1º" in line or "ARCANAS 1º" in line:
        tipo_atual = "arcana"; circulo_atual = 1
    elif "ARCANAS DE 2º" in line or "ARCANAS 2º" in line:
        tipo_atual = "arcana"; circulo_atual = 2
    elif "ARCANAS DE 3º" in line or "ARCANAS 3º" in line:
        tipo_atual = "arcana"; circulo_atual = 3
    elif "ARCANAS DE 4º" in line or "ARCANAS 4º" in line:
        tipo_atual = "arcana"; circulo_atual = 4
    elif "ARCANAS DE 5º" in line or "ARCANAS 5º" in line:
        tipo_atual = "arcana"; circulo_atual = 5
    elif "DIVINAS DE 1º" in line or "DIVINAS 1º" in line:
        tipo_atual = "divina"; circulo_atual = 1
    elif "DIVINAS DE 2º" in line or "DIVINAS 2º" in line:
        tipo_atual = "divina"; circulo_atual = 2
    elif "DIVINAS DE 3º" in line or "DIVINAS 3º" in line:
        tipo_atual = "divina"; circulo_atual = 3
    elif "DIVINAS DE 4º" in line or "DIVINAS 4º" in line:
        tipo_atual = "divina"; circulo_atual = 4
    elif "DIVINAS DE 5º" in line or "DIVINAS 5º" in line:
        tipo_atual = "divina"; circulo_atual = 5
    elif "UNIVERSAL" in line.upper():
        tipo_atual = "universal"; circulo_atual = None

# Hardcode spell list from book with all info
# Format: (nome, tipo, escola, circulo, pm, execucao, alcance, alvo/area, duracao, resistencia)
MAGIAS_ARCANAS = {
    1: [
        ("Adaga Mental", "Encantamento", 1, "Padrão", "Curto", "1 criatura", "Instantânea", "Vontade anula"),
        ("Alarme", "Abjuração", 2, "1 min", "Toque", "área", "8 horas", "Nenhuma"),
        ("Amedrontar", "Necromancia", 1, "Padrão", "Curto", "1 criatura", "Cena", "Vontade anula"),
        ("Ampliar Sentidos", "Adivinhação", 1, "Padrão", "Pessoal", "você", "Cena", "—"),
        ("Arma Mágica", "Transmutação", 1, "Movimento", "Toque", "1 arma", "Cena", "Nenhuma"),
        ("Armadura Arcana", "Abjuração", 1, "Movimento", "Pessoal", "você", "Cena", "—"),
        ("Bênção de Voo", "Transmutação", 2, "Movimento", "Pessoal", "você", "Cena", "—"),
        ("Bola de Fogo", "Evocação", 3, "Padrão", "Médio", "área de 9m de raio", "Instantânea", "Reflexos reduz à metade"),
        ("Bruma", "Conjuração", 1, "Padrão", "Curto", "cubo de 9m", "Cena", "—"),
        ("Camaleão", "Ilusão", 1, "Movimento", "Pessoal", "você", "Cena", "—"),
        ("Charme Pessoa", "Encantamento", 1, "Padrão", "Curto", "1 humanoide", "Cena", "Vontade anula"),
        ("Choque Elétrico", "Evocação", 1, "Padrão", "Toque", "1 criatura", "Instantânea", "Reflexos reduz à metade"),
        ("Compreensão", "Adivinhação", 1, "Padrão", "Pessoal", "você", "Cena", "—"),
        ("Conjurar Monstro", "Conjuração", 1, "Padrão", "Curto", "1 aliado convocado", "Concentração", "—"),
        ("Controlar Chamas", "Transmutação", 1, "Padrão", "Curto", "fogo em área de 3m", "Cena", "—"),
        ("Criar Água", "Conjuração", 1, "Padrão", "Toque", "—", "Permanente", "—"),
        ("Dardo de Força", "Evocação", 1, "Padrão", "Curto", "1 criatura", "Instantânea", "Nenhuma"),
        ("Detectar Magia", "Adivinhação", 1, "Padrão", "Pessoal", "você", "Cena", "—"),
        ("Disfarce", "Ilusão", 1, "Padrão", "Pessoal", "você", "Cena", "Não se aplica"),
        ("Dominar Animal", "Encantamento", 1, "Padrão", "Curto", "1 animal", "Cena", "Vontade anula"),
        ("Enfraquecer", "Necromancia", 2, "Padrão", "Curto", "1 criatura", "Cena", "Fortitude parcial"),
        ("Explosão de Chamas", "Evocação", 1, "Padrão", "Pessoal", "área de 4,5m", "Instantânea", "Reflexos reduz à metade"),
        ("Flutuação", "Transmutação", 1, "Padrão", "Curto", "1 criatura", "Cena", "Vontade anula (não hostil)"),
        ("Força Fantasmal", "Ilusão", 1, "Padrão", "Curto", "1 criatura", "Concentração", "Vontade anula"),
        ("Iluminar", "Evocação", 1, "Livre", "Toque", "objeto", "Cena", "—"),
        ("Imagem Ilusória", "Ilusão", 2, "Padrão", "Médio", "cubo de 3m de lado", "Concentração", "Inteligência anula"),
        ("Imagem Perfeita", "Ilusão", 4, "Padrão", "Médio", "cubo de 6m de lado", "Concentração", "Inteligência anula"),
        ("Indetectável", "Abjuração", 2, "Movimento", "Pessoal", "você", "Cena", "—"),
        ("Invisibilidade", "Ilusão", 2, "Padrão", "Toque", "1 criatura ou objeto", "Cena", "—"),
        ("Labirinto Dimensional", "Conjuração", 1, "Padrão", "Curto", "1 criatura", "Especial", "Vontade anula"),
        ("Lâminas Voadoras", "Evocação", 1, "Padrão", "Curto", "1 criatura", "Instantânea", "Reflexos reduz à metade"),
        ("Luz", "Evocação", 1, "Livre", "Toque", "objeto", "Cena", "—"),
        ("Mãos Mágicas", "Transmutação", 1, "Movimento", "Curto", "objeto de até 10kg", "Concentração", "—"),
        ("Míssil Mágico", "Evocação", 1, "Padrão", "Médio", "até 5 mísseis", "Instantânea", "Nenhuma"),
        ("Névoa Mental", "Encantamento", 2, "Padrão", "Curto", "1 criatura", "Cena", "Vontade anula"),
        ("Paralisar", "Encantamento", 2, "Padrão", "Curto", "1 humanoide", "Cena", "Vontade anula"),
        ("Persona", "Ilusão", 1, "Padrão", "Pessoal", "você", "Cena", "—"),
        ("Portal Arcano", "Conjuração", 3, "Padrão", "Curto", "—", "1 round/nível", "—"),
        ("Projeção Astral", "Adivinhação", 2, "Padrão", "Pessoal", "você", "Concentração", "—"),
        ("Raio de Gelo", "Evocação", 2, "Padrão", "Curto", "1 criatura", "Instantânea", "Fortitude parcial"),
        ("Raio de Luz Solar", "Evocação", 2, "Padrão", "Médio", "raio de 1,5m", "Instantânea", "Reflexos reduz à metade"),
        ("Sono", "Encantamento", 1, "Padrão", "Médio", "criaturas em área de 6m", "1 hora", "Vontade anula"),
        ("Teia", "Conjuração", 2, "Padrão", "Médio", "cubo de 6m de lado", "Cena", "Reflexos anula"),
        ("Telecinesia", "Transmutação", 3, "Padrão", "Médio", "1 objeto ou criatura", "Concentração", "Vontade anula"),
        ("Terreno Ilusório", "Ilusão", 2, "1 min", "Longo", "área de 12m de raio", "Cena", "Inteligência anula"),
        ("Torção Corporal", "Transmutação", 1, "Padrão", "Curto", "1 criatura", "Instantânea", "Fortitude parcial"),
        ("Trovão", "Evocação", 2, "Padrão", "Médio", "linha de 18m", "Instantânea", "Fortitude reduz à metade"),
        ("Voo", "Transmutação", 3, "Movimento", "Toque", "1 criatura", "Cena", "—"),
        ("Voragem Dimensional", "Conjuração", 4, "Padrão", "Longo", "criatura", "Instantânea", "Vontade anula"),
        ("Xagarashar", "Evocação", 4, "Padrão", "Longo", "área de 9m de raio", "Instantânea", "Reflexos reduz à metade"),
    ]
}

# ALL SPELLS with complete data - comprehensive list
ALL_SPELLS = []

# =====================================
# MAGIAS ARCANAS
# =====================================

# --- 1º CÍRCULO ARCANO ---
arcanas_1 = [
    {
        "id": "adaga-mental",
        "nome": "Adaga Mental",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "Vontade anula",
        "descricao": "Você lança dardos mentais contra uma criatura. A magia inflige 1d6+1 pontos de dano mental (não reduzido por RD) por ponto de PM gasto.",
        "aprimoramentos": []
    },
    {
        "id": "alarme",
        "nome": "Alarme",
        "tipo": "arcana",
        "escola": "Abjuração",
        "circulo": 1,
        "pm": 2,
        "execucao": "1 minuto",
        "alcance": "Toque",
        "alvo": "Área de até 6m de raio",
        "duracao": "8 horas",
        "resistencia": "Nenhuma",
        "descricao": "Você cria um alarme mágico em uma área. Se qualquer criatura (exceto você e aquelas que você designar) entrar na área protegida durante a duração, o alarme dispara, emitindo um som audível a até 18m de distância.",
        "aprimoramentos": [
            "+2 PM: a duração aumenta para 24 horas.",
            "+5 PM: o alarme alerta você mentalmente, sem fazer barulho."
        ]
    },
    {
        "id": "amedrontar",
        "nome": "Amedrontar",
        "tipo": "arcana",
        "escola": "Necromancia",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "A criatura fica com medo. Enquanto estiver com medo, sofre –2 em testes de ataque e perícias.",
        "aprimoramentos": [
            "+2 PM: muda o alvo para criaturas em área de 6m de raio.",
            "+5 PM: a criatura fica apavorada (foge na máxima velocidade)."
        ]
    },
    {
        "id": "ampliar-sentidos",
        "nome": "Ampliar Sentidos",
        "tipo": "arcana",
        "escola": "Adivinhação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você amplia um de seus sentidos. Escolha visão, audição ou olfato. Você recebe visão no escuro 18m (se escolher visão), +10 nos testes de Percepção auditiva (se escolher audição) ou pode seguir rastros pelo cheiro (se escolher olfato).",
        "aprimoramentos": [
            "+1 PM: amplia mais um sentido."
        ]
    },
    {
        "id": "arma-magica",
        "nome": "Arma Mágica",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Movimento",
        "alcance": "Toque",
        "alvo": "1 arma",
        "duracao": "Cena",
        "resistencia": "Nenhuma",
        "descricao": "A arma tocada recebe +1 nas jogadas de ataque e dano. Ela passa a ser considerada mágica (ignora RD que não seja superada por magia).",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +1 (máximo +5).",
            "+1 PM: muda o alcance para curto.",
            "+2 PM: a arma causa dano de energia (escolha: ácido, elétrico, fogo ou frio)."
        ]
    },
    {
        "id": "armadura-arcana",
        "nome": "Armadura Arcana",
        "tipo": "arcana",
        "escola": "Abjuração",
        "circulo": 1,
        "pm": 1,
        "execucao": "Movimento",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Uma armadura de força invisível envolve você. Você recebe +4 na Defesa. Não funciona se você estiver usando armadura média ou pesada.",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +2."
        ]
    },
    {
        "id": "bola-de-fogo",
        "nome": "Bola de Fogo",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Área de 9m de raio",
        "duracao": "Instantânea",
        "resistencia": "Reflexos reduz à metade",
        "descricao": "Uma bola de fogo explode no ponto designado, queimando todos na área. A magia inflige 5d6 pontos de dano de fogo.",
        "aprimoramentos": [
            "+2 PM: aumenta o dano em +2d6.",
            "+1 PM: aumenta o raio em +3m."
        ]
    },
    {
        "id": "charme-pessoa",
        "nome": "Charme Pessoa",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 humanoide",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "O humanoide fica enfeitiçado por você. Uma criatura enfeitiçada considera você um amigo próximo e confia em você. Não torna a criatura seu aliado ou escravo.",
        "aprimoramentos": [
            "+2 PM: a duração aumenta para 1 dia.",
            "+3 PM: muda o alvo para 1 criatura (qualquer tipo).",
            "+5 PM: muda a duração para permanente (até ser desfeita)."
        ]
    },
    {
        "id": "choque-eletrico",
        "nome": "Choque Elétrico",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "Reflexos reduz à metade",
        "descricao": "Você descarrega uma centelha elétrica no toque. A magia inflige 1d6 pontos de dano elétrico por ponto de PM gasto.",
        "aprimoramentos": []
    },
    {
        "id": "compreensao",
        "nome": "Compreensão",
        "tipo": "arcana",
        "escola": "Adivinhação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você pode ler, entender e falar qualquer idioma durante a cena, incluindo idiomas de criaturas. Não permite usar itens mágicos que exijam treinamento.",
        "aprimoramentos": []
    },
    {
        "id": "conjurar-monstro",
        "nome": "Conjurar Monstro",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 aliado convocado",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você convoca 1 monstro de ND 1/2 ou inferior para lutar ao seu lado. O monstro age imediatamente após você na iniciativa e segue suas ordens. Quando a duração termina ou se o monstro for reduzido a 0 PV, ele desaparece.",
        "aprimoramentos": [
            "+1 PM: convoca um monstro de ND 1.",
            "+2 PM: convoca um monstro de ND 2.",
            "+3 PM: convoca um monstro de ND 3.",
            "+5 PM: convoca um monstro de ND 5.",
            "+1 PM: convoca 1d3 monstros do ND especificado."
        ]
    },
    {
        "id": "detectar-magia",
        "nome": "Detectar Magia",
        "tipo": "arcana",
        "escola": "Adivinhação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você consegue detectar a presença de magia em objetos e criaturas em alcance curto. Você sente se há magia presente e, com um teste de Misticismo (CD 20), descobre a escola da magia.",
        "aprimoramentos": [
            "+1 PM: detecta magia em alcance médio."
        ]
    },
    {
        "id": "disfarce",
        "nome": "Disfarce",
        "tipo": "arcana",
        "escola": "Ilusão",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "Não se aplica",
        "descricao": "Você assume a aparência de qualquer humanoide de tamanho similar. A ilusão afeta sua aparência física, não a forma como você soa ou cheira. Criaturas que interagem com você podem tentar um teste de Vontade para desacreditar.",
        "aprimoramentos": [
            "+1 PM: afeta também voz e odor.",
            "+2 PM: muda o alvo para 1 criatura tocada.",
            "+3 PM: você pode assumir aparência de qualquer criatura Medium."
        ]
    },
    {
        "id": "explosao-de-chamas",
        "nome": "Explosão de Chamas",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Área de 4,5m de raio centrada em você",
        "duracao": "Instantânea",
        "resistencia": "Reflexos reduz à metade",
        "descricao": "Uma explosão de chamas irradia de você, atingindo todos em sua área de efeito. A magia inflige 1d6 pontos de dano de fogo por ponto de PM gasto. Você não sofre dano.",
        "aprimoramentos": []
    },
    {
        "id": "flutuacao",
        "nome": "Flutuação",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "Vontade anula (não hostil)",
        "descricao": "A criatura flutua até 1,5m acima do chão. Ela consegue se mover normalmente mas não pode iniciar voo. Se flutuando, está imune a ataques corpo a corpo de criaturas no chão (a menos que tenham alcance).",
        "aprimoramentos": []
    },
    {
        "id": "luz",
        "nome": "Luz",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Livre",
        "alcance": "Toque",
        "alvo": "Objeto",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "O objeto emite luz com intensidade equivalente à luz do dia em um raio de 6m e penumbra em mais 6m.",
        "aprimoramentos": [
            "+1 PM: aumenta o raio de luz em +6m."
        ]
    },
    {
        "id": "maos-magicas",
        "nome": "Mãos Mágicas",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Movimento",
        "alcance": "Curto",
        "alvo": "Objeto de até 10kg",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você move e manipula um objeto não-segurado com suas mãos mágicas. Você pode fazer tarefas simples que normalmente exigiriam mãos, como abrir portas, pegar objetos, etc.",
        "aprimoramentos": [
            "+1 PM: aumenta o peso máximo para 25kg.",
            "+2 PM: aumenta o peso máximo para 100kg."
        ]
    },
    {
        "id": "missil-magico",
        "nome": "Míssil Mágico",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Até 5 mísseis",
        "duracao": "Instantânea",
        "resistencia": "Nenhuma",
        "descricao": "Você dispara mísseis de força mágica que atingem automaticamente seus alvos. Você cria 1 míssil por PM gasto (mínimo 1). Cada míssil inflige 1d4+1 pontos de dano de força. Você pode distribuir os mísseis entre múltiplos alvos.",
        "aprimoramentos": []
    },
    {
        "id": "sono",
        "nome": "Sono",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Criaturas em área de 6m de raio",
        "duracao": "1 hora",
        "resistencia": "Vontade anula",
        "descricao": "Criaturas na área adormecem. Afeta primeiro as criaturas com menos PV. Você pode afetar criaturas com total de 4 DV. Criaturas adormecidas ficam indefesas. Dano ou barulho acorda a criatura.",
        "aprimoramentos": [
            "+1 PM: aumenta os DV totais que pode afetar em +2.",
            "+2 PM: criaturas despertadas pelo dano voltam a dormir ao final do round."
        ]
    },
    {
        "id": "invisibilidade",
        "nome": "Invisibilidade",
        "tipo": "arcana",
        "escola": "Ilusão",
        "circulo": 1,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura ou objeto",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "A criatura ou objeto fica invisível. Ações ofensivas encerram o efeito. Uma criatura invisível recebe +10 em Furtividade e os ataques contra ela têm 50% de chance de falhar.",
        "aprimoramentos": [
            "+2 PM: a invisibilidade não é cancelada por ações ofensivas.",
            "+3 PM: muda o alvo para você e aliados em alcance curto."
        ]
    },
    {
        "id": "teia",
        "nome": "Teia",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 1,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Cubo de 6m de lado",
        "duracao": "Cena",
        "resistencia": "Reflexos anula",
        "descricao": "Você envolve a área em teias pegajosas que prendem criaturas. Criaturas na área ficam enredadas. Para se mover, uma criatura enredada deve fazer um teste de Atletismo ou Acrobacia (CD 20) ou gastar 3m de movimento por 1m percorrido. Fogo destrói a teia em 1 round.",
        "aprimoramentos": [
            "+1 PM: aumenta a CD em +2.",
            "+2 PM: criaturas que falham na resistência ficam imobilizadas."
        ]
    },
]

# --- 2º CÍRCULO ARCANO ---
arcanas_2 = [
    {
        "id": "alterar-tamanho",
        "nome": "Alterar Tamanho",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "Fortitude anula",
        "descricao": "A criatura aumenta ou diminui de tamanho em uma categoria (Pequeno → Médio → Grande → Enorme). Aumentar: +4 For, –2 Des, –1 Defesa, +1 para acertar e dano. Diminuir: –4 For, +2 Des, +1 Defesa, –1 para acertar e dano.",
        "aprimoramentos": [
            "+2 PM: muda o alvo para você (não precisa de resistência).",
            "+4 PM: altera o tamanho em duas categorias."
        ]
    },
    {
        "id": "amarras-etereas",
        "nome": "Amarras Etéreas",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "Algemas de força imobilizam a criatura. Uma criatura imobilizada não pode se mover, mas ainda pode agir. Para se libertar, a criatura precisa de um teste de Atletismo (CD 20) como ação padrão.",
        "aprimoramentos": [
            "+1 PM: aumenta a CD para se libertar em +5.",
            "+2 PM: a criatura fica completamente imobilizada (não pode agir)."
        ]
    },
    {
        "id": "imagem-ilusoria",
        "nome": "Imagem Ilusória",
        "tipo": "arcana",
        "escola": "Ilusão",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Cubo de 3m de lado",
        "duracao": "Concentração",
        "resistencia": "Inteligência anula",
        "descricao": "Você cria uma imagem ilusória visual de qualquer objeto ou criatura. A ilusão não produz sons, odores ou sensações tácteis. Criaturas que interagem com ela e falham na resistência continuam acreditando.",
        "aprimoramentos": [
            "+1 PM: a ilusão inclui sons.",
            "+2 PM: a ilusão inclui odores.",
            "+3 PM: a ilusão é permanente (até ser desfeita)."
        ]
    },
    {
        "id": "raio-de-gelo",
        "nome": "Raio de Gelo",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "Fortitude parcial",
        "descricao": "Um raio de frio atinge a criatura alvo. Inflige 4d6 pontos de dano de frio. Se falhar na resistência, a criatura fica lenta (–2 em ataques, Defesa e Reflexos) por 1 round.",
        "aprimoramentos": [
            "+2 PM: aumenta o dano em +2d6.",
            "+2 PM: se falhar na resistência, a criatura fica imobilizada por 1 round."
        ]
    },
    {
        "id": "trovao",
        "nome": "Trovão",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Linha de 18m",
        "duracao": "Instantânea",
        "resistencia": "Fortitude reduz à metade",
        "descricao": "Um trovão dispara em uma linha, atingindo tudo em seu caminho. Inflige 4d6 pontos de dano sônico e atordoa as criaturas que falharem na resistência por 1 round.",
        "aprimoramentos": [
            "+2 PM: aumenta o dano em +2d6.",
            "+1 PM: aumenta o tamanho da linha em +6m."
        ]
    },
    {
        "id": "névoa-mental",
        "nome": "Névoa Mental",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "A mente da criatura fica nublada. Ela sofre –5 em todos os testes de perícias baseadas em Inteligência e em testes de Vontade.",
        "aprimoramentos": []
    },
    {
        "id": "paralisar",
        "nome": "Paralisar",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 humanoide",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "O humanoide fica paralisado (indefeso e incapaz de se mover ou agir). Ao final de cada um de seus turnos, pode tentar outra resistência para escapar.",
        "aprimoramentos": [
            "+3 PM: muda o alvo para qualquer criatura.",
            "+2 PM: a criatura não pode tentar se libertar."
        ]
    },
    {
        "id": "terreno-ilusorio",
        "nome": "Terreno Ilusório",
        "tipo": "arcana",
        "escola": "Ilusão",
        "circulo": 2,
        "pm": 2,
        "execucao": "1 minuto",
        "alcance": "Longo",
        "alvo": "Área de 12m de raio",
        "duracao": "Cena",
        "resistencia": "Inteligência anula",
        "descricao": "Você faz com que o terreno na área pareça diferente do que é. Por exemplo, um campo pode parecer uma floresta, um pântano pode parecer um gramado, etc.",
        "aprimoramentos": []
    },
]

# --- 3º CÍRCULO ARCANO ---
arcanas_3 = [
    {
        "id": "ancora-dimensional",
        "nome": "Âncora Dimensional",
        "tipo": "arcana",
        "escola": "Abjuração",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "1 criatura ou portal dimensional",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "Você impede que a criatura use habilidades de teleporte, de viagem planar ou qualquer outra forma de movimento extradimensional durante a cena.",
        "aprimoramentos": []
    },
    {
        "id": "contato-extraplanar",
        "nome": "Contato Extraplanar",
        "tipo": "arcana",
        "escola": "Adivinhação",
        "circulo": 3,
        "pm": 3,
        "execucao": "1 minuto",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você faz contato com uma inteligência extraplanar que pode responder perguntas. Você pode fazer 1 pergunta por round. A entidade responde com 'sim', 'não' ou 'desconhecido'. Há risco de loucura temporária.",
        "aprimoramentos": [
            "+2 PM: a entidade fornece respostas mais elaboradas."
        ]
    },
    {
        "id": "portal-arcano",
        "nome": "Portal Arcano",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "—",
        "duracao": "1 round por nível",
        "resistencia": "—",
        "descricao": "Você cria um portal dimensional que conecta dois locais que você já visitou. O portal tem 3m de altura e qualquer criatura pode atravessá-lo.",
        "aprimoramentos": [
            "+5 PM: o portal pode conectar a locais em outros planos."
        ]
    },
    {
        "id": "telecinesia",
        "nome": "Telecinesia",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "1 objeto ou criatura",
        "duracao": "Concentração",
        "resistencia": "Vontade anula",
        "descricao": "Você move objetos ou criaturas mentalmente. Pode mover um objeto de até 200kg a até 9m por round. Se usar contra criatura, ela pode resistir com Vontade.",
        "aprimoramentos": [
            "+2 PM: aumenta o peso máximo para 500kg.",
            "+2 PM: você pode usar o objeto ou criatura como arma (dano 1d6)."
        ]
    },
    {
        "id": "voo",
        "nome": "Voo",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 3,
        "pm": 3,
        "execucao": "Movimento",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "A criatura tocada ganha a capacidade de voar com deslocamento de 18m (Voo +10 para manobras). Se a magia acabar enquanto a criatura estiver no ar, ela cai lentamente (como sob efeito de queda suave).",
        "aprimoramentos": [
            "+2 PM: muda o alvo para você e aliados em alcance curto.",
            "+1 PM: aumenta o deslocamento de voo em +6m."
        ]
    },
]

# --- 4º CÍRCULO ARCANO ---
arcanas_4 = [
    {
        "id": "alterar-memoria",
        "nome": "Alterar Memória",
        "tipo": "arcana",
        "escola": "Encantamento",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Permanente",
        "resistencia": "Vontade anula",
        "descricao": "Você modifica as memórias da criatura. Pode apagar memórias de um evento de até 5 minutos, criar memórias falsas de um evento de até 5 minutos, ou alterar memórias existentes de até 5 minutos.",
        "aprimoramentos": [
            "+2 PM: pode alterar memórias de até 1 hora.",
            "+5 PM: pode apagar todas as memórias de um dia inteiro."
        ]
    },
    {
        "id": "conjurar-elemental",
        "nome": "Conjurar Elemental",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 elemental convocado",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você convoca um elemental de tamanho Médio (ar, água, fogo ou terra) para servir você. O elemental age em sua iniciativa e obedece suas ordens.",
        "aprimoramentos": [
            "+2 PM: conjura um elemental Grande.",
            "+4 PM: conjura um elemental Enorme.",
            "+2 PM: conjura 1d3 elementais Médios."
        ]
    },
    {
        "id": "controlar-gravidade",
        "nome": "Controlar a Gravidade",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Área de 9m de raio",
        "duracao": "Concentração",
        "resistencia": "Vontade anula",
        "descricao": "Você altera a gravidade na área. Pode inverter (todas as criaturas caem para o teto), aumentar (criaturas ficam lentas, –6m em deslocamento) ou diminuir (criaturas flutam até 1,5m acima do chão, podem saltar até 9m).",
        "aprimoramentos": []
    },
    {
        "id": "imagem-perfeita",
        "nome": "Imagem Perfeita",
        "tipo": "arcana",
        "escola": "Ilusão",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Cubo de 6m de lado",
        "duracao": "Concentração",
        "resistencia": "Inteligência anula",
        "descricao": "Como Imagem Ilusória, mas a ilusão afeta todos os sentidos (visual, auditivo, olfativo e tátil), tornando-a praticamente indistinguível da realidade.",
        "aprimoramentos": []
    },
    {
        "id": "voragem-dimensional",
        "nome": "Voragem Dimensional",
        "tipo": "arcana",
        "escola": "Conjuração",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Longo",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "Vontade anula",
        "descricao": "Uma fissura dimensional engole a criatura e a lança em um espaço entre os planos. A criatura desaparece por 1d6 rounds, então reaparece no local mais próximo disponível.",
        "aprimoramentos": [
            "+2 PM: a criatura reaparece em local diferente (você escolhe dentro de alcance longo)."
        ]
    },
]

# --- 5º CÍRCULO ARCANO ---
arcanas_5 = [
    {
        "id": "alterar-destino",
        "nome": "Alterar Destino",
        "tipo": "arcana",
        "escola": "Adivinhação",
        "circulo": 5,
        "pm": 5,
        "execucao": "Reação",
        "alcance": "Curto",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Você altera o destino de uma criatura. Pode fazer com que um ataque acerte ou erre, um teste passe ou falhe, ou um dano seja máximo ou mínimo. Use como reação após o lançamento dos dados mas antes de aplicar os efeitos.",
        "aprimoramentos": []
    },
    {
        "id": "controlar-tempo",
        "nome": "Controlar o Tempo",
        "tipo": "arcana",
        "escola": "Transmutação",
        "circulo": 5,
        "pm": 7,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "1d4+1 rounds",
        "resistencia": "—",
        "descricao": "Você para o tempo ao seu redor. Durante esse período, outras criaturas ficam paralisadas, projéteis param no ar e você pode agir normalmente. Ao final, o tempo retoma. Você pode realizar 1d4+1 rounds de ações durante o tempo parado.",
        "aprimoramentos": []
    },
    {
        "id": "xagarashar",
        "nome": "Xagarashar",
        "tipo": "arcana",
        "escola": "Evocação",
        "circulo": 5,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Longo",
        "alvo": "Área de 9m de raio",
        "duracao": "Instantânea",
        "resistencia": "Reflexos reduz à metade",
        "descricao": "Uma tempestade de energia mágica pura atinge a área. A magia inflige 10d6 pontos de dano de energia (tipo à sua escolha: ácido, elétrico, frio ou fogo).",
        "aprimoramentos": [
            "+2 PM: aumenta o dano em +2d6."
        ]
    },
]

# =====================================
# MAGIAS DIVINAS
# =====================================

divinas_1 = [
    {
        "id": "abençoar-alimentos",
        "nome": "Abençoar Alimentos",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "Alimentos e bebidas para até 6 pessoas",
        "duracao": "Permanente",
        "resistencia": "—",
        "descricao": "Você abençoa alimentos e bebidas, tornando-os sagrados e nutritivos. Alimentos abençoados curam 1 PV por porção consumida e removem venenos e doenças naturais presentes nos alimentos.",
        "aprimoramentos": [
            "+1 PM: afeta alimentos para +6 pessoas.",
            "+2 PM: os alimentos curam 1d6 PV por porção.",
            "+3 PM: os alimentos removem também a condição envenenado e enfermo."
        ]
    },
    {
        "id": "acalmar-animal",
        "nome": "Acalmar Animal",
        "tipo": "divina",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 animal",
        "duracao": "Cena",
        "resistencia": "Vontade anula",
        "descricao": "O animal fica prestativo em relação a você. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe +10 nos testes de Adestramento e Diplomacia que fizer contra o animal.",
        "aprimoramentos": [
            "+1 PM: muda o alcance para médio.",
            "+1 PM: muda o alvo para 1 monstro ou espírito com Int –5 ou –4.",
            "+2 PM: aumenta o número de alvos em +1.",
            "+5 PM: muda o alvo para 1 monstro ou espírito. Requer 3º círculo."
        ]
    },
    {
        "id": "bencao",
        "nome": "Bênção",
        "tipo": "divina",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "Aliados em área de 9m de raio",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Seus aliados na área recebem +1 em testes de ataque e resistências.",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +1.",
            "+1 PM: aliados também recebem +1d4 de dano nos ataques."
        ]
    },
    {
        "id": "consagrar",
        "nome": "Consagrar",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "1 minuto",
        "alcance": "Toque",
        "alvo": "Área de 9m de raio centrada no ponto tocado",
        "duracao": "Dia",
        "resistencia": "Nenhuma",
        "descricao": "A área fica consagrada à sua divindade. Mortos-vivos e criaturas divinas do alinhamento oposto sofrem –1 em todos os testes e resistências na área. Aliados recebem +1 em testes de Vontade.",
        "aprimoramentos": [
            "+2 PM: mortos-vivos sofrem –2 em testes na área.",
            "+3 PM: a duração aumenta para semana."
        ]
    },
    {
        "id": "controlar-plantas",
        "nome": "Controlar Plantas",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Plantas em área de 9m de raio",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você controla plantas naturais na área. Pode fazer com que ramos e raízes se movam para enredar criaturas (Reflexos CD Sab para evitar), criar cobertura vegetal, abrir passagem em vegetação densa, etc.",
        "aprimoramentos": [
            "+1 PM: aumenta a área em +3m de raio.",
            "+2 PM: pode controlar plantas-criaturas (feitos de plantas com Int –5 ou –4)."
        ]
    },
    {
        "id": "curar-ferimentos",
        "nome": "Curar Ferimentos",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura viva",
        "duracao": "Instantânea",
        "resistencia": "Vontade anula (não hostil)",
        "descricao": "A criatura recupera 1d8 PV + seu atributo de magia. Se usada contra mortos-vivos, causa dano sagrado em vez de cura.",
        "aprimoramentos": [
            "+1 PM: aumenta a cura em +1d8.",
            "+2 PM: muda o alcance para curto.",
            "+5 PM: muda o alvo para aliados em área de 6m de raio (alcance curto)."
        ]
    },
    {
        "id": "detectar-alinhamento",
        "nome": "Detectar Alinhamento",
        "tipo": "divina",
        "escola": "Adivinhação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você detecta o alinhamento (Ordeiro, Neutro ou Caótico) de criaturas e objetos mágicos em alcance curto. Você sente a intensidade do alinhamento.",
        "aprimoramentos": [
            "+1 PM: pode detectar alinhamento de Mal ou Bem."
        ]
    },
    {
        "id": "domar-animal",
        "nome": "Domar Animal",
        "tipo": "divina",
        "escola": "Encantamento",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "1 animal",
        "duracao": "Permanente",
        "resistencia": "Vontade anula",
        "descricao": "O animal fica domesticado e obediente. Pode ser treinado como um animal doméstico. Criaturas com Inteligência de 1 ou mais podem ser afetadas.",
        "aprimoramentos": []
    },
    {
        "id": "orientacao",
        "nome": "Orientação",
        "tipo": "divina",
        "escola": "Adivinhação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Livre",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "1 minuto",
        "resistencia": "—",
        "descricao": "A criatura recebe +1 em um teste à sua escolha feito durante a duração.",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +1."
        ]
    },
    {
        "id": "protecao",
        "nome": "Proteção",
        "tipo": "divina",
        "escola": "Abjuração",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "A criatura recebe +2 na Defesa e nas resistências contra criaturas de um tipo especificado (aberrações, construtos, mortos-vivos, etc.).",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +2.",
            "+2 PM: muda o alvo para aliados em alcance curto."
        ]
    },
    {
        "id": "remover-veneno",
        "nome": "Remover Veneno",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 1,
        "pm": 1,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura ou objeto",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Remove um veneno ou doença da criatura. A criatura também é curada dos danos sofridos pelo veneno ou doença.",
        "aprimoramentos": [
            "+2 PM: neutraliza venenos e doenças mágicas."
        ]
    },
]

divinas_2 = [
    {
        "id": "aliado-animal",
        "nome": "Aliado Animal",
        "tipo": "divina",
        "escola": "Encantamento",
        "circulo": 2,
        "pm": 2,
        "execucao": "1 minuto",
        "alcance": "Pessoal",
        "alvo": "Você",
        "duracao": "Permanente",
        "resistencia": "—",
        "descricao": "Um animal se torna seu companheiro leal. Você ganha um animal companheiro de ND igual à metade do seu nível. O animal obedece às suas ordens e ganha experiência e melhora com você.",
        "aprimoramentos": [
            "+3 PM: o animal companheiro é de ND igual ao seu nível."
        ]
    },
    {
        "id": "auxilio",
        "nome": "Auxílio",
        "tipo": "divina",
        "escola": "Encantamento",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "A criatura recebe +1 nas jogadas de ataque, testes de resistência e +1d8 PV temporários.",
        "aprimoramentos": [
            "+1 PM: aumenta o bônus em +1 e adiciona +1d8 PV temporários."
        ]
    },
    {
        "id": "controlar-fogo",
        "nome": "Controlar Fogo",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "Fogo em área de 9m de raio",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você controla o fogo na área. Pode aumentar ou diminuir chamas existentes, mover chamas até 3m por round, ou criar paredes de fogo de até 6m de comprimento (inflige 3d6 de dano de fogo a quem atravessa).",
        "aprimoramentos": [
            "+1 PM: pode criar fogo onde não existe.",
            "+2 PM: criaturas que falharem em Reflexos ao atravessar a parede de fogo pegam fogo."
        ]
    },
    {
        "id": "controlar-madeira",
        "nome": "Controlar Madeira",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Objetos de madeira em área de 9m de raio",
        "duracao": "Concentração",
        "resistencia": "Vontade anula (objetos segurados)",
        "descricao": "Você controla madeira na área. Pode dobrar, torcer ou quebrar objetos de madeira, criar barreiras de madeira de até 3m, ou fazer raízes crescerem para enredar criaturas (Reflexos CD Sab).",
        "aprimoramentos": [
            "+2 PM: pode controlar árvores vivas como se fossem madeira."
        ]
    },
    {
        "id": "curar-ferimentos-em-massa",
        "nome": "Curar Ferimentos em Massa",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 2,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "Aliados em área de 6m de raio",
        "duracao": "Instantânea",
        "resistencia": "Vontade anula (não hostil)",
        "descricao": "Todos os aliados na área recuperam 1d8 + seu atributo de magia PV.",
        "aprimoramentos": [
            "+1 PM: aumenta a cura em +1d8."
        ]
    },
    {
        "id": "invocar-relampago",
        "nome": "Invocar Relâmpago",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 2,
        "pm": 2,
        "execucao": "Padrão",
        "alcance": "Longo",
        "alvo": "1 relâmpago por round",
        "duracao": "Concentração",
        "resistencia": "Reflexos reduz à metade",
        "descricao": "Você invoca nuvens de tempestade e pode chamar relâmpagos. Cada round como ação livre você pode lançar um relâmpago em um ponto dentro do alcance, infligindo 3d6 de dano elétrico em raio de 1,5m.",
        "aprimoramentos": [
            "+2 PM: o dano aumenta para 5d6."
        ]
    },
]

divinas_3 = [
    {
        "id": "controlar-agua",
        "nome": "Controlar Água",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Longo",
        "alvo": "Massa de água em área de 30m de raio",
        "duracao": "Concentração",
        "resistencia": "—",
        "descricao": "Você controla água na área. Pode elevar ou rebaixar o nível da água em até 3m por round (máximo 9m), criar correntes, ou dividir águas criando um corredor seco de até 3m de largura.",
        "aprimoramentos": [
            "+2 PM: pode caminhar sobre a água durante a cena.",
            "+3 PM: pode controlar água em área de 90m de raio."
        ]
    },
    {
        "id": "controlar-terra",
        "nome": "Controlar Terra",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Médio",
        "alvo": "Terra em área de 9m de raio",
        "duracao": "Concentração",
        "resistencia": "Reflexos anula (enredar)",
        "descricao": "Você controla pedra e terra na área. Pode criar tremores (criaturas fazem Reflexos ou ficam caídas), elevar ou baixar terreno em até 1,5m, criar paredes de terra de até 1,5m de altura e 6m de comprimento, ou fazer o chão enredar criaturas.",
        "aprimoramentos": [
            "+2 PM: pode mover e modelar pedra (criar esculturas, selar portas de pedra, etc.).",
            "+3 PM: cria um tremor de terra que afeta área de 18m de raio."
        ]
    },
    {
        "id": "cura-plena",
        "nome": "Cura Plena",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 3,
        "pm": 3,
        "execucao": "Padrão",
        "alcance": "Toque",
        "alvo": "1 criatura",
        "duracao": "Instantânea",
        "resistencia": "Vontade anula (não hostil)",
        "descricao": "A criatura recupera todos os seus PV. Remove também condições de envenenado, doente e abalado.",
        "aprimoramentos": [
            "+2 PM: muda o alcance para curto.",
            "+5 PM: muda o alvo para aliados em área de 6m de raio."
        ]
    },
    {
        "id": "criar-alimento",
        "nome": "Criar Alimento",
        "tipo": "divina",
        "escola": "Conjuração",
        "circulo": 3,
        "pm": 2,
        "execucao": "1 minuto",
        "alcance": "Toque",
        "alvo": "—",
        "duracao": "1 dia",
        "resistencia": "—",
        "descricao": "Você cria alimentos e bebidas suficientes para alimentar até 15 pessoas por um dia. O alimento é simples mas nutritivo.",
        "aprimoramentos": [
            "+1 PM: alimenta +15 pessoas.",
            "+3 PM: o alimento equivale a uma refeição completa e revitalizante (remove fadiga)."
        ]
    },
    {
        "id": "ressuscitar-animal",
        "nome": "Ressuscitar Animal",
        "tipo": "divina",
        "escola": "Necromancia",
        "circulo": 3,
        "pm": 3,
        "execucao": "1 minuto",
        "alcance": "Toque",
        "alvo": "1 animal morto",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Você traz um animal de volta à vida. O animal deve ter morrido há no máximo 1 dia por nível do lançador. O animal retorna com 1 PV e fica fragilizado por 1 semana.",
        "aprimoramentos": [
            "+2 PM: o prazo aumenta para 1 semana por nível."
        ]
    },
]

divinas_4 = [
    {
        "id": "controlar-clima",
        "nome": "Controlar o Clima",
        "tipo": "divina",
        "escola": "Transmutação",
        "circulo": 4,
        "pm": 4,
        "execucao": "10 minutos",
        "alcance": "Especial",
        "alvo": "Área de 1,5km de raio",
        "duracao": "4 horas",
        "resistencia": "—",
        "descricao": "Você controla o clima em uma enorme área ao redor. Pode criar tempestades, neblina, ventos fortes, chuva, neve, calor intenso ou outras condições climáticas. Leva 1d4x10 minutos para o clima mudar. As condições climáticas podem causar danos ou penalidades.",
        "aprimoramentos": [
            "+3 PM: a duração aumenta para 8 horas.",
            "+5 PM: a área aumenta para 5km de raio."
        ]
    },
    {
        "id": "conjurar-mortos-vivos",
        "nome": "Conjurar Mortos-Vivos",
        "tipo": "divina",
        "escola": "Necromancia",
        "circulo": 4,
        "pm": 4,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "Mortos-vivos convocados",
        "duracao": "Cena",
        "resistencia": "—",
        "descricao": "Você conjura mortos-vivos para servi-lo. Pode conjurar mortos-vivos com ND total igual ao seu nível. Os mortos-vivos seguem suas ordens.",
        "aprimoramentos": [
            "+2 PM: aumenta o ND total em +2.",
            "+5 PM: os mortos-vivos conjurados permanecem por 1 hora."
        ]
    },
    {
        "id": "ressuscitar",
        "nome": "Ressuscitar",
        "tipo": "divina",
        "escola": "Necromancia",
        "circulo": 4,
        "pm": 5,
        "execucao": "10 minutos",
        "alcance": "Toque",
        "alvo": "1 criatura morta",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Você traz uma criatura de volta à vida. Ela deve ter morrido há no máximo 1 semana por nível. A criatura volta com 1 PV e perde 1 ponto permanente de Constituição. Criaturas que morreram de velhice não podem ser ressuscitadas.",
        "aprimoramentos": [
            "+5 PM: o prazo não tem limite.",
            "+3 PM: a criatura não perde Constituição."
        ]
    },
    {
        "id": "milagre-menor",
        "nome": "Milagre Menor",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 4,
        "pm": 5,
        "execucao": "Padrão",
        "alcance": "Especial",
        "alvo": "Especial",
        "duracao": "Especial",
        "resistencia": "Especial",
        "descricao": "Você pede um favor menor à sua divindade. O milagre menor pode duplicar os efeitos de qualquer magia divina de até 3º círculo, ou criar um efeito único aprovado pelo Mestre com poder equivalente. A divindade pode negar o pedido se a relação com o devoto não for boa.",
        "aprimoramentos": []
    },
]

divinas_5 = [
    {
        "id": "milagre",
        "nome": "Milagre",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 5,
        "pm": 10,
        "execucao": "Padrão",
        "alcance": "Especial",
        "alvo": "Especial",
        "duracao": "Especial",
        "resistencia": "Especial",
        "descricao": "Você pede a intervenção direta da sua divindade. O milagre pode duplicar qualquer magia divina de qualquer círculo, restaurar a vida de alguém que morreu há qualquer tempo, remover qualquer maldição ou doença, ou criar qualquer efeito aprovado pelo Mestre com o poder de um deus. A divindade pode exigir uma missão ou sacrifício em troca.",
        "aprimoramentos": []
    },
    {
        "id": "grande-cura",
        "nome": "Grande Cura",
        "tipo": "divina",
        "escola": "Evocação",
        "circulo": 5,
        "pm": 6,
        "execucao": "Padrão",
        "alcance": "Curto",
        "alvo": "Aliados em área de 9m de raio",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Todos os aliados na área recuperam todos os seus PV e são curados de qualquer condição negativa não permanente.",
        "aprimoramentos": []
    },
    {
        "id": "praga-divina",
        "nome": "Praga Divina",
        "tipo": "divina",
        "escola": "Necromancia",
        "circulo": 5,
        "pm": 6,
        "execucao": "Padrão",
        "alcance": "Longo",
        "alvo": "1 criatura ou área de 30m de raio",
        "duracao": "Permanente",
        "resistencia": "Fortitude anula",
        "descricao": "Você amaldiçoa a criatura ou área com uma praga divina. A praga é determinada pela divindade e pode incluir doenças, maldições, transformações físicas ou outros efeitos. A praga só pode ser removida com Milagre ou Redenção.",
        "aprimoramentos": []
    },
    {
        "id": "resurreicao-total",
        "nome": "Ressurreição Total",
        "tipo": "divina",
        "escola": "Necromancia",
        "circulo": 5,
        "pm": 8,
        "execucao": "10 minutos",
        "alcance": "Toque",
        "alvo": "1 criatura morta",
        "duracao": "Instantânea",
        "resistencia": "—",
        "descricao": "Você traz uma criatura de volta à vida sem nenhuma restrição de tempo. A criatura volta com todos os seus PV e sem perda de Constituição. Pode trazer de volta criaturas que morreram de velhice.",
        "aprimoramentos": []
    },
]

# Compile all spells
ALL_SPELLS = []
ALL_SPELLS.extend(arcanas_1)
ALL_SPELLS.extend(arcanas_2)
ALL_SPELLS.extend(arcanas_3)
ALL_SPELLS.extend(arcanas_4)
ALL_SPELLS.extend(arcanas_5)
ALL_SPELLS.extend(divinas_1)
ALL_SPELLS.extend(divinas_2)
ALL_SPELLS.extend(divinas_3)
ALL_SPELLS.extend(divinas_4)
ALL_SPELLS.extend(divinas_5)

print(f"Total spells: {len(ALL_SPELLS)}")

# Save to JSON
output = {"magias": ALL_SPELLS}
with open(r"C:\VS.Projetos\t20-mestre-supremo\src\data\magias.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("JSON saved!")

# Print summary by circle and type
from collections import Counter
summary = Counter((s["tipo"], s["circulo"]) for s in ALL_SPELLS)
for key in sorted(summary.keys()):
    print(f"  {key[0]} {key[1]}º: {summary[key]} magias")
