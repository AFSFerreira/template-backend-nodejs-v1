import type { HashedToken } from '@custom-types/utils/hashes/hashed-token'
import crypto from 'node:crypto'

export function hashToken(token: string): HashedToken {
  return crypto.createHash('sha256').update(token, 'utf-8').digest('hex') as HashedToken
}
