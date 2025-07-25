import type { UserWithDetails } from '@/@types/complete-user-information'
import { toCsv } from '@/utils/csv'
import { flattenUser } from '@/utils/flatten-user'

export function exportUsersAsCsv(users: UserWithDetails[]): string {
  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
