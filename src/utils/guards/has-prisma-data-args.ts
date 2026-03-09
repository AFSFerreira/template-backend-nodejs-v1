import type { PrismaDataArgs } from '@custom-types/utils/guards/prisma-data-args'

export function hasPrismaDataArgs(value: unknown): value is PrismaDataArgs {
  return typeof value === 'object' && value !== null && 'data' in value
}
