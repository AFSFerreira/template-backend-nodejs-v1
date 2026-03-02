import type { reviewMembershipStatusParamsSchema } from '@http/schemas/user/review-membership-status-params-schema'
import type z from 'zod'

export type ReviewMembershipStatusParamsSchemaType = z.infer<typeof reviewMembershipStatusParamsSchema>
