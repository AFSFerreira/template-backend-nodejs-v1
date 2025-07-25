import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { AcademicPublicationsRepository } from '../academic-publications-repository'

export class PrismaAcademicPublicationsRepository
  implements AcademicPublicationsRepository
{
  async create(data: Prisma.AcademicPublicationsUncheckedCreateInput) {
    const academicPublication = await prisma.academicPublications.create({
      data,
    })
    return academicPublication
  }

  async createMany(data: Prisma.AcademicPublicationsUncheckedCreateInput[]) {
    await prisma.academicPublications.createMany({ data })
  }

  async findById(id: string) {
    const academicPublication = await prisma.academicPublications.findUnique({
      where: { id },
    })
    return academicPublication
  }

  async findManyByUserId(userId: string) {
    const academicPublications = await prisma.academicPublications.findMany({
      where: { userId },
    })
    return academicPublications
  }

  async delete(id: string) {
    await prisma.academicPublications.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.AcademicPublicationsUpdateInput) {
    const academicPublication = await prisma.academicPublications.update({
      where: { id },
      data,
    })
    return academicPublication
  }
}
