import type {
  GetAllInstitutionsNamesUseCaseRequest,
  GetAllInstitutionsNamesUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-institutions-names'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { getAllInstitutions } from '@services/external/get-all-institutions'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { paginateArray } from '@utils/generics/paginate-array'
import { inject, injectable } from 'tsyringe'
import { getExternalInstitutions } from '@services/external/get-external-institutions'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'

@injectable()
export class GetAllInstitutionsNamesUseCase {
  constructor(
    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(
    getAllInstitutionsUseCaseInput: GetAllInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInstitutionsNamesUseCaseResponse> {
    const { limit, page } = getAllInstitutionsUseCaseInput

    const pageSize = limit

    let institutions: string[] | PaginatedResult<string[]> = await getAllInstitutions({
      institutionsRepository: this.institutionsRepository,
      query: getAllInstitutionsUseCaseInput,
    })

    if (getAllInstitutionsUseCaseInput.source) {
      if (getAllInstitutionsUseCaseInput.source === 'internal') {
        const internalInstitutions = await this.institutionsRepository.listAllInstitutionsNames(getAllInstitutionsUseCaseInput)

        institutions = internalInstitutions
      }

      if (getAllInstitutionsUseCaseInput.source === 'external') {
        institutions = await getExternalInstitutions(getAllInstitutionsUseCaseInput.name)
      }
    }

    const allInstitutions = Array.isArray(institutions) ? institutions : institutions.data

    const totalItems = Array.isArray(institutions) ? institutions.length : institutions.meta.totalItems

    const totalPages = evalTotalPages({ pageSize, totalItems })

    const paginatedInstitutions = Array.isArray(institutions) ? paginateArray({
      array: allInstitutions,
      limit,
      page,
    }) : institutions.data

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
