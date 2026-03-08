import type { MembershipStatusType, UserRoleType } from '@prisma/generated/enums'
import type { userSimplifiedAdapterSchema } from '@repositories/prisma/adapters/users/user-simplified-adapter-schema'
import type z from 'zod'

export interface UserWithSimplifiedDetailsRaw {
  id: number
  public_id: string
  full_name: string
  role: UserRoleType
  membership_status: MembershipStatusType
  profile_image: string
  email: string
  email_is_public: boolean
  state: string
  institution_name: string | null
}

export type CustomUserWithSimplifiedDetails = z.infer<typeof userSimplifiedAdapterSchema>
