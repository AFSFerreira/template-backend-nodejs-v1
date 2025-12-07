import type { RegisterUserHighLevelEducationType } from '../utils/register-user-high-level-education-type'
import type { RegisterUserHighLevelStudentEducationType } from '../utils/register-user-high-level-student-education-type'
import type { RegisterUserLowLevelEducationType } from '../utils/register-user-low-level-education-type'

export type RegisterUserBodySchemaType =
  | RegisterUserLowLevelEducationType
  | RegisterUserHighLevelStudentEducationType
  | RegisterUserHighLevelEducationType
