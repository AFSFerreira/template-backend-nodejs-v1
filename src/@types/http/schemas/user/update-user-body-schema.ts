import type { UpdateUserHighLevelEducationType } from './update-user-high-level-education-type'
import type { UpdateUserHighLevelStudentEducationType } from './update-user-high-level-student-education-type'
import type { UpdateUserLowLevelEducationType } from './update-user-low-level-education-type'

export type UpdateUserBodySchemaType =
  | UpdateUserLowLevelEducationType
  | UpdateUserHighLevelStudentEducationType
  | UpdateUserHighLevelEducationType
