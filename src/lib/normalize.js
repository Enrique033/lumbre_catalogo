/**
 * Normalización de texto para búsqueda y slugs.
 * Sin dependencias. Funciones puras.
 */

/**
 * Normaliza un texto para comparación:
 * - a minúsculas
 * - sin acentos ni diacríticos
 * - espacios colapsados
 *
 * @param {string} value
 * @returns {string}
 */
export function normalize(value) {
  if (value === null || value === undefined) return ''
  return value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Divide un texto normalizado en términos.
 * Útil para búsquedas multi-palabra.
 *
 * @param {string} value
 * @returns {string[]}
 */
export function tokenize(value) {
  const n = normalize(value)
  return n ? n.split(' ').filter(Boolean) : []
}

/**
 * Convierte un título en slug URL-friendly.
 * "Colgante Alba" -> "colgante-alba"
 *
 * @param {string} value
 * @returns {string}
 */
export function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
