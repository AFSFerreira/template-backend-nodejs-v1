import type { getAllAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-academic-publications-query-schema'
import type z from 'zod'

export type GetAllAcademicPublicationsQueryType = typeof getAllAcademicPublicationsQuerySchema

export type GetAllAcademicPublicationsQuerySchemaType = z.infer<GetAllAcademicPublicationsQueryType>
