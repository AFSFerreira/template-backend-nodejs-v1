export interface SetPasswordTokenQuery {
  id: number
  tokenData: {
    recoveryPasswordTokenHash: string
    recoveryPasswordTokenExpiresAt: Date
  }
}
