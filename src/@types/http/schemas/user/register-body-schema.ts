import type { registerBodySchema } from '@http/schemas/user/register-body-schema'
import type { RegisterUserHighLevelStudentEducationType } from './register-user-high-level-student-education-type'
import type { RegisterUserLowLevelEducationType } from './register-user-low-level-education-type'

export type RegisterBodyType = typeof registerBodySchema

export type RegisterUserBodySchemaType =
  | RegisterUserLowLevelEducationType
  | RegisterUserHighLevelStudentEducationType
  | RegisterUserHighLevelStudentEducationType
