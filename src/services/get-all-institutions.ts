import { ALL_UNIVERSITIES_LIST, UNIVERSITIES_API } from '@constants/url-constants'
import type { UniversitiesApiResponse } from '@custom-types/custom/universities-api-response-type'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { GetAllInstitutionsSchemaType } from '@schemas/institution/get-all-institutions-query-schema'

interface IGetAllInstitutionsQuery extends Omit<GetAllInstitutionsSchemaType, 'page' | 'limit'> {
  page?: number
  limit?: number
}

export async function getAllInstitutions(
  institutionsRepository: InstitutionsRepository,
  query: IGetAllInstitutionsQuery,
) {
  const universityName = query.name
  const limit = query.limit ?? 10
  const page = query.page ?? 1

  const allInstitutions = new Set<string>()

  const institutionsRequestUrl = universityName
    ? `${UNIVERSITIES_API}?name_contains=${universityName}`
    : ALL_UNIVERSITIES_LIST
  const allInstitutionsApiResponse = await fetch(institutionsRequestUrl)

  if (allInstitutionsApiResponse.ok) {
    const allApiInstitutions = (await allInstitutionsApiResponse.json()) as UniversitiesApiResponse[]

    const filteredInstitutions = universityName
      ? allApiInstitutions.filter((institution) => institution.name.toUpperCase().trim().includes(universityName))
      : allApiInstitutions

    filteredInstitutions.forEach((institution) => allInstitutions.add(institution.name.toUpperCase()))
  }

  const allSystemInstitutions = await institutionsRepository.listAllInstitutionsNames({
    name: universityName,
    limit,
    page,
  })
  allSystemInstitutions.data.forEach((institution) => allInstitutions.add(institution))

  return Array.from(allInstitutions)
}
