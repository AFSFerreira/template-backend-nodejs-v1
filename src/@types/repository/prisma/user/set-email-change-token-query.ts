import type { HashedToken } from '@custom-types/services/hashes/hashed-token'

export interface SetEmailChangeTokenQuery {
  id: number
  newEmail: string
  emailVerificationTokenHash: HashedToken
  emailVerificationTokenExpiresAt: Date
}
