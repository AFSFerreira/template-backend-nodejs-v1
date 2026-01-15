import type { getAllAcademicPublicationsQuerySchema } from '@schemas/academic-publication/get-all-academic-publications-query-schema'
import type z from 'zod'

export type GetAllAcademicPublicationsQuerySchemaType = z.infer<typeof getAllAcademicPublicationsQuerySchema>
