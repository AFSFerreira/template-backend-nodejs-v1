import type { FileJobLogging } from '@custom-types/custom/file-job-logging'
import type { ICopyFile } from '@custom-types/services/files/copy-file'
import type { IMoveFile } from '@custom-types/services/move-file'

export interface MoveFileOperation extends IMoveFile {
  type: 'move'
}

export interface DeleteFileOperation {
  type: 'delete'
  filePath: string
}

export interface CopyFileOperation extends ICopyFile {
  type: 'copy'
}

export type FileJobData = (MoveFileOperation | DeleteFileOperation | CopyFileOperation) & FileJobLogging
