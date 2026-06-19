import { useState } from 'react'
import tabelasData from '@/data/tabelas.json'
import { Input } from '@/components/ui/Input'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'

type RowData = Record<string, unknown>

const secoes = [
  { id: 'cds', label: 'CDs por Dificuldade', data: tabelasData.cds },
  { id: 'atitudes', label: 'Atitudes de NPC', data: tabelasData.atitudes_npc },
  { id: 'tabela_1_1_atributos', label: 'Tabela 1.1 — Modificadores de Atributo', data: tabelasData.tabela_1_1_atributos },
  { id: 'tabela_1_2_racas', label: 'Tabela 1.2 — Raças (Bônus Iniciais)', data: tabelasData.tabela_1_2_racas },
  { id: 'tabela_1_3_classes', label: 'Tabela 1.3 — Classes', data: tabelasData.tabela_1_3_classes },
  { id: 'tabela_1_4_niveis', label: 'Tabela 1.4 — Evolução por Nível', data: tabelasData.tabela_1_4_niveis },
  { id: 'tabela_1_19_origens', label: 'Tabela 1.19 — Origens', data: tabelasData.tabela_1_19_origens },
  { id: 'tabela_1_20_deuses', label: 'Tabela 1.20 — Deuses', data: tabelasData.tabela_1_20_deuses },
  { id: 'tabela_1_21_tamanho', label: 'Tabela 1.21 — Tamanho', data: tabelasData.tabela_1_21_tamanho },
  { id: 'tabela_2_1_pericias', label: 'Tabela 2.1 — Perícias', data: tabelasData.tabela_2_1_pericias },
  { id: 'tabela_3_1_dinheiro_inicial', label: 'Tabela 3.1 — Dinheiro Inicial por Origem', data: tabelasData.tabela_3_1_dinheiro_inicial },
  { id: 'tabela_3_2_dano_armas', label: 'Tabela 3.2 — Dano por Tamanho', data: tabelasData.tabela_3_2_dano_armas },
  { id: 'tabela_3_7_preco_melhorias', label: 'Tabela 3.7 — Preço de Melhorias', data: tabelasData.tabela_3_7_preco_melhorias },
  { id: 'tabela_3_9_materiais_especiais', label: 'Tabela 3.9 — Materiais Especiais', data: tabelasData.tabela_3_9_materiais_especiais },
  { id: 'tabela_4_1_custo_magias', label: 'Tabela 4.1 — Custo de Magias por Círculo', data: tabelasData.tabela_4_1_custo_magias },
  { id: 'tabela_5_3_situacoes_especiais', label: 'Tabela 5.3 — Situações Especiais de Combate', data: tabelasData.tabela_5_3_situacoes_especiais },
  { id: 'tabela_5_4_estatisticas_objetos', label: 'Tabela 5.4 — Estatísticas de Objetos', data: tabelasData.tabela_5_4_estatisticas_objetos },
  { id: 'tabela_6_3_portas', label: 'Tabela 6.3 — Portas', data: tabelasData.tabela_6_3_portas },
  { id: 'tabela_6_4_viagens', label: 'Tabela 6.4 — Deslocamento em Viagens', data: tabelasData.tabela_6_4_viagens },
  { id: 'tabela_7_1_criaturas_nd', label: 'Tabela 7.1 — Criaturas por ND', data: tabelasData.tabela_7_1_criaturas_nd },
  { id: 'tabela_7_2_estatisticas_npc', label: 'Tabela 7.2 — Estatísticas de NPC por Nível', data: tabelasData.tabela_7_2_estatisticas_npc },
  { id: 'tabela_8_1_tesouro_nd', label: 'Tabela 8.1 — Tesouro por ND', data: tabelasData.tabela_8_1_tesouro_nd },
  { id: 'tabela_8_2_riquezas', label: 'Tabela 8.2 — Riquezas', data: tabelasData.tabela_8_2_riquezas },
  { id: 'tabela_8_3_itens_diversos', label: 'Tabela 8.3 — Itens Diversos (d%)', data: tabelasData.tabela_8_3_itens_diversos },
  { id: 'tabela_8_4_equipamento', label: 'Tabela 8.4 — Equipamento (d%)', data: tabelasData.tabela_8_4_equipamento },
  { id: 'tabela_8_5_itens_superiores', label: 'Tabela 8.5 — Itens Superiores (d%)', data: tabelasData.tabela_8_5_itens_superiores },
  { id: 'tabela_8_6_tesouro_medio', label: 'Tabela 8.6 — Tesouro Médio (d%)', data: tabelasData.tabela_8_6_tesouro_medio },
  { id: 'tabela_8_7_preco_encantos', label: 'Tabela 8.7 — Preço de Encantos', data: tabelasData.tabela_8_7_preco_encantos },
  { id: 'tabela_8_8_armas_magicas', label: 'Tabela 8.8 — Armas Mágicas (d%)', data: tabelasData.tabela_8_8_armas_magicas },
  { id: 'tabela_8_9_armas_especificas', label: 'Tabela 8.9 — Armas Específicas', data: tabelasData.tabela_8_9_armas_especificas },
  { id: 'tabela_8_10_armaduras_magicas', label: 'Tabela 8.10 — Armaduras Mágicas (d%)', data: tabelasData.tabela_8_10_armaduras_magicas },
  { id: 'tabela_8_11_armaduras_especificas', label: 'Tabela 8.11 — Armaduras Específicas', data: tabelasData.tabela_8_11_armaduras_especificas },
  { id: 'tabela_8_12_pocoes', label: 'Tabela 8.12 — Poções (d%)', data: tabelasData.tabela_8_12_pocoes },
  { id: 'tabela_8_13_acessorios_menores', label: 'Tabela 8.13 — Acessórios Menores (d%)', data: tabelasData.tabela_8_13_acessorios_menores },
  { id: 'tabela_8_14_acessorios_medios', label: 'Tabela 8.14 — Acessórios Médios (d%)', data: tabelasData.tabela_8_14_acessorios_medios },
  { id: 'tabela_8_15_acessorios_maiores', label: 'Tabela 8.15 — Acessórios Maiores (d%)', data: tabelasData.tabela_8_15_acessorios_maiores },
  { id: 'mitos_tabela_1_1_novas_racas', label: 'Mitos de Arton — Tabela 1.1: Novas Raças', data: tabelasData.mitos_tabela_1_1_novas_racas },
]

