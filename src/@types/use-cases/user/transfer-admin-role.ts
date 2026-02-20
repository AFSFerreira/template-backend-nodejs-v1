import type { AuditInfo } from '@custom-types/custom/audit-info'

export interface TransferAdminRoleUseCaseRequest {
  currentAdminPublicId: string
  newAdminPublicId: string
  audit: AuditInfo
}

export interface TransferAdminRoleUseCaseResponse {}
