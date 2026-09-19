import { normalize, tokenize } from './normalize.js'

/**
 * Filtrado y ordenamiento del catálogo.
 * Todo son funciones puras: reciben datos, devuelven datos.
 * El array original nunca se muta.
 */

/**
 * Comprueba si un elemento coincide con una categoría.
 *
 * @param {object} item
 * @param {string} category - id de categoría o 'todas'
 * @returns {boolean}
 */
export function matchesCategory(item, category) {
  if (!category || category === 'todas') return true
  return item.category === category
}

/**
 * Comprueba si un elemento coincide con la búsqueda.
 * Busca en título, categoría, descripción, detalles, tags y specs.
 * Multi-término: todos los términos deben aparecer.
 *
 * @param {object} item
 * @param {string} query
 * @returns {boolean}
 */
export function matchesQuery(item, query) {
  const terms = tokenize(query)
  if (terms.length === 0) return true

  const haystack = normalize(
    [
      item.title,
      item.category,
      item.description,
      item.details,
      (item.tags || []).join(' '),
      Object.values(item.specs || {}).join(' '),
    ].join(' '),
  )

  return terms.every((term) => haystack.includes(term))
}

/**
 * Ordena una lista según el criterio indicado.
 * Devuelve una copia; nunca muta el array original.
 *
 * Criterios:
 *  - 'relevancia'  → destacados primero, luego por fecha descendente
 *  - 'recientes'   → fecha descendente
 *  - 'nombre-az'   → alfabético ascendente
 *  - 'nombre-za'   → alfabético descendente
 *  - 'precio-asc'  → precio ascendente
 *  - 'precio-desc' → precio descendente
 *
 * @param {object[]} items
 * @param {string} sortId
 * @returns {object[]}
 */
export function sortItems(items, sortId) {
  const arr = items.slice()

  switch (sortId) {
    case 'recientes':
      return arr.sort((a, b) => new Date(b.date) - new Date(a.date))

    case 'nombre-az':
      return arr.sort((a, b) => a.title.localeCompare(b.title, 'es'))

    case 'nombre-za':
      return arr.sort((a, b) => b.title.localeCompare(a.title, 'es'))

    case 'precio-asc':
      return arr.sort((a, b) => a.price - b.price)

    case 'precio-desc':
      return arr.sort((a, b) => b.price - a.price)

    case 'relevancia':
    default:
      return arr.sort((a, b) => {
        const fa = a.featured ? 1 : 0
        const fb = b.featured ? 1 : 0
        if (fa !== fb) return fb - fa
        return new Date(b.date) - new Date(a.date)
      })
  }
}

/**
 * Pipeline completo: filtrar por categoría, filtrar por búsqueda,
 * ordenar. Devuelve un array nuevo.
 *
 * @param {object[]} items
 * @param {object} criteria
 * @param {string} criteria.category
 * @param {string} criteria.query
 * @param {string} criteria.sort
 * @returns {object[]}
 */
export function applyFilters(items, { category, query, sort }) {
  const filtered = items.filter(
    (item) => matchesCategory(item, category) && matchesQuery(item, query),
  )
  return sortItems(filtered, sort)
}
