import { useEffect, useRef, useState } from 'react'
import { Check, Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/useCart.js'

/**
 * Botón para añadir una pieza al carrito.
 *  - variant="icon": botón circular (overlay de las cards)
 *  - variant="wide": botón ancho con texto (ficha de producto)
 * Muestra feedback «Añadido» durante un instante tras el clic.
 */
export function AddToCartButton({ piece, variant = 'icon', className = '', ...rest }) {
  const { add, has } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const inCart = has(piece?.slug)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(piece, 1)
    setJustAdded(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setJustAdded(false), 1400)
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Añadir ${piece?.title || 'pieza'} al pedido`}
        title="Añadir al pedido"
        className={[
          'grid place-items-center w-9 h-9 rounded-full border backdrop-blur-[2px]',
          'transition-[background-color,border-color,color,transform] duration-200 ease-quart',
          'hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
          justAdded
            ? 'bg-success text-white border-success'
            : 'bg-white/92 border-border text-ink hover:bg-brand hover:border-brand hover:text-bg',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {justAdded ? (
          <Check size={16} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <Plus size={17} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Añadir ${piece?.title || 'pieza'} al pedido`}
      className={[
        'inline-flex items-center justify-center gap-2 min-h-9 px-3.5 rounded-btn border',
        'font-medium text-[13.5px] leading-none whitespace-nowrap cursor-pointer',
        'transition-colors duration-200 ease-quart active:translate-y-px',
        justAdded
          ? 'bg-success/10 text-success border-success/40'
          : 'bg-surface/70 text-ink border-border-strong hover:bg-surface-2 hover:border-ink-3/50',
        inCart && !justAdded ? 'border-success/40 text-success' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {justAdded ? (
        <Check size={15} strokeWidth={2.2} aria-hidden="true" />
      ) : (
        <ShoppingCart size={15} strokeWidth={1.8} aria-hidden="true" />
      )}
      {justAdded ? 'Añadido' : inCart ? 'En el pedido' : 'Añadir al pedido'}
    </button>
  )
}
