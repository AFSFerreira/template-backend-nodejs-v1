import type { UserRoleType } from "@prisma/client"

export interface UserWithSimplifiedDetailsRaw {
  id: number
  public_id: string
  full_name: string
  role: UserRoleType
  profile_image: string
  email: string
  email_is_public: boolean
  state: string
  institution_name: string
}

export interface CustomUserWithSimplifiedDetails {
  id: number
  publicId: string
  role: UserRoleType
  fullName: string
  email: string
  profileImage: string
  emailIsPublic: boolean
  state?: string
  institutionName?: string
}
