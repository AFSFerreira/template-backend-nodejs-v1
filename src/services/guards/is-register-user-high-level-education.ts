import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'
import type { RegisterUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/register-user-high-level-student-education-type'

export function isRegisterUserHighLevelEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserHighLevelStudentEducationType {
  return HIGH_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel)
}
