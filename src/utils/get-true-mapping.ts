export function getTrueMapping<T>(values: Array<{ expression: boolean; value: T }>): T | null {
  for (const { expression, value } of values) {
    if (expression) return value
  }
  return null
}
