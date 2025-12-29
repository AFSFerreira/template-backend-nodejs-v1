import type { Prisma } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import { proseMirrorData4 } from './prose-mirrors'

export const institutionalInfoData1: Prisma.InstitutionalInfoCreateInput = {
  aboutDescription: proseMirrorData4 as InputJsonValue,
  aboutImage: 'membros.avif',
}
