import type { RegisterUserHighLevelStudentEducationType } from './register-user-high-level-student-education-type'
import type { RegisterUserLowLevelEducationType } from './register-user-low-level-education-type'

export type RegisterUserBodySchemaType =
  | RegisterUserLowLevelEducationType
  | RegisterUserHighLevelStudentEducationType
  | RegisterUserHighLevelStudentEducationType
