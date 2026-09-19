import { Chip } from '@/components/ui/Chip.jsx'

export function TagList({ tags = [] }) {
  if (!tags.length) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Chip key={tag}>{tag}</Chip>
      ))}
    </div>
  )
}
