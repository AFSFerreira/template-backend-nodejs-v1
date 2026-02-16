import type { universitiesApiResponseSchema, universityApiResponseSchema } from '@schemas/utils/universities-api-schema'
import type z from 'zod'

export type UniversityApiResponseSchemaType = z.infer<typeof universityApiResponseSchema>
export type UniversitiesApiResponseSchemaType = z.infer<typeof universitiesApiResponseSchema>
