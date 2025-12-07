import { HIGH_LEVEL_EDUCATION_TYPE_SET } from '@constants/sets'
import type { UpdateUserHighLevelEducationType } from '@custom-types/schemas/utils/update-user-high-level-education-type'
import type { HasOptionalEducationLevel } from '@custom-types/services/has-education-level'

export function isUpdateUserHighLevelEducation<T extends HasOptionalEducationLevel>(
  input: T,
): input is T & UpdateUserHighLevelEducationType {
  return input.user?.educationLevel ? HIGH_LEVEL_EDUCATION_TYPE_SET.has(input.user.educationLevel) : false
}
