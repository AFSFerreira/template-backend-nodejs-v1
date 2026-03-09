import type { PrismaUpsertArgs } from '@custom-types/utils/guards/prisma-upsert-args'

export function hasPrismaUpsertArgs(value: unknown): value is PrismaUpsertArgs {
  return typeof value === 'object' && value !== null && 'create' in value && 'update' in value
}
