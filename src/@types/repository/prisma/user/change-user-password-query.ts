import type { HashedPassword } from '@custom-types/utils/hashes/hashed-password'

export interface ChangeUserPasswordQuery {
  id: number
  passwordHash: HashedPassword
}
