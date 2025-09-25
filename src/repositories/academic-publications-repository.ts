import type { AcademicPublication, Prisma } from '@prisma/client'

export interface AcademicPublicationsRepository {
  create: (data: Prisma.AcademicPublicationUncheckedCreateInput) => Promise<AcademicPublication>
  createMany: (data: Prisma.AcademicPublicationUncheckedCreateInput[]) => Promise<void>
  findById: (id: number) => Promise<AcademicPublication | null>
  findManyByUserId: (userId: number) => Promise<AcademicPublication[]>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.AcademicPublicationUpdateInput) => Promise<AcademicPublication>
}
