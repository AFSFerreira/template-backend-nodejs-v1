import type { reviewMembershipStatusBodySchema } from '@http/schemas/user/review-membership-status-body-schema'
import type z from 'zod'

export type ReviewMembershipStatusBodyType = typeof reviewMembershipStatusBodySchema

export type ReviewMembershipStatusBodySchemaType = z.infer<ReviewMembershipStatusBodyType>
