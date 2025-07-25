import type { UserWithDetails } from '@/@types/user-with-details'
import { toCsv } from '@/utils/csv'
import { flattenUser } from '@/utils/flatten-user'

export function exportUsersAsCsv(users: UserWithDetails[]): string {
  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
