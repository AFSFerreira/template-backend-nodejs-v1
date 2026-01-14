import type { RegisterUserHighLevelEducationType } from '../../../schemas/utils/register-user-high-level-education-type'
import type { RegisterUserLowLevelEducationType } from '../../../schemas/utils/register-user-low-level-education-type'
import type { RegisterUserHighLevelStudentEducationType } from './register-user-high-level-student-education-type'

export type RegisterUserBodySchemaType =
  | RegisterUserLowLevelEducationType
  | RegisterUserHighLevelStudentEducationType
  | RegisterUserHighLevelEducationType
