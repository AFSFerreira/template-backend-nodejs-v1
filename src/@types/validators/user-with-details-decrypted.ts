import type { UserWithDetails } from './user-with-details'

export type UserWithDetailsDecrypted = Omit<UserWithDetails, 'identityDocumentHash'> & {
  identityDocument: string
}
