interface IdentityDocumentSetField {
  identityDocument: { set: string }
}

export function hasIdentityDocumentSet(value: unknown): value is Record<string, unknown> & IdentityDocumentSetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('identityDocument' in value)) return false

  const field = (value as Record<string, unknown>).identityDocument

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
