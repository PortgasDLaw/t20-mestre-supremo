import { useState, useMemo } from 'react'
import {
  GUIA_CAMPANHA, BESTIARIO, NPCS, TABELAS, ITENS,
  type GuiaSubsecao, type Monstro, type NPC, type Item
} from '@/data/strahd-data'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import {
  BookOpen, Users, Table2, Star, Map,
  ChevronDown, ChevronUp, Search, Skull, MessageSquare,
  AlertTriangle, Lightbulb, Sword, Eye, Lock,
  Package, Sparkles, FlaskConical, Scroll, Gem
} from 'lucide-react'

type Aba = 'guia' | 'tabelas' | 'bestiario' | 'npcs' | 'tarokka' | 'itens'

const TIPO_ICONS: Record<string, React.ReactNode> = {
  narration: <BookOpen className="w-4 h-4 text-gold" />,
  combat: <Skull className="w-4 h-4 text-red-400" />,
  roleplay: <MessageSquare className="w-4 h-4 text-blue-400" />,
  exploration: <Map className="w-4 h-4 text-green-400" />,
  warning: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
  tip: <Lightbulb className="w-4 h-4 text-purple-400" />,
  secret: <Lock className="w-4 h-4 text-gray-400" />,
}

const TIPO_COR: Record<string, string> = {
  narration: 'border-gold bg-gold/5',
  combat: 'border-red-700 bg-red-950/30',
  roleplay: 'border-blue-700 bg-blue-950/30',
  exploration: 'border-green-700 bg-green-950/30',
  warning: 'border-yellow-600 bg-yellow-950/30',
  tip: 'border-purple-700 bg-purple-950/30',
  secret: 'border-gray-600 bg-gray-900/50',
}

const TIPO_LABEL: Record<string, string> = {
  narration: 'Narração',
  combat: 'Combate',
  roleplay: 'Interpretação',
  exploration: 'Exploração',
  warning: 'Aviso',
  tip: 'Dica para o Mestre',
  secret: 'Segredo',
}

const LEITURA_FIXA = [
  {
    artefato: 'Símbolo Sagrado',
    naipe: 'Cinco de Glifos',
    carta: 'Druida',
    local: 'Torre de Van Richten',
    descricao: 'Um prato de prata abençoado, escondido no topo da torre pelo próprio Van Richten.',
    cor: 'gold' as const,
  },
  {
    artefato: 'Tomo de Strahd',
    naipe: 'Um de Gládios',
    carta: 'Vingador',
    local: 'Mosteiro de São Andral',
    descricao: 'Os pensamentos mais sombrios de Strahd, escrito de sua própria mão. Escondido nas paredes do mosteiro onde Ireena foi levada.',
    cor: 'blue' as const,
  },
  {
    artefato: 'Espada Solar',
    naipe: 'Mago',
    carta: 'Mestre de Estrelas',
    local: 'Templo de Âmbar',
    descricao: 'A única arma capaz de ferir Strahd em sua forma verdadeira. Porta o espírito de Sergei Von Zarovich.',
    cor: 'purple' as const,
  },
]

