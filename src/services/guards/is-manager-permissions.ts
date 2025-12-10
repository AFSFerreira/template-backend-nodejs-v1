import type { ManagerPermissionsType } from '@custom-types/schemas/utils/manager-permissions-type'
import type { HasRole } from '@custom-types/services/has-role'
import { MANAGER_PERMISSIONS } from '@constants/sets'

export function isManagerPermissions<T extends HasRole>(input: T): input is T & ManagerPermissionsType {
  return MANAGER_PERMISSIONS.has(input.role)
}
