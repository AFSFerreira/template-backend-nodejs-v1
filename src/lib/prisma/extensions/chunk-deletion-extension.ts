import type { Document } from '@prisma/dmmf'
import { Prisma } from '@prisma/generated/client'
import { PrismaModelNameNotResolvedError } from '@services/errors/prisma/prisma-model-name-not-resolved-error'

export const chunkedDeletionExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    model: {
      $allModels: {
        async deleteOldRecordsInBatches<T>(
          this: T,
          dateColumn: string,
          olderThanDate: Date,
          limit: number = 1000,
        ): Promise<number> {
          const context = Prisma.getExtensionContext(this)
          const modelName = context.$name

          if (!modelName) {
            throw new PrismaModelNameNotResolvedError()
          }

          const dmmf = Reflect.get(Prisma, 'dmmf') as Document

          const modelMeta = dmmf.datamodel.models.find((model) => model.name === modelName)

          const actualTableName = modelMeta?.dbName || modelName

          const fieldMeta = modelMeta?.fields.find((field) => field.name === dateColumn)
          const actualColumnName = fieldMeta?.dbName || dateColumn

          const safeTableName = Prisma.sql([`"${Prisma.raw(actualTableName).text}"`])
          const safeColumnName = Prisma.sql([`"${Prisma.raw(actualColumnName).text}"`])

          const result = await client.$executeRaw`
            DELETE FROM ${safeTableName}
            WHERE id IN (
              SELECT id FROM ${safeTableName}
              WHERE ${safeColumnName} < ${olderThanDate}
              LIMIT ${limit}
            )
          `

          return result
        },
      },
    },
  })
})
