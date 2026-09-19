import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container.jsx'
import { Button } from '@/components/ui/Button.jsx'
import { Eyebrow } from '@/components/ui/Eyebrow.jsx'
import { HeroStats } from './HeroStats.jsx'
import { BUSINESS } from '@/data/business.js'
import { useContact } from '@/context/useContact.js'

export function Hero() {
  const { openContact } = useContact()

  return (
    <section className="relative overflow-hidden pt-9 pb-10 lg:pt-12 lg:pb-14">
      {/* Halos de luz ambiente (decorativos) */}
      <div
        aria-hidden="true"
        className="absolute -top-28 right-[-12%] w-[420px] h-[420px] hero-glow"
        style={{ background: 'radial-gradient(closest-side, rgba(180, 134, 60, 0.16), transparent 72%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-20 left-[-10%] w-[360px] h-[360px] hero-glow [animation-delay:1.8s]"
        style={{ background: 'radial-gradient(closest-side, rgba(34, 48, 42, 0.1), transparent 72%)' }}
      />

      <Container className="relative grid gap-7 items-end lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
        <div className="reveal" style={{ '--i': 0 }}>
          <Eyebrow withRule className="mb-3">
            {BUSINESS.tagline}
          </Eyebrow>

          <h1 className="font-display font-medium text-[clamp(32px,5.2vw,52px)] leading-[1.05] tracking-[-0.02em] text-ink max-w-[15ch] mb-4">
            Piezas de luz hechas para{' '}
            <em className="italic text-accent-ink font-normal underline decoration-accent/45 decoration-[0.045em] underline-offset-[0.14em]">
              durar
            </em>
            .
          </h1>

          <p className="text-[15px] lg:text-base text-ink-2 max-w-[52ch] mb-6">{BUSINESS.heroLede}</p>

          <div className="flex flex-wrap gap-2.5">
            <Button as="a" href="#catalogo" variant="primary">
              Explorar catálogo
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Button>
            <Button variant="ghost" onClick={() => openContact({ piece: '' })}>
              Hablar con el estudio
            </Button>
          </div>
        </div>

        <div className="reveal" style={{ '--i': 2 }}>
          <HeroStats stats={BUSINESS.stats} />
        </div>
      </Container>
    </section>
  )
}
