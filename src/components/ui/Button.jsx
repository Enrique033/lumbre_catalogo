const VARIANTS = {
  primary:
    'bg-brand text-bg border border-brand shadow-[0_1px_2px_rgba(28,25,23,0.14)] hover:bg-brand-hover hover:border-brand-hover hover:shadow-[0_6px_16px_-8px_rgba(34,48,42,0.55)]',
  ghost:
    'bg-surface/70 text-ink border border-border-strong hover:bg-surface-2 hover:border-ink-3/50',
  quiet:
    'bg-transparent text-ink-2 border border-transparent hover:bg-surface-2 hover:text-ink',
  whatsapp:
    'bg-[#25d366] text-white border border-[#25d366] shadow-[0_1px_2px_rgba(18,140,69,0.35)] hover:bg-[#1fc45c] hover:border-[#1fc45c] hover:shadow-[0_6px_16px_-8px_rgba(18,140,69,0.6)]',
}

const SIZES = {
  md: 'min-h-9 px-3.5 py-1.5 text-[13.5px]',
  sm: 'min-h-8 px-2.5 py-1 text-xs',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  wide = false,
  className = '',
  type,
  children,
  ...rest
}) {
  const isButton = Tag === 'button'
  const cls = [
    'inline-flex items-center justify-center gap-2 rounded-btn font-medium leading-none',
    'transition-colors duration-200 ease-quart cursor-pointer whitespace-nowrap',
    'active:translate-y-px disabled:opacity-60 disabled:pointer-events-none',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    wide ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={cls} {...(isButton ? { type: type || 'button' } : {})} {...rest}>
      {children}
    </Tag>
  )
}
