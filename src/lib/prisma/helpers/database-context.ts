import type { PrismaTransactionClient } from '@custom-types/libs/prisma/prisma-transaction-client'
import type { PrismaClient } from '@prisma/client'
import { asyncLocalStorage } from '@lib/async-local-storage'
import { AsyncLocalStorageNotInitializedError } from '@services/errors/async-local-storage/async-local-storage-not-initialized-error'
import { prisma } from '..'

export class DatabaseContext {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }

  get client(): PrismaTransactionClient | PrismaClient {
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
