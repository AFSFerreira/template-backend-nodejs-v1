import type { updateInstitutionBodySchema } from '@schemas/institution/update-institution-body-schema'
import type z from 'zod'

export type UpdateInstitutionBodySchemaType = z.infer<typeof updateInstitutionBodySchema>
