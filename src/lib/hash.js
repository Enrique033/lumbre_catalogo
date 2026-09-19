/**
 * Lectura y escritura del hash de la URL.
 * Formato de deep link: #/pieza/:slug
 */

const PIECE_PREFIX = '#/pieza/'

/**
 * Extrae el slug de una pieza desde el hash actual.
 *
 * @param {string} [hash=window.location.hash]
 * @returns {string|null}
 */
export function readPieceFromHash(hash = window.location.hash) {
  if (!hash || !hash.startsWith(PIECE_PREFIX)) return null
  const slug = hash.slice(PIECE_PREFIX.length).trim()
  return slug || null
}

/**
 * Escribe el slug de una pieza en el hash.
 * Usa replaceState por defecto para no ensuciar el historial.
 *
 * @param {string} slug
 * @param {object} [options]
 * @param {boolean} [options.replace=true]
 */
export function writePieceToHash(slug, { replace = true } = {}) {
  const next = `${PIECE_PREFIX}${slug}`
  if (window.location.hash === next) return
  if (replace) {
    history.replaceState(null, '', next)
  } else {
    window.location.hash = next
  }
}

/**
 * Elimina el hash de pieza sin recargar ni saltar al top.
 */
export function clearHash() {
  if (!window.location.hash) return
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

/**
 * Comprueba si el hash actual apunta a una pieza.
 *
 * @returns {boolean}
 */
export function hasPieceHash() {
  return readPieceFromHash() !== null
}
