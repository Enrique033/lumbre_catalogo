import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button.jsx'
import { Chip } from '@/components/ui/Chip.jsx'
import { CATEGORIES, categoryLabel } from '@/data/categories.js'

export function EmptyState({ query, category, onCategoryChange, onClear }) {
  const q = query.trim()
  const catLabel = categoryLabel(category)

  const suggestions = CATEGORIES.filter((c) => c.id !== 'todas' && c.id !== category).slice(0, 3)

  return (
    <div role="status" className="flex flex-col items-center gap-3 py-14 pb-12 text-center">
      <div className="grid place-items-center w-11 h-11 rounded-full bg-surface-2 text-ink-2 mb-1">
        <SearchX size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>

      <h3 className="font-display text-xl font-medium text-ink">Sin resultados</h3>

      <p className="text-sm text-ink-2 max-w-[46ch]">
        {q
          ? `No encontramos piezas para «${q}»${
              category !== 'todas' ? ` en ${catLabel.toLowerCase()}` : ''
            }. Prueba con otro término o explora las categorías.`
          : `No hay piezas en ${catLabel.toLowerCase()}. Explora otras categorías del catálogo.`}
      </p>

      <Button variant="primary" size="sm" className="mt-1" onClick={onClear}>
        Limpiar filtros
      </Button>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {suggestions.map((cat) => (
            <Chip
              key={cat.id}
              as="button"
              type="button"
              variant="interactive"
              className="px-3 py-1.5 text-xs cursor-pointer"
              onClick={() => {
                onClear()
                onCategoryChange(cat.id)
              }}
            >
              {cat.label}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}
