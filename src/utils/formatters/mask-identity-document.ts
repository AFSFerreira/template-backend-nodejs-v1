import type { MaskIdentityDocumentInput } from '@custom-types/utils/formatters/mask-identity-document'
import { InvalidFileOperationTypeError } from '@jobs/queues/errors/invalid-file-operation-type-error'
import { IdentityType } from '@prisma/generated/enums'
import { cpf } from 'cpf-cnpj-validator'

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
      throw new InvalidFileOperationTypeError(identityType satisfies never)
    }
  }
}
