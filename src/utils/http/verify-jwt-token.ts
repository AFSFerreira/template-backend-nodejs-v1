import { env } from '@env/index'
import jwt from 'jsonwebtoken'

export function verifyTokenIsolated(token: string) {
  const decoded = jwt.verify(token, env.JWT_SECRET)

  return decoded
}
