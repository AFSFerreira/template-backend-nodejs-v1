import type { RegisterUserLowLevelEducationType } from '@custom-types/http/schemas/user/register-user-low-level-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { LOW_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se o nível educacional do usuário em registro corresponde
 * a ensino básico (fundamental ou médio).
 *
 * Para usuários de ensino básico, campos de educação superior (instituição, curso,
 * orientação, etc.) não são exigidos no fluxo de registro.
 *
 * @typeParam T - Tipo que estende `HasEducationLevel`.
 * @param input - Dados do registro contendo `user.educationLevel`.
 * @returns `true` se o nível educacional for de ensino básico.
 */
export function isRegisterUserLowLevelEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserLowLevelEducationType {
  return LOW_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel)
}
