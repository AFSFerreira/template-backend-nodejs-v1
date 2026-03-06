import type { getAcademicPublicationsYearsQuerySchema } from '@http/schemas/academic-publication/get-academic-publications-years-query-schema'
import type z from 'zod'

export type GetAcademicPublicationsYearsQueryType = typeof getAcademicPublicationsYearsQuerySchema

export type GetAcademicPublicationsYearsQuerySchemaType = z.infer<GetAcademicPublicationsYearsQueryType>
