/**
 * Type guard que verifica se um valor desconhecido possui o campo `account` como string direta.
 *
 * Utilizado pelas extensões de criptografia do Prisma para detectar payloads de `create`
 * que contêm o campo `account` em formato direto (não aninhado em `set`).
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `account` como string.
 */
export function hasAccount(value: unknown): value is Record<string, unknown> & { account: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'account' in value &&
    typeof (value as Record<string, unknown>).account === 'string'
  )
}
