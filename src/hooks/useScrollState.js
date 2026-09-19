import { useEffect, useState } from 'react'

/**
 * Devuelve true cuando la página ha hecho scroll más allá del umbral.
 * Útil para el borde del header sticky.
 *
 * @param {number} [threshold=8]
 * @returns {boolean}
 */
export function useScrollState(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isScrolled
}
