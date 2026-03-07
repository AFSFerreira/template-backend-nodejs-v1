import type { AuditInfo } from '@custom-types/custom/audit-info'
import type { ReviewMembershipStatusBodySchemaType } from '@custom-types/http/schemas/user/review-membership-status-body-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export interface ReviewMembershipStatusUseCaseRequest extends ReviewMembershipStatusBodySchemaType {
  publicId: string
  audit: AuditInfo
}

export interface ReviewMembershipStatusUseCaseResponse {
  user: UserWithDetails
}
