import type { UpdateUserLowLevelEducationType } from '@custom-types/http/schemas/user/update-user-low-level-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/guards/has-education-level'
import { LOW_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se os dados de atualização do usuário indicam
 * nível educacional de ensino básico (fundamental ou médio).
 *
 * Variante de `isRegisterUserLowLevelEducation` para o fluxo de atualização.
 * Retorna `false` se `educationLevel` não estiver presente nos dados.
 *
 * @typeParam T - Tipo que estende `HasOptionalEducationLevel`.
 * @param input - Dados de atualização contendo opcionalmente `user.educationLevel`.
 * @returns `true` se presente e o nível educacional for de ensino básico.
 */
export function isUpdateUserLowLevelEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserLowLevelEducationType {
  return input.user?.educationLevel ? LOW_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel) : false
}
