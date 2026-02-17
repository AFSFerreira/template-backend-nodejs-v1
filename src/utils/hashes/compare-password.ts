import type { IComparePassword } from '@custom-types/utils/hashes/compare-password'
import bcrypt from 'bcryptjs'

export async function comparePassword({ password, hashedPassword }: IComparePassword): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
