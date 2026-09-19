/**
 * Enlace de accesibilidad para saltar directamente al catálogo.
 * Visible solo al recibir foco por teclado.
 */
export function SkipLink({ href = '#catalogo', children = 'Saltar al catálogo' }) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  )
}
