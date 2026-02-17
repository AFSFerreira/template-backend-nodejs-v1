import type { HashedPassword } from '@custom-types/utils/hashes/hashed-password'
import { env } from '@env/index'
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<HashedPassword> {
  const hash = await bcrypt.hash(password, env.HASH_SALT_ROUNDS)

  return hash as HashedPassword
}
