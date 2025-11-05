import { ALL_UNIVERSITIES_LIST } from '@constants/url-constants'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { UniversitiesApiResponse } from '@custom-types/universities-api-response-type'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { GetAllInstitutionsSchemaType } from '@schemas/institution/get-all-institutions-query-schema'
import { RetrieveInstitutionsError } from '@use-cases/errors/institution/retrieve-institutions-error'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import { paginateArray } from '@utils/paginate-array'

interface GetAllInstitutionsNamesUseCaseRequest extends GetAllInstitutionsSchemaType {}

interface GetAllInstitutionsNamesUseCaseResponse extends PaginatedResult<string[]> {}

export class GetAllInstitutionsNamesUseCase {
  constructor(private readonly institutionsRepository: InstitutionsRepository) {}

  async execute(
    getAllInstitutionsUseCaseInput: GetAllInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInstitutionsNamesUseCaseResponse> {
    const universityName = getAllInstitutionsUseCaseInput.name
    const limit = getAllInstitutionsUseCaseInput.limit
    const { page } = evalOffset({ page: getAllInstitutionsUseCaseInput.page, limit })

    // const institutionsRequestUrl = `${UNIVERSITIES_API}?${universityName ? `name=${universityName}&` : ''}limit=${limit}&offset=${offset}`
    // const institutionsApiResponse = await fetch(institutionsRequestUrl)
    const allInstitutionsApiResponse = await fetch(ALL_UNIVERSITIES_LIST)

    if (!allInstitutionsApiResponse.ok) {
      if (allInstitutionsApiResponse.status >= 500) {
        // Fallback se a API falhar
        const institutions = await this.institutionsRepository.listAllInstitutionsNames({ page, limit })
        return institutions
      }

      throw new RetrieveInstitutionsError()
    }

    // const institutions = await institutionsApiResponse.json() as UniversitiesApiResponse[]
    const allInstitutions = (await allInstitutionsApiResponse.json()) as UniversitiesApiResponse[]

    const filteredInstitutions = universityName
      ? allInstitutions.filter((institution) => institution.name.toUpperCase().trim().includes(universityName))
      : allInstitutions
    // const formattedInstitutions = institutions.map((institution) => institution.name)
    const paginatedInstitutions = paginateArray({
      array: filteredInstitutions,
      limit,
      page,
    })

    const formattedInstitutions = paginatedInstitutions.map((institution) => institution.name)

    const pageSize = limit
    const totalItems = filteredInstitutions.length

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: formattedInstitutions,
      meta: {
        totalItems,
        totalPages,
        currentPage: getAllInstitutionsUseCaseInput.page,
        pageSize: limit,
      },
    }
  }
}
