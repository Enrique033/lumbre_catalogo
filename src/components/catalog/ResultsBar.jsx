import { Button } from '@/components/ui/Button.jsx'
import { X } from 'lucide-react'
import { Chip } from '@/components/ui/Chip.jsx'
import { categoryLabel } from '@/data/categories.js'

export function ResultsBar({ total, shown, category, query, hasFilters, onClear, onRemoveCategory, onRemoveQuery }) {
  const catActive = category !== 'todas'
  const q = query.trim()

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 pb-1.5 min-h-8">
      <p className="text-[13px] text-ink-2" aria-live="polite" aria-atomic="true">
        {total === 0 ? (
          <strong className="text-ink font-semibold">Sin resultados</strong>
        ) : (
          <>
            <strong className="text-ink font-semibold tabular-nums">{shown}</strong> de{' '}
            <strong className="text-ink font-semibold tabular-nums">{total}</strong>{' '}
            {total === 1 ? 'pieza' : 'piezas'}
          </>
        )}
      </p>

      {(catActive || q) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {catActive && (
            <Chip
              as="button"
              type="button"
              variant="default"
              className="cursor-pointer hover:border-border-strong hover:text-ink"
              onClick={onRemoveCategory ? () => onRemoveCategory('todas') : onClear}
              aria-label={`Quitar filtro de ${categoryLabel(category)}`}
            >
              {categoryLabel(category)}
              <X size={12} strokeWidth={2} aria-hidden="true" />
            </Chip>
          )}

          {q && (
            <Chip
              as="button"
              type="button"
              variant="default"
              className="cursor-pointer hover:border-border-strong hover:text-ink"
              onClick={() => onRemoveQuery?.('')}
              aria-label={`Quitar búsqueda «${q}»`}
            >
              «{q}»
              <X size={12} strokeWidth={2} aria-hidden="true" />
            </Chip>
          )}
        </div>
      )}

      {hasFilters && (
        <Button variant="quiet" size="sm" className="ml-auto" onClick={onClear}>
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
