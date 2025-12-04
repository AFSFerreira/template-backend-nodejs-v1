import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import type { EducationLevelType } from '@prisma/client'

export interface UpdateUserUseCaseRequest {
  publicId: string
  data: Omit<UpdateUserBodySchemaType, 'user'> & {
    user?: Omit<UpdateUserBodySchemaType['user'], 'educationLevel'> & { educationLevel?: EducationLevelType }
  }
}

export interface UpdateUserUseCaseResponse {
  user: UserWithDetails
}
