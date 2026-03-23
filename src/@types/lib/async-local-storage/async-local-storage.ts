import type { PrismaTransactionClient } from '../prisma/prisma-transaction-client'

export interface IAsyncContext {
  requestId: string
  requestInfo: {
    host: string
    protocol: string
  }
  userId?: string
  prismaTransaction?: PrismaTransactionClient
}
