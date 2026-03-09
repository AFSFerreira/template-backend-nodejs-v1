import type { RegisterUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/register-user-high-level-student-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se o nível educacional do usuário em registro corresponde
 * a ensino superior (graduação, mestrado, doutorado, pós-doutorado e seus graus concluídos).
 *
 * Determina se campos adicionais de educação superior (instituição, curso, etc.)
 * devem ser obrigatórios no fluxo de registro.
 *
 * @typeParam T - Tipo que estende `HasEducationLevel`.
 * @param input - Dados do registro contendo `user.educationLevel`.
 * @returns `true` se o nível educacional for de ensino superior.
 */
export function isRegisterUserHighLevelEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserHighLevelStudentEducationType {
  return HIGH_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel)
}
