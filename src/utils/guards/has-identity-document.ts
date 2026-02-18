export function hasIdentityDocument(value: unknown): value is Record<string, unknown> & { identityDocument: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'identityDocument' in value &&
    typeof (value as Record<string, unknown>).identityDocument === 'string'
  )
}
