import type { IComparePassword } from '@custom-types/services/hashes/compare-password'
import type { FileHash } from '@custom-types/services/hashes/file-hash'
import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { Token } from '@custom-types/services/hashes/token'
import crypto from 'node:crypto'
import { env } from '@env/index'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export class HashService {
  static hashToken(input: string): HashedToken {
    return crypto.createHash('sha256').update(input, 'utf-8').digest('hex') as HashedToken
  }

  static generateBlindIndex(input: string): HashedToken {
    const secret = Buffer.from(env.BLIND_INDEX_SECRET, 'hex')

    return crypto.createHmac('sha256', secret).update(input).digest('hex') as HashedToken
  }

  static async hashPassword(password: string): Promise<HashedPassword> {
    const hash = await bcrypt.hash(password, env.HASH_SALT_ROUNDS)

    return hash as HashedPassword
  }

  static generateToken(bytesNumber: number): Token {
    return crypto.randomBytes(bytesNumber).toString('hex') as Token
  }

  static generateFileHash(): FileHash {
    return uuidv4() as FileHash
  }

  static async comparePassword({ password, hashedPassword }: IComparePassword): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
