import { useMemo } from 'react'
import { CATEGORIES } from '@/data/categories.js'
import { CATALOG } from '@/data/catalog.js'

export function CategoryTabs({ value, onChange, className = '' }) {
  // Contador de piezas por categoría (derivado, nunca muta el origen)
  const counts = useMemo(() => {
    const map = { todas: CATALOG.length }
    for (const piece of CATALOG) {
      map[piece.category] = (map[piece.category] || 0) + 1
    }
    return map
  }, [])

  return (
    <div
      role="group"
      aria-label="Filtrar por categoría"
      className={[
        'flex gap-1.5 overflow-x-auto py-0.5 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [scroll-snap-type:x_proximity] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {CATEGORIES.map((cat) => {
        const active = value === cat.id
        const count = counts[cat.id] ?? 0
        return (
          <button
            key={cat.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(cat.id)}
            className={[
              'flex-none inline-flex items-center gap-1.5 min-h-8 px-3 py-1.5 text-xs font-medium',
              'rounded-chip whitespace-nowrap scroll-snap-start border',
              'transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-quart',
              'active:scale-[0.97] motion-reduce:active:scale-100',
              active
                ? 'bg-brand border-brand text-bg shadow-[0_2px_8px_-2px_rgba(34,48,42,0.35)]'
                : 'bg-transparent border-border text-ink-2 hover:bg-surface hover:text-ink hover:border-border-strong',
            ].join(' ')}
          >
            {cat.label}
            <span
              className={[
                'text-[10px] tabular-nums',
                active ? 'text-bg/60' : 'text-ink-3/80',
              ].join(' ')}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
