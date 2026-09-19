import { useEffect, useRef } from 'react'
import { ContactProvider } from '@/context/ContactContext.jsx'
import { CartProvider } from '@/context/CartContext.jsx'
import { SkipLink } from '@/components/layout/SkipLink.jsx'
import { Header } from '@/components/layout/Header.jsx'
import { Footer } from '@/components/layout/Footer.jsx'
import { Container } from '@/components/layout/Container.jsx'
import { Hero } from '@/components/catalog/Hero.jsx'
import { ControlBar } from '@/components/catalog/ControlBar.jsx'
import { ResultsBar } from '@/components/catalog/ResultsBar.jsx'
import { CatalogGrid } from '@/components/catalog/CatalogGrid.jsx'
import { LoadMore } from '@/components/catalog/LoadMore.jsx'
import { QuickViewDialog } from '@/components/product/QuickViewDialog.jsx'
import { ContactDialog } from '@/components/contact/ContactDialog.jsx'
import { CartDialog } from '@/components/cart/CartDialog.jsx'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab.jsx'
import { LightSwitch } from '@/components/layout/LightSwitch.jsx'

import { ContactSection } from '@/components/contact/ContactSection.jsx'
import { useCatalog } from '@/hooks/useCatalog.js'
import { useHashRoute } from '@/hooks/useHashRoute.js'
import { getPieceBySlug } from '@/data/catalog.js'

function CatalogExperience() {
  const quickViewRef = useRef(null)
  const { slug, openPiece, closePiece } = useHashRoute()

  const {
    query,
    category,
    sort,
    visibleItems,
    total,
    shown,
    hasMore,
    remaining,
    hasFilters,
    setQuery,
    setCategory,
    setSort,
    loadMore,
    clearFilters,
  } = useCatalog()

  // Deep link: hash → quick view
  useEffect(() => {
    if (slug) {
      const piece = getPieceBySlug(slug)
      if (piece) {
        quickViewRef.current?.open(piece)
      } else {
        // Slug inexistente → limpiamos el hash
        closePiece()
      }
    } else {
      quickViewRef.current?.close()
    }
  }, [slug, closePiece])

  // Clic en una card → abre quick view + actualiza hash
  const handleOpenPiece = (pieceSlug) => {
    openPiece(pieceSlug)
  }

  // Binding de los enlaces de categoría del footer (data-cat)
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('[data-cat]')
      if (!link) return
      const nextCat = link.dataset.cat
      if (!nextCat) return
      e.preventDefault()
      setCategory(nextCat)
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [setCategory])

  return (
    <>
      <SkipLink />

      <Header />

      <main id="main">
        <Hero />

        <section id="catalogo" aria-labelledby="catalogo-title">
          <h2 id="catalogo-title" className="sr-only">
            Catálogo de piezas
          </h2>

          <ControlBar
            query={query}
            onQueryChange={setQuery}
            onQueryClear={clearFilters}
            category={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />

          <Container>
            <ResultsBar
              total={total}
              shown={shown}
              category={category}
              query={query}
              hasFilters={hasFilters}
              onClear={clearFilters}
              onRemoveCategory={setCategory}
              onRemoveQuery={setQuery}
            />

            <CatalogGrid
              items={visibleItems}
              query={query}
              category={category}
              onOpen={handleOpenPiece}
              onCategoryChange={setCategory}
              onClear={clearFilters}
            />

            <LoadMore
              total={total}
              shown={shown}
              remaining={remaining}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </Container>
        </section>

        <ContactSection />
      </main>

      <Footer />

      <QuickViewDialog ref={quickViewRef} onClose={closePiece} />
      <ContactDialog />
      <CartDialog />
      <WhatsAppFab />
      <LightSwitch />

    </>
  )
}

export default function App() {
  return (
    <ContactProvider>
      <CartProvider>
        <CatalogExperience />
      </CartProvider>
    </ContactProvider>
  )
}
