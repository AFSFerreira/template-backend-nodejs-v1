import type { RegisterUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/register-user-high-level-student-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET } from '@constants/sets'

/**
 * Type guard que verifica se o nível educacional do usuário em registro corresponde
 * a um **estudante** de ensino superior (graduando, mestrando, doutorando, pós-doutorando).
 *
 * Diferencia-se de `isRegisterUserHighLevelEducation` por incluir apenas os níveis de
 * estudo em andamento, excluindo graus concluídos. Determina se campos como
 * "data prevista de conclusão" devem ser exigidos.
 *
 * @typeParam T - Tipo que estende `HasEducationLevel`.
 * @param input - Dados do registro contendo `user.educationLevel`.
 * @returns `true` se o nível educacional for de estudante de ensino superior.
 */
export function isRegisterUserHighLevelStudentEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserHighLevelStudentEducationType {
  return HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET.has(input.user.educationLevel)
}
