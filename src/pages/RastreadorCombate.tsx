import { useState } from 'react'
import { useStore } from '../store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Select } from '../components/ui/Input'
import { Plus, Trash2, ChevronRight, RotateCcw, Heart, Zap, Shield, X } from 'lucide-react'
import { cn } from '../utils/cn'
import type { CombatanteCombate } from '../types'
import condicoesData from '../data/condicoes.json'

const todasCondicoes = condicoesData.map(c => c.nome)

interface FormState {
  nome: string; tipo: 'jogador' | 'monstro' | 'npc'; iniciativa: string
  pvMax: string; pmMax: string; ca: string
}

const formInicial: FormState = { nome: '', tipo: 'monstro', iniciativa: '', pvMax: '', pmMax: '', ca: '' }

export default function RastreadorCombate() {
  const { combatentes, rodadaAtual, combatanteAtivo, adicionarCombatente, removerCombatente, atualizarCombatente, proximoTurno, ordenarIniciativa, resetarCombate, aplicarCondicao, removerCondicao } = useStore()
  const [form, setForm] = useState<FormState>(formInicial)
  const [modalAberto, setModalAberto] = useState(false)
  const [condicoesModal, setCondicoesModal] = useState<string | null>(null)
  const [dmgModal, setDmgModal] = useState<{ id: string; tipo: 'dano' | 'cura' } | null>(null)
  const [dmgValor, setDmgValor] = useState('')

  function adicionar() {
    if (!form.nome) return
    adicionarCombatente({
      nome: form.nome, tipo: form.tipo,
      iniciativa: Number(form.iniciativa) || 0,
      pv: Number(form.pvMax) || 10, pvMax: Number(form.pvMax) || 10,
      pm: Number(form.pmMax) || 0, pmMax: Number(form.pmMax) || 0,
      ca: Number(form.ca) || 10, condicoes: [], notas: '',
    })
    setForm(formInicial)
    setModalAberto(false)
  }

  function aplicarDano(id: string, tipo: 'dano' | 'cura') {
    const valor = Number(dmgValor)
    if (!valor) return
    const c = combatentes.find(c => c.id === id)
    if (!c) return
    const novo = tipo === 'dano' ? Math.max(0, c.pv - valor) : Math.min(c.pvMax, c.pv + valor)
    atualizarCombatente(id, { pv: novo })
    setDmgModal(null)
    setDmgValor('')
  }

  function pvPercent(c: CombatanteCombate) {
    return Math.round((c.pv / c.pvMax) * 100)
  }

  function pvColor(percent: number) {
    if (percent > 50) return 'bg-green-600'
    if (percent > 25) return 'bg-yellow-600'
    return 'bg-blood'
  }

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-cinzel font-bold text-2xl text-gold">Rastreador de Combate</h1>
          <p className="font-crimson text-parchment-muted mt-1">Rodada <span className="text-gold font-bold">{rodadaAtual}</span></p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={ordenarIniciativa}>Ordenar Iniciativa</Button>
          <Button size="sm" variant="gold" onClick={proximoTurno} disabled={combatentes.length === 0}>
            <ChevronRight className="w-4 h-4" /> Próximo Turno
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setModalAberto(true)}>
            <Plus className="w-4 h-4" /> Adicionar
          </Button>
          <Button size="sm" variant="ghost" onClick={resetarCombate}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {combatentes.length === 0 ? (
        <div className="text-center py-16">
          <Shield className="w-12 h-12 text-grimoire-600 mx-auto mb-3" />
          <p className="font-cinzel text-parchment-muted">Nenhum combatente ainda</p>
          <p className="font-crimson text-parchment-dark text-sm mt-1">Adicione jogadores e monstros para começar</p>
          <Button className="mt-4" onClick={() => setModalAberto(true)}>
            <Plus className="w-4 h-4" /> Adicionar Combatente
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {combatentes.map((c, idx) => {
            const ativo = c.id === combatanteAtivo
            const percent = pvPercent(c)
            return (
              <div key={c.id} className={cn(
                'bg-abyss-800 border rounded-lg p-3 transition-all',
                ativo ? 'border-gold shadow-gold' : 'border-grimoire-600'
              )}>
                <div className="flex items-center gap-3">
                  {/* Iniciativa */}
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm flex-shrink-0', ativo ? 'bg-gold text-abyss-950' : 'bg-grimoire-700 text-parchment')}>
                    {c.iniciativa}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn('font-cinzel font-semibold text-sm', ativo ? 'text-gold' : 'text-parchment')}>{c.nome}</span>
                      <Badge variant={c.tipo === 'jogador' ? 'blue' : c.tipo === 'npc' ? 'gold' : 'blood'}>{c.tipo}</Badge>
                      {ativo && <Badge variant="gold">Turno Ativo</Badge>}
                    </div>

                    {/* PV bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-grimoire-700 rounded-full h-2">
                        <div className={cn('h-2 rounded-full transition-all', pvColor(percent))} style={{ width: `${percent}%` }} />
                      </div>
                      <button onClick={() => { setDmgModal({ id: c.id, tipo: 'dano' }); setDmgValor('') }} className="text-xs text-blood-light hover:text-blood font-cinzel cursor-pointer">
                        ❤ {c.pv}/{c.pvMax}
                      </button>
                    </div>

                    {/* Condições */}
                    {c.condicoes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.condicoes.map(cond => (
                          <Badge key={cond} variant="blood" className="cursor-pointer" onClick={() => removerCondicao(c.id, cond)}>
                            {cond} <X className="w-2.5 h-2.5 ml-0.5" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats rápidos */}
                  <div className="hidden md:flex gap-3 text-xs text-parchment-muted">
                    <span>CA <strong className="text-parchment">{c.ca}</strong></span>
                    <span>PM <strong className="text-purple-400">{c.pm}/{c.pmMax}</strong></span>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-1">
                    <button onClick={() => { setDmgModal({ id: c.id, tipo: 'cura' }); setDmgValor('') }} className="p-1.5 text-green-500 hover:bg-green-950 rounded transition-colors" title="Curar">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCondicoesModal(c.id)} className="p-1.5 text-gold hover:bg-grimoire-700 rounded transition-colors" title="Condições">
                      <Zap className="w-4 h-4" />
                    </button>
                    <button onClick={() => removerCombatente(c.id)} className="p-1.5 text-blood hover:bg-blood-dark rounded transition-colors" title="Remover">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Adicionar */}
      <Modal open={modalAberto} onClose={() => setModalAberto(false)} title="Adicionar Combatente" size="sm">
        <div className="space-y-3">
          <Input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          <Select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value as any })}
            options={[{ value: 'jogador', label: 'Jogador' }, { value: 'monstro', label: 'Monstro' }, { value: 'npc', label: 'NPC' }]} />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Iniciativa" type="number" value={form.iniciativa} onChange={e => setForm({ ...form, iniciativa: e.target.value })} />
            <Input placeholder="CA" type="number" value={form.ca} onChange={e => setForm({ ...form, ca: e.target.value })} />
            <Input placeholder="PV Máximo" type="number" value={form.pvMax} onChange={e => setForm({ ...form, pvMax: e.target.value })} />
            <Input placeholder="PM Máximo" type="number" value={form.pmMax} onChange={e => setForm({ ...form, pmMax: e.target.value })} />
          </div>
          <Button onClick={adicionar} className="w-full">Adicionar</Button>
        </div>
      </Modal>

      {/* Modal Condições */}
      <Modal open={!!condicoesModal} onClose={() => setCondicoesModal(null)} title="Aplicar Condição" size="sm">
        <div className="grid grid-cols-2 gap-2">
          {todasCondicoes.map(cond => {
            const c = combatentes.find(c => c.id === condicoesModal)
            const temCondicao = c?.condicoes.includes(cond)
            return (
              <button key={cond} onClick={() => {
                if (temCondicao) removerCondicao(condicoesModal!, cond)
                else aplicarCondicao(condicoesModal!, cond)
              }} className={cn('text-xs font-crimson px-2 py-1.5 rounded border transition-colors text-left', temCondicao ? 'bg-blood-muted border-blood text-blood-light' : 'border-grimoire-600 text-parchment-muted hover:border-gold-700')}>
                {temCondicao ? '✓ ' : ''}{cond}
              </button>
            )
          })}
        </div>
      </Modal>

      {/* Modal Dano/Cura */}
      <Modal open={!!dmgModal} onClose={() => setDmgModal(null)} title={dmgModal?.tipo === 'dano' ? 'Aplicar Dano' : 'Curar'} size="sm">
        <div className="space-y-3">
          <Input placeholder="Valor" type="number" value={dmgValor} onChange={e => setDmgValor(e.target.value)} autoFocus />
          <Button onClick={() => aplicarDano(dmgModal!.id, dmgModal!.tipo)} variant={dmgModal?.tipo === 'dano' ? 'blood' : 'gold'} className="w-full">
            {dmgModal?.tipo === 'dano' ? 'Aplicar Dano' : 'Curar'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
