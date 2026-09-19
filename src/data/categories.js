export const CATEGORIES = [
  { id: 'todas', label: 'Todas' },
  { id: 'colgantes', label: 'Colgantes' },
  { id: 'sobremesa', label: 'Sobremesa' },
  { id: 'pie', label: 'Pie' },
  { id: 'apliques', label: 'Apliques' },
]

export function categoryLabel(id) {
  const found = CATEGORIES.find((c) => c.id === id)
  return found ? found.label : id
}
