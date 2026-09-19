const DOT_COLORS = {
  stock: 'var(--color-success)',
  pedido: 'var(--color-accent)',
  limitada: 'var(--color-danger)',
}

/**
 * Punto de color para el estado de disponibilidad.
 * Con `live` aplica un pulso sutil (solo "En stock").
 */
export function StateDot({ state = 'stock', live = false, className = '' }) {
  const color = DOT_COLORS[state] || DOT_COLORS.stock

  return (
    <span
      aria-hidden="true"
      style={{ '--dot-color': color, backgroundColor: color }}
      className={['block w-[7px] h-[7px] rounded-full shrink-0', live ? 'dot-live' : '', className]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

export function AvailabilityBadge({ state = 'stock', label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
      <StateDot state={state} live={state === 'stock'} />
      {label}
    </span>
  )
}
