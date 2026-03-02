import type { updateInstitutionalInfoBodySchema } from '@http/schemas/institutional-info/update-institutional-info-body-schema'
import type z from 'zod'

export type UpdateInstitutionalInfoBodySchemaType = z.infer<typeof updateInstitutionalInfoBodySchema>
