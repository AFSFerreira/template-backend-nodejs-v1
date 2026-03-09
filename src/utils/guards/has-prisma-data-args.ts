import type { PrismaDataArgs } from '@custom-types/utils/guards/prisma-data-args'

/**
 * Type guard que verifica se um argumento do Prisma possui a propriedade `data`.
 *
 * Utilizado pelas extensões de criptografia para identificar operações de `create`
 * e `update` que carregam dados a serem interceptados e criptografados.
 *
 * @param value - Argumento de operação Prisma.
 * @returns `true` se o valor contém a propriedade `data`.
 */
export function hasPrismaDataArgs(value: unknown): value is PrismaDataArgs {
  return typeof value === 'object' && value !== null && 'data' in value
}
