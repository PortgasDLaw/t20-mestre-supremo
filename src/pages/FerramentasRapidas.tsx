import { useState, useEffect, useRef } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { rollDice, DICE_TYPES } from '../utils/dice'
import { gerarNomeTaverna, gerarTesouro, gerarNome, gerarMasmorra } from '../utils/generators'
import { Dice1, Timer, Hash, User, Home, Gem, Map, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react'

type DiceRoll = { notation: string; total: number; rolls: number[]; ts: number }

export default function FerramentasRapidas() {
  const [historicoDados, setHistoricoDados] = useState<DiceRoll[]>([])
  const [count, setCount] = useState(1)
  const [cronAtivo, setCronAtivo] = useState(false)
  const [cronSegundos, setCronSegundos] = useState(0)
  const [rodada, setRodada] = useState(1)
  const [nomesGerados, setNomesGerados] = useState<string[]>([])
  const [tavernasGeradas, setTavernasGeradas] = useState<string[]>([])
  const [tesourosGerados, setTesourosGerados] = useState<string[]>([])
  const [masmorraGerada, setMasmorraGerada] = useState<string[]>([])
  const cronRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (cronAtivo) { cronRef.current = setInterval(() => setCronSegundos(s => s + 1), 1000) }
    else { if (cronRef.current) clearInterval(cronRef.current) }
    return () => { if (cronRef.current) clearInterval(cronRef.current) }
  }, [cronAtivo])

  function rolar(sides: number) {
    const result = rollDice(count, sides)
    const notation = `${count}d${sides}`
    setHistoricoDados(prev => [{ notation, total: result.total, rolls: result.rolls, ts: Date.now() }, ...prev.slice(0, 19)])
  }

  function formatCron(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }

  function addNome() { setNomesGerados(prev => [gerarNome(), ...prev.slice(0, 9)]) }
  function addTaverna() { setTavernasGeradas(prev => [gerarNomeTaverna(), ...prev.slice(0, 9)]) }
  function addTesouro() { setTesourosGerados(prev => [gerarTesouro(), ...prev.slice(0, 9)]) }
  function gerarMasmorraFn() { setMasmorraGerada(gerarMasmorra()) }

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Ferramentas Rápidas</h1>
        <p className="font-crimson text-parchment-muted mt-1">Utilitários para usar durante a sessão</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* Rolador de Dados */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Dice1 className="w-4 h-4" /> Rolador de Dados</h3>
          <div className="flex items-center gap-2 mb-3">
            <button onClick={() => setCount(Math.max(1, count - 1))} className="p-1 text-parchment-muted hover:text-gold transition-colors"><Minus className="w-4 h-4" /></button>
            <span className="font-cinzel text-gold font-bold w-6 text-center">{count}</span>
            <button onClick={() => setCount(Math.min(20, count + 1))} className="p-1 text-parchment-muted hover:text-gold transition-colors"><Plus className="w-4 h-4" /></button>
            <span className="text-parchment-muted text-xs font-crimson">dados</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {DICE_TYPES.map(d => (
              <button key={d} onClick={() => rolar(d)}
                className="bg-grimoire-700 hover:bg-gold hover:text-abyss-950 text-gold text-xs font-cinzel rounded py-2 transition-all duration-150 active:scale-95">
                d{d}
              </button>
            ))}
          </div>
          {historicoDados.length > 0 && (
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {historicoDados.map((r, i) => (
                <div key={r.ts} className={`flex items-center justify-between text-xs px-2 py-1 rounded ${i === 0 ? 'bg-grimoire-700 border border-gold-800' : 'bg-grimoire-900'}`}>
                  <span className="text-parchment-muted font-crimson">{r.notation}</span>
                  <span className={`font-cinzel font-bold ${i === 0 ? 'text-gold' : 'text-parchment'}`}>{r.total}</span>
                  <span className="text-parchment-dark">[{r.rolls.join(',')}]</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Cronômetro */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Timer className="w-4 h-4" /> Cronômetro</h3>
          <div className="text-center">
            <div className="font-cinzel text-4xl text-gold mb-4">{formatCron(cronSegundos)}</div>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant={cronAtivo ? 'blood' : 'gold'} onClick={() => setCronAtivo(!cronAtivo)}>
                {cronAtivo ? <><Pause className="w-3 h-3" /> Pausar</> : <><Play className="w-3 h-3" /> Iniciar</>}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setCronAtivo(false); setCronSegundos(0) }}>
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Contador de Rodadas */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Hash className="w-4 h-4" /> Contador de Rodadas</h3>
          <div className="text-center">
            <div className="font-cinzel text-5xl text-gold mb-4">{rodada}</div>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant="outline" onClick={() => setRodada(Math.max(1, rodada - 1))}><Minus className="w-3 h-3" /></Button>
              <Button size="sm" variant="gold" onClick={() => setRodada(r => r + 1)}>Próxima Rodada</Button>
              <Button size="sm" variant="ghost" onClick={() => setRodada(1)}><RotateCcw className="w-3 h-3" /></Button>
            </div>
          </div>
        </Card>

        {/* Gerador de Nomes */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><User className="w-4 h-4" /> Gerador de Nomes</h3>
          <Button size="sm" onClick={addNome} className="w-full mb-2">Gerar Nome</Button>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {nomesGerados.map((n, i) => <p key={i} className={`text-xs font-crimson px-2 py-1 rounded ${i === 0 ? 'text-parchment bg-grimoire-700' : 'text-parchment-muted'}`}>{n}</p>)}
          </div>
        </Card>

        {/* Gerador de Tavernas */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Home className="w-4 h-4" /> Gerador de Tavernas</h3>
          <Button size="sm" onClick={addTaverna} className="w-full mb-2">Gerar Nome de Taverna</Button>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {tavernasGeradas.map((t, i) => <p key={i} className={`text-xs font-cinzel px-2 py-1 rounded ${i === 0 ? 'text-gold bg-grimoire-700' : 'text-gold-700'}`}>{t}</p>)}
          </div>
        </Card>

        {/* Gerador de Tesouros */}
        <Card>
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Gem className="w-4 h-4" /> Gerador de Tesouros</h3>
          <Button size="sm" onClick={addTesouro} className="w-full mb-2">Gerar Tesouro</Button>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {tesourosGerados.map((t, i) => <p key={i} className={`text-xs font-crimson px-2 py-1 rounded ${i === 0 ? 'text-parchment bg-grimoire-700' : 'text-parchment-muted'}`}>{t}</p>)}
          </div>
        </Card>

        {/* Gerador de Masmorras */}
        <Card className="lg:col-span-2 xl:col-span-3">
          <h3 className="font-cinzel font-semibold text-gold text-sm mb-3 flex items-center gap-1"><Map className="w-4 h-4" /> Gerador de Masmorras</h3>
          <Button size="sm" onClick={gerarMasmorraFn} className="mb-3">Gerar Layout de Masmorra</Button>
          {masmorraGerada.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {masmorraGerada.map((sala, i) => (
                <div key={i} className="bg-grimoire-800 border border-grimoire-600 rounded p-2">
                  <p className="text-gold text-xs font-cinzel mb-0.5">Sala {i + 1}</p>
                  <p className="text-parchment text-xs font-crimson">{sala}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>
    </div>
  )
}
