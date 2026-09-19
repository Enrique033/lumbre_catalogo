import { useId } from 'react'

/**
 * Campo de formulario accesible.
 *
 * - label real asociado por id
 * - aria-describedby apuntando al mensaje de error
 * - aria-invalid cuando hay error
 * - data-invalid para estilarlo desde CSS/Tailwind
 *
 * @param {object} props
 * @param {'input'|'textarea'} [props.as='input']
 * @param {string} props.label
 * @param {string} [props.error]
 * @param {string} [props.className]
 * @param {object} [props.inputProps]
 */
export function Field({
  as = 'input',
  label,
  error = '',
  className = '',
  inputProps = {},
  ...rest
}) {
  const reactId = useId()
  const inputId = inputProps.id || `field-${reactId}`
  const errorId = `${inputId}-error`
  const hasError = Boolean(error)

  const Tag = as === 'textarea' ? 'textarea' : 'input'

  const baseInput = [
    'w-full text-sm text-ink bg-surface',
    'border border-border rounded-btn px-3.5 py-2.5',
    'transition-colors duration-200 ease-quart',
    'placeholder:text-ink-3',
    'hover:border-border-strong',
    'focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-brand/12',
  ].join(' ')

  const invalidInput = hasError ? 'border-danger focus:border-danger focus:ring-danger/12' : ''

  const textareaExtras = as === 'textarea' ? 'min-h-24 resize-y font-sans' : ''

  return (
    <div
      data-field
      data-invalid={hasError ? 'true' : undefined}
      className={['flex flex-col gap-1.5 mb-3.5', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <label htmlFor={inputId} className="text-xs font-medium text-ink tracking-tight">
        {label}
      </label>

      <Tag
        id={inputId}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={[baseInput, invalidInput, textareaExtras].filter(Boolean).join(' ')}
        {...inputProps}
      />

      <p
        id={errorId}
        aria-live="polite"
        className={[
          'text-xs text-danger min-h-0 transition-[min-height] duration-150',
          hasError ? 'min-h-[14px]' : '',
        ].join(' ')}
      >
        {error || ''}
      </p>
    </div>
  )
}
