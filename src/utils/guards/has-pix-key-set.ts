import type { PixKeySetField } from '@custom-types/utils/guards/pix-key-set-field'

export function hasPixKeySet(value: unknown): value is Record<string, unknown> & PixKeySetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('pixKey' in value)) return false

  const field = (value as Record<string, unknown>).pixKey

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
