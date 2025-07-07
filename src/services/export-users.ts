import type { CompleteUserInformation } from '@/@types/complete-user-information'
import { toCsv } from '@/utils/csv'
import { flattenUser } from '@/utils/flatten-user'

export function exportUsersAsCsv(users: CompleteUserInformation[]): string {
  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
