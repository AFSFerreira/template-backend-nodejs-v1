import type { GetAllInstitutionsQuerySchemaType } from '@custom-types/http/schemas/institution/get-all-institutions-query-schema'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'
import { getExternalInstitutions } from './get-external-institutions'

@injectable()
export class InstitutionService {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async getAllInstitutions(query: Partial<GetAllInstitutionsQuerySchemaType>) {
    const universityName = query.name
    const limit = query.limit ?? 10
    const page = query.page ?? 1

    const allInstitutions: string[] = []

    const externalInstitutions = await getExternalInstitutions(universityName)

    for (const externalInstitution of externalInstitutions) {
      if (allInstitutions.includes(externalInstitution)) continue

      allInstitutions.push(externalInstitution)
    }

    const allSystemInstitutions = await this.institutionsRepository.listAllInstitutionsNames({
      name: universityName,
      limit,
      page,
    })

    for (const institution of allSystemInstitutions.data) {
      const formattedName = institution.name.trim().toUpperCase()

      if (allInstitutions.includes(formattedName)) continue

      allInstitutions.push(formattedName)
    }

    return allInstitutions
  }
}
