import type { Prisma } from '@prisma/client'

export interface UpdateKeywordsQuery {
  id: number
  data: Prisma.KeywordUpdateInput
}
