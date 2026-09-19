import { describe, it, expect } from 'vitest'
import {
  normalizeWhatsappNumber,
  buildWhatsAppUrl,
  buildCartMessage,
  buildGeneralMessage,
} from './whatsapp.js'
import { BUSINESS } from '@/data/business.js'

/* ---------------------------------------------------------
   normalizeWhatsappNumber
   --------------------------------------------------------- */
describe('normalizeWhatsappNumber', () => {
  it('deja solo dígitos', () => {
    expect(normalizeWhatsappNumber('+34 600 000 000')).toBe('34600000000')
  })

  it('devuelve cadena vacía ante entradas vacías', () => {
    expect(normalizeWhatsappNumber('')).toBe('')
    expect(normalizeWhatsappNumber(null)).toBe('')
    expect(normalizeWhatsappNumber(undefined)).toBe('')
  })
})

/* ---------------------------------------------------------
   buildWhatsAppUrl
   --------------------------------------------------------- */
describe('buildWhatsAppUrl', () => {
  it('incluye el número configurado en BUSINESS', () => {
    const url = buildWhatsAppUrl()
    expect(url).toContain(`https://wa.me/${normalizeWhatsappNumber(BUSINESS.contact.whatsapp)}`)
  })

  it('codifica el mensaje como query param', () => {
    const url = buildWhatsAppUrl('Hola LUMBRE')
    expect(url).toContain('?text=Hola%20LUMBRE')
  })

  it('sin mensaje no añade query', () => {
    expect(buildWhatsAppUrl('')).not.toContain('?text=')
  })
})

/* ---------------------------------------------------------
   buildCartMessage
   --------------------------------------------------------- */
describe('buildCartMessage', () => {
  const PIECE = { title: 'Colgante Alba', price: 480, currency: 'EUR' }

  it('lista las líneas con cantidad y total de línea', () => {
    const msg = buildCartMessage([{ piece: PIECE, qty: 2 }], 960)
    expect(msg).toContain('• 2 × Colgante Alba')
    expect(msg).toContain('960')
  })

  it('incluye el total del pedido', () => {
    const msg = buildCartMessage([{ piece: PIECE, qty: 1 }], 480)
    expect(msg).toContain('Total: 480')
  })

  it('responde ante líneas vacías', () => {
    expect(buildCartMessage([], 0)).toContain('Total: 0')
  })
})

/* ---------------------------------------------------------
   buildGeneralMessage
   --------------------------------------------------------- */
describe('buildGeneralMessage', () => {
  it('devuelve un saludo no vacío', () => {
    expect(buildGeneralMessage().length).toBeGreaterThan(0)
  })
})
