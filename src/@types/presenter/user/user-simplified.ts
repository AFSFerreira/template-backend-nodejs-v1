export interface UserWithSimplifiedDetails {
  id: number
  publicId: string
  fullName: string
  email: string
  emailIsPublic: boolean
  state?: string
  institutionName?: string
}

export interface HTTPSimplifiedUserDetails {
  id: string
  fullName: string
  institutionName?: string
  state?: string
  email?: string | null
}
