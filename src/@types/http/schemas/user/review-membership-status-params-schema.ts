import type { reviewMembershipStatusParamsSchema } from '@http/schemas/user/review-membership-status-params-schema'
import type z from 'zod'

export type ReviewMembershipStatusParamsType = typeof reviewMembershipStatusParamsSchema

export type ReviewMembershipStatusParamsSchemaType = z.infer<ReviewMembershipStatusParamsType>
