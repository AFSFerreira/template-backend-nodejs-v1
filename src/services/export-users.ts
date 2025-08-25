import type { UserWithDetails } from '@custom-types/user-with-details'
import { flattenUser } from '@services/flatten-user'
import { toCsv } from '@utils/csv'

export function exportUsersAsCsv(users: UserWithDetails[]): string {
  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
