export function Hairline({ className = '' }) {
  return <hr className={['hairline', className].filter(Boolean).join(' ')} aria-hidden="true" />
}
