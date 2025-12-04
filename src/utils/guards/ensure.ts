import type { IEnsure } from '@custom-types/utils/guards/ensure'

export function ensureExists<S>({ value, error }: IEnsure<S>) {
  if (value !== null && value !== undefined) return value
  throw error
}

export function ensureNotExists<S>({ value, error }: IEnsure<S>) {
  if (value === null || value === undefined) return value
  throw error
}
