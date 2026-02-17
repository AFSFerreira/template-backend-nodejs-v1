import type { Token } from '@custom-types/utils/hashes/token'
import crypto from 'node:crypto'

export function generateToken(bytesNumber: number): Token {
  return crypto.randomBytes(bytesNumber).toString('hex') as Token
}
