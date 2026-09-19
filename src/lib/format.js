/**
 * Formateo de valores para mostrar en la UI.
 */

/**
 * Formatea un precio con la moneda indicada.
 * 480 + EUR -> "480 €"
 * 1450 + EUR -> "1.450 €"
 *
 * @param {number} amount
 * @param {string} [currency='EUR']
 * @param {string} [locale='es-ES']
 * @returns {string}
 */
export function formatPrice(amount, currency = 'EUR', locale = 'es-ES') {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Pluraliza una cantidad.
 * 1 + ['pieza', 'piezas'] -> "1 pieza"
 * 5 + ['pieza', 'piezas'] -> "5 piezas"
 *
 * @param {number} count
 * @param {[string, string]} forms
 * @returns {string}
 */
export function plural(count, [one, many]) {
  return `${count} ${count === 1 ? one : many}`
}

/**
 * Escapa caracteres peligrosos para interpolación en HTML.
 * Solo se usa si en algún punto se recurre a innerHTML.
 *
 * @param {string} value
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return ''
  return value
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
