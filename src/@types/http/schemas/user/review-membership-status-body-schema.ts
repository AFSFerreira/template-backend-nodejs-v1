import type { reviewMembershipStatusBodySchema } from '@http/schemas/user/review-membership-status-body-schema'
import type z from 'zod'

export type ReviewMembershipStatusBodySchemaType = z.infer<typeof reviewMembershipStatusBodySchema>
