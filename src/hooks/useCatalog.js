import { useMemo, useReducer } from 'react'
import { CATALOG } from '@/data/catalog.js'
import { applyFilters } from '@/lib/filters.js'

const PAGE_SIZE = 6
const PAGE_STEP = 4

const initialState = {
  query: '',
  category: 'todas',
  sort: 'relevancia',
  visibleCount: PAGE_SIZE,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, visibleCount: PAGE_SIZE }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload, visibleCount: PAGE_SIZE }
    case 'SET_SORT':
      return { ...state, sort: action.payload, visibleCount: PAGE_SIZE }
    case 'LOAD_MORE':
      return { ...state, visibleCount: state.visibleCount + PAGE_STEP }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

/**
 * Estado del catálogo: filtros, orden, paginación.
 * Los resultados son derivados con useMemo: nunca se guardan en el estado.
 *
 * @param {object[]} [source=CATALOG] - dataset opcional (útil para tests o API futura)
 * @returns {object}
 */
export function useCatalog(source = CATALOG) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const items = useMemo(
    () =>
      applyFilters(source, {
        category: state.category,
        query: state.query,
        sort: state.sort,
      }),
    [source, state.category, state.query, state.sort],
  )

  const visibleItems = useMemo(
    () => items.slice(0, state.visibleCount),
    [items, state.visibleCount],
  )

  const total = items.length
  const shown = visibleItems.length
  const hasMore = total > shown
  const remaining = Math.max(0, total - shown)
  const hasFilters = state.query.trim() !== '' || state.category !== 'todas'

  return {
    query: state.query,
    category: state.category,
    sort: state.sort,
    visibleCount: state.visibleCount,

    items,
    visibleItems,
    total,
    shown,
    hasMore,
    remaining,
    hasFilters,

    setQuery: (query) => dispatch({ type: 'SET_QUERY', payload: query }),
    setCategory: (category) => dispatch({ type: 'SET_CATEGORY', payload: category }),
    setSort: (sort) => dispatch({ type: 'SET_SORT', payload: sort }),
    loadMore: () => dispatch({ type: 'LOAD_MORE' }),
    clearFilters: () => dispatch({ type: 'CLEAR' }),
  }
}
