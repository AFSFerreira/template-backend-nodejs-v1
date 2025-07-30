import { z } from 'zod'

export function createZodEnum<T extends Record<string, string>>(enumLike: T) {
  const values = Object.values(enumLike) as [string, ...string[]]
  return z.enum(values)
}
