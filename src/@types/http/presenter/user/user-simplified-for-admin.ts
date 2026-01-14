import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'
import type { UserRoleType } from '@prisma/client'

export interface UserWithSimplifiedDetailsForAdmin extends CustomUserWithSimplifiedDetails {
  role: UserRoleType
}

export interface HTTPSimplifiedUserDetailsForAdmin {
  id: string
  fullName: string
  profileImage: string
  institutionName?: string
  state?: string
  email: string
  role: UserRoleType
}
