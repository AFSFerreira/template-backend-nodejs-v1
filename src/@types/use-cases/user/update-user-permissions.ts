import type { AuditInfo } from '@custom-types/custom/audit-info'
import type { UpdateUserPermissionsBodySchemaType } from '@custom-types/http/schemas/user/update-user-permissions-body-schema'

export interface UpdateUserPermissionsUseCaseRequest {
  publicId: string
  data: UpdateUserPermissionsBodySchemaType
  audit: AuditInfo
}
