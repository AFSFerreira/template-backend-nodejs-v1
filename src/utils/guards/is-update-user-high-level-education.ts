import type { UpdateUserHighLevelEducationType } from '@custom-types/http/schemas/user/update-user-high-level-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se os dados de atualização do usuário indicam
 * nível educacional de ensino superior.
 *
 * Variante de `isRegisterUserHighLevelEducation` para o fluxo de atualização,
 * onde `educationLevel` é opcional. Retorna `false` se o campo não estiver presente.
 *
 * @typeParam T - Tipo que estende `HasOptionalEducationLevel`.
 * @param input - Dados de atualização contendo opcionalmente `user.educationLevel`.
 * @returns `true` se presente e o nível educacional for de ensino superior.
 */
export function isUpdateUserHighLevelEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserHighLevelEducationType {
  return input.user?.educationLevel ? HIGH_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel) : false
}
