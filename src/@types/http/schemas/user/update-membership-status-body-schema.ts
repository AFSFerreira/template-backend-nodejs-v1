import type { updateMembershipStatusBodySchema } from '@schemas/user/update-membership-status-body-schema'
import type z from 'zod'

export type UpdateMembershipStatusBodySchemaType = z.infer<typeof updateMembershipStatusBodySchema>
