export function truncateDate(date: Date | null): string {
  return date ? date.toISOString().split('T')[0] : ''
}
