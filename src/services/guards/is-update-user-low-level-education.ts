import type { UpdateUserLowLevelEducationType } from '@custom-types/http/schemas/user/update-user-low-level-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/guards/has-education-level'
import { LOW_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'

export function isUpdateUserLowLevelEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserLowLevelEducationType {
  return input.user?.educationLevel ? LOW_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel) : false
}
