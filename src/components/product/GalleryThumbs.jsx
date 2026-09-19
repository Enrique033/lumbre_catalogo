export function GalleryThumbs({ images, index, onSelect }) {
  if (images.length <= 1) return null

  return (
    <div aria-label="Miniaturas" className="flex gap-2 p-3 overflow-x-auto [scrollbar-width:thin]">
      {images.map((src, i) => {
        const current = i === index
        return (
          <button
            key={src}
            type="button"
            aria-pressed={current}
            aria-label={`Ver imagen ${i + 1}`}
            onClick={() => onSelect(i)}
            className={[
              'flex-none w-16 h-16 rounded-md overflow-hidden',
              'border transition-[opacity,border-color] duration-200 ease-quart',
              current
                ? 'opacity-100 border-brand'
                : 'opacity-65 border-transparent hover:opacity-100',
            ].join(' ')}
          >
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        )
      })}
    </div>
  )
}
