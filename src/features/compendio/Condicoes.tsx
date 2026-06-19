import { useState, useMemo } from 'react'
import condicoesData from '@/data/condicoes.json'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Search, AlertTriangle, CheckCircle } from 'lucide-react'
import { asset } from '@/lib/asset'
import type { Condicao } from '@/types'

const corMap: Record<string, 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple'> = {
  yellow: 'gold', red: 'blood', gray: 'gray', green: 'green', blue: 'blue',
  purple: 'purple', orange: 'gold', pink: 'purple', brown: 'gray',
  darkgray: 'gray',
}

const bgCorMap: Record<string, string> = {
  yellow: 'border-gold-700', red: 'border-blood', gray: 'border-grimoire-500',
  green: 'border-green-800', blue: 'border-blue-800', purple: 'border-purple-800',
  orange: 'border-orange-800', pink: 'border-pink-800', brown: 'border-yellow-900',
  darkgray: 'border-gray-700',
}

const condicoes: Condicao[] = condicoesData as Condicao[]

export default function Condicoes() {
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState<Condicao | null>(null)

  const filtradas = useMemo(() =>
    condicoes.filter(c =>
      !busca || c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Condições e Penalidades</h1>
        <p className="font-crimson text-parchment-muted mt-1">Clique em uma condição para ver todos os detalhes</p>
      </div>

      <Input
        icon={<Search className="w-4 h-4" />}
        placeholder="Buscar condição..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtradas.map(condicao => (
          <div key={condicao.id} className="relative cursor-pointer hover:brightness-110 transition-all"
            onClick={() => setSelecionada(condicao)}>
            <img src={asset('ui/moldura-exotica.png')} aria-hidden
              className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
            <div className="relative z-10 px-5 py-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-cinzel font-bold text-parchment">{condicao.nome}</h3>
                <AlertTriangle className={`w-4 h-4 flex-shrink-0 ml-2 ${condicao.cor === 'red' ? 'text-blood-light' : 'text-gold'}`} />
              </div>
              <p className="font-crimson text-parchment-muted text-sm line-clamp-2 mb-2">{condicao.descricao}</p>
              <div className="space-y-0.5">
                {condicao.penalidades.slice(0, 2).map((p, i) => (
                  <p key={i} className="text-xs text-red-400 font-crimson">• {p}</p>
                ))}
                {condicao.penalidades.length > 2 && (
                  <p className="text-xs text-grimoire-500">+{condicao.penalidades.length - 2} mais...</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalhes */}
      {selecionada && (
        <Modal open={!!selecionada} onClose={() => setSelecionada(null)} title={selecionada.nome} size="lg">
          <div className="space-y-4">
            <p className="font-crimson text-parchment text-base">{selecionada.descricao}</p>

            <div>
              <h4 className="font-cinzel text-blood-light text-sm mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Penalidades
              </h4>
              <ul className="space-y-1">
                {selecionada.penalidades.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm font-crimson text-parchment">
                    <span className="text-blood-light">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            {selecionada.interacoes.length > 0 && (
              <div>
                <h4 className="font-cinzel text-gold text-sm mb-2">Interações e Observações</h4>
                <ul className="space-y-1">
                  {selecionada.interacoes.map((inter, i) => (
                    <li key={i} className="flex gap-2 text-sm font-crimson text-parchment-muted">
                      <span className="text-gold">◆</span> {inter}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-green-950 border border-green-900 rounded p-3">
              <h4 className="font-cinzel text-green-400 text-sm mb-1 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Como Remover
              </h4>
              <p className="font-crimson text-parchment text-sm">{selecionada.remocao}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
