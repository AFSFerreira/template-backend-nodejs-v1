import type {
  CopyFileEnqueuedInput,
  DeleteFileEnqueuedInput,
  MoveFileEnqueuedInput,
} from '@custom-types/jobs/queues/facades/file-queue-facade'
import { bullmqTokens } from '@lib/bullmq/helpers/bullmq-tokens'
import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import {
  COPY_FILE_JOB_ENQUEUED_SUCCESSFULLY,
  DELETE_FILE_JOB_ENQUEUED_SUCCESSFULLY,
  ENQUEUING_COPY_FILE_JOB,
  ENQUEUING_DELETE_FILE_JOB,
  ENQUEUING_MOVE_FILE_JOB,
  FAILED_TO_ENQUEUE_FILE_JOB,
  MOVE_FILE_JOB_ENQUEUED_SUCCESSFULLY,
} from '@messages/loggings/jobs/queues/files'
import { fileQueue } from '../definitions/file-queue'

export async function deleteFileEnqueued(input: DeleteFileEnqueuedInput) {
  logger.info(ENQUEUING_DELETE_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasks.file.delete, {
      ...input,
      type: 'delete',
    })

    logger.info(
      {
        jobId: job.id,
      },
      DELETE_FILE_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_FILE_JOB,
    })

    return null
  }
}

export async function moveFileEnqueued(input: MoveFileEnqueuedInput) {
  logger.info(ENQUEUING_MOVE_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasks.file.move, {
      ...input,
      type: 'move',
    })

    logger.info(
      {
        jobId: job.id,
      },
      MOVE_FILE_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_FILE_JOB,
    })

    return null
  }
}

export async function copyFileEnqueued(input: CopyFileEnqueuedInput) {
  logger.info(ENQUEUING_COPY_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasks.file.copy, {
      ...input,
      type: 'copy',
    })

    logger.info(
      {
        jobId: job.id,
      },
      COPY_FILE_JOB_ENQUEUED_SUCCESSFULLY,
    )

    return job
  } catch (error) {
    logError({
      error,
      message: FAILED_TO_ENQUEUE_FILE_JOB,
    })

    return null
  }
}
