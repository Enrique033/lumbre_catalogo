import { useEffect, useRef } from 'react'
import { Dialog } from '@/components/ui/Dialog.jsx'
import { ContactForm } from './ContactForm.jsx'
import { ContactContextChip } from './ContactContextChip.jsx'
import { useContact } from '@/context/useContact.js'

/**
 * Modal de contacto.
 * Su visibilidad se controla desde el ContactContext:
 *   useContact().openContact({ piece })  → abre
 *   useContact().closeContact()          → cierra
 *
 * NOTA (importante): la ref pasada a <Dialog> es un ref imperativo
 * { open, close, element }, no el <dialog> del DOM. Para addEventListener
 * o leer el estado dialog.open, usar siempre dialogRef.current.element.
 */
export function ContactDialog() {
  const { isOpen, piece, closeContact, clearPiece } = useContact()
  const dialogRef = useRef(null)

  // Sincroniza contexto → dialog (a través del ref imperativo de <Dialog>)
  useEffect(() => {
    const api = dialogRef.current
    const el = api?.element
    if (!api || !el) return

    if (isOpen && !el.open) {
      api.open()
    } else if (!isOpen && el.open) {
      api.close()
    }
  }, [isOpen])

  // Sincroniza dialog → contexto (para ESC, X y clic en backdrop)
  useEffect(() => {
    const el = dialogRef.current?.element
    if (!el) return

    const onNativeClose = () => {
      if (isOpen) closeContact()
    }

    el.addEventListener('close', onNativeClose)
    return () => el.removeEventListener('close', onNativeClose)
  }, [closeContact, isOpen, dialogRef])

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby="contact-title"
      className="w-[min(480px,calc(100vw-32px))]"
      panelClassName="px-6 py-6 max-h-[92vh] overflow-y-auto"
    >
      <h2
        id="contact-title"
        className="font-display text-2xl font-medium tracking-[-0.02em] mb-1.5 pr-10"
      >
        Solicitar información
      </h2>

      <p className="text-sm text-ink-2 mb-5">
        Cuéntanos qué pieza te interesa y te responderemos en 24 h laborables.
      </p>

      {piece && <ContactContextChip piece={piece} onRemove={clearPiece} />}

      <ContactForm piece={piece} />
    </Dialog>
  )
}
