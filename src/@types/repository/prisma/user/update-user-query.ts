import type { UpdateUserBodySchemaType } from '@custom-types/http/schemas/user/update-user-body-schema'
import type { EducationLevelType, MembershipStatusType } from '@prisma/generated/enums'

export interface UpdateUserQuery {
  id: number
  data: Omit<UpdateUserBodySchemaType, 'user' | 'address'> & {
    user?: Omit<UpdateUserBodySchemaType['user'], 'password' | 'educationLevel'> & {
      passwordHash?: string
      educationLevel?: EducationLevelType
      membershipStatus?: MembershipStatusType
    }
    address?: Omit<NonNullable<UpdateUserBodySchemaType['address']>, 'state' | 'country'> & { stateId: number }
  }
}
