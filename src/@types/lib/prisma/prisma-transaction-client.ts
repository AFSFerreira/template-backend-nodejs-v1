import type { ExtendedPrismaClient } from './extended-prisma-client'

export type PrismaTransactionClient = Omit<
  ExtendedPrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>
