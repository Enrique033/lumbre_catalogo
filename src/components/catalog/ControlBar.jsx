import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/layout/Container.jsx'
import { SearchBar } from './SearchBar.jsx'
import { CategoryTabs } from './CategoryTabs.jsx'
import { SortSelect } from './SortSelect.jsx'

/**
 * Detecta cuándo la barra queda "pegada" bajo el header para
 * activar el fondo glass y el borde. Lee --header-h del CSS.
 */
function useStuck() {
  const ref = useRef(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const offset = parseFloat(getComputedStyle(el).getPropertyValue('--header-h')) || 56
      setStuck(el.getBoundingClientRect().top <= offset + 1)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [ref, stuck]
}

export function ControlBar({
  query,
  onQueryChange,
  onQueryClear,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}) {
  const [ref, stuck] = useStuck()

  return (
    <div
      ref={ref}
      className={[
        'sticky z-40 border-b py-2.5',
        'transition-[background-color,border-color] duration-200 ease-quart',
        stuck ? 'glass border-border' : 'bg-bg border-transparent',
      ].join(' ')}
      style={{ top: 'var(--header-h)' }}
    >
      <Container className="grid gap-2.5 lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] lg:items-center lg:gap-4">
        <SearchBar value={query} onChange={onQueryChange} onClear={onQueryClear} />

        <div className="flex items-center gap-2 min-w-0">
          <CategoryTabs
            value={category}
            onChange={onCategoryChange}
            className="flex-1 min-w-0"
          />
          <SortSelect value={sort} onChange={onSortChange} />
        </div>
      </Container>
    </div>
  )
}
