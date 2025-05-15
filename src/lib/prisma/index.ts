import { IS_DEBUG } from '@constants/env-constants'
import { PrismaClient } from '@prisma/generated/client'
import { chunkedDeletionExtension } from './extensions/chunk-deletion-extension'
import { healthCheckExtension } from './extensions/health-check-extension'
import { adapter } from './helpers/configuration'

const basePrisma = new PrismaClient({
  log: IS_DEBUG ? ['query', 'info', 'warn'] : [],
  adapter,
})

export const prisma = basePrisma.$extends(chunkedDeletionExtension).$extends(healthCheckExtension)
