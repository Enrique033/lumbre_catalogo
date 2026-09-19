import { formatPrice } from './format.js'
import { BUSINESS } from '@/data/business.js'

/**
 * Utilidades para generar enlaces de WhatsApp (wa.me).
 * Funciones puras: reciben datos, devuelven URLs/texto.
 */

/**
 * Deja solo dígitos de un número de teléfono.
 * '+34 600 000 000' -> '34600000000'
 *
 * @param {string|number} value
 * @returns {string}
 */
export function normalizeWhatsappNumber(value) {
  return String(value || '').replace(/\D/g, '')
}

/**
 * Construye una URL de WhatsApp con mensaje precargado.
 *
 * @param {string} [message=''] - texto inicial del chat
 * @returns {string} URL https://wa.me/...
 */
export function buildWhatsAppUrl(message = '') {
  const number = normalizeWhatsappNumber(BUSINESS.contact?.whatsapp)
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  if (!number) return 'https://wa.me/'
  return `https://wa.me/${number}${text}`
}

/**
 * Construye el mensaje de pedido a partir de las líneas del carrito.
 *
 * @param {{piece: object, qty: number}[]} lines
 * @param {number} total
 * @returns {string}
 */
export function buildCartMessage(lines, total) {
  const rows = (lines || []).map(({ piece, qty }) => {
    const lineTotal = formatPrice((piece.price || 0) * qty, piece.currency)
    return `• ${qty} × ${piece.title} — ${lineTotal}`
  })

  return [
    'Hola LUMBRE, quiero hacer un pedido:',
    '',
    ...rows,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    'Enviado desde el catálogo web.',
  ].join('\n')
}

/**
 * Mensaje genérico para el botón flotante de WhatsApp.
 *
 * @returns {string}
 */
export function buildGeneralMessage() {
  return 'Hola LUMBRE, me gustaría recibir información sobre las piezas del catálogo.'
}
