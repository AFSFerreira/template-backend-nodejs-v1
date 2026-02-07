import type { OrderableType } from '@custom-types/custom/orderable'
import type { GetAcademicPublicationsYearsQuerySchemaType } from '@custom-types/http/schemas/academic-pulication/get-academic-publications-years-query-schema'
import type { ListAllAcademicPublicationsQuery } from '@custom-types/repository/prisma/academic-publication/list-all-academic-publications-query'
import type { UpdateAcademicPublicationQuery } from '@custom-types/repository/prisma/academic-publication/update-academic-publication-query'
import type { AcademicPublicationSimplifiedRaw } from '@custom-types/repository/prisma/adapter/academic-publication-simplified'
import type { AcademicPublicationYearRaw } from '@custom-types/repository/prisma/adapter/academic-publication-year'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'
import { academicPublicationAdapter } from './adapters/academic-publications/academic-publication-adapter'
import { academicPublicationYearAdapter } from './adapters/academic-publications/academic-publication-year-adapter'
import { buildListAcademicPublicationsYearsQuery } from './queries/academic-publications/build-list-academic-publications-years-query'
import { buildListAllAcademicPublicationsQuery } from './queries/academic-publications/build-list-all-academic-publications-query'

@injectable()
export class PrismaAcademicPublicationsRepository implements AcademicPublicationsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: Prisma.AcademicPublicationUncheckedCreateInput) {
    const academicPublication = await this.dbContext.client.academicPublication.create({
      data,
    })
    return academicPublication
  }

  async createMany(data: Prisma.AcademicPublicationUncheckedCreateInput[]) {
    await this.dbContext.client.academicPublication.createMany({ data })
  }

  async findById(id: number) {
    const academicPublication = await this.dbContext.client.academicPublication.findUnique({
      where: { id },
    })
    return academicPublication
  }

  async findManyByUserId(userId: number) {
    const academicPublication = await this.dbContext.client.academicPublication.findMany({
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
      const academicPublications = await this.dbContext.client.academicPublication.findMany({
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
        authorsNames: academicPublicationInfo.AcademicPublicationAuthors.map(
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
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<AcademicPublicationSimplifiedRaw[]>(searchQuery),
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

  async getYearsWithCount(query: GetAcademicPublicationsYearsQuerySchemaType) {
    const { searchQuery, countQuery } = buildListAcademicPublicationsYearsQuery(query)

    const [countResult, academicPublicationYears] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<AcademicPublicationYearRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: academicPublicationYears.map(academicPublicationYearAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async delete(id: number) {
    await this.dbContext.client.academicPublication.delete({ where: { id } })
  }

  async update({ id, data }: UpdateAcademicPublicationQuery) {
    const academicPublication = await this.dbContext.client.academicPublication.update({
      where: { id },
      data,
    })
    return academicPublication
  }
}
