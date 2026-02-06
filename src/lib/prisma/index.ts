import { IS_DEBUG } from '@constants/env-constants'
import { PrismaClient } from '@prisma/generated/client'
import { adapter } from './helpers/configuration'

export const prisma = new PrismaClient({
  log: IS_DEBUG ? ['query', 'info', 'warn'] : [],
  adapter,
})
