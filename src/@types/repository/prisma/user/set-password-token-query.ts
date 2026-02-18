import type { HashedToken } from '@custom-types/services/hashes/hashed-token'

export interface SetPasswordTokenQuery {
  id: number
  tokenData: {
    recoveryPasswordTokenHash: HashedToken
    recoveryPasswordTokenExpiresAt: Date
  }
}
