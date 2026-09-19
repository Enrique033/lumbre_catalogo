import { forwardRef, useImperativeHandle, useRef } from 'react'
import { X } from 'lucide-react'
import { useDialog } from '@/hooks/useDialog.js'
import { IconButton } from './IconButton.jsx'

/**
 * Wrapper de <dialog> nativo con:
 *  - apertura/cierre mediante ref imperativo (open/close)
 *  - gestión de foco y scroll-lock vía useDialog
 *  - cierre por ESC, botón X, o clic en backdrop (los dos últimos ya en useDialog)
 *  - panel con radios, sombra y animación de entrada
 *
 * Uso:
 *   const ref = useRef()
 *   <Dialog ref={ref} aria-labelledby="x-title">...</Dialog>
 *   ref.current.open()
 *   ref.current.close()
 *
 * @param {object} props
 * @param {string} [props.className]  - clases del <dialog> (controla el ancho máximo)
 * @param {string} [props.panelClassName] - clases del panel interior
 * @param {boolean} [props.hideClose] - oculta el botón de cierre
 * @param {React.ReactNode} props.children
 */
export const Dialog = forwardRef(function Dialog(
  { className = '', panelClassName = '', hideClose = false, children, ...rest },
  externalRef,
) {
  const { ref: dialogRef, open, close } = useDialog()
  const panelRef = useRef(null)

  useImperativeHandle(externalRef, () => ({
    open,
    close,
    get element() {
      return dialogRef.current
    },
  }))

  return (
    <dialog
      ref={dialogRef}
      className={[
        'p-0 border-0 bg-transparent max-w-none max-h-none',
        // Tailwind Preflight anula los márgenes del UA-stylesheet del
        // <dialog>; este centrado explícito evita que abra en la esquina.
        'fixed inset-0 m-auto h-fit',
        'backdrop:bg-ink/46 backdrop:backdrop-blur-[3px] backdrop:animate-[fade-in_220ms_var(--ease-quart)]',
        'open:animate-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div
        ref={panelRef}
        className={[
          'relative flex flex-col overflow-hidden',
          'bg-surface rounded-modal shadow-modal',
          'max-h-[92vh]',
          'animate-[dialog-in_220ms_var(--ease-quart)]',
          'motion-reduce:animate-none',
          panelClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {!hideClose && (
          <IconButton
            data-close-dialog
            aria-label="Cerrar"
            onClick={close}
            className={[
              'absolute top-3.5 right-3.5 z-10',
              'bg-white/92 backdrop-blur-[4px]',
              'transition-transform duration-200 ease-quart',
              'hover:rotate-90 motion-reduce:hover:rotate-0',
            ].join(' ')}
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </IconButton>
        )}

        {children}
      </div>
    </dialog>
  )
})
