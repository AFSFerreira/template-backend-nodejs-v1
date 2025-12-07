import type { Prisma, PrismaClient } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/client'

export type PrismaTransactionClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>
