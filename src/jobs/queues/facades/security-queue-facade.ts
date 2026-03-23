import type {
  CreateAuthenticationAuditEnqueuedInput,
  IncrementLoginAttemptsEnqueuedInput,
  ResetLoginAttemptsEnqueuedInput,
  SetLastLoginEnqueuedInput,
  UpgradePasswordHashEnqueuedInput,
} from '@custom-types/jobs/queues/facades/security-queue-facade'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import {
  CREATE_AUTHENTICATION_AUDIT_JOB_ENQUEUED_SUCCESSFULLY,
  ENQUEUING_CREATE_AUTHENTICATION_AUDIT_JOB,
  ENQUEUING_INCREMENT_LOGIN_ATTEMPTS_JOB,
  ENQUEUING_PASSWORD_UPGRADE_JOB,
  ENQUEUING_RESET_LOGIN_ATTEMPTS_JOB,
  ENQUEUING_SET_LAST_LOGIN_JOB,
  FAILED_TO_ENQUEUE_SECURITY_JOB,
  INCREMENT_LOGIN_ATTEMPTS_JOB_ENQUEUED_SUCCESSFULLY,
  PASSWORD_UPGRADE_JOB_ENQUEUED_SUCCESSFULLY,
  RESET_LOGIN_ATTEMPTS_JOB_ENQUEUED_SUCCESSFULLY,
  SET_LAST_LOGIN_JOB_ENQUEUED_SUCCESSFULLY,
} from '@messages/loggings/jobs/queues/security'
import { securityQueue } from '../definitions/security-queue'

export async function upgradeUserPasswordHashEnqueued(input: UpgradePasswordHashEnqueuedInput) {
  logger.info(ENQUEUING_PASSWORD_UPGRADE_JOB)

  try {
    const job = await securityQueue.add(bullmqTokens.tasks.security.upgradePasswordHash, {
      ...input,
      type: 'upgrade-password-hash',
    })

    logger.info(
      {
        jobId: job.id,
      },
      PASSWORD_UPGRADE_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_SECURITY_JOB,
    })

    return null
  }
}

export async function incrementLoginAttemptsEnqueued(input: IncrementLoginAttemptsEnqueuedInput) {
  logger.info(ENQUEUING_INCREMENT_LOGIN_ATTEMPTS_JOB)

  try {
    const job = await securityQueue.add(bullmqTokens.tasks.security.incrementLoginAttempts, {
      ...input,
      type: 'increment-login-attempts',
    })

    logger.info(
      {
        jobId: job.id,
      },
      INCREMENT_LOGIN_ATTEMPTS_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_SECURITY_JOB,
    })

    return null
  }
}

export async function resetLoginAttemptsEnqueued(input: ResetLoginAttemptsEnqueuedInput) {
  logger.info(ENQUEUING_RESET_LOGIN_ATTEMPTS_JOB)

  try {
    const job = await securityQueue.add(bullmqTokens.tasks.security.resetLoginAttempts, {
      ...input,
      type: 'reset-login-attempts',
    })

    logger.info(
      {
        jobId: job.id,
      },
      RESET_LOGIN_ATTEMPTS_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_SECURITY_JOB,
    })

    return null
  }
}

export async function createAuthenticationAuditEnqueued(input: CreateAuthenticationAuditEnqueuedInput) {
  logger.info(ENQUEUING_CREATE_AUTHENTICATION_AUDIT_JOB)

  try {
    const job = await securityQueue.add(bullmqTokens.tasks.security.createAuthenticationAudit, {
      ...input,
      type: 'create-authentication-audit',
    })

    logger.info(
      {
        jobId: job.id,
      },
      CREATE_AUTHENTICATION_AUDIT_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_SECURITY_JOB,
    })

    return null
  }
}

export async function setLastLoginEnqueued(input: SetLastLoginEnqueuedInput) {
  logger.info(ENQUEUING_SET_LAST_LOGIN_JOB)

  try {
    const job = await securityQueue.add(bullmqTokens.tasks.security.setLastLogin, {
      ...input,
      type: 'set-last-login',
    })

    logger.info(
      {
        jobId: job.id,
      },
      SET_LAST_LOGIN_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_SECURITY_JOB,
    })

    return null
  }
}
