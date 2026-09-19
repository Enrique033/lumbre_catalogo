import { ShoppingCart } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton.jsx'
import { useCart } from '@/context/useCart.js'

/**
 * Botón de carrito del header con contador de piezas.
 * Abre el diálogo del carrito (CartDialog) vía el contexto.
 */
export function CartButton({ className = '' }) {
  const { count, openCart } = useCart()

  return (
    <IconButton
      aria-label={
        count > 0
          ? `Abrir carrito, ${count} ${count === 1 ? 'pieza' : 'piezas'}`
          : 'Abrir carrito'
      }
      className={['relative shrink-0', className].filter(Boolean).join(' ')}
      onClick={openCart}
    >
      <ShoppingCart size={17} strokeWidth={1.8} aria-hidden="true" />

      {count > 0 && (
        <span
          aria-hidden="true"
          className={[
            'absolute -top-1 -right-1 grid place-items-center min-w-[17px] h-[17px] px-1',
            'rounded-full bg-accent text-white text-[10px] font-semibold tabular-nums leading-none',
            'shadow-[0_1px_3px_rgba(28,25,23,0.3)]',
          ].join(' ')}
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </IconButton>
  )
}
