import type { PrismaUpsertArgs } from '@custom-types/utils/guards/prisma-upsert-args'

/**
 * Type guard que verifica se um argumento do Prisma possui as propriedades `create` e `update`.
 *
 * Utilizado pelas extensões de criptografia para identificar operações de `upsert`,
 * onde tanto o payload de criação quanto o de atualização precisam ser interceptados
 * para criptografia.
 *
 * @param value - Argumento de operação Prisma.
 * @returns `true` se o valor contém as propriedades `create` e `update`.
 */
export function hasPrismaUpsertArgs(value: unknown): value is PrismaUpsertArgs {
  return typeof value === 'object' && value !== null && 'create' in value && 'update' in value
}
