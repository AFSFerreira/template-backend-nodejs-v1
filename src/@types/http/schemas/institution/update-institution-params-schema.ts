import type { updateInstitutionParamsSchema } from '@http/schemas/institution/update-institution-params-schema'
import type z from 'zod'

export type UpdateInstitutionParamsType = typeof updateInstitutionParamsSchema

export type UpdateInstitutionParamsSchemaType = z.infer<UpdateInstitutionParamsType>
