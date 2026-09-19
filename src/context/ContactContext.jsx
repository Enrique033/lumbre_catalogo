import { useCallback, useMemo, useState } from 'react'
import { ContactContext } from './useContact.js'

/**
 * Contexto global para abrir el modal de contacto desde cualquier punto
 * de la app (header, footer, card, quick view, sección de contacto),
 * con la pieza opcional como contexto.
 *
 * Uso:
 *   const { openContact } = useContact()
 *   openContact({ piece: 'Colgante Alba' })
 *   openContact()  // sin pieza
 */

export function ContactProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    piece: '',
  })

  const openContact = useCallback((options = {}) => {
    const piece = typeof options === 'string' ? options : options.piece || ''
    setState({ isOpen: true, piece })
  }, [])

  const closeContact = useCallback(() => {
    setState({ isOpen: false, piece: '' })
  }, [])

  const clearPiece = useCallback(() => {
    setState((prev) => ({ ...prev, piece: '' }))
  }, [])

  const value = useMemo(
    () => ({
      isOpen: state.isOpen,
      piece: state.piece,
      openContact,
      closeContact,
      clearPiece,
    }),
    [state.isOpen, state.piece, openContact, closeContact, clearPiece],
  )

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}
