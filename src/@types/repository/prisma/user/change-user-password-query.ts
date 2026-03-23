import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'

export interface ChangeUserPasswordQuery {
  id: string
  passwordHash: HashedPassword
}
