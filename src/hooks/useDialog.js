import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Gestiona un <dialog> nativo:
 *  - apertura con showModal() cuando está disponible
 *  - cierre con ESC, botón [data-close-dialog] o clic en backdrop
 *  - scroll-lock del body
 *  - foco inicial en el botón de cierre
 *  - devolución de foco al elemento que abrió el dialog
 *
 * @returns {{ ref, open, close, isOpen }}
 */
export function useDialog() {
  const ref = useRef(null)
  const lastFocusedRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    const dialog = ref.current
    if (!dialog || dialog.open) return

    lastFocusedRef.current = document.activeElement

    if (typeof dialog.showModal === 'function') {
      dialog.showModal()
    } else {
      dialog.setAttribute('open', '')
    }

    document.body.classList.add('is-locked')
    setIsOpen(true)

    const closeBtn = dialog.querySelector('[data-close-dialog]')
    if (closeBtn) closeBtn.focus()
  }, [])

  const close = useCallback(() => {
    const dialog = ref.current
    if (!dialog || !dialog.open) return
    dialog.close()
  }, [])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    const onClose = () => {
      document.body.classList.remove('is-locked')
      const last = lastFocusedRef.current
      if (last && document.contains(last)) last.focus()
      lastFocusedRef.current = null
      setIsOpen(false)
    }

    const onBackdropClick = (e) => {
      const rect = dialog.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!inside) dialog.close()
    }

    dialog.addEventListener('close', onClose)
    dialog.addEventListener('click', onBackdropClick)

    return () => {
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('click', onBackdropClick)
    }
  }, [])

  return { ref, open, close, isOpen }
}
