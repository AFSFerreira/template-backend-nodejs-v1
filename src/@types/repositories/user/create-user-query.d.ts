import type { EducationLevelType, IdentityType, OccupationType } from '@prisma/client'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'

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