type Secao = typeof secoes[0]

function SimpleTable({ rows }: { rows: RowData[] }) {
  if (!rows.length) return null
  const keys = Object.keys(rows[0])
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-crimson">
        <thead>
          <tr className="border-b border-grimoire-600">
            {keys.map(k => (
              <th key={k} className="text-left py-2 px-3 text-gold font-cinzel text-xs capitalize">{k.replace(/_/g, ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-grimoire-800 ${i % 2 === 0 ? 'bg-abyss-900/50' : ''}`}>
              {keys.map(k => (
                <td key={k} className="py-2 px-3 text-parchment text-xs">{String(row[k] ?? '—')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderTable(secao: Secao) {
  const { data } = secao
  if (!data) return null

  if (Array.isArray(data)) {
    if (data.length === 0) return null
    return <SimpleTable rows={data as RowData[]} />
  }

  // dict com sub-tabelas (ex: tabela_5_3, tabela_8_4, tabela_8_5)
  const entries = Object.entries(data as Record<string, RowData[]>)
  if (entries.length === 0) return null

  return (
    <div className="space-y-4">
      {entries.map(([subKey, rows]) => (
        <div key={subKey}>
          <p className="font-cinzel text-xs text-gold-700 px-3 py-1 capitalize border-b border-grimoire-700">
            {subKey.replace(/_/g, ' ')}
          </p>
          <SimpleTable rows={Array.isArray(rows) ? rows : []} />
        </div>
      ))}
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
        <p className="font-crimson text-parchment-muted mt-1">
          {secoes.length} tabelas de referência — clique para expandir
        </p>
      </div>

      <Input
        icon={<Search className="w-4 h-4" />}
        placeholder="Buscar nas tabelas..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="max-w-xs"
      />

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
                {aberta
                  ? <ChevronDown className="w-4 h-4 text-gold flex-shrink-0" />
                  : <ChevronRight className="w-4 h-4 text-grimoire-500 flex-shrink-0" />}
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
    </div>
  )
}
