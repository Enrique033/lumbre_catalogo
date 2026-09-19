import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from './Container.jsx'
import { HeaderNav } from './HeaderNav.jsx'
import { MobileNav } from './MobileNav.jsx'
import { Wordmark } from '@/components/ui/Wordmark.jsx'
import { Button } from '@/components/ui/Button.jsx'
import { IconButton } from '@/components/ui/IconButton.jsx'
import { CartButton } from '@/components/cart/CartButton.jsx'
import { useScrollState } from '@/hooks/useScrollState.js'
import { useMediaQuery } from '@/hooks/useMediaQuery.js'
import { useContact } from '@/context/useContact.js'
import { BUSINESS } from '@/data/business.js'

export function Header() {
  const isScrolled = useScrollState(8)
  const { openContact } = useContact()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [menuOpen, setMenuOpen] = useState(false)

  // Al pasar a escritorio cerramos el menú móvil
  useEffect(() => {
    if (isDesktop) setMenuOpen(false)
  }, [isDesktop])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b',
        'transition-[background-color,border-color,box-shadow] duration-200 ease-quart',
        isScrolled || menuOpen
          ? 'glass border-border shadow-[0_1px_2px_rgba(28,25,23,0.05)]'
          : 'bg-bg border-transparent',
      ].join(' ')}
    >
      <Container className="flex items-center gap-5 h-14 lg:h-[60px]">
        <Wordmark href="#" />

        <HeaderNav />

        <div className="ml-auto flex items-center gap-2">
          <a
            href={BUSINESS.portfolioHref}
            rel="noopener"
            className="hidden xl:inline-flex items-center gap-1.5 text-[13px] text-ink-2 no-underline transition-colors duration-150 hover:text-ink"
          >
            Volver al portafolio
          </a>

          <Button
            variant="primary"
            className="hidden sm:inline-flex"
            onClick={() => openContact({ piece: '' })}
          >
            Solicitar información
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="sm:hidden"
            onClick={() => openContact({ piece: '' })}
          >
            Contacto
          </Button>

          <CartButton />

          <IconButton
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Menu size={18} strokeWidth={1.8} aria-hidden="true" />
            )}
          </IconButton>
        </div>
      </Container>

      <MobileNav
        id="mobile-nav"
        open={menuOpen}
        onClose={closeMenu}
        onContact={() => {
          closeMenu()
          openContact({ piece: '' })
        }}
      />
    </header>
  )
}
