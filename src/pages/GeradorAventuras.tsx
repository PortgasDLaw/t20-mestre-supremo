import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Wand2, RefreshCw, Save } from 'lucide-react'
import { gerarAventura } from '../utils/generators'
import { useStore } from '../store'

interface Aventura {
  gancho: string
  vilao: string
  objetivo: string
  recompensa: string
  plotTwist: string
}

export default function GeradorAventuras() {
  const [aventura, setAventura] = useState<Aventura | null>(null)
  const [historico, setHistorico] = useState<Aventura[]>([])
  const { adicionarMissao } = useStore()

  function gerar() {
    const nova = gerarAventura()
    setAventura(nova)
  }

  function salvarComoCampanha() {
    if (!aventura) return
    adicionarMissao({
      titulo: aventura.gancho.slice(0, 50),
      descricao: `VILÃO: ${aventura.vilao}\n\nOBJETIVO: ${aventura.objetivo}\n\nPLOT TWIST: ${aventura.plotTwist}`,
      objetivos: [aventura.objetivo],
      recompensa: aventura.recompensa,
      status: 'pendente',
      npcsRelacionados: [],
    })
    if (aventura) setHistorico(prev => [aventura, ...prev.slice(0, 4)])
  }

  const secoes = aventura ? [
    { label: '🎯 Gancho', value: aventura.gancho, cor: 'border-gold-700', textoCor: 'text-gold' },
    { label: '🦹 Vilão', value: aventura.vilao, cor: 'border-blood', textoCor: 'text-blood-light' },
    { label: '⚔️ Objetivo', value: aventura.objetivo, cor: 'border-blue-800', textoCor: 'text-blue-400' },
    { label: '💰 Recompensa', value: aventura.recompensa, cor: 'border-green-800', textoCor: 'text-green-400' },
    { label: '🌀 Plot Twist', value: aventura.plotTwist, cor: 'border-purple-800', textoCor: 'text-purple-400' },
  ] : []

  return (
    <div className="space-y-6">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Gerador de Aventuras</h1>
        <p className="font-crimson text-parchment-muted mt-1">Gere aventuras completas em um clique</p>
      </div>

      {/* Botão gerador */}
      <div className="text-center py-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-gold/10 animate-glow-pulse" />
          <Button size="lg" onClick={gerar} className="relative text-lg px-8 py-4">
            <Wand2 className="w-6 h-6" />
            {aventura ? 'Gerar Nova Aventura' : 'Gerar Aventura'}
          </Button>
        </div>
      </div>

      {/* Resultado */}
      {aventura && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel font-bold text-parchment">Aventura Gerada</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={gerar}><RefreshCw className="w-4 h-4" /> Regerar</Button>
              <Button size="sm" variant="ghost" onClick={salvarComoCampanha}><Save className="w-4 h-4" /> Salvar na Campanha</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {secoes.map(({ label, value, cor, textoCor }) => (
              <div key={label} className={`bg-abyss-800 border-l-4 ${cor} rounded-r-lg p-4`}>
                <h3 className={`font-cinzel font-semibold text-sm mb-2 ${textoCor}`}>{label}</h3>
                <p className="font-crimson text-parchment text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Resumo narrativo */}
          <div className="bg-grimoire-800 border border-grimoire-600 rounded-lg p-4">
            <h3 className="font-cinzel text-gold text-sm mb-2">📜 Resumo Narrativo</h3>
            <p className="font-crimson text-parchment leading-relaxed">
              <strong className="text-parchment">Situação:</strong> {aventura.gancho}
              {' '}Os heróis descobrirão que por trás de tudo está <em>{aventura.vilao}</em>.
              {' '}Seu objetivo será {aventura.objetivo.toLowerCase()}, e caso bem-sucedidos, receberão {aventura.recompensa.toLowerCase()}.
              {' '}Mas então a reviravolta: <strong className="text-purple-400">{aventura.plotTwist}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Histórico */}
      {historico.length > 0 && (
        <div>
          <h2 className="font-cinzel font-semibold text-parchment-muted text-sm mb-3">Aventuras Anteriores</h2>
          <div className="space-y-2">
            {historico.map((h, i) => (
              <div key={i} className="bg-abyss-800 border border-grimoire-700 rounded p-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setAventura(h)}>
                <p className="font-crimson text-parchment text-sm"><span className="text-gold">Gancho:</span> {h.gancho}</p>
                <p className="font-crimson text-parchment-muted text-xs mt-1"><span className="text-blood-light">Vilão:</span> {h.vilao}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
