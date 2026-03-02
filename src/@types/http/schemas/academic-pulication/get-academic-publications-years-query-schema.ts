import type { getAcademicPublicationsYearsQuerySchema } from '@http/schemas/academic-publication/get-academic-publications-years-query-schema'
import type z from 'zod'

export type GetAcademicPublicationsYearsQuerySchemaType = z.infer<typeof getAcademicPublicationsYearsQuerySchema>
