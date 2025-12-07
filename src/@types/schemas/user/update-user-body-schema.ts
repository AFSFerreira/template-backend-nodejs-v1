import type { UpdateUserHighLevelEducationType } from '../utils/update-user-high-level-education-type'
import type { UpdateUserHighLevelStudentEducationType } from '../utils/update-user-high-level-student-education-type'
import type { UpdateUserLowLevelEducationType } from '../utils/update-user-low-level-education-type'

export type UpdateUserBodySchemaType =
  | UpdateUserLowLevelEducationType
  | UpdateUserHighLevelStudentEducationType
  | UpdateUserHighLevelEducationType
