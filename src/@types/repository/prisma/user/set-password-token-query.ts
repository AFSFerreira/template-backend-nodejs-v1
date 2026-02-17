import type { HashedToken } from '@custom-types/utils/hashes/hashed-token'

export interface SetPasswordTokenQuery {
  id: number
  tokenData: {
    recoveryPasswordTokenHash: HashedToken
    recoveryPasswordTokenExpiresAt: Date
  }
}
