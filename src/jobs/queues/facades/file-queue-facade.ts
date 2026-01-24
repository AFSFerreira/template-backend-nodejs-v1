import type {
  CopyFileOperation,
  DeleteFileOperation,
  MoveFileOperation,
} from '@custom-types/jobs/queues/definitions/file-processor'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
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

export async function deleteFileEnqueued(input: Omit<DeleteFileOperation, 'type'>) {
  logger.info(ENQUEUING_DELETE_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasksNames.file.delete, {
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

export async function moveFileEnqueued(input: Omit<MoveFileOperation, 'type'>) {
  logger.info(ENQUEUING_MOVE_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasksNames.file.move, {
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

export async function copyFileEnqueued(input: Omit<CopyFileOperation, 'type'>) {
  logger.info(ENQUEUING_COPY_FILE_JOB)

  try {
    const job = await fileQueue.add(bullmqTokens.tasksNames.file.copy, {
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
