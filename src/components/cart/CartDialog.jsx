import { useEffect, useRef } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog.jsx'
import { Button } from '@/components/ui/Button.jsx'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon.jsx'
import { useCart } from '@/context/useCart.js'
import { formatPrice } from '@/lib/format.js'
import { buildCartMessage, buildWhatsAppUrl } from '@/lib/whatsapp.js'

/**
 * Stepper de cantidad compacto. Con «−» a partir de 1 unidad se
 * elimina la pieza del pedido.
 */
function QtyStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-btn border border-border bg-surface shrink-0">
      <button
        type="button"
        aria-label={value <= 1 ? 'Quitar del pedido' : 'Quitar una unidad'}
        onClick={() => onChange(value - 1)}
        className="grid place-items-center w-7 h-7 rounded-l-btn text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
      >
        <Minus size={13} strokeWidth={2} aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        className="w-6 text-center text-[13px] font-medium tabular-nums text-ink"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="Añadir una unidad"
        onClick={() => onChange(value + 1)}
        className="grid place-items-center w-7 h-7 rounded-r-btn text-ink-2 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
      >
        <Plus size={13} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}

/**
 * Diálogo del carrito. Su visibilidad vive en el CartContext
 * (isCartOpen / openCart / closeCart), igual que ContactDialog.
 * El botón principal genera un enlace wa.me con el pedido precargado.
 */
export function CartDialog() {
  const { isCartOpen, closeCart, lines, count, subtotal, setQty, clear } = useCart()
  const dialogRef = useRef(null)

  // Contexto → dialog
  useEffect(() => {
    const api = dialogRef.current
    const el = api?.element
    if (!api || !el) return

    if (isCartOpen && !el.open) {
      api.open()
    } else if (!isCartOpen && el.open) {
      api.close()
    }
  }, [isCartOpen])

  // dialog → contexto (ESC, X, backdrop)
  useEffect(() => {
    const el = dialogRef.current?.element
    if (!el) return

    const onNativeClose = () => {
      if (isCartOpen) closeCart()
    }

    el.addEventListener('close', onNativeClose)
    return () => el.removeEventListener('close', onNativeClose)
  }, [closeCart, isCartOpen])

  const waUrl = buildWhatsAppUrl(buildCartMessage(lines, subtotal))

  const goCatalog = () => {
    closeCart()
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      className="w-[min(460px,calc(100vw-32px))]"
      panelClassName="max-h-[min(84vh,660px)]"
    >
      {lines.length === 0 ? <CartEmptyState onCatalog={goCatalog} /> : <CartContent lines={lines} count={count} subtotal={subtotal} setQty={setQty} clear={clear} waUrl={waUrl} />}
    </Dialog>
  )
}

/* ---------------------------------------------------------
   ESTADO VACÍO
   --------------------------------------------------------- */
function CartEmptyState({ onCatalog }) {
  return (
    <div className="flex flex-col items-center text-center gap-2.5 px-6 py-10">
      <div className="grid place-items-center w-12 h-12 rounded-full bg-surface-2 text-ink-2 mb-0.5">
        <ShoppingBag size={22} strokeWidth={1.6} aria-hidden="true" />
      </div>

      <h2 id="cart-title" className="font-display text-xl font-medium text-ink">
        Tu carrito está vacío
      </h2>

      <p className="text-[13px] text-ink-2 max-w-[38ch]">
        Añade piezas desde el catálogo y envíanos tu pedido directamente por WhatsApp.
      </p>

      <Button variant="primary" size="sm" className="mt-2" onClick={onCatalog}>
        Explorar catálogo
      </Button>
    </div>
  )
}

/* ---------------------------------------------------------
   CONTENIDO CON LÍNEAS DE PEDIDO
   --------------------------------------------------------- */
function CartContent({ lines, count, subtotal, setQty, clear, waUrl }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-baseline gap-2 px-6 pt-5 pr-12">
        <h2
          id="cart-title"
          className="font-display text-xl font-medium tracking-[-0.01em] text-ink"
        >
          Tu pedido
        </h2>
        <span className="text-[12px] text-ink-3 tabular-nums">
          {count} {count === 1 ? 'pieza' : 'piezas'}
        </span>
      </div>

      <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 px-6 py-4">
        {lines.map(({ piece, qty }) => (
          <li key={piece.slug} className="flex items-center gap-3">
            <img
              src={piece.image}
              alt=""
              loading="lazy"
              width={96}
              height={96}
              className="w-12 h-12 rounded-btn object-cover border border-border bg-surface-2 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-ink truncate">{piece.title}</p>
              <p className="text-[11px] text-ink-3 tabular-nums">
                {formatPrice(piece.price, piece.currency)} / ud.
              </p>
            </div>

            <QtyStepper value={qty} onChange={(next) => setQty(piece.slug, next)} />

            <span className="w-16 text-right text-[13px] font-semibold text-ink tabular-nums">
              {formatPrice(piece.price * qty, piece.currency)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-border px-6 pt-3.5 pb-5 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[13px] text-ink-2">Total estimado</span>
          <span className="font-display text-xl font-medium text-ink tabular-nums">
            {formatPrice(subtotal)}
          </span>
        </div>

        <Button
          as="a"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          wide
        >
          <WhatsAppIcon size={16} className="shrink-0" />
          Enviar pedido por WhatsApp
        </Button>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] text-ink-3">Envío y tasas se confirman por chat.</p>
          <Button variant="quiet" size="sm" onClick={clear}>
            Vaciar
          </Button>
        </div>
      </div>
    </div>
  )
}
