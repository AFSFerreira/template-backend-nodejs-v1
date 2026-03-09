import type { UniversityApiResponse } from '@custom-types/services/external/universities-api-response'
import { ALL_UNIVERSITIES_API, UNIVERSITIES_API } from '@constants/url-constants'
import { logError } from '@lib/pino/helpers/log-error'
import { universitiesApiResponseSchema } from '@lib/zod/utils/external/universities-api-schema'
import { UNIVERSITIES_API_PARSE_ERROR } from '@messages/loggings/services/external-api'

export async function getExternalInstitutions(universityName?: string) {
  const institutionsRequestUrl = universityName
    ? `${UNIVERSITIES_API}?name_contains=${universityName}`
    : ALL_UNIVERSITIES_API

  const allInstitutionsApiResponse = await fetch(institutionsRequestUrl)

  if (!allInstitutionsApiResponse.ok) return []

  const rawData = await allInstitutionsApiResponse.json()
  const parseResult = universitiesApiResponseSchema.safeParse(rawData)

  if (!parseResult.success) {
    logError({ error: parseResult.error, message: UNIVERSITIES_API_PARSE_ERROR })

    return []
  }

  const allApiInstitutions = parseResult.data

  const filteredInstitutions = universityName
    ? allApiInstitutions.filter((institution: UniversityApiResponse) =>
        institution.name.toUpperCase().trim().includes(universityName),
      )
    : allApiInstitutions

  return filteredInstitutions.map((institution: UniversityApiResponse) => institution.name.toUpperCase())
}
