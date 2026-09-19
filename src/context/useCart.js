import { createContext, useContext } from 'react'

/**
 * Contexto + hook del carrito.
 * Separado del componente <CartProvider> (CartContext.jsx) para
 * mantener la regla de fast-refresh: los ficheros .jsx solo exportan
 * componentes; las funciones y constantes viven en un fichero propio.
 */
export const CartContext = createContext(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>')
  }
  return ctx
}
