import { deleteFile } from './delete-file'

export async function deleteFiles(files: string[]) {
  const deletionResults = await Promise.allSettled(files.map(async (file) => await deleteFile(file)))

  const deletionFailures = deletionResults.filter((value) => value.status === 'rejected')

  if (deletionFailures.length > 0) {
    return false
  }

  return true
}
