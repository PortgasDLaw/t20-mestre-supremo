import { useState } from 'react'
import ameacasData from '../data/ameacas.json'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { useStore } from '../store'
import { Dices, Plus, Swords } from 'lucide-react'
import type { Ameaca } from '../types'

const ameacas: Ameaca[] = ameacasData as Ameaca[]

function ndToNum(nd: string) {
  if (nd.includes('/')) { const [n, d] = nd.split('/'); return Number(n) / Number(d) }
  return Number(nd)
}

type Dificuldade = 'facil' | 'medio' | 'dificil' | 'mortal'

const dificuldadeConfig: Record<Dificuldade, { label: string; xpMult: number; cor: string }> = {
  facil: { label: 'Fácil', xpMult: 0.5, cor: 'text-green-400' },
  medio: { label: 'Médio', xpMult: 1, cor: 'text-yellow-400' },
  dificil: { label: 'Difícil', xpMult: 1.5, cor: 'text-orange-400' },
  mortal: { label: 'Mortal', xpMult: 2, cor: 'text-blood-light' },
}

function calcularNdGrupo(nivel: number, jogadores: number, dificuldade: Dificuldade): number {
  const base = nivel * dificuldadeConfig[dificuldade].xpMult
  return Math.max(0.25, Math.min(20, base + (jogadores - 4) * 0.5))
}

function gerarEncontro(ndAlvo: number): Ameaca[] {
  const candidatos = ameacas.filter(a => {
    const nd = ndToNum(a.nd)
    return nd >= ndAlvo * 0.5 && nd <= ndAlvo * 1.5
  })
  if (candidatos.length === 0) return []
  const resultado: Ameaca[] = []
  let ndTotal = 0
  let tentativas = 0
  while (ndTotal < ndAlvo * 0.8 && tentativas < 20) {
    const candidato = candidatos[Math.floor(Math.random() * candidatos.length)]
    const ndCand = ndToNum(candidato.nd)
    if (ndTotal + ndCand <= ndAlvo * 1.3) {
      resultado.push(candidato)
      ndTotal += ndCand
    }
    tentativas++
  }
  return resultado
}

export default function GeradorEncontros() {
  const [nivel, setNivel] = useState('5')
  const [jogadores, setJogadores] = useState('4')
  const [dificuldade, setDificuldade] = useState<Dificuldade>('medio')
  const [encontro, setEncontro] = useState<Ameaca[]>([])
  const [gerado, setGerado] = useState(false)
  const { adicionarCombatente, setPaginaAtual } = useStore()

  function gerar() {
    const ndAlvo = calcularNdGrupo(Number(nivel), Number(jogadores), dificuldade)
    const resultado = gerarEncontro(ndAlvo)
    setEncontro(resultado)
    setGerado(true)
  }

  function enviarParaCombate() {
    encontro.forEach(a => {
      adicionarCombatente({
        nome: a.nome, tipo: 'monstro',
        iniciativa: Math.floor(Math.random() * 20) + 1,
        pv: a.pv, pvMax: a.pv, pm: a.pm, pmMax: a.pm,
        ca: a.ca, condicoes: [], notas: `ND ${a.nd}`,
      })
    })
    setPaginaAtual('combate')
  }

  const ndAlvo = calcularNdGrupo(Number(nivel), Number(jogadores), dificuldade)
  const config = dificuldadeConfig[dificuldade]

  return (
    <div className="space-y-6">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Gerador de Encontros</h1>
        <p className="font-crimson text-parchment-muted mt-1">Crie combates equilibrados automaticamente</p>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-cinzel text-parchment-muted mb-1 block">Nível do Grupo</label>
            <Select value={nivel} onChange={e => setNivel(e.target.value)} options={Array.from({ length: 20 }, (_, i) => ({ value: String(i + 1), label: `Nível ${i + 1}` }))} />
          </div>
          <div>
            <label className="text-xs font-cinzel text-parchment-muted mb-1 block">Número de Jogadores</label>
            <Select value={jogadores} onChange={e => setJogadores(e.target.value)} options={[2,3,4,5,6].map(n => ({ value: String(n), label: `${n} jogadores` }))} />
          </div>
          <div>
            <label className="text-xs font-cinzel text-parchment-muted mb-1 block">Dificuldade</label>
            <div className="grid grid-cols-2 gap-1">
              {(Object.entries(dificuldadeConfig) as [Dificuldade, typeof dificuldadeConfig[Dificuldade]][]).map(([key, val]) => (
                <button key={key} onClick={() => setDificuldade(key)}
                  className={`px-2 py-1.5 text-xs font-cinzel rounded border transition-colors ${dificuldade === key ? 'bg-grimoire-600 border-gold text-gold' : 'border-grimoire-600 text-parchment-muted'}`}>
                  {val.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-parchment-muted text-sm font-crimson">
              ND alvo: <span className={`font-bold font-cinzel ${config.cor}`}>{ndAlvo.toFixed(2)}</span>
            </p>
            <p className={`text-sm font-cinzel ${config.cor}`}>Encontro {config.label}</p>
          </div>
          <Button onClick={gerar} size="lg">
            <Dices className="w-5 h-5" /> Gerar Encontro
          </Button>
        </div>
      </Card>

      {gerado && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-cinzel font-bold text-parchment">Encontro Gerado</h2>
            {encontro.length > 0 && (
              <Button variant="blood" onClick={enviarParaCombate}>
                <Swords className="w-4 h-4" /> Iniciar Combate
              </Button>
            )}
          </div>

          {encontro.length === 0 ? (
            <Card>
              <p className="text-center font-crimson text-parchment-muted py-4">
                Não encontrei criaturas adequadas para esse ND. Tente outro nível ou dificuldade.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {encontro.map((a, idx) => (
                <div key={`${a.id}-${idx}`} className="bg-abyss-800 border border-blood-muted rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-cinzel font-bold text-parchment">{a.nome}</h3>
                      <p className="text-parchment-dark text-xs">{a.tipo} • {a.tamanho}</p>
                    </div>
                    <Badge variant="blood">ND {a.nd}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                    {[['PV', a.pv, 'text-blood-light'], ['CA', a.ca, 'text-blue-400'], ['Fort', `+${a.resistencias.fortitude}`, 'text-green-400'], ['Reflex', `+${a.resistencias.reflexos}`, 'text-yellow-400']].map(([label, val, color]) => (
                      <div key={label as string} className="bg-grimoire-800 rounded p-1.5">
                        <p className="text-parchment-dark text-xs">{label}</p>
                        <p className={`font-cinzel font-bold text-sm ${color}`}>{val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    {a.ataques.slice(0, 1).map(atq => (
                      <p key={atq.nome} className="text-xs font-crimson text-parchment-muted">
                        ⚔ {atq.nome}: {atq.bônus} ({atq.dano})
                      </p>
                    ))}
                  </div>
                  <p className="mt-2 font-crimson text-parchment-muted text-xs italic">{a.taticas}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
