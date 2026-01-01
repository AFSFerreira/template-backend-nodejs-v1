import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/user-simplified'

export interface UserWithSimplifiedDetails extends CustomUserWithSimplifiedDetails {}

export interface HTTPSimplifiedUserDetails {
  id: string
  fullName: string
  institutionName?: string
  state?: string
  email?: string | null
}
