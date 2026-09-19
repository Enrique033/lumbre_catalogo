import { ArrowRight, Star } from 'lucide-react'
import { CardTags } from './CardTags.jsx'
import { AddToCartButton } from '@/components/cart/AddToCartButton.jsx'
import { StateDot } from '@/components/product/AvailabilityBadge.jsx'
import { categoryLabel } from '@/data/categories.js'
import { formatPrice } from '@/lib/format.js'

const AVAILABILITY_SHORT = {
  stock: 'En stock',
  pedido: 'Bajo pedido',
  limitada: 'Edición limitada',
}

export function CatalogCard({ item, onOpen, index = 0 }) {
  const handleClick = (e) => {
    // Permitir navegación nativa con modificadores (Cmd/Ctrl/Shift, click medio)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onOpen(item.slug)
  }

  return (
    <article className="group relative reveal" style={{ '--i': Math.min(index, 11) }}>
      <a
        href={`#/pieza/${item.slug}`}
        data-slug={item.slug}
        aria-label={`${item.title}. Ver detalles`}
        onClick={handleClick}
        className={[
          'flex flex-col h-full overflow-hidden no-underline text-inherit',
          'bg-surface border border-border rounded-card shadow-base',
          'transition-[transform,box-shadow,border-color] duration-200 ease-quart',
          'hover:-translate-y-1 hover:shadow-hover hover:border-border-strong',
          'motion-reduce:hover:translate-y-0 motion-reduce:transition-none',
        ].join(' ')}
      >
        {/* Imagen */}
        <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
          <img
            src={item.image}
            alt={`${item.title} — ${item.description}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            className={[
              'w-full h-full object-cover',
              'transition-transform duration-500 ease-quart',
              'group-hover:scale-[1.04] motion-reduce:group-hover:scale-100',
            ].join(' ')}
          />

          {item.featured && (
            <span
              className={[
                'absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-chip',
                'bg-brand/92 backdrop-blur-[2px] text-bg pl-1.5 pr-2 py-1',
                'text-[10px] font-semibold tracking-[0.08em] uppercase',
              ].join(' ')}
            >
              <Star size={11} strokeWidth={2} aria-hidden="true" className="text-accent" />
              Destacada
            </span>
          )}

          {/* Overlay con CTA al hover / focus */}
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 grid place-items-center',
              'bg-ink/0 group-hover:bg-ink/18 group-focus-within:bg-ink/18',
              'transition-colors duration-300 ease-quart motion-reduce:transition-none',
            ].join(' ')}
          >
            <span
              className={[
                'inline-flex items-center gap-1.5 rounded-chip bg-white/94 backdrop-blur-[2px]',
                'px-3 py-1.5 text-xs font-medium text-ink shadow-base',
                'opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0',
                'group-focus-within:opacity-100 group-focus-within:translate-y-0',
                'transition-[opacity,transform] duration-300 ease-quart motion-reduce:transition-none',
              ].join(' ')}
            >
              Ver ficha
              <ArrowRight size={13} strokeWidth={2} />
            </span>
          </span>
        </div>

        {/* Cuerpo */}
        <div className="flex flex-col flex-1 gap-1 px-4 pt-3 pb-3.5">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-3">
            {categoryLabel(item.category)}
          </p>

          <h3 className="font-display text-[17px] font-medium leading-[1.2] tracking-[-0.01em] text-ink">
            {item.title}
          </h3>

          <p className="text-[13px] text-ink-2 leading-[1.45] line-clamp-2">{item.description}</p>

          <CardTags tags={item.tags} max={2} />

          <div className="mt-auto pt-2.5 border-t border-border flex items-center justify-between gap-2.5">
            <span className="text-sm font-semibold text-ink tracking-[-0.01em] tabular-nums">
              {formatPrice(item.price, item.currency)}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-2">
              <StateDot state={item.availabilityState} live={item.availabilityState === 'stock'} />
              {AVAILABILITY_SHORT[item.availabilityState] || item.availability}
            </span>
          </div>
        </div>
      </a>

      {/* Añadir al carrito (hermano del <a>, no hijo, para evitar
          interactivos anidados). Cubre la esquina de la imagen. */}
      <AddToCartButton
        piece={item}
        variant="icon"
        className="absolute top-2.5 right-2.5 z-10"
      />
    </article>
  )
}
