import type { ReviewMembershipStatusBodySchemaType } from '@custom-types/schemas/user/review-membership-status-body-schema'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'

export interface ReviewMembershipStatusUseCaseRequest extends ReviewMembershipStatusBodySchemaType {
  publicId: string
}

export interface ReviewMembershipStatusUseCaseResponse {
  user?: UserWithDetails
}
