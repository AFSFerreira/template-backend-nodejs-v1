/**
 * Trunca uma data para a parte de data ISO (`YYYY-MM-DD`), removendo o componente de tempo.
 *
 * @param date - Data a ser truncada, ou `null`.
 * @returns String no formato `YYYY-MM-DD`, ou string vazia se a data for `null`.
 *
 * @example
 * truncateDate(new Date('2026-03-08T15:30:00Z')) // '2026-03-08'
 * truncateDate(null)                              // ''
 */
export function truncateDate(date: Date | null): string {
  return date ? date.toISOString().split('T')[0] : ''
}
