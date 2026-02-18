import type { HashedPassword } from './hashed-password'

export interface IComparePassword {
  password: string
  hashedPassword: HashedPassword | string
}
