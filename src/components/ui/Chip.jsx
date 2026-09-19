/**
 * Chip pequeño. Puede renderizarse como <span>, <button> o <a>.
 */
export function Chip({ as: Tag = 'span', variant = 'default', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center gap-1 rounded-chip px-2 py-0.5 text-[11px] leading-[1.45] font-medium whitespace-nowrap border'

  const variants = {
    default: 'bg-surface-2 text-ink-2 border-border',
    outline: 'bg-transparent text-ink-2 border-border',
    dashed: 'bg-transparent text-ink-2 border-border border-dashed',
    interactive: 'bg-transparent text-ink-2 border-border hover:bg-surface-2 hover:text-ink',
  }

  const cls = [base, variants[variant] || variants.default, className].filter(Boolean).join(' ')

  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}
