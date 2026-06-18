import { useState, useMemo } from 'react'
import classesData from '@/data/classes.json'
import { Input } from '@/components/ui/Input'
import { Search, Swords, BookOpen, Zap } from 'lucide-react'
import { ClasseDetalhe, getAtributoCor, type Classe } from './ClasseDetalhe'

const classes: Classe[] = (classesData as any).classes || (classesData as any)

export default function Classes() {
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState<Classe | null>(null)

  const filtradas = useMemo(() =>
    classes.filter(c =>
      !busca ||
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      c.atributo.toLowerCase().includes(busca.toLowerCase())
    ), [busca])

  if (selecionada) {
    return <ClasseDetalhe classe={selecionada} onBack={() => setSelecionada(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-grimoire-600 pb-4">
        <h1 className="font-cinzel font-bold text-2xl text-gold">Classes de Personagem</h1>
        <p className="font-crimson text-parchment-muted mt-1">
          {classes.length} classes disponíveis — clique para ver habilidades e poderes completos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          icon={<Search className="w-4 h-4" />}
          placeholder="Buscar classe..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="max-w-xs"
        />
        <span className="text-parchment-dark text-xs font-crimson ml-auto">
          {filtradas.length} classe(s) encontrada(s)
        </span>
      </div>

      {/* Grid de Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filtradas.map(classe => (
          <ClasseCard key={classe.id} classe={classe} onSelect={() => setSelecionada(classe)} />
        ))}
      </div>
    </div>
  )
}

function ClasseCard({ classe, onSelect }: { classe: Classe; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className="group relative overflow-hidden rounded-xl border border-grimoire-600 hover:border-gold-700 bg-gradient-to-b from-abyss-800 to-abyss-900 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Imagem */}
      {classe.imagem && (
        <div className="h-44 overflow-hidden bg-abyss-950">
          <img
            src={classe.imagem}
            alt={classe.nome}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            onError={e => {
              const el = e.target as HTMLImageElement
              el.parentElement!.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-cinzel font-bold text-base text-gold">{classe.nome}</h3>
          <div className="flex items-center gap-1 text-xs">
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 font-semibold">+{classe.pm_por_nivel} PM</span>
          </div>
        </div>

        <p className={`text-xs mb-2 font-cinzel ${getAtributoCor(classe.atributo)}`}>
          {classe.atributo}
        </p>

        <p className="text-parchment-muted text-xs font-crimson line-clamp-2 mb-2">{classe.descricao}</p>

        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1 text-green-400">
            <BookOpen className="w-3 h-3" />
            {classe.habilidades_classe.length} hab.
          </span>
          <span className="flex items-center gap-1 text-parchment-muted">
            <Swords className="w-3 h-3" />
            {classe.poderes.length} poderes
          </span>
        </div>
      </div>
    </div>
  )
}
