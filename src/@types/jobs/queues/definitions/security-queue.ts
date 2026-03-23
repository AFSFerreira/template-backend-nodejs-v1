import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { Prisma } from '@prisma/generated/client'

export interface UpgradePasswordHashJobData {
  type: 'upgrade-password-hash'
  userId: string
  password: string
}

export interface IncrementLoginAttemptsJobData {
  type: 'increment-login-attempts'
  userId: string
}

export interface ResetLoginAttemptsJobData {
  type: 'reset-login-attempts'
  userId: string
}

export interface SetLastLoginJobData {
  type: 'set-last-login'
  userId: string
}

export interface CreateAuthenticationAuditJobData {
  type: 'create-authentication-audit'
  audit: Prisma.AuthenticationAuditUncheckedCreateInput
}

export interface UpgradePasswordHashResult {
  userId: string
  newPasswordHash: HashedPassword
}

export type SecurityJobData =
  | UpgradePasswordHashJobData
  | IncrementLoginAttemptsJobData
  | ResetLoginAttemptsJobData
  | SetLastLoginJobData
  | CreateAuthenticationAuditJobData
