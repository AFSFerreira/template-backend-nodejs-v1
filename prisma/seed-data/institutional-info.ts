import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { Prisma } from '@prisma/generated/client'
import { proseMirrorData4 } from './prose-mirrors'

export const institutionalInfoData1: Prisma.InstitutionalInfoCreateInput = {
  aboutDescription: proseMirrorData4 as InputJsonValue,
  aboutImage: 'membros.avif',
}
