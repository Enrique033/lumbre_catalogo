/**
 * Contenido accesible solo para lectores de pantalla.
 * Equivalente a la utilidad .sr-only de Tailwind, pero como componente.
 */
export function VisuallyHidden({ as: Tag = 'span', className = '', children, ...rest }) {
  const cls = ['sr-only', className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}
