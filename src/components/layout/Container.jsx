/**
 * Contenedor con ancho máximo 1240px y padding responsive.
 * Usa la utilidad .container-lumbre definida en styles/utilities.css.
 */
export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  const cls = ['container-lumbre', className].filter(Boolean).join(' ')
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  )
}
