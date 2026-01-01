import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import { flattenUser } from '@services/transformers/flatten-user'
import { toCsv } from '@utils/formatters/csv'

export function exportUsersAsCsv(users: UserWithDetails[]): string {
  const flattened = users.map(flattenUser)
  return toCsv(flattened)
}
