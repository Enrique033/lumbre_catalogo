import { Mail, Phone, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container.jsx'
import { Button } from '@/components/ui/Button.jsx'
import { Eyebrow } from '@/components/ui/Eyebrow.jsx'
import { useContact } from '@/context/useContact.js'
import { BUSINESS } from '@/data/business.js'

export function ContactSection() {
  const { openContact } = useContact()

  return (
    <section id="contacto" className="border-t border-border mt-14 pt-12 pb-14">
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 lg:items-center">
        <div>
          <Eyebrow>Estudio</Eyebrow>

          <h2 className="font-display text-[clamp(24px,3vw,32px)] font-medium leading-[1.15] tracking-[-0.02em] mt-3 mb-3.5 max-w-[20ch]">
            ¿Buscas una pieza concreta para un proyecto?
          </h2>

          <p className="text-[15px] text-ink-2 max-w-[48ch]">
            Trabajamos con interioristas, arquitectos y particulares. Cuéntanos el espacio y te
            proponemos una selección o adaptamos una pieza del catálogo.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3 mt-5 text-sm text-ink-2">
            <a
              href={`mailto:${BUSINESS.contact.email}`}
              className="inline-flex items-center gap-2 no-underline transition-colors duration-150 hover:text-accent-ink"
            >
              <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
              {BUSINESS.contact.email}
            </a>

            <a
              href={BUSINESS.contact.phoneHref}
              className="inline-flex items-center gap-2 no-underline transition-colors duration-150 hover:text-accent-ink"
            >
              <Phone size={15} strokeWidth={1.7} aria-hidden="true" />
              {BUSINESS.contact.phone}
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface border border-border rounded-card p-6 shadow-base">
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-12 w-52 h-52 hero-glow"
            style={{ background: 'radial-gradient(closest-side, rgba(180, 134, 60, 0.14), transparent 72%)' }}
          />

          <div className="relative">
            <h3 className="font-display text-lg font-medium mb-1">Solicitar información</h3>
            <p className="text-[13px] text-ink-2 mb-4">
              Respuesta en 24 h laborables. Sin compromiso.
            </p>

            <Button variant="primary" wide onClick={() => openContact({ piece: '' })}>
              Abrir formulario
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
