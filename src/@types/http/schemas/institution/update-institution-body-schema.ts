import type { updateInstitutionBodySchema } from '@http/schemas/institution/update-institution-body-schema'
import type z from 'zod'

export type UpdateInstitutionBodyType = typeof updateInstitutionBodySchema

export type UpdateInstitutionBodySchemaType = z.infer<UpdateInstitutionBodyType>
