import { IS_DEBUG } from '@constants/env-constants'
import { PrismaClient } from '@prisma/generated/client'
import { chunkedDeletionExtension } from './extensions/chunk-deletion-extension'
import { healthCheckExtension } from './extensions/health-check-extension'
import { meetingPaymentInfoEncryptionExtension } from './extensions/meeting-payment-info-encrytion-extension'
import { userEncryptionExtension } from './extensions/user-encryption-extension'
import { adapter } from './helpers/configuration'

const basePrisma = new PrismaClient({
  log: IS_DEBUG ? ['query', 'info', 'warn'] : [],
  adapter,
})

export const prisma = basePrisma
  .$extends(userEncryptionExtension)
  .$extends(meetingPaymentInfoEncryptionExtension)
  .$extends(healthCheckExtension)
  .$extends(chunkedDeletionExtension)
