export function Wordmark({ as: Tag = 'a', href = '#', className = '', ...rest }) {
  const cls = [
    'inline-flex items-center gap-2 font-display text-lg tracking-tight text-ink no-underline',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag href={href} className={cls} aria-label="LUMBRE, inicio" {...rest}>
      <span aria-hidden="true" className="inline-block w-[9px] h-[9px] rounded-full bg-accent" />
      LUMBRE
    </Tag>
  )
}
