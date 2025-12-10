import type { ManagerPermissionsType } from '../utils/manager-permissions-type'
import type { RegularPermissionsType } from '../utils/regular-permissions-type'

export type UpdateUserPermissionsBodySchemaType = RegularPermissionsType | ManagerPermissionsType
