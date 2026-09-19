import { X } from 'lucide-react'

/**
 * Chip que muestra la pieza sobre la que se está consultando.
 * El botón X quita la referencia sin cerrar el modal.
 */
export function ContactContextChip({ piece, onRemove }) {
  if (!piece) return null

  return (
    <div className="inline-flex items-center gap-2 max-w-full bg-surface-2 border border-border rounded-chip pl-3 pr-1.5 py-1 mb-4.5 text-xs text-ink-2">
      <span className="truncate">
        Consulta sobre: <strong className="text-ink font-medium">{piece}</strong>
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Quitar referencia a la pieza"
        className="flex-none grid place-items-center w-5 h-5 rounded-full text-ink-2 transition-colors duration-150 hover:bg-border hover:text-ink"
      >
        <X size={12} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  )
}
