/**
 * Type guard que verifica se um valor desconhecido possui o campo `pixKey` como string.
 *
 * Utilizado pela extensão de criptografia de pagamentos de encontros para detectar
 * payloads de `create` que contêm chave Pix em formato direto.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `pixKey` como string.
 */
export function hasPixKey(value: unknown): value is Record<string, unknown> & { pixKey: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'pixKey' in value &&
    typeof (value as Record<string, unknown>).pixKey === 'string'
  )
}
