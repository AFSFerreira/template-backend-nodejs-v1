import type { Institution, Prisma } from '@prisma/client'

export interface InstitutionRepository {
  create: (data: Prisma.InstitutionUncheckedCreateInput) => Promise<Institution>
  findById: (id: number) => Promise<Institution | null>
  findByName: (name: string) => Promise<Institution | null>
}
