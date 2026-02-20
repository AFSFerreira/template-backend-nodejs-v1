import type { AuditInfo } from '@custom-types/custom/audit-info'

export interface DeleteDirectorBoardUseCaseRequest {
  publicId: string
  audit: AuditInfo
}

export interface DeleteDirectorBoardUseCaseResponse {}
