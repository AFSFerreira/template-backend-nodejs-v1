import type { Prisma } from '@prisma/generated/client'

export interface UpdateKeywordsQuery {
  id: number
  data: Prisma.KeywordUpdateInput
}
