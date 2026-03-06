import type { updateInstitutionalInfoBodySchema } from '@http/schemas/institutional-info/update-institutional-info-body-schema'
import type z from 'zod'

export type UpdateInstitutionalInfoBodyType = typeof updateInstitutionalInfoBodySchema

export type UpdateInstitutionalInfoBodySchemaType = z.infer<UpdateInstitutionalInfoBodyType>
