import { useCallback, useEffect, useState } from 'react'
import { readPieceFromHash, writePieceToHash, clearHash } from '@/lib/hash.js'

/**
 * Sincroniza la pieza activa con el hash de la URL.
 * Formato: #/pieza/:slug
 *
 * @returns {{ slug, openPiece, closePiece }}
 */
export function useHashRoute() {
  const [slug, setSlug] = useState(() =>
    typeof window === 'undefined' ? null : readPieceFromHash(),
  )

  useEffect(() => {
    const onHashChange = () => setSlug(readPieceFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const openPiece = useCallback((nextSlug) => {
    if (!nextSlug) return
    writePieceToHash(nextSlug)
    setSlug(nextSlug)
  }, [])

  const closePiece = useCallback(() => {
    clearHash()
    setSlug(null)
  }, [])

  return { slug, openPiece, closePiece }
}
