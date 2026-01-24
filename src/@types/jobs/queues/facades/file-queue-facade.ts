import type {
  CopyFileOperation,
  DeleteFileOperation,
  MoveFileOperation,
} from '@custom-types/jobs/queues/definitions/file-processor'

export interface DeleteFileEnqueuedInput extends Omit<DeleteFileOperation, 'type'> {}

export interface MoveFileEnqueuedInput extends Omit<MoveFileOperation, 'type'> {}

export interface CopyFileEnqueuedInput extends Omit<CopyFileOperation, 'type'> {}
