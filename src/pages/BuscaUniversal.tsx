import { useState, useMemo } from 'react'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Search } from 'lucide-react'
import equipamentosData from '../data/equipamentos.json'
import magiasData from '../data/magias.json'
import condicoesData from '../data/condicoes.json'
import ameacasData from '../data/ameacas.json'
import reinosData from '../data/reinos.json'

type ResultType = 'equipamento' | 'magia' | 'condicao' | 'ameaca' | 'reino'

interface Resultado {
  id: string
  nome: string
  tipo: ResultType
  subtipo?: string
  descricao?: string
  raw: Record<string, unknown>
}

const tipoColor: Record<ResultType, 'gold' | 'blood' | 'gray' | 'green' | 'blue' | 'purple'> = {
  equipamento: 'gold', magia: 'purple', condicao: 'blood', ameaca: 'blood', reino: 'blue',
}

const tipoLabel: Record<ResultType, string> = {
  equipamento: 'Equipamento', magia: 'Magia', condicao: 'Condição', ameaca: 'Ameaça', reino: 'Reino',
}

// Build search index
const allItems: Resultado[] = [
  ...[...equipamentosData.armas, ...equipamentosData.armaduras, ...equipamentosData.escudos, ...equipamentosData.itensGerais, ...equipamentosData.itensMagicos].map(e => ({
    id: (e as any).id, nome: (e as any).nome, tipo: 'equipamento' as ResultType,
    subtipo: (e as any).tipo || (e as any).categoria, descricao: (e as any).descricao,
    raw: e as Record<string, unknown>,
  })),
  ...(magiasData as any[]).map(m => ({
    id: m.id, nome: m.nome, tipo: 'magia' as ResultType,
    subtipo: `${m.circulo}º Círculo ${m.tipo}`, descricao: m.descricao,
    raw: m,
  })),
  ...(condicoesData as any[]).map(c => ({
    id: c.id, nome: c.nome, tipo: 'condicao' as ResultType,
    subtipo: 'Condição', descricao: c.descricao,
    raw: c,
  })),
  ...(ameacasData as any[]).map(a => ({
    id: a.id, nome: a.nome, tipo: 'ameaca' as ResultType,
    subtipo: `ND ${a.nd} • ${a.tipo}`, descricao: a.descricao,
    raw: a,
  })),
  ...(reinosData as any[]).map(r => ({
    id: r.id, nome: r.nome, tipo: 'reino' as ResultType,
    subtipo: r.tipo, descricao: r.descricao,
    raw: r,
  })),
]

function highlight(text: string, query: string) {
  if (!query || !text) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return text.slice(0, idx) + '**' + text.slice(idx, idx + query.length) + '**' + text.slice(idx + query.length)
}

