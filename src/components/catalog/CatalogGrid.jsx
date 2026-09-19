import { useEffect, useRef, useState } from 'react'
import { CatalogCard } from './CatalogCard.jsx'
import { EmptyState } from './EmptyState.jsx'

export function CatalogGrid({ items, query, category, onOpen, onCategoryChange, onClear }) {
  const prevCount = useRef(items.length)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (prevCount.current === items.length) return
    prevCount.current = items.length
    setAnimating(true)
    const t = setTimeout(() => setAnimating(false), 160)
    return () => clearTimeout(t)
  }, [items.length])

  if (items.length === 0) {
    return (
      <EmptyState
        query={query}
        category={category}
        onCategoryChange={onCategoryChange}
        onClear={onClear}
      />
    )
  }

  return (
    <div
      className={[
        'grid grid-cols-1 gap-3.5 pt-2 pb-1',
        'sm:grid-cols-2 sm:gap-5',
        'lg:grid-cols-3 lg:gap-6',
        'transition-opacity duration-150 ease-quart',
        animating ? 'opacity-45' : 'opacity-100',
      ].join(' ')}
    >
      {items.map((item, index) => (
        <CatalogCard key={item.id} item={item} onOpen={onOpen} index={index} />
      ))}
    </div>
  )
}
