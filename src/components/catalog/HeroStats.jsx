export function HeroStats({ stats }) {
  if (!stats?.length) return null

  return (
    <div role="list" className="grid grid-cols-3 pt-4 border-t border-border">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          role="listitem"
          className={['px-3 first:pl-0 last:pr-0', i > 0 ? 'border-l border-border' : ''].join(' ')}
        >
          <strong className="block font-display text-[22px] lg:text-[26px] font-medium leading-none text-ink mb-1">
            {stat.value}
          </strong>
          <span className="text-[11px] lg:text-xs text-ink-2 tracking-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
