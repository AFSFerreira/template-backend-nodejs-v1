/**
 * Type guard que verifica se um valor desconhecido possui o campo `identityDocument` como string.
 *
 * Utilizado pela extensão de criptografia de usuários para detectar payloads de `create`
 * que contêm documento de identidade em formato direto, aplicando a criptografia AES.
 *
 * @param value - Valor a ser verificado.
 * @returns `true` se o valor possui `identityDocument` como string.
 */
export function hasIdentityDocument(value: unknown): value is Record<string, unknown> & { identityDocument: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'identityDocument' in value &&
    typeof (value as Record<string, unknown>).identityDocument === 'string'
  )
}
