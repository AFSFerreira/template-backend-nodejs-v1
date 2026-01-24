import type { requestEmailChangeBodySchema } from '@schemas/user/request-email-change-body-schema'
import type { z } from 'zod'

export type RequestEmailChangeBodySchemaType = z.infer<typeof requestEmailChangeBodySchema>
