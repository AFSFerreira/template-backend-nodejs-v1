import type { IMoveFile } from '@custom-types/services/files/move-file'
import { moveFile } from './move-file'

export async function moveFiles(files: IMoveFile[]) {
  const moveResults = await Promise.allSettled(files.map(async (file) => await moveFile(file)))

  const moveFailures = moveResults.filter((value) => value.status === 'rejected')

  if (moveFailures.length > 0) {
    return false
  }

  return true
}
