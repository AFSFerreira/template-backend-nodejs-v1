import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { fileExists } from '@services/files/file-exists'

/**
 * Move arquivos para destino via fila BullMQ, apenas se o arquivo de destino ainda não existir.
 *
 * Aceita um único `ImagePathInfo` ou um array. Para cada item, verifica
 * se o destino já existe antes de enfileirar a operação de movimentação.
 *
 * @param input - Informações de caminho (origem/destino) de uma ou mais imagens.
 */
export async function moveFilesIfNotExists(input: ImagePathInfo | ImagePathInfo[]) {
  if (Array.isArray(input)) {
    input.forEach(moveFilesIfNotExists)
    return
  }

  const alreadyExists = await fileExists(input.newFilePath)

  if (alreadyExists) return

  await moveFileEnqueued(input)
}
