export function hasPixKey(value: unknown): value is Record<string, unknown> & { pixKey: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'pixKey' in value &&
    typeof (value as Record<string, unknown>).pixKey === 'string'
  )
}
