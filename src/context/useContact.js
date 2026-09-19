import { createContext, useContext } from 'react'

/**
 * Contexto + hook de contacto.
 * Separado del componente <ContactProvider> (ContactContext.jsx) para
 * mantener la regla de fast-refresh: los ficheros .jsx solo exportan
 * componentes; las funciones y constantes viven en un fichero propio.
 */
export const ContactContext = createContext(null)

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) {
    throw new Error('useContact debe usarse dentro de un <ContactProvider>')
  }
  return ctx
}
