import type { RegisterUserBodySchemaType } from '@custom-types/schemas/user/register-body-schema'
import type { EducationLevelType, IdentityType, OccupationType } from '@prisma/client'

export interface CreateUserQuery {
  user: Omit<RegisterUserBodySchemaType['user'], 'password' | 'occupation' | 'educationLevel' | 'identity'> & {
    passwordHash: string
    educationLevel: EducationLevelType
    profileImage: string
    occupation?: OccupationType
    identityType: IdentityType
    identityDocument: string
  }
  activityArea: RegisterUserBodySchemaType['activityArea']
  address: RegisterUserBodySchemaType['address']
  enrolledCourse: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication: RegisterUserBodySchemaType['academicPublication']
  keyword: RegisterUserBodySchemaType['keyword']
  institution: RegisterUserBodySchemaType['institution']
}
