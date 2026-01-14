import type { RegisterUserHighLevelEducationType } from '@custom-types/schemas/utils/register-user-high-level-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { HIGH_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

export function isRegisterUserHighLevelEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserHighLevelEducationType {
  return HIGH_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel)
}
