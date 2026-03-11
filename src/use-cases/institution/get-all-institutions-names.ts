import type {
  GetAllInstitutionsNamesUseCaseRequest,
  GetAllInstitutionsNamesUseCaseResponse,
} from '@custom-types/use-cases/institution/get-all-institutions-names'
import { InstitutionService } from '@services/externals/get-all-institutions'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { paginateArray } from '@utils/generics/paginate-array'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllInstitutionsNamesUseCase {
  constructor(
    @inject(InstitutionService)
    private readonly institutionService: InstitutionService,
  ) {}

  async execute(
    getAllInstitutionsUseCaseInput: GetAllInstitutionsNamesUseCaseRequest,
  ): Promise<GetAllInstitutionsNamesUseCaseResponse> {
    const { limit, page } = getAllInstitutionsUseCaseInput

    const allInstitutionsArray = await this.institutionService.getAllInstitutions(getAllInstitutionsUseCaseInput)

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
