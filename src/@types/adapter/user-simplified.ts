export interface UserWithSimplifiedDetailsRaw {
  id: number
  public_id: string
  full_name: string
  email: string
  email_is_public: boolean
  state: string
  institution_name: string
}

export interface CustomUserWithSimplifiedDetails {
  id: number
  publicId: string
  fullName: string
  email: string
  emailIsPublic: boolean
  state?: string
  institutionName?: string
}