export default function BuscaUniversal() {
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<ResultType | 'todos'>('todos')
  const [selecionado, setSelecionado] = useState<Resultado | null>(null)

  const resultados = useMemo(() => {
    if (!busca || busca.length < 2) return []
    return allItems.filter(item => {
      const matchTipo = filtroTipo === 'todos' || item.tipo === filtroTipo
      const q = busca.toLowerCase()
      const matchBusca = item.nome.toLowerCase().includes(q) ||
        (item.descricao || '').toLowerCase().includes(q) ||
        (item.subtipo || '').toLowerCase().includes(q) ||
        JSON.stringify(item.raw).toLowerCase().includes(q)
      return matchTipo && matchBusca
    }).slice(0, 50)
  }, [busca, filtroTipo])

  const porTipo = useMemo(() => {
    const groups: Partial<Record<ResultType, Resultado[]>> = {}
    resultados.forEach(r => {
      if (!groups[r.tipo]) groups[r.tipo] = []
      groups[r.tipo]!.push(r)
    })
    return groups
  }, [resultados])

  function renderDetalhe(item: Resultado) {
    const raw = item.raw as any
    if (item.tipo === 'magia') {
      return (
        <div className="space-y-3">
          <div className="flex gap-2"><Badge variant="purple">{raw.tipo}</Badge><Badge variant="gray">{raw.escola}</Badge><Badge variant="blue">{raw.circulo}º Círculo</Badge></div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['pm', 'execucao', 'alcance', 'duracao', 'area', 'resistencia'].map(k => raw[k] && (
              <div key={k} className="bg-grimoire-800 rounded p-2">
                <p className="text-parchment-dark text-xs capitalize">{k}</p>
                <p className="text-parchment font-crimson">{raw[k]}</p>
              </div>
            ))}
          </div>
          <p className="font-crimson text-parchment text-sm">{raw.descricao}</p>
          {raw.aprimoramentos?.length > 0 && <div><p className="text-purple-400 font-cinzel text-xs mb-1">Aprimoramentos:</p>{raw.aprimoramentos.map((a: string, i: number) => <p key={i} className="text-xs text-parchment font-crimson">• {a}</p>)}</div>}
        </div>
      )
    }
    if (item.tipo === 'condicao') {
      return (
        <div className="space-y-3">
          <p className="font-crimson text-parchment">{raw.descricao}</p>
          <div><p className="text-blood-light font-cinzel text-xs mb-1">Penalidades:</p>{raw.penalidades?.map((p: string, i: number) => <p key={i} className="text-xs text-parchment font-crimson">• {p}</p>)}</div>
          <div className="bg-green-950 border border-green-900 rounded p-2"><p className="text-green-400 font-cinzel text-xs mb-1">Remoção:</p><p className="text-parchment font-crimson text-sm">{raw.remocao}</p></div>
        </div>
      )
    }
    if (item.tipo === 'ameaca') {
      return (
        <div className="space-y-3">
          <div className="flex gap-2"><Badge variant="blood">ND {raw.nd}</Badge><Badge variant="gray">{raw.tipo}</Badge></div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['PV', raw.pv, 'text-blood-light'], ['CA', raw.ca, 'text-blue-400'], ['Init', raw.iniciativa, 'text-gold']].map(([l, v, c]) => (
              <div key={l as string} className="bg-grimoire-800 rounded p-2"><p className="text-parchment-dark text-xs">{l}</p><p className={`font-cinzel font-bold ${c}`}>{v}</p></div>
            ))}
          </div>
          <p className="font-crimson text-parchment text-sm">{raw.descricao}</p>
          <p className="font-crimson text-parchment-muted text-xs italic">{raw.taticas}</p>
        </div>
      )
    }
    return (
      <div className="space-y-2">
        {Object.entries(raw).filter(([k]) => !['id'].includes(k)).map(([k, v]) => (
          typeof v === 'string' || typeof v === 'number' ? (
            <div key={k} className="bg-grimoire-800 rounded p-2">
              <p className="text-parchment-dark text-xs capitalize">{k}</p>
              <p className="text-parchment font-crimson text-sm">{String(v)}</p>
            </div>
          ) : Array.isArray(v) ? (
            <div key={k}>
              <p className="text-parchment-dark text-xs capitalize mb-1">{k}:</p>
              {(v as any[]).map((item: unknown, i: number) => <p key={i} className="text-parchment text-xs font-crimson">• {String(item)}</p>)}
            </div>
          ) : null
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Busca Universal</h1>
        <p className="font-crimson text-parchment-muted mt-1">Pesquise em todo o conteúdo simultaneamente</p>
      </div>

      <div className="space-y-3">
        <Input
          icon={<Search className="w-5 h-5" />}
          placeholder="Buscar em magias, equipamentos, monstros, condições, reinos..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="text-base py-3"
        />

        <div className="flex gap-1 flex-wrap">
          {(['todos', 'equipamento', 'magia', 'condicao', 'ameaca', 'reino'] as const).map(t => (
            <button key={t} onClick={() => setFiltroTipo(t)}
              className={`px-3 py-1 text-xs font-cinzel rounded border transition-colors ${filtroTipo === t ? 'bg-gold text-abyss-950 border-gold' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700'}`}>
              {t === 'todos' ? 'Todos' : tipoLabel[t]}
            </button>
          ))}
        </div>
      </div>

      {busca.length < 2 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-grimoire-600 mx-auto mb-3" />
          <p className="font-cinzel text-parchment-muted">Digite ao menos 2 caracteres para buscar</p>
          <p className="font-crimson text-parchment-dark text-sm mt-1">{allItems.length} itens no banco de dados</p>
        </div>
      ) : resultados.length === 0 ? (
        <p className="text-center py-8 font-crimson text-parchment-muted">Nenhum resultado para "<span className="text-gold">{busca}</span>"</p>
      ) : (
        <div className="space-y-4">
          <p className="text-parchment-dark text-xs font-crimson">{resultados.length} resultado(s)</p>
          {(Object.entries(porTipo) as [ResultType, Resultado[]][]).map(([tipo, lista]) => (
            <div key={tipo}>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={tipoColor[tipo]}>{tipoLabel[tipo]}</Badge>
                <span className="text-parchment-dark text-xs font-crimson">{lista.length} resultado(s)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {lista.map(item => (
                  <button key={item.id} onClick={() => setSelecionado(item)}
                    className="text-left bg-abyss-800 border border-grimoire-600 rounded-lg p-3 hover:border-gold-700 transition-all">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-cinzel font-semibold text-parchment text-sm">{item.nome}</h4>
                    </div>
                    {item.subtipo && <p className="text-parchment-muted text-xs font-crimson mb-1">{item.subtipo}</p>}
                    {item.descricao && <p className="text-parchment-dark text-xs font-crimson line-clamp-2">{item.descricao}</p>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selecionado && (
        <Modal open={!!selecionado} onClose={() => setSelecionado(null)} title={selecionado.nome} size="lg">
          <div>
            <div className="flex gap-2 mb-4">
              <Badge variant={tipoColor[selecionado.tipo]}>{tipoLabel[selecionado.tipo]}</Badge>
              {selecionado.subtipo && <Badge variant="gray">{selecionado.subtipo}</Badge>}
            </div>
            {renderDetalhe(selecionado)}
          </div>
        </Modal>
      )}
    </div>
  )
}
