import type { deleteInstitutionParamsSchema } from '@http/schemas/institution/delete-institution-params-schema'
import type z from 'zod'

export type DeleteInstitutionParamsType = typeof deleteInstitutionParamsSchema

export type DeleteInstitutionParamsSchemaType = z.infer<DeleteInstitutionParamsType>
