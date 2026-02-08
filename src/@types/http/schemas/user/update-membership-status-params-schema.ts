import type { updateMembershipStatusParamsSchema } from '@schemas/user/update-membership-status-params-schema'
import type z from 'zod'

export type UpdateMembershipStatusParamsSchemaType = z.infer<typeof updateMembershipStatusParamsSchema>
