import type { RegisterUserBodySchemaType } from '@custom-types/schemas/user/register-body-schema'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'

export interface RegisterUseCaseRequest {
  user: RegisterUserBodySchemaType['user']
  address: RegisterUserBodySchemaType['address']
  keyword?: RegisterUserBodySchemaType['keyword']
  enrolledCourse?: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication?: RegisterUserBodySchemaType['academicPublication']
  activityArea?: RegisterUserBodySchemaType['activityArea']
  institution?: RegisterUserBodySchemaType['institution']
}

export interface RegisterUseCaseResponse {
  user: UserWithDetails
}
