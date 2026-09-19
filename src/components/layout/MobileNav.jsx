import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button.jsx'
import { BUSINESS } from '@/data/business.js'

const LINKS = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#estudio', label: 'Estudio' },
  { href: '#contacto', label: 'Contacto' },
]

/**
 * Menú de navegación móvil. Vive dentro del <header> sticky,
 * por lo que se ancla a su borde inferior con position absolute.
 */
export function MobileNav({ id, open, onClose, onContact }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      id={id}
      hidden={!open}
      className={[
        'lg:hidden absolute top-full left-0 right-0 border-b border-border',
        'glass shadow-[0_16px_40px_-20px_rgba(28,25,23,0.25)]',
        'px-4 pb-4 pt-2',
        'animate-[fade-up_200ms_var(--ease-quart)] motion-reduce:animate-none',
      ].join(' ')}
    >
      <nav aria-label="Navegación móvil" className="flex flex-col">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="no-underline text-[15px] text-ink py-2.5 border-b border-border/70 transition-colors duration-150 hover:text-accent-ink"
          >
            {link.label}
          </a>
        ))}

        <a
          href={BUSINESS.portfolioHref}
          rel="noopener"
          onClick={onClose}
          className="no-underline inline-flex items-center gap-1.5 text-[13px] text-ink-2 py-2.5 border-t border-border/70 transition-colors duration-150 hover:text-ink"
        >
          Volver al portafolio
          <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <Button variant="primary" wide className="mt-3" onClick={onContact}>
          Solicitar información
        </Button>
      </nav>
    </div>
  )
}
