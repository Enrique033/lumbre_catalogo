import { useCallback, useEffect, useMemo, useState } from 'react'
import { getPieceBySlug } from '@/data/catalog.js'
import { CartContext } from './useCart.js'

const STORAGE_KEY = 'lumbre.cart.v1'
const MAX_QTY = 99

/**
 * Lee el carrito persistido en localStorage, descartando entradas
 * inválidas (slugs inexistentes o cantidades no válidas).
 */
function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([slug, qty]) => Boolean(getPieceBySlug(slug)) && Number.isFinite(qty) && qty > 0)
        .map(([slug, qty]) => [slug, Math.min(MAX_QTY, Math.floor(qty))]),
    )
  } catch {
    return {}
  }
}

/**
 * Contexto global del carrito:
 *   - add(piece, qty)       → añade unidades de una pieza
 *   - setQty(slug, qty)     → fija cantidad (0 elimina)
 *   - remove(slug)          → elimina una pieza
 *   - clear()               → vacía el carrito
 *   - has(slug)             → ¿está la pieza en el carrito?
 *   - lines / count / subtotal  → derivados
 *   - openCart() / closeCart()  → diálogo del carrito
 *
 * El estado vive en un mapa { slug: qty } y se persiste en localStorage.
 */
export function CartProvider({ children }) {
  const [qtyBySlug, setQtyBySlug] = useState(readStorage)
  const [isCartOpen, setCartOpen] = useState(false)

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qtyBySlug))
    } catch {
      // Almacenamiento no disponible (privado/lleno): el carrito
      // sigue funcionando solo en memoria.
    }
  }, [qtyBySlug])

  const add = useCallback((piece, qty = 1) => {
    if (!piece?.slug) return
    setQtyBySlug((prev) => ({
      ...prev,
      [piece.slug]: Math.min(MAX_QTY, (prev[piece.slug] || 0) + Math.max(1, Math.floor(qty))),
    }))
  }, [])

  const setQty = useCallback((slug, qty) => {
    setQtyBySlug((prev) => {
      const clamped = Math.max(0, Math.min(MAX_QTY, Math.floor(Number(qty)) || 0))
      const next = { ...prev }
      if (clamped === 0) {
        delete next[slug]
      } else {
        next[slug] = clamped
      }
      return next
    })
  }, [])

  const remove = useCallback((slug) => setQty(slug, 0), [setQty])
  const clear = useCallback(() => setQtyBySlug({}), [])
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const has = useCallback((slug) => (qtyBySlug[slug] || 0) > 0, [qtyBySlug])

  // Derivados: líneas resueltas contra el catálogo, unidades y total
  const lines = useMemo(
    () =>
      Object.entries(qtyBySlug)
        .map(([slug, qty]) => ({ piece: getPieceBySlug(slug), qty }))
        .filter(({ piece }) => Boolean(piece)),
    [qtyBySlug],
  )

  const count = useMemo(() => lines.reduce((acc, { qty }) => acc + qty, 0), [lines])

  const subtotal = useMemo(
    () => lines.reduce((acc, { piece, qty }) => acc + (piece.price || 0) * qty, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      has,
      add,
      setQty,
      remove,
      clear,
      isCartOpen,
      openCart,
      closeCart,
    }),
    [lines, count, subtotal, has, add, setQty, remove, clear, isCartOpen, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
