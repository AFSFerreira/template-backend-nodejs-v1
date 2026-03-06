import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { Prisma } from '@prisma/generated/client'

export interface UpgradePasswordHashJobData {
  type: 'upgrade-password-hash'
  userId: number
  password: string
}

export interface IncrementLoginAttemptsJobData {
  type: 'increment-login-attempts'
  userId: number
}

export interface ResetLoginAttemptsJobData {
  type: 'reset-login-attempts'
  userId: number
}

export interface SetLastLoginJobData {
  type: 'set-last-login'
  userId: number
}

export interface CreateAuthenticationAuditJobData {
  type: 'create-authentication-audit'
  audit: Prisma.AuthenticationAuditUncheckedCreateInput
}

export interface UpgradePasswordHashResult {
  userId: number
  newPasswordHash: HashedPassword
}

export type SecurityJobData =
  | UpgradePasswordHashJobData
  | IncrementLoginAttemptsJobData
  | ResetLoginAttemptsJobData
  | SetLastLoginJobData
  | CreateAuthenticationAuditJobData
