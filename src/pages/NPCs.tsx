import { useState } from 'react'
import { useStore } from '../store'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { Modal } from '../components/ui/Modal'
import { Badge } from '../components/ui/Badge'
import { Plus, Trash2, Dices, User, Edit } from 'lucide-react'
import { gerarNPC } from '../utils/generators'
import type { NPC } from '../types'

export default function NPCs() {
  const { npcs, adicionarNPC, removerNPC, atualizarNPC } = useStore()
  const [modalAberto, setModalAberto] = useState(false)
  const [editando, setEditando] = useState<NPC | null>(null)
  const [form, setForm] = useState<Omit<NPC, 'id'>>({ nome: '', raca: '', classe: '', personalidade: '', motivacao: '', segredo: '', aparencia: '', notas: '' })
  const [busca, setBusca] = useState('')

  function abrirNovo() {
    setForm({ nome: '', raca: '', classe: '', personalidade: '', motivacao: '', segredo: '', aparencia: '', notas: '' })
    setEditando(null)
    setModalAberto(true)
  }

  function gerarAleatorio() {
    setForm(gerarNPC())
  }

  function salvar() {
    if (!form.nome) return
    if (editando) {
      atualizarNPC(editando.id, form)
    } else {
      adicionarNPC(form)
    }
    setModalAberto(false)
  }

  function editar(npc: NPC) {
    setForm({ nome: npc.nome, raca: npc.raca, classe: npc.classe, personalidade: npc.personalidade, motivacao: npc.motivacao, segredo: npc.segredo, aparencia: npc.aparencia, notas: npc.notas })
    setEditando(npc)
    setModalAberto(true)
  }

  const filtrados = npcs.filter(n => !busca || n.nome.toLowerCase().includes(busca.toLowerCase()) || n.raca.toLowerCase().includes(busca.toLowerCase()))

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
        <div className="text-center py-16">
          <User className="w-12 h-12 text-grimoire-600 mx-auto mb-3" />
          <p className="font-cinzel text-parchment-muted">Nenhum NPC ainda</p>
          <Button className="mt-4" onClick={abrirNovo}><Plus className="w-4 h-4" /> Criar NPC</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtrados.map(npc => (
            <div key={npc.id} className="bg-abyss-800 border border-grimoire-600 rounded-lg p-4 hover:border-gold-700 transition-colors">
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
                <div className="mb-2">
                  <p className="text-xs text-parchment-dark font-crimson italic">{npc.aparencia}</p>
                </div>
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
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal open={modalAberto} onClose={() => setModalAberto(false)} title={editando ? 'Editar NPC' : 'Novo NPC'} size="lg">
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={gerarAleatorio}>
              <Dices className="w-4 h-4" /> Gerar Aleatório
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-3">
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Nome *</label>
              <Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Nome do NPC" />
            </div>
            <div>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Raça</label>
              <Input value={form.raca} onChange={e => setForm({ ...form, raca: e.target.value })} placeholder="Raça" />
            </div>
            <div>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">Classe</label>
              <Input value={form.classe} onChange={e => setForm({ ...form, classe: e.target.value })} placeholder="Classe / Ocupação" />
            </div>
            <div className="md:col-span-1" />
          </div>

          {[
            { key: 'aparencia', label: 'Aparência' },
            { key: 'personalidade', label: 'Personalidade' },
            { key: 'motivacao', label: 'Motivação' },
            { key: 'segredo', label: '🔒 Segredo' },
            { key: 'notas', label: 'Notas Extras' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-parchment-muted font-cinzel mb-1 block">{label}</label>
              <Textarea value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={label} rows={2} />
            </div>
          ))}

          <Button onClick={salvar} className="w-full">{editando ? 'Salvar Alterações' : 'Criar NPC'}</Button>
        </div>
      </Modal>
    </div>
  )
}
