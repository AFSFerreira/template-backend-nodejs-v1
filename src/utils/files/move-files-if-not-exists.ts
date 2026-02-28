import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { fileExists } from '@utils/files/file-exists'

export async function moveFilesIfNotExists(input: ImagePathInfo | ImagePathInfo[]) {
  if (Array.isArray(input)) {
    input.forEach(moveFilesIfNotExists)
    return
  }

  const alreadyExists = await fileExists(input.newFilePath)

  if (alreadyExists) return

  await moveFileEnqueued(input)
}
