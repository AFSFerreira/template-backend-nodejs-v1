import { IS_DEBUG } from '@constants/env-constants'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { ensurePgTrgmAvailable } from './extensions/pg-trgm'

export const prisma = new PrismaClient({
  log: IS_DEBUG ? ['query', 'info', 'warn'] : [],
})

ensurePgTrgmAvailable(prisma)
