import type { getAllActivityAreasWithAcademicPublicationsQuerySchema } from '@http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import type { z } from 'zod'

export type GetAllActivityAreasWithAcademicPublicationsQueryType =
  typeof getAllActivityAreasWithAcademicPublicationsQuerySchema

export type GetAllActivityAreasWithAcademicPublicationsQuerySchemaType =
  z.infer<GetAllActivityAreasWithAcademicPublicationsQueryType>
