import type { createInstitutionBodySchema } from '@http/schemas/institution/create-institution-body-schema'
import type z from 'zod'

export type CreateInstitutionBodySchemaType = z.infer<typeof createInstitutionBodySchema>
