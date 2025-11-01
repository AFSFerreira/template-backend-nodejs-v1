export function objectDeepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) {
    return false
  }

  const keysA = Object.keys(a as Record<string, any>)
  const keysB = Object.keys(b as Record<string, any>)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) => objectDeepEqual(a[key], b[key]))
}
