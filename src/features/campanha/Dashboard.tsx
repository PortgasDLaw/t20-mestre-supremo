import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Textarea } from '@/components/ui/Input'
import { Clock, Sword, Users, Skull, Timer, Dice1, Shield, Play, Pause, RotateCcw } from 'lucide-react'
import { rollDice } from '@/utils/dice'

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

interface DiceResult { notation: string; rolls: number[]; total: number }

export default function Dashboard() {
  const { anotacoesRapidas, setAnotacoes, npcs, combatentes, sessoes, missoes, cronometroAtivo, segundosSessao, setCronometro, tickCronometro } = useStore()
  const [diceResult, setDiceResult] = useState<DiceResult | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (cronometroAtivo) interval = setInterval(tickCronometro, 1000)
    return () => clearInterval(interval)
  }, [cronometroAtivo, tickCronometro])

  function lancarDado(n: number) {
    const result = rollDice(1, n)
    setDiceResult({ notation: `1d${n}`, rolls: result.rolls, total: result.total })
  }

  const missaoAtiva = missoes.filter(m => m.status === 'ativa')
  const proxSessao = sessoes.length > 0 ? sessoes[sessoes.length - 1] : null

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Painel do Mestre</h1>
        <p className="font-crimson text-parchment-muted mt-1">Central de comando da sua campanha</p>
      </div>

      {/* Cronômetro e Dados Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Cronômetro */}
        <Card className="col-span-1">
          <CardHeader title="Cronômetro de Sessão" icon={<Timer className="w-4 h-4" />} />
          <div className="text-center">
            <div className="font-cinzel text-3xl text-gold mb-3">{formatTime(segundosSessao)}</div>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant={cronometroAtivo ? 'blood' : 'gold'} onClick={() => setCronometro(!cronometroAtivo)}>
                {cronometroAtivo ? <><Pause className="w-3 h-3" /> Pausar</> : <><Play className="w-3 h-3" /> Iniciar</>}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setCronometro(false); useStore.setState({ segundosSessao: 0 }) }}>
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Dados rápidos */}
        <Card className="col-span-1">
          <CardHeader title="Dados Rápidos" icon={<Dice1 className="w-4 h-4" />} />
          <div className="grid grid-cols-4 gap-1 mb-2">
            {[4, 6, 8, 10, 12, 20, 100].map(n => (
              <button key={n} onClick={() => lancarDado(n)}
                className="bg-grimoire-700 hover:bg-grimoire-600 text-gold text-xs font-cinzel rounded py-1.5 transition-colors">
                d{n}
              </button>
            ))}
          </div>
          {diceResult && (
            <div className="mt-2 text-center bg-grimoire-800 rounded p-2">
              <p className="text-parchment-muted text-xs">{diceResult.notation}</p>
              <p className="text-gold font-cinzel text-xl">{diceResult.total}</p>
              <p className="text-parchment-dark text-xs">rolls: [{diceResult.rolls.join(', ')}]</p>
            </div>
          )}
        </Card>

        {/* Estatísticas */}
        <Card>
          <CardHeader title="Campanha" icon={<Shield className="w-4 h-4" />} />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-parchment-muted font-crimson">Sessões</span>
              <span className="text-gold font-cinzel">{sessoes.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-parchment-muted font-crimson">NPCs</span>
              <span className="text-gold font-cinzel">{npcs.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-parchment-muted font-crimson">Missões Ativas</span>
              <span className="text-gold font-cinzel">{missaoAtiva.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-parchment-muted font-crimson">Em Combate</span>
              <span className="text-gold font-cinzel">{combatentes.length}</span>
            </div>
          </div>
        </Card>

        {/* Próxima Sessão */}
        <Card>
          <CardHeader title="Última Sessão" icon={<Clock className="w-4 h-4" />} />
          {proxSessao ? (
            <div>
              <p className="text-parchment font-crimson text-sm font-semibold">#{proxSessao.numero} — {proxSessao.titulo}</p>
              <p className="text-parchment-muted text-xs mt-1">{proxSessao.data}</p>
              {proxSessao.resumo && <p className="text-parchment-muted font-crimson text-xs mt-2 line-clamp-3">{proxSessao.resumo}</p>}
            </div>
          ) : (
            <p className="text-parchment-dark text-sm font-crimson italic">Nenhuma sessão registrada ainda.</p>
          )}
        </Card>
      </div>

      {/* Anotações e listas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Anotações Rápidas */}
        <Card className="lg:col-span-2">
          <CardHeader title="Anotações Rápidas" subtitle="Salvo automaticamente" />
          <Textarea
            value={anotacoesRapidas}
            onChange={e => setAnotacoes(e.target.value)}
            placeholder="Anote aqui informações da sessão atual, lembretes, segredos dos NPCs..."
            rows={8}
            className="text-sm"
          />
        </Card>

        {/* Missões Ativas */}
        <Card>
          <CardHeader title="Missões Ativas" icon={<Sword className="w-4 h-4" />} />
          {missaoAtiva.length === 0 ? (
            <p className="text-parchment-dark text-sm font-crimson italic">Nenhuma missão ativa. Acesse a aba Campanha para criar.</p>
          ) : (
            <div className="space-y-2">
              {missaoAtiva.slice(0, 5).map(m => (
                <div key={m.id} className="border-l-2 border-gold pl-2">
                  <p className="text-parchment font-crimson text-sm font-semibold">{m.titulo}</p>
                  <p className="text-parchment-muted text-xs line-clamp-2">{m.descricao}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* NPCs e combate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* NPCs recentes */}
        <Card>
          <CardHeader title="NPCs Recentes" icon={<Users className="w-4 h-4" />} />
          {npcs.length === 0 ? (
            <p className="text-parchment-dark text-sm font-crimson italic">Nenhum NPC criado. Acesse a aba NPCs.</p>
          ) : (
            <div className="space-y-2">
              {npcs.slice(-6).reverse().map(npc => (
                <div key={npc.id} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-grimoire-700 flex items-center justify-center text-gold text-xs font-cinzel">
                    {npc.nome[0]}
                  </div>
                  <div>
                    <p className="text-parchment font-crimson text-sm">{npc.nome}</p>
                    <p className="text-parchment-muted text-xs">{npc.raca} — {npc.classe}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Combatentes Ativos */}
        <Card>
          <CardHeader title="Combate Ativo" icon={<Skull className="w-4 h-4" />} />
          {combatentes.length === 0 ? (
            <p className="text-parchment-dark text-sm font-crimson italic">Nenhum combate em andamento. Use o Rastreador de Combate.</p>
          ) : (
            <div className="space-y-1">
              {combatentes.slice(0, 6).map(c => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gold font-cinzel w-6">{c.iniciativa}</span>
                    <span className="text-parchment font-crimson text-sm">{c.nome}</span>
                    <Badge variant={c.tipo === 'jogador' ? 'blue' : c.tipo === 'npc' ? 'gold' : 'blood'}>
                      {c.tipo}
                    </Badge>
                  </div>
                  <span className="text-xs text-parchment-muted">{c.pv}/{c.pvMax} PV</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
