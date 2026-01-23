import type { FileJobData } from '@custom-types/jobs/queues/definitions/file-processor'
import type { Job } from 'bullmq'
import { logger } from '@lib/logger'
import {
  FILE_COPIED_SUCCESSFULLY,
  FILE_DELETED_SUCCESSFULLY,
  FILE_MOVED_SUCCESSFULLY,
} from '@messages/loggings/jobs/queues/files'
import { copyFile } from '@services/files/copy-file'
import { moveFile } from '@services/files/move-file'
import { deleteFile } from '@utils/files/delete-file'
import { InvalidFileOperationTypeError } from '../errors/invalid-file-operation-type-error'

export async function fileProcessor(job: Job<FileJobData>): Promise<void> {
  const data = job.data

  switch (data.type) {
    case 'move': {
      const { type, logging, ...filteredInfo } = data

      await moveFile(filteredInfo)

      logger.info(filteredInfo, FILE_MOVED_SUCCESSFULLY)
      break
    }

    case 'delete': {
      await deleteFile(data.filePath)

      logger.info({ filePath: data.filePath }, FILE_DELETED_SUCCESSFULLY)
      break
    }

    case 'copy': {
      const { type, logging, ...filteredInfo } = data

      await copyFile(filteredInfo)

      logger.info(filteredInfo, FILE_COPIED_SUCCESSFULLY)
      break
    }

    default: {
      throw new InvalidFileOperationTypeError(data)
    }
  }
}
