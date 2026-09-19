import { useLayoutEffect, useState } from 'react'

const STORAGE_KEY = 'lumbre:showroom'

/**
 * MODO SHOWROOM
 * Interruptor de luz físico (como los de pared) en la esquina
 * inferior izquierda. Al apagarlo, el sitio entero baja a una
 * penumbra cálida de "showroom al anochecer": overlay ámbar con
 * viñeteado y los halos hero-glow brillando por contraste.
 *
 * El estado persiste en localStorage y el balancín queda
 * retroiluminado cuando las luces están apagadas.
 */
export function LightSwitch() {
  const [dusk, setDusk] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  // useLayoutEffect evita el destello antes del primer pintado
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('showroom-dusk', dusk)
    try {
      localStorage.setItem(STORAGE_KEY, dusk ? '1' : '0')
    } catch {
      /* almacenamiento no disponible */
    }
  }, [dusk])

  return (
    <>
      {/* Penumbra cálida: tinte ámbar + viñeteado. pointer-events
          none para no bloquear la interacción, y por debajo de la
          capa superior de los <dialog> nativos. */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none fixed inset-0 z-[150]',
          'transition-opacity duration-700 ease-smooth motion-reduce:transition-none',
          dusk ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{
          background: [
            'radial-gradient(120% 90% at 50% 8%, transparent 38%, rgba(28, 25, 23, 0.3) 100%)',
            'linear-gradient(rgba(180, 134, 60, 0.1), rgba(34, 48, 42, 0.16))',
          ].join(', '),
        }}
      />

      {/* Interruptor físico */}
      <button
        type="button"
        onClick={() => setDusk((d) => !d)}
        aria-pressed={dusk}
        aria-label={dusk ? 'Encender las luces del sitio' : 'Modo showroom: apagar las luces'}
        className={[
          'group fixed bottom-4 left-4 z-[160] lg:bottom-6 lg:left-6',
          'flex flex-col items-center gap-1.5 outline-none',
        ].join(' ')}
      >
        {/* Tooltip (solo escritorio) */}
        <span
          aria-hidden="true"
          className={[
            'hidden lg:block whitespace-nowrap pointer-events-none',
            'bg-ink text-bg text-[12px] font-medium px-3 py-1.5 rounded-chip',
            'shadow-[0_8px_24px_-8px_rgba(28,25,23,0.4)]',
            'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
            'group-focus-visible:opacity-100 group-focus-visible:translate-x-0',
            'transition-[opacity,transform] duration-200 ease-quart motion-reduce:transition-none',
          ].join(' ')}
        >
          {dusk ? 'Encender la luz' : 'Modo showroom · Anochecer'}
        </span>

        {/* Placa + balancín */}
        <span
          className={[
            'relative grid place-items-center w-11 h-[68px] rounded-[12px]',
            'bg-surface border border-border-strong',
            'transition-shadow duration-500 ease-smooth motion-reduce:transition-none',
            dusk
              ? // Retroiluminado en la oscuridad
                'shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_26px_4px_rgba(180,134,60,0.32),0_14px_34px_-14px_rgba(28,25,23,0.5)]'
              : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_-14px_rgba(28,25,23,0.4)]',
          ].join(' ')}
        >
          {/* LED indicador: encendido cuando la luz está activa */}
          <span
            className={[
              'absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full',
              'transition-[background-color,box-shadow] duration-300 ease-quart motion-reduce:transition-none',
              dusk
                ? 'bg-ink-3'
                : 'bg-accent shadow-[0_0_8px_2px_rgba(180,134,60,0.65)]',
            ].join(' ')}
          />

          {/* Balancín: arriba = encendido, abajo = apagado */}
          <span
            className={[
              'relative w-[26px] h-[38px] rounded-[6px] border',
              'transition-[transform,background-color,border-color] duration-300 ease-quart',
              'motion-reduce:transition-none',
              dusk
                ? 'translate-y-[7px] bg-surface-2 border-border-strong'
                : '-translate-y-[3px] bg-brand border-brand-hover',
            ].join(' ')}
          >
            {/* Franja latón de marca */}
            <span className="absolute bottom-1.5 inset-x-1.5 h-[3px] rounded-full bg-accent" />
          </span>
        </span>

        {/* Etiqueta bajo el interruptor */}
        <span
          className={[
            'text-[10px] font-semibold tracking-[0.12em] uppercase',
            'transition-colors duration-300 ease-quart',
            dusk ? 'text-accent-ink' : 'text-ink-3',
          ].join(' ')}
        >
          Luz
        </span>
      </button>
    </>
  )
}
