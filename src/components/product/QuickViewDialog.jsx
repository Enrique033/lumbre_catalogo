import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Dialog } from '@/components/ui/Dialog.jsx'
import { Button } from '@/components/ui/Button.jsx'
import { Eyebrow } from '@/components/ui/Eyebrow.jsx'
import { AddToCartButton } from '@/components/cart/AddToCartButton.jsx'
import { Gallery } from './Gallery.jsx'
import { SpecList } from './SpecList.jsx'
import { TagList } from './TagList.jsx'
import { AvailabilityBadge } from './AvailabilityBadge.jsx'
import { categoryLabel } from '@/data/categories.js'
import { formatPrice } from '@/lib/format.js'
import { useContact } from '@/context/useContact.js'

export const QuickViewDialog = forwardRef(function QuickViewDialog({ onClose }, externalRef) {
  const dialogRef = useRef(null)
  const [item, setItem] = useState(null)
  const { openContact } = useContact()

  useImperativeHandle(externalRef, () => ({
    open: (next) => {
      setItem(next)
      requestAnimationFrame(() => dialogRef.current?.open())
    },
    close: () => dialogRef.current?.close(),
    get element() {
      return dialogRef.current?.element
    },
  }))

  // Notifica al padre cuando el dialog se cierra (ESC, X, backdrop)
  useEffect(() => {
    const dialogEl = dialogRef.current?.element
    if (!dialogEl || !onClose) return
    const handler = () => onClose()
    dialogEl.addEventListener('close', handler)
    return () => dialogEl.removeEventListener('close', handler)
  }, [onClose])

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby="qv-title"
      className="w-[min(960px,calc(100vw-32px))]"
      panelClassName="max-h-[min(88vh,720px)]"
    >
      {item && (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] overflow-hidden flex-1 min-h-0">
          <Gallery title={item.title} images={item.gallery?.length ? item.gallery : [item.image]} />

          <div className="flex flex-col gap-3 px-6 pt-6 pb-5 lg:px-7 lg:pb-6 overflow-y-auto min-h-0">
            <div className="flex flex-col gap-2 pr-10">
              <Eyebrow>{categoryLabel(item.category)}</Eyebrow>
              <h2
                id="qv-title"
                className="font-display text-[clamp(22px,2.6vw,27px)] font-medium leading-[1.15] tracking-[-0.02em] text-ink"
              >
                {item.title}
              </h2>
              <p className="text-[15px] text-ink-2 leading-[1.6]">{item.description}</p>
            </div>

            <p className="text-sm text-ink-2 leading-[1.65]">{item.details}</p>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-border">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3">
                Características
              </p>
              <SpecList specs={item.specs} />
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-border">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3">
                Etiquetas
              </p>
              <TagList tags={item.tags} />
            </div>

            <div className="mt-auto pt-4 border-t border-border flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl font-medium tracking-[-0.01em] text-ink">
                  {formatPrice(item.price, item.currency)}
                </span>
                <AvailabilityBadge state={item.availabilityState} label={item.availability} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <AddToCartButton piece={item} variant="wide" />

                <Button
                  variant="primary"
                  onClick={() => {
                    dialogRef.current?.close()
                    openContact({ piece: item.title })
                  }}
                >
                  Solicitar información
                </Button>
              </div>

              <p className="text-xs text-ink-3 text-center">
                Respuesta en 24 h laborables · Sin compromiso
              </p>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
})
