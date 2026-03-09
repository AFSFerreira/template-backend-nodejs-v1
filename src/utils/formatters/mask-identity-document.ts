import type { MaskIdentityDocumentInput } from '@custom-types/utils/formatters/mask-identity-document'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { IdentityType } from '@prisma/generated/enums'
import { cpf } from 'cpf-cnpj-validator'

/**
 * Mascara um documento de identidade para exibição pública, preservando apenas parte dos dígitos.
 *
 * Estratégias de mascaramento por tipo:
 * - **CPF**: Oculta os 3 primeiros e os 2 últimos dígitos → `***.456.789-**`
 * - **RNE / Passaporte**: Oculta todos os caracteres exceto os 4 últimos → `****1234`
 *
 * Se o CPF não possuir exatamente 11 dígitos após strip, ou se o documento tiver 4 ou menos
 * caracteres, retorna asteriscos para todo o conteúdo como fallback de segurança.
 *
 * @param params - Dados do documento.
 * @param params.identityType - Tipo do documento (`CPF`, `RNE` ou `PASSPORT`).
 * @param params.identityDocument - Documento descriptografado.
 * @returns Documento mascarado para exibição segura.
 * @throws {UnreachableCaseError} Se o tipo de documento não for válido (exhaustive check).
 *
 * @example
 * maskIdentityDocument({ identityType: 'CPF', identityDocument: '123.456.789-09' })
 * // '***.456.789-**'
 *
 * maskIdentityDocument({ identityType: 'PASSPORT', identityDocument: 'AB1234567' })
 * // '*****4567'
 */
export function maskIdentityDocument({ identityType, identityDocument }: MaskIdentityDocumentInput): string {
  switch (identityType) {
    case IdentityType.CPF: {
      const stripped = cpf.strip(identityDocument)

      if (stripped.length !== 11) {
        return '*'.repeat(identityDocument.length)
      }

      const middle = stripped.slice(3, 9)
      return `***.${middle.slice(0, 3)}.${middle.slice(3)}-**`
    }

    case IdentityType.RNE:
    case IdentityType.PASSPORT: {
      if (identityDocument.length <= 4) {
        return '*'.repeat(identityDocument.length)
      }

      const lastFour = identityDocument.slice(-4)
      const maskedLength = identityDocument.length - 4
      return '*'.repeat(maskedLength) + lastFour
    }

    default: {
      throw new UnreachableCaseError(identityType satisfies never)
    }
  }
}
