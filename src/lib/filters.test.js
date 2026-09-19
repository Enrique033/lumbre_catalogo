import { describe, it, expect } from 'vitest'
import { matchesCategory, matchesQuery, sortItems, applyFilters } from './filters.js'
import { normalize, tokenize, slugify } from './normalize.js'
import { formatPrice, plural, escapeHtml } from './format.js'

/* ---------------------------------------------------------
   FIXTURES
   Dataset mínimo para tests, con todas las variantes
   que nos interesan cubrir.
   --------------------------------------------------------- */
const FIXTURES = [
  {
    id: 'a',
    title: 'Colgante Alba',
    category: 'colgantes',
    description: 'Pantalla de lino tensado sobre latón cepillado.',
    details: 'Pieza pensada para comedor.',
    price: 480,
    currency: 'EUR',
    featured: true,
    date: '2025-11-04',
    tags: ['latón', 'lino', 'comedor'],
    specs: { Material: 'Latón cepillado', Fuente: 'E27 · LED 8 W' },
  },
  {
    id: 'b',
    title: 'Lámpara Orza',
    category: 'sobremesa',
    description: 'Base de cerámica torneada a mano.',
    details: 'Pensada para dormitorio.',
    price: 260,
    currency: 'EUR',
    featured: false,
    date: '2025-06-10',
    tags: ['cerámica', 'dormitorio'],
    specs: { Material: 'Cerámica', Fuente: 'E27' },
  },
  {
    id: 'c',
    title: 'Colgante Halo 60',
    category: 'colgantes',
    description: 'Aro de aluminio anodizado con difusor opal.',
    details: 'Ideal para cocina.',
    price: 620,
    currency: 'EUR',
    featured: false,
    date: '2025-08-19',
    tags: ['aluminio', 'cocina'],
    specs: { Material: 'Aluminio', Fuente: 'LED integrado 24 W' },
  },
]

/* ---------------------------------------------------------
   normalize
   --------------------------------------------------------- */
describe('normalize', () => {
  it('convierte a minúsculas y quita acentos', () => {
    expect(normalize('Lámpara Órza')).toBe('lampara orza')
  })

  it('colapsa espacios múltiples', () => {
    expect(normalize('  hola    mundo  ')).toBe('hola mundo')
  })

  it('devuelve cadena vacía ante null/undefined', () => {
    expect(normalize(null)).toBe('')
    expect(normalize(undefined)).toBe('')
  })
})

describe('tokenize', () => {
  it('separa por espacios tras normalizar', () => {
    expect(tokenize('Colgante  ÁLBA')).toEqual(['colgante', 'alba'])
  })

  it('devuelve array vacío con entrada vacía', () => {
    expect(tokenize('')).toEqual([])
  })
})

describe('slugify', () => {
  it('convierte título en slug', () => {
    expect(slugify('Colgante Alba')).toBe('colgante-alba')
  })

  it('maneja acentos y símbolos', () => {
    expect(slugify('Lámpara Órza · 60 cm')).toBe('lampara-orza-60-cm')
  })
})

/* ---------------------------------------------------------
   matchesCategory
   --------------------------------------------------------- */
describe('matchesCategory', () => {
  it('acepta cualquier categoría cuando es "todas"', () => {
    FIXTURES.forEach((item) => {
      expect(matchesCategory(item, 'todas')).toBe(true)
    })
  })

  it('filtra por categoría concreta', () => {
    expect(matchesCategory(FIXTURES[0], 'colgantes')).toBe(true)
    expect(matchesCategory(FIXTURES[1], 'colgantes')).toBe(false)
  })

  it('devuelve true si la categoría no se especifica', () => {
    expect(matchesCategory(FIXTURES[0], '')).toBe(true)
    expect(matchesCategory(FIXTURES[0], null)).toBe(true)
  })
})

/* ---------------------------------------------------------
   matchesQuery
   --------------------------------------------------------- */
