import type { universityApiResponseSchema } from '@schemas/utils/universities-api-schema'
import type { z } from 'zod'
import { ALL_UNIVERSITIES_API, UNIVERSITIES_API } from '@constants/url-constants'
import { logError } from '@lib/logger/helpers/log-error'
import { UNIVERSITIES_API_PARSE_ERROR } from '@messages/loggings/services/external-api'
import { universitiesApiResponseSchema } from '@schemas/utils/universities-api-schema'

type UniversityApiResponse = z.infer<typeof universityApiResponseSchema>

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
