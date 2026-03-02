import type { updateMembershipStatusParamsSchema } from '@http/schemas/user/update-membership-status-params-schema'
import type z from 'zod'

export type UpdateMembershipStatusParamsSchemaType = z.infer<typeof updateMembershipStatusParamsSchema>
