import type { HasRole } from '@custom-types/services/guards/has-role'
import type { ManagerPermissionsType } from '@custom-types/services/guards/manager-permissions-type'
import { MANAGER_PERMISSIONS } from '@constants/sets'

export function isManagerPermissions<T extends HasRole>(input: T): input is T & ManagerPermissionsType {
  return MANAGER_PERMISSIONS.has(input.role)
}
