import type { ExtendedPrismaClient } from '@custom-types/lib/prisma/extended-prisma-client'
import type { PrismaTransactionClient } from '@custom-types/lib/prisma/prisma-transaction-client'
import { asyncLocalStorage } from '@lib/async-local-storage'
import { AsyncLocalStorageNotInitializedError } from '@utils/errors/async-local-storage/async-local-storage-not-initialized-error'
import { singleton } from 'tsyringe'
import { prisma } from '..'

@singleton()
export class DatabaseContext {
  private readonly prisma: ExtendedPrismaClient

  constructor() {
    this.prisma = prisma
  }

  get client(): PrismaTransactionClient | ExtendedPrismaClient {
    const prismaTx = asyncLocalStorage.getStore()?.prismaTransaction

    return prismaTx ?? this.prisma
  }

  async runInTransaction<T>(callback: () => Promise<T>): Promise<T> {
    const store = asyncLocalStorage.getStore()

    if (!store) {
      throw new AsyncLocalStorageNotInitializedError()
    }

    return await this.prisma.$transaction(async (tx) => {
      return await asyncLocalStorage.run(
        {
          ...store,
          prismaTransaction: tx,
        },
        callback,
      )
    })
  }
}
