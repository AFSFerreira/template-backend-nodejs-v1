interface IEnsure<T> {
  value: T
  error: Error
}

export function ensureExists<S>({ value, error }: IEnsure<S>) {
  if (value === null || value === undefined) throw error
  return value
}

export function ensureNotExists<S>({ value, error }: IEnsure<S>) {
  if (value !== null || value !== undefined) throw error
  return value
}
