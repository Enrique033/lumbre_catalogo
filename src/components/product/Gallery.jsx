import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GalleryThumbs } from './GalleryThumbs.jsx'

export function Gallery({ title, images = [] }) {
  const [index, setIndex] = useState(0)

  const total = images.length
  const hasMany = total > 1
  const current = images[index] || images[0]

  const go = (delta) => {
    if (!hasMany) return
    setIndex((prev) => (prev + delta + total) % total)
  }

  const handleKeyDown = (e) => {
    if (!hasMany) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  return (
    <div className="flex flex-col bg-surface-2 min-h-0">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions --
        La región agrupa los botones del carrusel y captura las flechas del
        teclado para navegar entre imágenes (los eventos burbujean). */}
      <div
        role="group"
        className="relative aspect-[3/2] overflow-hidden flex-none"
        onKeyDown={handleKeyDown}
        aria-label={hasMany ? `Galería de ${title}. Usa las flechas para navegar.` : undefined}
      >
        <img
          key={current}
          src={current}
          alt={`${title} — imagen ${index + 1} de ${total}`}
          className="w-full h-full object-cover animate-[fade-in_220ms_var(--ease-quart)] motion-reduce:animate-none"
        />

        {hasMany && (
          <>
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 -translate-y-1/2 grid place-items-center w-9.5 h-9.5 rounded-full bg-white/92 border border-border text-ink transition-colors duration-150 hover:bg-white"
            >
              <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 -translate-y-1/2 grid place-items-center w-9.5 h-9.5 rounded-full bg-white/92 border border-border text-ink transition-colors duration-150 hover:bg-white"
            >
              <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <GalleryThumbs images={images} index={index} onSelect={setIndex} />
    </div>
  )
}
