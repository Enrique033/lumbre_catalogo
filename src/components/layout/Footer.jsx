import { Instagram, Linkedin } from 'lucide-react'
import { Container } from './Container.jsx'
import { Wordmark } from '@/components/ui/Wordmark.jsx'
import { CATEGORIES } from '@/data/categories.js'
import { BUSINESS } from '@/data/business.js'

const NAV_LINKS = [
  { href: '#estudio', label: 'Sobre LUMBRE' },
  { href: '#contacto', label: 'Contacto' },
]

/**
 * SVG de marca para Pinterest (Lucide no lo incluye).
 */
function PinterestIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.62 2 3.4 5.66 3.4 9.72c0 1.87 1 4.2 2.6 4.94.24.11.37.06.43-.17l.35-1.36a.38.38 0 0 0-.09-.37c-.54-.65-.97-1.84-.97-2.95 0-2.85 2.16-5.6 5.84-5.6 3.18 0 5.4 2.16 5.4 5.26 0 3.5-1.76 5.93-4.06 5.93-1.26 0-2.21-1.05-1.9-2.34.36-1.53 1.07-3.18 1.07-4.28 0-.99-.53-1.81-1.62-1.81-1.28 0-2.31 1.33-2.31 3.1 0 1.13.38 1.9.38 1.9l-1.54 6.53c-.26 1.1-.04 2.78-.02 2.93.01.09.12.11.17.04.07-.09 1.9-2.35 2.25-3.7l.87-3.34c.44.84 1.72 1.54 3.08 1.54 4.06 0 6.81-3.7 6.81-8.66C20.97 5.24 17.06 2 12.04 2Z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  Instagram: Instagram,
  Pinterest: PinterestIcon,
  LinkedIn: Linkedin,
}

export function Footer() {
  const year = new Date().getFullYear()

  // Excluimos "todas" del listado de categorías en el footer
  const categoryLinks = CATEGORIES.filter((c) => c.id !== 'todas')

  return (
    <footer className="border-t border-border py-8 pb-10 text-[13px] text-ink-2">
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-9">
          <div>
            <Wordmark href="#" className="mb-3" />
            <p className="max-w-[34ch] leading-relaxed">
              Estudio de iluminación de autor. Piezas fabricadas en pequeños lotes en nuestro taller
              de Valencia.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3 mb-3">
              Catálogo
            </h4>
            <ul className="flex flex-col gap-2">
              {categoryLinks.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#catalogo"
                    data-cat={cat.id}
                    className="no-underline transition-colors duration-150 hover:text-accent-ink"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3 mb-3">
              Estudio
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="no-underline transition-colors duration-150 hover:text-accent-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink-3 mb-3">
              Síguenos
            </h4>
            <div className="flex items-center gap-2">
              {BUSINESS.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={[
                      'grid place-items-center w-8 h-8 rounded-full',
                      'border border-border text-ink-2',
                      'transition-colors duration-150 ease-quart',
                      'hover:border-accent-ink hover:text-accent-ink hover:bg-accent-soft',
                    ].join(' ')}
                  >
                    {Icon ? <Icon size={15} /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-xs text-ink-3">
          <span>© {year} LUMBRE. Todos los derechos reservados.</span>
        </div>
      </Container>
    </footer>
  )
}
