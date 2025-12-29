import type { UniversitiesApiResponse } from '@custom-types/custom/universities-api-response-type'
import type { IGetAllInstitutions } from '@custom-types/services/get-all-institutions'
import { ALL_UNIVERSITIES_LIST, UNIVERSITIES_API } from '@constants/url-constants'

export async function getAllInstitutions({ institutionsRepository, query }: IGetAllInstitutions) {
  const universityName = query.name
  const limit = query.limit ?? 10
  const page = query.page ?? 1

  // NOTE: Feito com listas porque o uso de conjuntos
  // não permitiria uma paginação sob o array de maneira determinística:
  const allInstitutions: string[] = []

  const institutionsRequestUrl = universityName
    ? `${UNIVERSITIES_API}?name_contains=${universityName}`
    : ALL_UNIVERSITIES_LIST
  const allInstitutionsApiResponse = await fetch(institutionsRequestUrl)

  if (allInstitutionsApiResponse.ok) {
    const allApiInstitutions = (await allInstitutionsApiResponse.json()) as UniversitiesApiResponse[]

    const filteredInstitutions = universityName
      ? allApiInstitutions.filter((institution) => institution.name.toUpperCase().trim().includes(universityName))
      : allApiInstitutions

    filteredInstitutions.forEach((institution) => {
      const formattedName = institution.name.trim().toUpperCase()
      if (allInstitutions.includes(formattedName)) return

      allInstitutions.push(formattedName)
    })
  }

  const allSystemInstitutions = await institutionsRepository.listAllInstitutionsNames({
    name: universityName,
    limit,
    page,
  })

  allSystemInstitutions.data.forEach((institution) => {
    const formattedName = institution.trim().toUpperCase()
    if (allInstitutions.includes(formattedName)) return

    allInstitutions.push(formattedName)
  })

  return allInstitutions
}
