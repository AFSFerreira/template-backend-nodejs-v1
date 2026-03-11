import type { GetAcademicPublicationsYearsQuerySchemaType } from '@custom-types/http/schemas/academic-pulication/get-academic-publications-years-query-schema'
import type { ListAllAcademicPublicationsQuery } from '@custom-types/repository/prisma/academic-publication/list-all-academic-publications-query'
import type { UpdateAcademicPublicationQuery } from '@custom-types/repository/prisma/academic-publication/update-academic-publication-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { InvalidQueryRawResultError } from '@messages/system/invalid-query-raw-result-error'
import { academicPublicationAdapterSchema } from '@repositories/prisma/adapters/academic-publications/academic-publication-adapter-schema'
import { academicPublicationYearAdapterSchema } from '@repositories/prisma/adapters/academic-publications/academic-publication-year-adapter-schema'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, singleton } from 'tsyringe'
import z from 'zod'
import { buildListAcademicPublicationsYearsQuery } from './queries/academic-publications/orchestrators/build-list-academic-publications-years-query'
import { buildListAllAcademicPublicationsQuery } from './queries/academic-publications/orchestrators/build-list-all-academic-publications-query'

@singleton()
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

  async listAllAcademicPublications(query: ListAllAcademicPublicationsQuery) {
    const { searchQuery, countQuery } = buildListAllAcademicPublicationsQuery(query)

    const [countResult, academicPublicationsRaw] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<unknown[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    const parsedAcademicPublications = z.array(academicPublicationAdapterSchema).safeParse(academicPublicationsRaw)

    if (!parsedAcademicPublications.success) {
      throw new InvalidQueryRawResultError(parsedAcademicPublications.error)
    }

    return {
      data: parsedAcademicPublications.data,
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

    const [countResult, academicPublicationYearsRaw] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<unknown[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    const parsedAcademicPublicationYears = z
      .array(academicPublicationYearAdapterSchema)
      .safeParse(academicPublicationYearsRaw)

    if (!parsedAcademicPublicationYears.success) {
      throw new InvalidQueryRawResultError(parsedAcademicPublicationYears.error)
    }

    return {
      data: parsedAcademicPublicationYears.data,
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
