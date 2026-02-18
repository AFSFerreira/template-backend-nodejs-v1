import { CREATE_OPERATIONS_SET, UPDATE_OPERATIONS_SET, UPSERT_OPERATIONS_SET } from '@constants/sets'
import { Prisma } from '@prisma/generated/client'
import { EncryptionService } from '@services/encryption/encryption-service'
import { hasIdentityDocument } from '@utils/guards/has-identity-document'
import { hasIdentityDocumentSet } from '@utils/guards/has-identity-document-set'
import { hasKeys } from '@utils/guards/has-keys'
import { hasPrismaDataArgs } from '@utils/guards/has-prisma-data-args'
import { hasPrismaUpsertArgs } from '@utils/guards/has-prisma-upsert-args'

function encryptSensitiveFields(data: Record<string, unknown>) {
  if (hasIdentityDocument(data)) {
    data.identityDocument = EncryptionService.encrypt(data.identityDocument)
  } else if (hasIdentityDocumentSet(data)) {
    data.identityDocument.set = EncryptionService.encrypt(data.identityDocument.set)
  }
}

function decryptSensitiveFields(data: Record<string, unknown>) {
  if (hasIdentityDocument(data)) {
    data.identityDocument = EncryptionService.decrypt(data.identityDocument)
  }
}

export const userEncryptionExtension = Prisma.defineExtension({
  name: 'UserEncryptionExtension',
  query: {
    user: {
      async $allOperations({ operation, args, query }) {
        if (CREATE_OPERATIONS_SET.has(operation) && hasPrismaDataArgs(args)) {
          if (Array.isArray(args.data)) {
            args.data.forEach(encryptSensitiveFields)
          } else {
            encryptSensitiveFields(args.data)
          }
        }

        if (UPDATE_OPERATIONS_SET.has(operation) && hasPrismaDataArgs(args) && !Array.isArray(args.data)) {
          encryptSensitiveFields(args.data)
        }

        if (UPSERT_OPERATIONS_SET.has(operation) && hasPrismaUpsertArgs(args)) {
          encryptSensitiveFields(args.create)
          encryptSensitiveFields(args.update)
        }

        const result = await query(args)

        if (!result) return result

        if (Array.isArray(result)) {
          return result.map((item) => {
            decryptSensitiveFields(item)
            return item
          })
        }

        if (hasKeys(result)) {
          decryptSensitiveFields(result)
        }

        return result
      },
    },
  },
})
