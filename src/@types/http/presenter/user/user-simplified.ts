import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'

export interface UserWithSimplifiedDetails extends CustomUserWithSimplifiedDetails {}

export interface HTTPSimplifiedUserDetails {
  id: string
  fullName: string
  profileImage: string
  institutionName?: string
  state?: string
  email?: string | null
}
