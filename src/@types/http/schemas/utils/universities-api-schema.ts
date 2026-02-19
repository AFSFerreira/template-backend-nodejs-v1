import type {
  universitiesApiResponseSchema,
  universityApiResponseSchema,
} from '@lib/zod/utils/external/universities-api-schema'
import type z from 'zod'

export type UniversityApiResponseSchemaType = z.infer<typeof universityApiResponseSchema>
export type UniversitiesApiResponseSchemaType = z.infer<typeof universitiesApiResponseSchema>
