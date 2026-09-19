import { useEffect, useState } from 'react'

/**
 * Suscribe a una media query.
 * @param {string} query - ej. '(min-width: 900px)'
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    // matchMedia() es una API reciente (Chrome 118+); si no existe,
    // devolvemos false en vez de romper la app.
    return typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
