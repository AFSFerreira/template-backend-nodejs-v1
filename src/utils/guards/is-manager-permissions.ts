import type { HasRole } from '@custom-types/services/guards/has-role'
import type { ManagerPermissionsType } from '@custom-types/services/guards/manager-permissions-type'
import { MANAGER_PERMISSIONS } from '@constants/sets'

/**
 * Type guard que verifica se um usuário possui permissões de gestor.
 *
 * Consulta o conjunto `MANAGER_PERMISSIONS` para determinar se a role do usuário
 * possui privilégios administrativos (ex: ADMIN, EDITOR, VIEWER).
 *
 * @typeParam T - Tipo que estende `HasRole`.
 * @param input - Objeto contendo a propriedade `role`.
 * @returns `true` se a role estiver no conjunto de permissões de gestor.
 */
export function isManagerPermissions<T extends HasRole>(input: T): input is T & ManagerPermissionsType {
  return MANAGER_PERMISSIONS.has(input.role)
}