export default function Campanha() {
  const [aba, setAba] = useState<Aba>('guia')

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="border-b border-grimoire-600 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-950 border border-red-700 flex items-center justify-center">
            <Skull className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-2xl text-gold">A Maldição de Strahd</h1>
            <p className="font-crimson text-parchment-muted text-sm">
              Campanha adaptada de D&D 5e para Tormenta20 • Guia completo do Mestre • Nível 3 → 10
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
          {LEITURA_FIXA.map((l) => (
            <div key={l.artefato} className="bg-abyss-800 border border-grimoire-600 rounded-lg px-3 py-2 flex items-center gap-2">
              <Star className={`w-3 h-3 flex-shrink-0 ${l.cor === 'gold' ? 'text-gold' : l.cor === 'blue' ? 'text-blue-400' : 'text-purple-400'}`} />
              <div className="min-w-0">
                <p className="font-cinzel text-xs text-parchment-dark">{l.artefato}</p>
                <p className={`font-cinzel font-bold text-xs truncate ${l.cor === 'gold' ? 'text-gold' : l.cor === 'blue' ? 'text-blue-300' : 'text-purple-300'}`}>{l.local}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 flex-wrap mb-4 border-b border-grimoire-600 pb-2">
        {([
          { id: 'guia', label: 'Guia do Mestre', icon: BookOpen },
          { id: 'tabelas', label: 'Tabelas', icon: Table2 },
          { id: 'bestiario', label: 'Bestiário', icon: Skull },
          { id: 'npcs', label: 'NPCs e Diálogos', icon: Users },
          { id: 'tarokka', label: 'Cartas Tarokka', icon: Star },
          { id: 'itens', label: 'Itens', icon: Package },
        ] as { id: Aba; label: string; icon: React.ElementType }[]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setAba(id)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-cinzel rounded-t border-b-2 transition-all ${
              aba === id
                ? 'border-gold text-gold bg-gold/5'
                : 'border-transparent text-parchment-muted hover:text-parchment hover:border-grimoire-500'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {aba === 'guia' && <GuiaTab />}
      {aba === 'tabelas' && <TabelasTab />}
      {aba === 'bestiario' && <BestiarioTab />}
      {aba === 'npcs' && <NPCsTab />}
      {aba === 'tarokka' && <TarokkaTab />}
      {aba === 'itens' && <ItensTab />}
    </div>
  )
}

// ─── GUIA TAB ────────────────────────────────────────────────
function GuiaTab() {
  const [secaoId, setSecaoId] = useState<string>('introducao')
  const [subAberta, setSubAberta] = useState<string | null>(null)
  const secao = GUIA_CAMPANHA.find(s => s.id === secaoId) ?? GUIA_CAMPANHA[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Índice lateral */}
      <div className="lg:col-span-1">
        <div className="sticky top-0 space-y-1">
          <p className="font-cinzel text-xs text-parchment-dark uppercase tracking-wider mb-2">Capítulos</p>
          {GUIA_CAMPANHA.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSecaoId(s.id); setSubAberta(null) }}
              className={`w-full text-left px-3 py-2 rounded text-xs font-cinzel transition-all ${
                secaoId === s.id
                  ? 'bg-grimoire-700 text-gold border-l-2 border-gold pl-2'
                  : 'text-parchment-muted hover:text-parchment hover:bg-grimoire-800'
              }`}
            >
              <p className="font-semibold">{s.titulo}</p>
              {s.nivel && <p className="text-purple-400 font-normal mt-0.5">{s.nivel}</p>}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="lg:col-span-3 space-y-4">
        <div className="mb-4">
          <h2 className="font-cinzel font-bold text-xl text-gold">{secao.titulo}</h2>
          {secao.nivel && <Badge variant="purple" className="mt-1">{secao.nivel}</Badge>}
          <p className="font-crimson text-parchment-muted text-sm mt-2">{secao.descricao}</p>
        </div>

        <div className="space-y-3">
          {secao.subsecoes.map((sub) => (
            <SubsecaoCard
              key={sub.id}
              sub={sub}
              aberta={subAberta === sub.id}
              onToggle={() => setSubAberta(subAberta === sub.id ? null : sub.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SubsecaoCard({ sub, aberta, onToggle }: { sub: GuiaSubsecao; aberta: boolean; onToggle: () => void }) {
  const tipoCor = sub.tipo ? TIPO_COR[sub.tipo] : 'border-grimoire-600 bg-abyss-800'

  return (
    <div className={`rounded-xl border ${tipoCor}`}>
      <button className="w-full flex items-center justify-between p-4" onClick={onToggle}>
        <div className="flex items-center gap-2 text-left">
          {sub.tipo && TIPO_ICONS[sub.tipo]}
          <div>
            <p className="font-cinzel font-semibold text-parchment text-sm">{sub.titulo}</p>
            {sub.tipo && (
              <p className="text-parchment-dark text-xs">{TIPO_LABEL[sub.tipo] ?? sub.tipo}</p>
            )}
          </div>
        </div>
        {aberta
          ? <ChevronUp className="w-4 h-4 text-gold flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-grimoire-500 flex-shrink-0" />
        }
      </button>

      {aberta && (
        <div className="px-4 pb-4 space-y-4">
          <div className="font-crimson text-parchment text-sm leading-relaxed whitespace-pre-line">
            {sub.conteudo}
          </div>

          {sub.encontros && sub.encontros.length > 0 && (
            <div className="bg-red-950/30 border border-red-800 rounded-lg p-3">
              <p className="font-cinzel text-red-300 text-xs font-bold mb-2 flex items-center gap-1">
                <Skull className="w-3 h-3" /> ENCONTROS
              </p>
              <div className="space-y-1">
                {sub.encontros.map((enc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Badge variant="blood">ND {enc.nd}</Badge>
                    <span className="text-parchment">{enc.quantidade}× {enc.nome}</span>
                    {enc.nota && <span className="text-parchment-muted">— {enc.nota}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {sub.cd && sub.cd.length > 0 && (
            <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-3">
              <p className="font-cinzel text-blue-300 text-xs font-bold mb-2 flex items-center gap-1">
                <Eye className="w-3 h-3" /> TESTES
              </p>
              <div className="space-y-2">
                {sub.cd.map((c, i) => (
                  <div key={i} className="text-xs">
                    <span className="text-blue-300 font-semibold">{c.pericia} CD {c.cd}: </span>
                    <span className="text-parchment-muted">{c.resultado}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sub.recompensas && sub.recompensas.length > 0 && (
            <div className="bg-gold/5 border border-gold-800 rounded-lg p-3">
              <p className="font-cinzel text-gold text-xs font-bold mb-2">RECOMPENSAS</p>
              <ul className="space-y-1">
                {sub.recompensas.map((r, i) => (
                  <li key={i} className="text-parchment text-xs flex gap-2">
                    <span className="text-gold">•</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── TABELAS TAB ─────────────────────────────────────────────
function TabelasTab() {
  const [tabelaAberta, setTabelaAberta] = useState<string | null>('encontros-floresta')
  const tabelas = TABELAS.filter(t => t.id !== 'cartas-tarokka')

  return (
    <div className="space-y-4">
      <p className="font-crimson text-parchment-muted text-sm">
        Tabelas de suporte para consulta rápida durante o jogo.
      </p>
      {tabelas.map((tabela) => (
        <div key={tabela.id} className="bg-abyss-800 border border-grimoire-600 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4"
            onClick={() => setTabelaAberta(tabelaAberta === tabela.id ? null : tabela.id)}
          >
            <div className="text-left">
              <p className="font-cinzel font-semibold text-parchment">{tabela.titulo}</p>
              <p className="font-crimson text-parchment-muted text-xs mt-0.5">{tabela.descricao}</p>
            </div>
            {tabelaAberta === tabela.id
              ? <ChevronUp className="w-4 h-4 text-gold flex-shrink-0 ml-2" />
              : <ChevronDown className="w-4 h-4 text-grimoire-500 flex-shrink-0 ml-2" />
            }
          </button>
          {tabelaAberta === tabela.id && (
            <div className="px-4 pb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-crimson">
                  <thead>
                    <tr className="border-b border-grimoire-600">
                      {tabela.colunas.map((col) => (
                        <th key={col} className="font-cinzel text-gold text-left py-2 pr-4 whitespace-nowrap">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tabela.linhas.map((linha, i) => (
                      <tr key={i} className={`border-b border-grimoire-700/50 ${i % 2 !== 0 ? 'bg-grimoire-800/20' : ''}`}>
                        {linha.map((cel, j) => (
                          <td key={j} className="py-2 pr-4 text-parchment-muted align-top">
                            {j === 0 ? <span className="font-bold text-gold">{cel}</span> : cel}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tabela.nota && (
                <p className="mt-3 text-xs font-crimson text-purple-300 bg-purple-950/30 border border-purple-800 rounded p-2">
                  <span className="font-semibold">Nota do Mestre:</span> {tabela.nota}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── BESTIÁRIO TAB ───────────────────────────────────────────
function BestiarioTab() {
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState<Monstro | null>(null)

  const ndNum = (nd: string) => {
    if (nd.includes('/')) {
      const [a, b] = nd.split('/').map(Number)
      return a / b
    }
    return parseFloat(nd) || 0
  }

  const filtrados = useMemo(() =>
    [...BESTIARIO]
      .filter(m => !busca || m.nome.toLowerCase().includes(busca.toLowerCase()) || m.tipo.toLowerCase().includes(busca.toLowerCase()))
      .sort((a, b) => ndNum(b.nd) - ndNum(a.nd)),
    [busca]
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar monstro..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <span className="text-parchment-dark text-xs font-crimson">{filtrados.length} criatura(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtrados.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelecionado(m)}
            className="bg-abyss-800 border border-grimoire-600 hover:border-red-700 rounded-xl p-4 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-cinzel font-bold text-parchment">{m.nome}</h3>
                <p className="text-parchment-dark text-xs">{m.tipo} • {m.tamanho}</p>
              </div>
              <div className="text-right">
                <div className="bg-red-900 border border-red-700 rounded px-2 py-0.5">
                  <p className="font-cinzel text-red-300 text-xs font-bold">ND {m.nd}</p>
                </div>
                {m.localizacao && <p className="text-parchment-dark text-xs mt-1">{m.localizacao}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs mb-2">
              <div className="bg-grimoire-700 rounded p-1.5 text-center">
                <p className="text-parchment-dark">PV</p>
                <p className="text-green-400 font-bold">{m.pv}</p>
              </div>
              <div className="bg-grimoire-700 rounded p-1.5 text-center">
                <p className="text-parchment-dark">Defesa</p>
                <p className="text-blue-400 font-bold">{m.defesa}</p>
              </div>
              <div className="bg-grimoire-700 rounded p-1.5 text-center">
                <p className="text-parchment-dark">Init.</p>
                <p className="text-yellow-400 font-bold">{m.iniciativa}</p>
              </div>
            </div>
            <p className="font-crimson text-parchment-muted text-xs line-clamp-2">{m.descricao}</p>
          </div>
        ))}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="xl">
          <MonstroDetalhe m={selecionado} />
        </Modal>
      )}
    </div>
  )
}

function MonstroDetalhe({ m }: { m: Monstro }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Badge variant="blood">ND {m.nd}</Badge>
        <Badge variant="gray">{m.tipo}</Badge>
        <Badge variant="gray">{m.tamanho}</Badge>
        {m.localizacao && <Badge variant="gray">{m.localizacao}</Badge>}
      </div>
      <p className="font-crimson text-parchment leading-relaxed text-sm">{m.descricao}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="bg-grimoire-800 rounded p-2 text-center">
          <p className="text-parchment-dark">PV</p>
          <p className="text-green-400 font-bold text-base">{m.pv}</p>
        </div>
        <div className="bg-grimoire-800 rounded p-2 text-center">
          <p className="text-parchment-dark">Defesa</p>
          <p className="text-blue-400 font-bold text-base">{m.defesa}</p>
        </div>
        <div className="bg-grimoire-800 rounded p-2 text-center">
          <p className="text-parchment-dark">Iniciativa</p>
          <p className="text-yellow-400 font-bold text-base">{m.iniciativa}</p>
        </div>
        <div className="bg-grimoire-800 rounded p-2 text-center">
          <p className="text-parchment-dark">Desloc.</p>
          <p className="text-parchment font-bold text-sm">{m.deslocamento}</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1 text-xs text-center">
        {(['for', 'des', 'con', 'int', 'sab', 'car'] as const).map(atr => (
          <div key={atr} className="bg-grimoire-700 rounded p-2">
            <p className="text-parchment-dark uppercase">{atr}</p>
            <p className="text-parchment font-bold">{m.atributos[atr] >= 0 ? '+' : ''}{m.atributos[atr]}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        {(['fortitude', 'reflexos', 'vontade'] as const).map(res => (
          <div key={res} className="bg-grimoire-800 rounded p-2">
            <p className="text-parchment-dark capitalize">{res}</p>
            <p className="text-parchment font-bold">{m.resistencias[res]}</p>
          </div>
        ))}
      </div>

      {(m.imunidades?.length || m.resistenciaDano?.length || m.sentidos?.length) ? (
        <div className="space-y-1 text-xs">
          {m.imunidades?.length ? <p><span className="font-cinzel text-red-300 font-bold">Imunidades: </span><span className="text-parchment-muted">{m.imunidades.join(', ')}</span></p> : null}
          {m.resistenciaDano?.length ? <p><span className="font-cinzel text-yellow-300 font-bold">Resistência a Dano: </span><span className="text-parchment-muted">{m.resistenciaDano.join(', ')}</span></p> : null}
          {m.sentidos?.length ? <p><span className="font-cinzel text-blue-300 font-bold">Sentidos: </span><span className="text-parchment-muted">{m.sentidos.join(', ')}</span></p> : null}
        </div>
      ) : null}

      <div>
        <h4 className="font-cinzel text-red-300 text-sm mb-2 flex items-center gap-1"><Sword className="w-4 h-4" /> Ataques</h4>
        <div className="space-y-2">
          {m.ataques.map((atk, i) => (
            <div key={i} className="bg-red-950/20 border border-red-800/50 rounded-lg p-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-cinzel text-parchment font-bold">{atk.nome}</span>
                <Badge variant="blood">{atk.bonus}</Badge>
                <span className="text-gold font-bold">{atk.dano}</span>
                <span className="text-parchment-muted">{atk.tipo}</span>
              </div>
              {atk.descricao && <p className="text-parchment-muted">{atk.descricao}</p>}
            </div>
          ))}
        </div>
      </div>

      {m.habilidades.length > 0 && (
        <div>
          <h4 className="font-cinzel text-gold text-sm mb-2">Habilidades Especiais</h4>
          <div className="space-y-2">
            {m.habilidades.map((hab, i) => (
              <div key={i} className="text-xs">
                <span className="font-semibold text-parchment">{hab.nome}. </span>
                <span className="text-parchment-muted">{hab.descricao}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {m.acoes && m.acoes.length > 0 && (
        <div>
          <h4 className="font-cinzel text-purple-300 text-sm mb-2">Ações Especiais</h4>
          <div className="space-y-2">
            {m.acoes.map((acao, i) => (
              <div key={i} className="bg-purple-950/20 border border-purple-800/50 rounded p-2 text-xs">
                <span className="font-semibold text-purple-300">{acao.nome}. </span>
                <span className="text-parchment-muted">{acao.descricao}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── NPCs TAB ────────────────────────────────────────────────
function NPCsTab() {
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState<NPC | null>(null)
  const [falaAberta, setFalaAberta] = useState<number | null>(null)

  const filtrados = useMemo(() =>
    NPCS.filter(n =>
      !busca ||
      n.nome.toLowerCase().includes(busca.toLowerCase()) ||
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      n.localizacao.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar NPC..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <span className="text-parchment-dark text-xs font-crimson">{filtrados.length} NPC(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtrados.map((npc) => (
          <div
            key={npc.id}
            onClick={() => { setSelecionado(npc); setFalaAberta(null) }}
            className="bg-abyss-800 border border-grimoire-600 hover:border-blue-700 rounded-xl p-4 cursor-pointer transition-all"
          >
            <h3 className="font-cinzel font-bold text-parchment">{npc.nome}</h3>
            <p className="text-blue-400 text-xs font-crimson">{npc.titulo}</p>
            <p className="text-parchment-muted text-xs mt-1">📍 {npc.localizacao}</p>
            <p className="font-crimson text-parchment-muted text-xs mt-2 line-clamp-3">{npc.personalidade}</p>
            <div className="mt-2 flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-blue-400" />
              <span className="text-parchment-dark text-xs">{npc.falas.length} falas roteirizadas</span>
            </div>
          </div>
        ))}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="xl">
          <div className="space-y-4">
            <div>
              <p className="text-blue-400 font-cinzel text-sm">{selecionado.titulo}</p>
              <p className="text-parchment-muted text-xs mt-1">📍 {selecionado.localizacao} • {selecionado.alinhamento}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-grimoire-800 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2">Aparência</h4>
                <p className="font-crimson text-parchment-muted leading-relaxed">{selecionado.aparencia}</p>
              </div>
              <div className="bg-grimoire-800 rounded-lg p-3">
                <h4 className="font-cinzel text-gold text-xs mb-2">Personalidade</h4>
                <p className="font-crimson text-parchment-muted leading-relaxed">{selecionado.personalidade}</p>
              </div>
            </div>

            <div className="bg-grimoire-800 rounded-lg p-3 text-sm">
              <h4 className="font-cinzel text-gold text-xs mb-2">Objetivo</h4>
              <p className="font-crimson text-parchment-muted">{selecionado.objetivo}</p>
            </div>

            {selecionado.segredo && (
              <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-sm">
                <h4 className="font-cinzel text-gray-400 text-xs mb-2 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> SEGREDO DO MESTRE
                </h4>
                <p className="font-crimson text-gray-300 leading-relaxed">{selecionado.segredo}</p>
              </div>
            )}

            {selecionado.estatisticas && (
              <div className="bg-red-950/20 border border-red-800/50 rounded-lg p-3 text-xs">
                <h4 className="font-cinzel text-red-300 mb-2">Estatísticas Resumidas</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div><p className="text-parchment-dark">ND</p><p className="text-red-300 font-bold">{selecionado.estatisticas.nd}</p></div>
                  <div><p className="text-parchment-dark">PV</p><p className="text-green-400 font-bold">{selecionado.estatisticas.pv}</p></div>
                  <div><p className="text-parchment-dark">Defesa</p><p className="text-blue-400 font-bold">{selecionado.estatisticas.defesa}</p></div>
                </div>
                {selecionado.estatisticas.pericias && (
                  <p className="text-parchment-muted mt-2">{selecionado.estatisticas.pericias}</p>
                )}
              </div>
            )}

            <div>
              <h4 className="font-cinzel text-blue-300 text-sm mb-3 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> Falas para o Mestre
              </h4>
              <div className="space-y-2">
                {selecionado.falas.map((fala, i) => (
                  <div key={i} className="bg-blue-950/20 border border-blue-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-3"
                      onClick={() => setFalaAberta(falaAberta === i ? null : i)}
                    >
                      <p className="font-cinzel text-blue-300 text-xs text-left">{fala.situacao}</p>
                      {falaAberta === i
                        ? <ChevronUp className="w-3 h-3 text-blue-400 flex-shrink-0 ml-2" />
                        : <ChevronDown className="w-3 h-3 text-grimoire-500 flex-shrink-0 ml-2" />
                      }
                    </button>
                    {falaAberta === i && (
                      <div className="px-3 pb-3">
                        <div className="bg-abyss-900 border-l-4 border-blue-600 pl-3 py-2 rounded-r">
                          <p className="font-crimson text-parchment italic text-sm leading-relaxed">{fala.fala}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── TAROKKA TAB ─────────────────────────────────────────────
function TarokkaTab() {
  const tabelaCompleta = TABELAS.find(t => t.id === 'cartas-tarokka')

  return (
    <div className="space-y-6">
      {/* Leitura fixa */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-gold" />
          <h2 className="font-cinzel font-bold text-xl text-gold">Leitura da Madame Eva</h2>
          <Badge variant="gold">Resultado Fixo</Badge>
        </div>

        <div className="bg-abyss-900 border border-gold-800 rounded-xl p-4 mb-4">
          <p className="font-crimson text-parchment-muted text-sm italic mb-2">
            "As cartas não mentem. E nesta leitura, os destinos estão traçados..."
          </p>
          <p className="font-crimson text-parchment-muted text-xs">
            A leitura é realizada no Campo de Tser Pool. Os resultados abaixo são fixos para esta campanha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEITURA_FIXA.map((l, idx) => (
            <div
              key={l.artefato}
              className={`rounded-xl border p-4 ${
                l.cor === 'gold' ? 'border-gold-700 bg-gradient-to-b from-yellow-950/40 to-abyss-900'
                : l.cor === 'blue' ? 'border-blue-700 bg-gradient-to-b from-blue-950/40 to-abyss-900'
                : 'border-purple-700 bg-gradient-to-b from-purple-950/40 to-abyss-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-cinzel font-bold text-sm ${
                  l.cor === 'gold' ? 'bg-gold text-abyss-950'
                  : l.cor === 'blue' ? 'bg-blue-700 text-white'
                  : 'bg-purple-700 text-white'
                }`}>{idx + 1}</div>
                <div>
                  <p className="font-cinzel text-xs text-parchment-dark">Artefato</p>
                  <p className={`font-cinzel font-bold text-sm ${
                    l.cor === 'gold' ? 'text-gold' : l.cor === 'blue' ? 'text-blue-300' : 'text-purple-300'
                  }`}>{l.artefato}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-abyss-800 rounded p-2">
                  <p className="text-parchment-dark">Carta</p>
                  <p className="text-parchment font-semibold">{l.naipe} — {l.carta}</p>
                </div>
                <div className={`rounded p-2 ${l.cor === 'gold' ? 'bg-gold/10' : l.cor === 'blue' ? 'bg-blue-950/30' : 'bg-purple-950/30'}`}>
                  <p className="text-parchment-dark">Localização</p>
                  <p className={`font-cinzel font-bold ${l.cor === 'gold' ? 'text-gold' : l.cor === 'blue' ? 'text-blue-300' : 'text-purple-300'}`}>{l.local}</p>
                </div>
                <p className="text-parchment-muted leading-relaxed">{l.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Script da leitura */}
      <div className="bg-abyss-800 border border-grimoire-600 rounded-xl p-4">
        <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Script da Leitura (Leia em Voz Alta)
        </h3>
        <div className="space-y-4 font-crimson text-sm">
          {[
            { label: 'Abertura', cor: 'border-gold', bg: 'bg-gold/5', fala: '"Venham mais perto. As cartas já sabem seus nomes... e o que procuram. Silencie sua mente e abra seu coração. O que as cartas revelam é possibilidade — não certeza. O destino pertence àqueles com coragem de moldá-lo."' },
            { label: 'Primeira Carta — Símbolo Sagrado', cor: 'border-yellow-600', bg: 'bg-yellow-950/20', fala: '"O Druida... guardião da natureza e da morte com igual familiaridade." *(vira a carta)* "O que procuram para purificar o Símbolo Sagrado dorme em uma torre esquecida a nordeste. A Torre de Van Richten. Um homem que lutou contra as trevas por décadas o escondeu lá. Mas cuidado — ele não está mais sozinho na torre."' },
            { label: 'Segunda Carta — Tomo de Strahd', cor: 'border-blue-600', bg: 'bg-blue-950/20', fala: '"O Vingador... uma lâmina que julga." *(pausa)* "O Tomo de Strahd — seus pensamentos mais sombrios, escritos em sua própria mão — está onde a luz tenta em vão manter a escuridão do lado de fora. O Mosteiro de São Andral, em Valaki. Uma moça foi levada para lá. Ela carrega o tomo sem saber."' },
            { label: 'Terceira Carta — Espada Solar', cor: 'border-purple-600', bg: 'bg-purple-950/20', fala: '"O Mago — Mestre de Estrelas. O poder das estrelas forjado em aço." *(longa pausa)* "A Espada Solar, a única arma que pode ferir Strahd em sua forma verdadeira, espera no Templo de Âmbar. Mas esse lugar é antigo e corrupto. Os poderes que dormem lá são mais velhos que Strahd. Não aceitem o que oferecerem, não importa o preço que prometam."' },
            { label: 'Encerramento', cor: 'border-red-700', bg: 'bg-red-950/20', fala: '"Há mais uma coisa. Strahd Von Zarovich não é simplesmente um monstro. Ele é um prisioneiro — tanto quanto qualquer um em Barovia. Mas prisioneiros desesperados são os mais perigosos. Não subestimem o que alguém fará para acabar com seu próprio sofrimento." *(fecha os olhos)* "Agora vão. As cartas disseram o que precisavam dizer."' },
          ].map(({ label, cor, bg, fala }) => (
            <div key={label} className={`${bg} border-l-4 ${cor} pl-3 py-2`}>
              <p className="text-parchment-dark text-xs mb-1">{label}</p>
              <p className="text-parchment italic">{fala}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Referência completa */}
      {tabelaCompleta && (
        <div>
          <h3 className="font-cinzel font-bold text-parchment text-lg mb-3">
            Referência Completa — Todas as Cartas Tarokka
          </h3>
          <p className="font-crimson text-parchment-muted text-sm mb-3">{tabelaCompleta.descricao}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-crimson">
              <thead>
                <tr className="border-b border-grimoire-600">
                  {tabelaCompleta.colunas.map(col => (
                    <th key={col} className="font-cinzel text-gold text-left py-2 pr-4 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabelaCompleta.linhas.map((linha, i) => {
                  const isFixed = linha[0].startsWith('★')
                  return (
                    <tr key={i} className={`border-b border-grimoire-700/50 ${isFixed ? 'bg-gold/10' : i % 2 !== 0 ? 'bg-grimoire-800/20' : ''}`}>
                      {linha.map((cel, j) => (
                        <td key={j} className={`py-2 pr-4 align-top ${isFixed ? 'text-gold font-semibold' : 'text-parchment-muted'}`}>
                          {cel}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── ITENS TAB ───────────────────────────────────────────────
const TIPO_ITEM_ICONS: Record<Item['tipo'], React.ReactNode> = {
  artefato: <Star className="w-4 h-4 text-gold" />,
  magico: <Sparkles className="w-4 h-4 text-blue-400" />,
  consumivel: <FlaskConical className="w-4 h-4 text-green-400" />,
  documento: <Scroll className="w-4 h-4 text-yellow-400" />,
  tesouro: <Gem className="w-4 h-4 text-purple-400" />,
}

const TIPO_ITEM_LABEL: Record<Item['tipo'], string> = {
  artefato: 'Artefato',
  magico: 'Mágico',
  consumivel: 'Consumível',
  documento: 'Documento',
  tesouro: 'Tesouro',
}

const RARIDADE_COR: Record<Item['raridade'], string> = {
  comum: 'text-gray-400 border-gray-600',
  incomum: 'text-green-400 border-green-700',
  raro: 'text-blue-400 border-blue-700',
  'muito-raro': 'text-purple-400 border-purple-700',
  lendario: 'text-gold border-gold-700',
}

const RARIDADE_LABEL: Record<Item['raridade'], string> = {
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  'muito-raro': 'Muito Raro',
  lendario: 'Lendário',
}

function ItensTab() {
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<Item['tipo'] | 'todos'>('todos')
  const [selecionado, setSelecionado] = useState<Item | null>(null)

  const filtrados = useMemo(() => ITENS.filter(item => {
    const buscaOk = !busca || item.nome.toLowerCase().includes(busca.toLowerCase()) || item.localizacao.toLowerCase().includes(busca.toLowerCase()) || item.capitulo.toLowerCase().includes(busca.toLowerCase())
    const tipoOk = filtroTipo === 'todos' || item.tipo === filtroTipo
    return buscaOk && tipoOk
  }), [busca, filtroTipo])

  const tipos: { id: Item['tipo'] | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'artefato', label: 'Artefatos' },
    { id: 'magico', label: 'Mágicos' },
    { id: 'consumivel', label: 'Consumíveis' },
    { id: 'documento', label: 'Documentos' },
    { id: 'tesouro', label: 'Tesouros' },
  ]

  return (
    <div className="space-y-4">
      <p className="font-crimson text-parchment-muted text-sm">
        Todos os itens, artefatos e documentos encontrados durante a campanha de A Maldição de Strahd.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
        <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar item, local ou capítulo..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />
        <div className="flex gap-1 flex-wrap">
          {tipos.map(t => (
            <button
              key={t.id}
              onClick={() => setFiltroTipo(t.id)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-all ${
                filtroTipo === t.id
                  ? 'border-gold text-gold bg-gold/10'
                  : 'border-grimoire-600 text-parchment-muted hover:border-grimoire-400 hover:text-parchment'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className="text-parchment-dark text-xs font-crimson self-center">{filtrados.length} item(s)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtrados.map(item => (
          <div
            key={item.id}
            onClick={() => setSelecionado(item)}
            className="bg-abyss-800 border border-grimoire-600 hover:border-gold/50 rounded-xl p-4 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                {TIPO_ITEM_ICONS[item.tipo]}
                <h3 className="font-cinzel font-bold text-parchment text-sm truncate">{item.nome}</h3>
              </div>
              <span className={`text-xs font-cinzel font-bold border px-1.5 py-0.5 rounded flex-shrink-0 ml-2 ${RARIDADE_COR[item.raridade]}`}>
                {RARIDADE_LABEL[item.raridade]}
              </span>
            </div>
            <p className="text-parchment-dark text-xs font-crimson mb-1">📍 {item.capitulo}</p>
            <p className="font-crimson text-parchment-muted text-xs line-clamp-2">{item.descricao}</p>
            {item.mecanica && (
              <div className="mt-2 bg-grimoire-700/50 rounded px-2 py-1">
                <p className="text-gold text-xs font-crimson line-clamp-1">{item.mecanica}</p>
              </div>
            )}
          </div>
        ))}
        {filtrados.length === 0 && (
          <div className="col-span-full text-center py-8 text-parchment-dark font-crimson text-sm">
            Nenhum item encontrado para os filtros aplicados.
          </div>
        )}
      </div>

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="xl">
          <ItemDetalhe item={selecionado} />
        </Modal>
      )}
    </div>
  )
}

function ItemDetalhe({ item }: { item: Item }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {TIPO_ITEM_ICONS[item.tipo]}
          <span className="text-parchment-muted text-sm font-crimson">{TIPO_ITEM_LABEL[item.tipo]}</span>
        </div>
        <span className={`text-xs font-cinzel font-bold border px-2 py-0.5 rounded ${RARIDADE_COR[item.raridade]}`}>
          {RARIDADE_LABEL[item.raridade]}
        </span>
        <span className="text-parchment-dark text-xs font-crimson">📍 {item.capitulo}</span>
      </div>

      <div className="bg-grimoire-800 rounded-lg p-3">
        <p className="font-cinzel text-gold text-xs mb-1">Localização</p>
        <p className="font-crimson text-parchment-muted text-xs">{item.localizacao}</p>
      </div>

      <div>
        <p className="font-cinzel text-parchment text-xs mb-1">Descrição</p>
        <p className="font-crimson text-parchment-muted text-sm leading-relaxed">{item.descricao}</p>
      </div>

      {item.mecanica && (
        <div className="bg-gold/5 border border-gold-800 rounded-lg p-3">
          <p className="font-cinzel text-gold text-xs font-bold mb-1 flex items-center gap-1">
            <Sword className="w-3 h-3" /> Mecânica de Jogo
          </p>
          <p className="font-crimson text-parchment text-sm leading-relaxed">{item.mecanica}</p>
        </div>
      )}

      {item.observacoes && (
        <div className="bg-yellow-950/20 border border-yellow-700/50 rounded-lg p-3">
          <p className="font-cinzel text-yellow-400 text-xs font-bold mb-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> Nota do Mestre
          </p>
          <p className="font-crimson text-parchment-muted text-sm leading-relaxed">{item.observacoes}</p>
        </div>
      )}
    </div>
  )
}
