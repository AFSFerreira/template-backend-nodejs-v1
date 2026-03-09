import type { ICopyFile } from '@custom-types/services/files/copy-file'
import type { FileInfo } from '@custom-types/services/files/file-info'
import path from 'node:path'
import { logError } from '@lib/pino/helpers/log-error'
import { DIRECTORY_NOT_FOUND_ERROR } from '@messages/loggings/system/file-loggings'
import { deleteFile } from '@services/files/delete-file'
import { fileExists } from '@services/files/file-exists'
import { HashService } from '@services/hashes/hash-service'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { getFileExtension } from '@utils/files/get-file-extension'
import fs, { ensureDir } from 'fs-extra'

/**
 * Copia um arquivo para um diretório de destino, opcionalmente com sharding de pasta.
 *
 * Gera nome único com a extensão do arquivo original (ou usa `newFilename` se fornecido).
 * Cria subdiretórios via {@link buildShardFileFolder} quando `buildShard` for `true`.
 *
 * @param sourceFilePath - Caminho absoluto do arquivo de origem.
 * @param newFilename - Nome personalizado (opcional; gera UUID se não informado).
 * @param destinationFolderPath - Diretório de destino.
 * @param buildShard - Se `true`, cria subdiretórios de sharding baseados no nome do arquivo.
 * @returns Informações do arquivo copiado com flag `success`.
 */
export async function copyFile({
  sourceFilePath,
  newFilename,
  destinationFolderPath,
  buildShard,
}: ICopyFile): Promise<FileInfo> {
  const filename = `${newFilename ?? HashService.generateFileId()}.${getFileExtension(sourceFilePath)}`
  const fileFolderShard = buildShard ? buildShardFileFolder(filename) : ''
  const finalFilePath = path.resolve(destinationFolderPath, fileFolderShard, filename)

  const partialReturnData = { finalFilePath, filename }

  const failedResponse = { ...partialReturnData, success: false }

  if (!fileExists(sourceFilePath)) {
    return failedResponse
  }

  try {
    await ensureDir(path.join(destinationFolderPath, fileFolderShard))
  } catch (error) {
    logError({ error, message: DIRECTORY_NOT_FOUND_ERROR })

    return failedResponse
  }

  try {
    await fs.copyFile(sourceFilePath, finalFilePath)

    return { ...partialReturnData, success: true }
  } catch (_error) {
    await deleteFile(finalFilePath)

    return failedResponse
  }
}
