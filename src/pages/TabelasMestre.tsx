import { useState } from 'react'
import tabelasData from '../data/tabelas.json'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'

const secoes = [
  { id: 'cds', label: 'CDs por Dificuldade', data: tabelasData.cds },
  { id: 'atitudes', label: 'Atitudes de NPC', data: tabelasData.atitudes_npc },
  { id: 'clima', label: 'Clima', data: tabelasData.clima },
  { id: 'eventos', label: 'Eventos Aleatórios (d20)', data: tabelasData.eventos_aleatorios },
  { id: 'viagem', label: 'Velocidade de Viagem', data: tabelasData.viagem },
  { id: 'tesouro', label: 'Tesouros por ND', data: tabelasData.tesouro_nd },
  { id: 'precos', label: 'Preços e Serviços', data: tabelasData.precos },
]

type Secao = typeof secoes[0]

function renderTable(secao: Secao) {
  if (!secao.data || secao.data.length === 0) return null
  const keys = Object.keys(secao.data[0])
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-crimson">
        <thead>
          <tr className="border-b border-grimoire-600">
            {keys.map(k => (
              <th key={k} className="text-left py-2 px-3 text-gold font-cinzel text-xs capitalize">{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {secao.data.map((row: Record<string, unknown>, i: number) => (
            <tr key={i} className={`border-b border-grimoire-800 ${i % 2 === 0 ? 'bg-abyss-900' : ''}`}>
              {keys.map(k => (
                <td key={k} className="py-2 px-3 text-parchment text-xs">{String(row[k])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TabelasMestre() {
  const [busca, setBusca] = useState('')
  const [abertas, setAbertas] = useState<Set<string>>(new Set(['cds']))

  function toggle(id: string) {
    setAbertas(prev => {
      const novo = new Set(prev)
      if (novo.has(id)) novo.delete(id)
      else novo.add(id)
      return novo
    })
  }

  const filtradas = secoes.filter(s =>
    !busca || s.label.toLowerCase().includes(busca.toLowerCase()) ||
    JSON.stringify(s.data).toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Tabelas do Mestre</h1>
        <p className="font-crimson text-parchment-muted mt-1">Referência rápida para decisões de mesa</p>
      </div>

      <Input icon={<Search className="w-4 h-4" />} placeholder="Buscar nas tabelas..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />

      <div className="space-y-2">
        {filtradas.map(secao => {
          const aberta = abertas.has(secao.id)
          return (
            <div key={secao.id} className="bg-abyss-800 border border-grimoire-600 rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(secao.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-grimoire-800 transition-colors"
              >
                <span className="font-cinzel font-semibold text-parchment text-sm">{secao.label}</span>
                {aberta ? <ChevronDown className="w-4 h-4 text-gold" /> : <ChevronRight className="w-4 h-4 text-grimoire-500" />}
              </button>
              {aberta && (
                <div className="border-t border-grimoire-600">
                  {renderTable(secao)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tabelas de encontro por terreno */}
      <div className="bg-abyss-800 border border-grimoire-600 rounded-lg overflow-hidden">
        <button onClick={() => toggle('encontros')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-grimoire-800 transition-colors">
          <span className="font-cinzel font-semibold text-parchment text-sm">Encontros por Terreno</span>
          {abertas.has('encontros') ? <ChevronDown className="w-4 h-4 text-gold" /> : <ChevronRight className="w-4 h-4 text-grimoire-500" />}
        </button>
        {abertas.has('encontros') && (
          <div className="border-t border-grimoire-600 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(tabelasData.encontros_terreno).map(([terreno, lista]) => (
              <div key={terreno}>
                <h4 className="font-cinzel text-gold text-xs mb-2 capitalize">{terreno}</h4>
                <table className="w-full text-xs font-crimson">
                  <thead>
                    <tr className="border-b border-grimoire-600">
                      <th className="text-left py-1 text-parchment-muted">d8</th>
                      <th className="text-left py-1 text-parchment-muted">Encontro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.map((row, i) => (
                      <tr key={i} className="border-b border-grimoire-800">
                        <td className="py-1 text-gold">{row.d8}</td>
                        <td className="py-1 text-parchment">{row.encontro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
