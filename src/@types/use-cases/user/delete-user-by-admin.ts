import type { AuditInfo } from '@custom-types/custom/audit-info'

export interface DeleteUserByAdminUseCaseRequest {
  adminPublicId: string
  targetUserPublicId: string
  audit: AuditInfo
}

export interface DeleteUserByAdminUseCaseResponse {}
