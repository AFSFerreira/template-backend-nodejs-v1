import type { Prisma } from '@prisma/client'
import type { InstitutionRepository } from '../institution-repository'
import { prisma } from '@/lib/prisma'

export class PrismaInsitutionRepository implements InstitutionRepository {
  async create(data: Prisma.InstitutionUncheckedCreateInput) {
    const institution = await prisma.institution.create({
      data,
    })
    return institution
  }

  async findById(id: number) {
    const institution = await prisma.institution.findUnique({
      where: { id },
    })
    return institution
  }

  async findByName(name: string) {
    const institution = await prisma.institution.findUnique({
      where: { name },
    })
    return institution
  }
}
