import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'

export interface UserSimplifiedPresenterInput extends CustomUserWithSimplifiedDetails {}

export interface UserWithSimplifiedDetails extends CustomUserWithSimplifiedDetails {}

export interface HTTPSimplifiedUserDetails {
  id: string
  fullName: string
  profileImage: string
  institutionName?: string
  state?: string
  email?: string | null
}
