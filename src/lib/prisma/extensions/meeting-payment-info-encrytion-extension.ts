import { CREATE_OPERATIONS_SET, UPDATE_OPERATIONS_SET, UPSERT_OPERATIONS_SET } from '@constants/sets'
import { Prisma } from '@prisma/generated/client'
import { EncryptionService } from '@services/encryption/encryption-service'
import { hasAccount } from '@utils/guards/has-account'
import { hasAccountSet } from '@utils/guards/has-account-set'
import { hasKeys } from '@utils/guards/has-keys'
import { hasPixKey } from '@utils/guards/has-pix-key'
import { hasPixKeySet } from '@utils/guards/has-pix-key-set'
import { hasPrismaDataArgs } from '@utils/guards/has-prisma-data-args'
import { hasPrismaUpsertArgs } from '@utils/guards/has-prisma-upsert-args'

function encryptSensitiveFields(data: Record<string, unknown>) {
  if (hasAccount(data)) {
    data.account = EncryptionService.encrypt(data.account)
  } else if (hasAccountSet(data)) {
    data.account.set = EncryptionService.encrypt(data.account.set)
  }

  if (hasPixKey(data)) {
    data.pixKey = EncryptionService.encrypt(data.pixKey)
  } else if (hasPixKeySet(data)) {
    data.pixKey.set = EncryptionService.encrypt(data.pixKey.set)
  }
}

function decryptSensitiveFields(data: Record<string, unknown>) {
  if (hasAccount(data)) {
    data.account = EncryptionService.decrypt(data.account)
  }

  if (hasPixKey(data)) {
    data.pixKey = EncryptionService.decrypt(data.pixKey)
  }
}

export const meetingPaymentInfoEncryptionExtension = Prisma.defineExtension({
  name: 'MeetingPaymentInfoEncryptionExtension',
  query: {
    meetingPaymentInfo: {
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
