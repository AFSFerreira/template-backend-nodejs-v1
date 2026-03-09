import type { UpdateUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/update-user-high-level-student-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se os dados de atualização do usuário indicam
 * nível educacional de **estudante** de ensino superior.
 *
 * Variante de `isRegisterUserHighLevelStudentEducation` para o fluxo de atualização.
 * Retorna `false` se `educationLevel` não estiver presente nos dados.
 *
 * @typeParam T - Tipo que estende `HasOptionalEducationLevel`.
 * @param input - Dados de atualização contendo opcionalmente `user.educationLevel`.
 * @returns `true` se presente e for estudante de ensino superior.
 */
export function isUpdateUserHighLevelStudentEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserHighLevelStudentEducationType {
  return input.user?.educationLevel ? HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET.has(input.user.educationLevel) : false
}
