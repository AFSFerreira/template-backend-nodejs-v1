import type { UpdateUserHighLevelStudentEducationType } from '@custom-types/http/schemas/user/update-user-high-level-student-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET } from '@constants/sets'

export function isUpdateUserHighLevelStudentEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserHighLevelStudentEducationType {
  return input.user?.educationLevel ? HIGH_LEVEL_EDUCATION_STUDENT_TYPE_SET.has(input.user.educationLevel) : false
}
