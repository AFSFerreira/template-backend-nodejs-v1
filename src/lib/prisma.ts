import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { initializePgTrgmLib } from './pg-trgm'

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'dev'
      ? ['query', 'info', 'warn']
      : ['info', 'warn'],
})

initializePgTrgmLib(prisma)
