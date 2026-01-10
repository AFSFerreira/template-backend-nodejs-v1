export function getStatusFilterMap() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return new Map<string, Record<string, Date> | undefined>([
    ['ALL', undefined],
    ['PENDING', { gte: today }],
    ['FINISHED', { lt: today }],
  ])
}
