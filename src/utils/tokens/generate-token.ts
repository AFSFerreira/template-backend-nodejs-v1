import crypto from 'node:crypto'

export function generateToken(bytesNumber: number) {
  return crypto.randomBytes(bytesNumber).toString('hex')
}
