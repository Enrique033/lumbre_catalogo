export function IconButton({
  as: Tag = 'button',
  className = '',
  type,
  'aria-label': ariaLabel,
  children,
  ...rest
}) {
  const isButton = Tag === 'button'
  const cls = [
    'inline-grid place-items-center rounded-full text-ink',
    'w-9 h-9 border border-border bg-surface',
    'transition-colors duration-150 ease-quart',
    'hover:bg-surface-2',
    'disabled:opacity-60 disabled:pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={cls}
      aria-label={ariaLabel}
      {...(isButton ? { type: type || 'button' } : {})}
      {...rest}
    >
      {children}
    </Tag>
  )
}
