import type { PrismaTransactionClient } from '../prisma/prisma-transaction-client'

export interface IAsyncContext {
  requestId: string
  userId?: string
  prismaTransaction?: PrismaTransactionClient
}
