import { Chip } from '@/components/ui/Chip.jsx'

export function CardTags({ tags = [], max = 3 }) {
  if (!tags.length) return null

  const visible = tags.slice(0, max)
  const extra = tags.length - visible.length

  return (
    <ul className="flex flex-wrap gap-1.5 mt-1.5" aria-label="Etiquetas">
      {visible.map((tag) => (
        <li key={tag}>
          <Chip>{tag}</Chip>
        </li>
      ))}
      {extra > 0 && (
        <li>
          <Chip variant="dashed">+{extra}</Chip>
        </li>
      )}
    </ul>
  )
}
