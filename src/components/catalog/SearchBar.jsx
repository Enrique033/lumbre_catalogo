import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange, onClear, className = '' }) {
  const inputRef = useRef(null)

  // Atajo de teclado: Ctrl/Cmd + K enfoca la búsqueda
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isMac =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
  const kLabel = isMac ? '⌘K' : 'Ctrl K'

  return (
    <div className={['relative flex items-center', className].filter(Boolean).join(' ')}>
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none"
        aria-hidden="true"
      >
        <Search size={16} strokeWidth={1.8} />
      </span>

      <label htmlFor="search-input" className="sr-only">
        Buscar piezas
      </label>

      <input
        id="search-input"
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nombre, material o uso…"
        autoComplete="off"
        spellCheck="false"
        className={[
          'w-full min-h-9 pl-9.5 pr-11 text-[13.5px] text-ink',
          'bg-surface border border-border rounded-btn',
          'placeholder:text-ink-3',
          'transition-colors duration-200 ease-quart',
          'hover:border-border-strong',
          'focus:outline-none focus:border-accent-ink focus:ring-[3px] focus:ring-accent/20',
        ].join(' ')}
      />

      {value !== '' ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-full text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
        >
          <X size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
      ) : (
        <kbd
          aria-hidden="true"
          className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center h-[22px] px-1.5 rounded-md border border-border bg-surface-2 text-[10px] font-medium text-ink-3 pointer-events-none"
        >
          {kLabel}
        </kbd>
      )}
    </div>
  )
}
