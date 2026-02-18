interface PrismaDataArgs {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function hasPrismaDataArgs(value: unknown): value is PrismaDataArgs {
  return typeof value === 'object' && value !== null && 'data' in value
}
