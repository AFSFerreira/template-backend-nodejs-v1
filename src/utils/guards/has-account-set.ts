import type { AccountSetField } from '@custom-types/utils/guards/account-set-field'

export function hasAccountSet(value: unknown): value is Record<string, unknown> & AccountSetField {
  if (typeof value !== 'object' || value === null) return false
  if (!('account' in value)) return false

  const field = (value as Record<string, unknown>).account

  return (
    typeof field === 'object' &&
    field !== null &&
    'set' in field &&
    typeof (field as Record<string, unknown>).set === 'string'
  )
}
