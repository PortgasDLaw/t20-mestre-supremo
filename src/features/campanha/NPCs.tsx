import { useState } from 'react'
import { useStore } from '@/store'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { Plus, Trash2, Dices, User, Edit } from 'lucide-react'
import { gerarNPC } from '@/utils/generators'
import type { NPC } from '@/types'

type NPCForm = Omit<NPC, 'id'>

const FORM_FIELDS: Array<{ key: keyof NPCForm; label: string }> = [
  { key: 'aparencia', label: 'Aparência' },
  { key: 'personalidade', label: 'Personalidade' },
  { key: 'motivacao', label: 'Motivação' },
  { key: 'segredo', label: '🔒 Segredo' },
  { key: 'notas', label: 'Notas Extras' },
]

const FORM_VAZIO: NPCForm = {
  nome: '', raca: '', classe: '', personalidade: '',
  motivacao: '', segredo: '', aparencia: '', notas: '',
}

export default function NPCs() {
  const { npcs, adicionarNPC, removerNPC, atualizarNPC } = useStore()
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<NPC | null>(null)
  const [form, setForm] = useState<NPCForm>(FORM_VAZIO)
  const [busca, setBusca] = useState('')

  function abrirNovo() {
    setForm(FORM_VAZIO)
    setEditando(null)
    setModalAberto(true)
  }

  function editar(npc: NPC) {
    const { id: _id, ...rest } = npc
    setForm(rest)
    setEditando(npc)
    setModalAberto(true)
  }

  function salvar() {
    if (!form.nome.trim()) return
    if (editando) {
      atualizarNPC(editando.id, form)
    } else {
      adicionarNPC(form)
    }
    setModalAberto(false)
  }

  function setField(key: keyof NPCForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const filtrados = npcs.filter(
    (n) =>
      !busca ||
      n.nome.toLowerCase().includes(busca.toLowerCase()) ||
      n.raca.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="border-b border-grimoire-600 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-cinzel font-bold text-2xl text-gold">NPCs</h1>
          <p className="font-crimson text-parchment-muted mt-1">{npcs.length} NPC(s) criado(s)</p>
        </div>
        <Button onClick={abrirNovo}><Plus className="w-4 h-4" /> Novo NPC</Button>
      </div>

      <Input placeholder="Buscar NPC..." value={busca} onChange={e => setBusca(e.target.value)} className="max-w-xs" />

      {filtrados.length === 0 ? (
        <EmptyState
          icon={User}
          message="Nenhum NPC ainda"
          action={{ label: 'Criar NPC', icon: <Plus className="w-4 h-4" />, onClick: abrirNovo }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtrados.map(npc => (
            <Card key={npc.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-grimoire-700 border border-gold-800 flex items-center justify-center font-cinzel font-bold text-gold">
                    {npc.nome[0]}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-semibold text-parchment text-sm">{npc.nome}</h3>
                    <p className="text-parchment-muted text-xs">{npc.raca} — {npc.classe}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => editar(npc)} className="p-1 text-gold hover:bg-grimoire-700 rounded"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => removerNPC(npc.id)} className="p-1 text-blood hover:bg-blood-dark rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {npc.aparencia && (
                <p className="text-xs text-parchment-dark font-crimson italic mb-2">{npc.aparencia}</p>
              )}

              <div className="space-y-1">
                {npc.personalidade && (
                  <div>
                    <span className="text-gold text-xs font-cinzel">Personalidade: </span>
                    <span className="text-parchment text-xs font-crimson">{npc.personalidade}</span>
                  </div>
                )}
                {npc.motivacao && (
                  <div>
                    <span className="text-blue-400 text-xs font-cinzel">Motivação: </span>
                    <span className="text-parchment text-xs font-crimson">{npc.motivacao}</span>
                  </div>
                )}
                {npc.segredo && (
                  <div className="mt-2 bg-blood-dark border border-blood-muted rounded p-2">
                    <span className="text-blood-light text-xs font-cinzel">🔒 Segredo: </span>
                    <span className="text-parchment text-xs font-crimson">{npc.segredo}</span>
                  </div>
                )}
              </div>

              {npc.notas && (
                <p className="mt-2 text-parchment-muted text-xs font-crimson border-t border-grimoire-700 pt-2">{npc.notas}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalAberto} onClose={() => setModalAberto(false)} title={editando ? 'Editar NPC' : 'Novo NPC'} size="lg">
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setForm(gerarNPC())}>
              <Dices className="w-4 h-4" /> Gerar Aleatório
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-3">
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Nome *</label>
              <Input value={form.nome} onChange={e => setField('nome', e.target.value)} placeholder="Nome do NPC" />
            </div>
            <div>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Raça</label>
              <Input value={form.raca} onChange={e => setField('raca', e.target.value)} placeholder="Raça" />
            </div>
            <div>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Classe</label>
              <Input value={form.classe} onChange={e => setField('classe', e.target.value)} placeholder="Classe / Ocupação" />
            </div>
            <div className="md:col-span-1" />
          </div>

          {FORM_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">{label}</label>
              <Textarea
                value={form[key]}
                onChange={e => setField(key, e.target.value)}
                placeholder={label}
                rows={2}
              />
            </div>
          ))}

          <Button onClick={salvar} className="w-full">{editando ? 'Salvar Alterações' : 'Criar NPC'}</Button>
        </div>
      </Modal>
    </div>
  )
}
