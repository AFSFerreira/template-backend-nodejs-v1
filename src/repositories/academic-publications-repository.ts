import type { AcademicPublications, Prisma } from '@prisma/client'

export interface AcademicPublicationsRepository {
  create: (
    data: Prisma.AcademicPublicationsUncheckedCreateInput,
  ) => Promise<AcademicPublications>
  createMany: (
    data: Prisma.AcademicPublicationsUncheckedCreateInput[],
  ) => Promise<void>
  findById: (id: number) => Promise<AcademicPublications | null>
  findManyByUserId: (userId: number) => Promise<AcademicPublications[]>
  delete: (id: number) => Promise<void>
  update: (
    id: number,
    data: Prisma.AcademicPublicationsUpdateInput,
  ) => Promise<AcademicPublications>
}
