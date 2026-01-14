import type { RegisterUserLowLevelEducationType } from '@custom-types/schemas/utils/register-user-low-level-education-type'
import type { HasEducationLevel } from '@custom-types/services/guards/has-education-level'
import { LOW_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

export function isRegisterUserLowLevelEducation<T extends HasEducationLevel>(
  input: T,
): input is T & RegisterUserLowLevelEducationType {
  return LOW_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel)
}
