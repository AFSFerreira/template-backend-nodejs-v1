export type DateFormat = 'dd/mm/yyyy' | 'mm/yyyy'

export function formatDate(
  date?: Date | null,
  format: DateFormat = 'dd/mm/yyyy',
) {
  if (date === null || date === undefined) return date

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  switch (format) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`
    case 'mm/yyyy':
      return `${month}/${year}`
  }
}
