import { toDateOnlyUTC } from '@utils/formatters/to-date-only'

export function getStatusFilterMap() {
  const today = toDateOnlyUTC(new Date())

  return new Map<string, Record<string, Date> | undefined>([
    ['ALL', undefined],
    ['PENDING', { gte: today }],
    ['FINISHED', { lt: today }],
  ])
}
