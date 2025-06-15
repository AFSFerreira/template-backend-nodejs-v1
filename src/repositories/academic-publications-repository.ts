import type { AcademicPublications, Prisma } from '@prisma/client'

export interface AcademicPublicationsRepository {
  create: (
    data: Prisma.AcademicPublicationsCreateInput,
  ) => Promise<AcademicPublications>
  findById: (id: string) => Promise<AcademicPublications | null>
  findManyByUserId: (userId: string) => Promise<AcademicPublications[]>
  delete: (id: string) => Promise<void>
  update: (
    id: string,
    data: Prisma.AcademicPublicationsUpdateInput,
  ) => Promise<AcademicPublications>
}
