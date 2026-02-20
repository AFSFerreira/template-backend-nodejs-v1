import type { AuditInfo } from '@custom-types/custom/audit-info'
import type { UpdateMembershipStatusBodySchemaType } from '@custom-types/http/schemas/user/update-membership-status-body-schema'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'

export interface UpdateMembershipStatusUseCaseRequest extends UpdateMembershipStatusBodySchemaType {
  publicId: string
  audit: AuditInfo
}

export interface UpdateMembershipStatusUseCaseResponse {
  user: UserWithDetails
}
