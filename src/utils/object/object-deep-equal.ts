import type { UnknownRecord } from '@custom-types/utils/object/unknown-record'

export function objectDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) {
    return false
  }

  const keysA = Object.keys(a as UnknownRecord)
  const keysB = Object.keys(b as UnknownRecord)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) => objectDeepEqual((a as UnknownRecord)[key], (b as UnknownRecord)[key]))
}
