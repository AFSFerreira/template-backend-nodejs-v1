import type { AcademicPublicationRaw } from '@custom-types/adapter/input/academic-publication-raw-type'
import type { ListAllAcademicPublicationsQuery } from '@custom-types/repositories/academic-publication/list-all-academic-publications-query'
import type { OrderableType } from '@custom-types/validator/orderable'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import { evalTotalPages } from '@utils/pagination/eval-total-pages'
import { academicPublicationAdapter } from './adapters/academic-publications/academic-publication-adapter'
import { buildListAllAcademicPublicationsQuery } from './queries/academic-publications/build-list-all-academic-publications-query'

export class PrismaAcademicPublicationsRepository implements AcademicPublicationsRepository {
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
      orderBy: [{ title: 'asc' }, { id: 'asc' }],
    })
    return academicPublication
  }

  async listAllAcademicPublications(query?: ListAllAcademicPublicationsQuery) {
    const orderBy: Prisma.AcademicPublicationOrderByWithRelationInput[] = [
      { title: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const academicPublications = await prisma.academicPublication.findMany({
        select: {
          id: true,
          title: true,
          journalName: true,
          publicationYear: true,
          volume: true,
          editionNumber: true,
          startPage: true,
          linkDoi: true,
          createdAt: true,
          ActivityArea: {
            select: { area: true },
          },
          AcademicPublicationAuthors: {
            select: { name: true },
          },
        },
        orderBy,
      })

      const formattedAcademicPublications = academicPublications.map((academicPublicationInfo) => ({
        ...academicPublicationInfo,
        authorsName: academicPublicationInfo.AcademicPublicationAuthors.map(
          (academicPublicationAuthorInfo) => academicPublicationAuthorInfo.name,
        ),
        mainCategory: academicPublicationInfo.ActivityArea.area,
      }))

      return {
        data: formattedAcademicPublications,
        meta: {
          totalItems: academicPublications.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: academicPublications.length,
        },
      }
    }

    const { searchQuery, countQuery } = buildListAllAcademicPublicationsQuery(query)

    const [countResult, academicPublications] = await Promise.all([
      prisma.$queryRaw<Array<{ total: number }>>(countQuery),
      prisma.$queryRaw<AcademicPublicationRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: academicPublications.map(academicPublicationAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
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
