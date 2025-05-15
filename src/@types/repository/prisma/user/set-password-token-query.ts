import type { HashedToken } from '@custom-types/services/hashes/hashed-token'

export interface SetPasswordTokenQuery {
  id: string
  tokenData: {
    recoveryPasswordTokenHash: HashedToken
    recoveryPasswordTokenExpiresAt: Date
  }
}
