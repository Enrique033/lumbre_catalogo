const LINKS = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#estudio', label: 'Estudio' },
  { href: '#contacto', label: 'Contacto' },
]

export function HeaderNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="hidden lg:flex items-center gap-6 ml-2 text-sm text-ink-2"
    >
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={[
            'relative no-underline transition-colors duration-150 ease-quart hover:text-ink',
            'after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-[1.5px]',
            'after:rounded-full after:bg-accent after:origin-left after:scale-x-0',
            'after:transition-transform after:duration-200 after:ease-quart',
            'hover:after:scale-x-100 motion-reduce:after:transition-none',
          ].join(' ')}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
