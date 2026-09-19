import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon.jsx'
import { buildGeneralMessage, buildWhatsAppUrl } from '@/lib/whatsapp.js'

/**
 * Botón flotante clásico de WhatsApp: círculo verde fijo en la
 * esquina inferior derecha con tooltip en escritorio. Abre el chat
 * de wa.me con un mensaje de saludo precargado.
 */
export function WhatsAppFab() {
  return (
    <a
      href={buildWhatsAppUrl(buildGeneralMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className={[
        'group fixed bottom-4 right-4 z-40 lg:bottom-6 lg:right-6',
        'inline-flex items-center gap-2.5 no-underline outline-none',
      ].join(' ')}
    >
      {/* Tooltip (solo escritorio) */}
      <span
        aria-hidden="true"
        className={[
          'hidden lg:block whitespace-nowrap pointer-events-none',
          'bg-ink text-bg text-[13px] font-medium px-3 py-1.5 rounded-chip',
          'shadow-[0_8px_24px_-8px_rgba(28,25,23,0.4)]',
          'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
          'group-focus-visible:opacity-100 group-focus-visible:translate-x-0',
          'transition-[opacity,transform] duration-200 ease-quart motion-reduce:transition-none',
        ].join(' ')}
      >
        ¿Hablamos?
      </span>

      {/* Burbuja verde */}
      <span
        className={[
          'relative grid place-items-center w-12 h-12 lg:w-[54px] lg:h-[54px] rounded-full',
          'bg-[#25d366] text-white border border-[#1eb85c]',
          'shadow-[0_10px_30px_-8px_rgba(18,140,66,0.55)]',
          'transition-transform duration-200 ease-quart',
          'group-hover:scale-105 group-active:scale-95 motion-reduce:group-hover:scale-100',
        ].join(' ')}
      >
        <WhatsAppIcon size={26} />
      </span>
    </a>
  )
}
