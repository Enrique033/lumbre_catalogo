export function Eyebrow({ as: Tag = 'p', className = '', withRule = false, children, ...rest }) {
  const cls = ['eyebrow inline-flex items-center gap-2', className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} {...rest}>
      {withRule && <span aria-hidden="true" className="inline-block w-6 h-px bg-accent" />}
      {children}
    </Tag>
  )
}
