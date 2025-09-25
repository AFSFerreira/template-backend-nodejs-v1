import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'

export class PrismaAcademicPublicationRepository implements AcademicPublicationsRepository {
  async create(data: Prisma.AcademicPublicationUncheckedCreateInput) {
    const academicPublication = await prisma.academicPublication.create({
      data,
    })
    return academicPublication
  }

  async createMany(data: Prisma.AcademicPublicationUncheckedCreateInput[]) {
    await prisma.academicPublication.createMany({ data })
  }

  async findById(id: number) {
    const academicPublication = await prisma.academicPublication.findUnique({
      where: { id },
    })
    return academicPublication
  }

  async findManyByUserId(userId: number) {
    const academicPublication = await prisma.academicPublication.findMany({
      where: { userId },
    })
    return academicPublication
  }

  async delete(id: number) {
    await prisma.academicPublication.delete({ where: { id } })
  }

  async update(id: number, data: Prisma.AcademicPublicationUpdateInput) {
    const academicPublication = await prisma.academicPublication.update({
      where: { id },
      data,
    })
    return academicPublication
  }
}
