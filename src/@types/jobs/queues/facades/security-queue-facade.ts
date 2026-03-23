import type {
  CreateAuthenticationAuditJobData,
  IncrementLoginAttemptsJobData,
  ResetLoginAttemptsJobData,
  SetLastLoginJobData,
  UpgradePasswordHashJobData,
} from '@custom-types/jobs/queues/definitions/security-queue'

export interface UpgradePasswordHashEnqueuedInput extends Omit<UpgradePasswordHashJobData, 'type'> {}

export interface IncrementLoginAttemptsEnqueuedInput extends Omit<IncrementLoginAttemptsJobData, 'type'> {}

export interface ResetLoginAttemptsEnqueuedInput extends Omit<ResetLoginAttemptsJobData, 'type'> {}

export interface SetLastLoginEnqueuedInput extends Omit<SetLastLoginJobData, 'type'> {}

export interface CreateAuthenticationAuditEnqueuedInput extends Omit<CreateAuthenticationAuditJobData, 'type'> {}
