interface PrismaUpsertArgs {
  create: Record<string, unknown>
  update: Record<string, unknown>
}

export function hasPrismaUpsertArgs(value: unknown): value is PrismaUpsertArgs {
  return typeof value === 'object' && value !== null && 'create' in value && 'update' in value
}
