import { Button } from '@/components/ui/Button.jsx'

export function LoadMore({ total, shown, remaining, hasMore, onLoadMore }) {
  if (total === 0) return null

  const pct = Math.round((shown / total) * 100)

  if (!hasMore) {
    return (
      <div className="flex flex-col items-center gap-2.5 pt-6 pb-1">
        <div aria-hidden="true" className="w-32 h-1 rounded-full bg-border overflow-hidden">
          <div className="h-full w-full bg-accent/70 rounded-full" />
        </div>
        <p className="text-xs text-ink-3">Has visto las {total} piezas del catálogo</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2.5 pt-6 pb-1">
      <div className="flex items-center gap-2.5 text-[11px] text-ink-3 tabular-nums">
        <span aria-hidden="true" className="w-32 h-1 rounded-full bg-border overflow-hidden inline-block">
          <span
            className="block h-full bg-accent rounded-full transition-[width] duration-300 ease-quart motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </span>
        {shown}/{total}
      </div>

      <Button variant="ghost" onClick={onLoadMore}>
        Cargar más piezas{' '}
        <span className="text-ink-3 font-normal">
          ({remaining} {remaining === 1 ? 'restante' : 'restantes'})
        </span>
      </Button>
    </div>
  )
}
