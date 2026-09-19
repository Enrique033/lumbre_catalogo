export function SpecList({ specs = {} }) {
  const entries = Object.entries(specs)
  if (!entries.length) return null

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4.5 gap-y-2 text-[13px]">
      {entries.flatMap(([key, value]) => [
        <dt key={`${key}-k`} className="text-ink-3">
          {key}
        </dt>,
        <dd key={`${key}-v`} className="m-0 text-ink">
          {value}
        </dd>,
      ])}
    </dl>
  )
}
