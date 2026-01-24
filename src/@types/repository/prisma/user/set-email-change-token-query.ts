export interface SetEmailChangeTokenQuery {
  id: number
  newEmail: string
  emailVerificationTokenHash: string
  emailVerificationTokenExpiresAt: Date
}
