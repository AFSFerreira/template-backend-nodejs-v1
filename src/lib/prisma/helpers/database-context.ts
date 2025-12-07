import type { PrismaTransactionClient } from '@custom-types/libs/prisma/prisma-transaction-client'
import { asyncLocalStorage } from '@lib/async-local-storage'
import { PrismaClient } from '@prisma/client'
import { AsyncLocalStorageNotInitializedError } from '@use-cases/errors/generic/async-local-storage-not-initialized-error'
import { singleton } from 'tsyringe'
import { prisma } from '..'

@singleton()
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

    return this.prisma.$transaction(async (tx) => {
      const newContext = {
        ...store,
        prismaTransaction: tx,
      }

      return asyncLocalStorage.run(newContext, callback)
    })
  }
}
