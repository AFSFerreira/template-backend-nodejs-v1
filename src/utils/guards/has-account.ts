export function hasAccount(value: unknown): value is Record<string, unknown> & { account: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'account' in value &&
    typeof (value as Record<string, unknown>).account === 'string'
  )
}
