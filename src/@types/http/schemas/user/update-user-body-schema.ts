import type { updateBodySchema } from '@http/schemas/user/update-user-body-schema'
import type { UpdateUserHighLevelEducationType } from './update-user-high-level-education-type'
import type { UpdateUserHighLevelStudentEducationType } from './update-user-high-level-student-education-type'
import type { UpdateUserLowLevelEducationType } from './update-user-low-level-education-type'

export type UpdateBodyType = typeof updateBodySchema

export type UpdateUserBodySchemaType =
  | UpdateUserLowLevelEducationType
  | UpdateUserHighLevelStudentEducationType
  | UpdateUserHighLevelEducationType
