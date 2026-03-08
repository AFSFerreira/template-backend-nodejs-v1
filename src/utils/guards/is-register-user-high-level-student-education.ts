import type { RegisterUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/register-user-high-level-student-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET } from '@constants/sets'

export function isRegisterUserHighLevelStudentEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserHighLevelStudentEducationType {
  return HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET.has(input.user.educationLevel)
}
