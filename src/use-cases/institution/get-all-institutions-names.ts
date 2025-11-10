import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { GetAllInstitutionsSchemaType } from '@schemas/institution/get-all-institutions-query-schema'
import { getAllInstitutions } from '@services/get-all-institutions'
import { evalTotalPages } from '@utils/eval-total-pages'
import { paginateArray } from '@utils/paginate-array'

interface GetAllInstitutionsNamesUseCaseRequest extends GetAllInstitutionsSchemaType {}

interface GetAllInstitutionsNamesUseCaseResponse extends PaginatedResult<string[]> {}

export class GetAllInstitutionsNamesUseCase {
  constructor(private readonly institutionsRepository: InstitutionsRepository) {}

  async execute(
    getAllInstitutionsUseCaseInput: GetAllInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInstitutionsNamesUseCaseResponse> {
    const { limit, page } = getAllInstitutionsUseCaseInput
    const allInstitutionsArray = await getAllInstitutions(this.institutionsRepository, getAllInstitutionsUseCaseInput)

    const pageSize = limit
    const totalItems = allInstitutionsArray.length

    const totalPages = evalTotalPages({ pageSize, totalItems })

    const paginatedInstitutions = paginateArray({
      array: allInstitutionsArray,
      limit,
      page,
    })

    return {
      data: paginatedInstitutions,
      meta: {
        totalItems,
        totalPages,
        currentPage: getAllInstitutionsUseCaseInput.page,
        pageSize,
      },
    }
  }
}
