import type { IComparePassword } from '@custom-types/services/hashes/compare-password'
import type { FileHash } from '@custom-types/services/hashes/file-hash'
import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { JobHash } from '@custom-types/services/hashes/job-hash'
import type { Token } from '@custom-types/services/hashes/token'
import type { UuidHash } from '@custom-types/services/hashes/uuid-hash'
import type { Options as ArgonOptions } from 'argon2'
import crypto from 'node:crypto'
import { env } from '@env/index'
import { argon2id, hash as argonHash, needsRehash, verify } from 'argon2'
import { v4 as uuidv4 } from 'uuid'

export class HashService {
  private static readonly argonConfig = {
    type: argon2id,
    memoryCost: env.ARGON_MEMORY_COST,
    timeCost: env.ARGON_TIME_COST,
    parallelism: env.ARGON_PARALLELISM,
    secret: Buffer.from(env.ARGON_SECRET),
  } satisfies ArgonOptions

  private static cachedDummyHash: string | null = null

  static hashToken(input: string): HashedToken {
    return crypto.hash('sha256', input) as HashedToken
  }

  static generateBlindIndex(input: string): HashedToken {
    const secret = Buffer.from(env.BLIND_INDEX_SECRET, 'base64')
    return crypto.createHmac('sha256', secret).update(input).digest('hex') as HashedToken
  }

  static async hashPassword(password: string): Promise<HashedPassword> {
    const hash = await argonHash(password, HashService.argonConfig)
    return hash as HashedPassword
  }

  static async comparePassword({ password, hashedPassword }: IComparePassword): Promise<boolean> {
    return await verify(hashedPassword, password, { secret: HashService.argonConfig.secret })
  }

  static generateToken(bytesNumber: number): Token {
    return crypto.randomBytes(bytesNumber).toString('hex') as Token
  }

  static generateFileId(): FileHash {
    return uuidv4() as FileHash
  }

  static generateJobId(): JobHash {
    return uuidv4() as JobHash
  }

  static generateUuid(): UuidHash {
    return uuidv4() as UuidHash
  }

  static needsUpgrade(hash: string): boolean {
    return needsRehash(hash, HashService.argonConfig)
  }

  static async getDummyHash(): Promise<string> {
    if (!HashService.cachedDummyHash) {
      HashService.cachedDummyHash = await argonHash('dummy_password_for_timing_attacks', HashService.argonConfig)
    }

    return HashService.cachedDummyHash
  }
}
