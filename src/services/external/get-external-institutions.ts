import { ALL_UNIVERSITIES_API, UNIVERSITIES_API } from "@constants/url-constants"
import type { UniversitiesApiResponse } from "@custom-types/services/external/universities-api-response"

export async function getExternalInstitutions(universityName?: string) {
  const institutionsRequestUrl = universityName
    ? `${UNIVERSITIES_API}?name_contains=${universityName}`
    : ALL_UNIVERSITIES_API

    const allInstitutionsApiResponse = await fetch(institutionsRequestUrl)

  if (!allInstitutionsApiResponse.ok) return []

  const allApiInstitutions = (await allInstitutionsApiResponse.json()) as UniversitiesApiResponse[]

  const filteredInstitutions = universityName
    ? allApiInstitutions.filter((institution) => institution.name.toUpperCase().trim().includes(universityName))
    : allApiInstitutions

  return filteredInstitutions.map((institution) => institution.name.toUpperCase())
}
