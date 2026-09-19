import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { SORT_OPTIONS } from '@/data/sort-options.js'

/**
 * Selector de orden personalizado (listbox accesible).
 * Sustituye al <select> nativo, cuyo popup no admite estilos.
 *  - Navegación con flechas, Home/End, Enter/Espacio y Escape
 *  - aria-haspopup, aria-expanded, aria-activedescendant
 *  - cierre al hacer clic fuera
 */
export function SortSelect({ value, onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const listId = useId()

  const currentIndex = Math.max(
    0,
    SORT_OPTIONS.findIndex((opt) => opt.id === value),
  )
  const current = SORT_OPTIONS[currentIndex] || SORT_OPTIONS[0]

  // Cierre al hacer clic fuera
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  // Mantiene la opción activa a la vista al navegar con teclado
  useEffect(() => {
    if (!open) return
    listRef.current?.children?.[activeIndex]?.scrollIntoView?.({ block: 'nearest' })
  }, [open, activeIndex])

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev
      if (next) setActiveIndex(currentIndex)
      return next
    })
  }

  const select = (option) => {
    if (!option) return
    onChange(option.id)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setActiveIndex(currentIndex)
          return
        }
        setActiveIndex((prev) => {
          const delta = e.key === 'ArrowDown' ? 1 : -1
          return (prev + delta + SORT_OPTIONS.length) % SORT_OPTIONS.length
        })
        break
      }
      case 'Home':
        if (open) {
          e.preventDefault()
          setActiveIndex(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActiveIndex(SORT_OPTIONS.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        if (open) {
          e.preventDefault()
          select(SORT_OPTIONS[activeIndex])
        }
        break
      case 'Escape':
        if (open) setOpen(false)
        break
      case 'Tab':
        if (open) setOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div ref={rootRef} className={['relative flex-none', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Ordenar por"
        onClick={toggle}
        onKeyDown={onKeyDown}
        className={[
          'inline-flex items-center gap-1.5 min-h-8 pl-3 pr-2.5 text-xs font-medium text-ink',
          'bg-surface border rounded-btn cursor-pointer whitespace-nowrap',
          'transition-colors duration-200 ease-quart',
          open
            ? 'border-accent-ink ring-[3px] ring-accent/20'
            : 'border-border hover:border-border-strong',
        ].join(' ')}
      >
        {current.label}
        <ChevronDown
          size={14}
          strokeWidth={1.8}
          aria-hidden="true"
          className={[
            'text-ink-2 transition-transform duration-200 ease-quart motion-reduce:transition-none',
            open ? 'rotate-180' : '',
          ]
            .join(' ')
            .trim()}
        />
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Opciones de orden"
          aria-activedescendant={`${listId}-opt-${SORT_OPTIONS[activeIndex]?.id}`}
          tabIndex={-1}
          ref={listRef}
          className={[
            'absolute right-0 top-[calc(100%+6px)] z-50 min-w-[210px] py-1.5',
            'bg-surface border border-border rounded-btn shadow-modal',
            'animate-[fade-up_160ms_var(--ease-quart)] motion-reduce:animate-none',
          ].join(' ')}
        >
          {SORT_OPTIONS.map((opt, i) => {
            const selected = opt.id === value
            const active = i === activeIndex
            return (
              <button
                key={opt.id}
                id={`${listId}-opt-${opt.id}`}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => select(opt)}
                onMouseEnter={() => setActiveIndex(i)}
                className={[
                  'w-full flex items-center justify-between gap-3 px-3 py-2 text-left text-[13px]',
                  'transition-colors duration-100 ease-quart cursor-pointer',
                  active ? 'bg-surface-2 text-ink' : 'text-ink-2',
                  selected ? 'font-semibold text-ink' : '',
                ].join(' ')}
              >
                {opt.label}
                {selected && (
                  <Check size={14} strokeWidth={2.2} aria-hidden="true" className="text-accent-ink shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