describe('matchesQuery', () => {
  it('todo coincide con consulta vacía', () => {
    FIXTURES.forEach((item) => {
      expect(matchesQuery(item, '')).toBe(true)
    })
  })

  it('busca por título (sin acentos)', () => {
    expect(matchesQuery(FIXTURES[0], 'alba')).toBe(true)
    expect(matchesQuery(FIXTURES[1], 'orza')).toBe(true)
    expect(matchesQuery(FIXTURES[1], 'órza')).toBe(true)
  })

  it('busca en tags', () => {
    expect(matchesQuery(FIXTURES[0], 'latón')).toBe(true)
    expect(matchesQuery(FIXTURES[0], 'latón')).toBe(true)
  })

  it('busca en specs', () => {
    expect(matchesQuery(FIXTURES[0], 'E27')).toBe(true)
    expect(matchesQuery(FIXTURES[2], 'LED integrado')).toBe(true)
  })

  it('exige que todos los términos aparezcan', () => {
    expect(matchesQuery(FIXTURES[0], 'colgante lino')).toBe(true)
    expect(matchesQuery(FIXTURES[0], 'colgante mármol')).toBe(false)
  })

  it('no coincide con términos inexistentes', () => {
    expect(matchesQuery(FIXTURES[0], 'mármol')).toBe(false)
  })
})

/* ---------------------------------------------------------
   sortItems
   --------------------------------------------------------- */
describe('sortItems', () => {
  it('no muta el array original', () => {
    const original = FIXTURES.slice()
    sortItems(FIXTURES, 'precio-asc')
    expect(FIXTURES).toEqual(original)
  })

  it('ordena por precio ascendente', () => {
    const result = sortItems(FIXTURES, 'precio-asc')
    expect(result.map((i) => i.id)).toEqual(['b', 'a', 'c'])
  })

  it('ordena por precio descendente', () => {
    const result = sortItems(FIXTURES, 'precio-desc')
    expect(result.map((i) => i.id)).toEqual(['c', 'a', 'b'])
  })

  it('ordena alfabéticamente A-Z', () => {
    const result = sortItems(FIXTURES, 'nombre-az')
    expect(result.map((i) => i.id)).toEqual(['a', 'c', 'b'])
  })

  it('ordena alfabéticamente Z-A', () => {
    const result = sortItems(FIXTURES, 'nombre-za')
    expect(result.map((i) => i.id)).toEqual(['b', 'c', 'a'])
  })

  it('ordena por fecha descendente', () => {
    const result = sortItems(FIXTURES, 'recientes')
    expect(result.map((i) => i.id)).toEqual(['a', 'c', 'b'])
  })

  it('pone destacados primero en relevancia', () => {
    const result = sortItems(FIXTURES, 'relevancia')
    expect(result[0].id).toBe('a')
  })

  it('cae a relevancia ante un criterio desconocido', () => {
    const result = sortItems(FIXTURES, 'inexistente')
    expect(result[0].id).toBe('a')
  })
})

/* ---------------------------------------------------------
   applyFilters
   --------------------------------------------------------- */
describe('applyFilters', () => {
  it('combina categoría + query + sort', () => {
    const result = applyFilters(FIXTURES, {
      category: 'colgantes',
      query: 'latón',
      sort: 'precio-asc',
    })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('a')
  })

  it('devuelve todo con criterios vacíos', () => {
    const result = applyFilters(FIXTURES, {
      category: 'todas',
      query: '',
      sort: 'relevancia',
    })
    expect(result).toHaveLength(3)
  })

  it('devuelve array vacío si nada coincide', () => {
    const result = applyFilters(FIXTURES, {
      category: 'apliques',
      query: '',
      sort: 'relevancia',
    })
    expect(result).toEqual([])
  })
})

/* ---------------------------------------------------------
   format
   --------------------------------------------------------- */
describe('formatPrice', () => {
  it('formatea precios enteros en EUR', () => {
    // El espacio entre número y € varía por versión de ICU, pero
    // siempre contiene el número y el símbolo.
    const result = formatPrice(480, 'EUR')
    expect(result).toContain('480')
    expect(result).toContain('€')
  })

  it('usa separador de miles', () => {
    const result = formatPrice(1450, 'EUR')
    expect(result).toMatch(/1[.\s]?450/)
  })

  it('devuelve cadena vacía ante valor inválido', () => {
    expect(formatPrice(undefined)).toBe('')
    expect(formatPrice('abc')).toBe('')
    expect(formatPrice(NaN)).toBe('')
  })
})

describe('plural', () => {
  it('singular', () => {
    expect(plural(1, ['pieza', 'piezas'])).toBe('1 pieza')
  })

  it('plural', () => {
    expect(plural(5, ['pieza', 'piezas'])).toBe('5 piezas')
  })

  it('cero usa plural', () => {
    expect(plural(0, ['pieza', 'piezas'])).toBe('0 piezas')
  })
})

describe('escapeHtml', () => {
  it('escapa caracteres peligrosos', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('maneja comillas simples', () => {
    expect(escapeHtml("it's")).toBe('it&#39;s')
  })

  it('devuelve cadena vacía ante null/undefined', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })
})
