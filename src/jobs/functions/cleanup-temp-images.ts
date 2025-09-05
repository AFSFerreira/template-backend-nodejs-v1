import fs from 'fs/promises'
import path from 'node:path'
import {
  ERASE_FILES_CONCURRENCY,
  TEMP_FILES_DIRECTORY_ABSOLUTE_PATH,
  TEMP_PROFILE_IMAGES_TTL_IN_MS,
} from '@constants/jobs-configuration'

async function listFiles(dir: string) {
  return await fs.readdir(dir, { withFileTypes: true })
}

async function getFileAgeInMs(filePath: string) {
  const st = await fs.stat(filePath)
  const created = st.birthtimeMs || st.ctimeMs || st.mtimeMs
  return Date.now() - created
}

async function removeFile(filePath: string) {
  try {
    await fs.unlink(filePath)
  } catch (error) {
    // TODO: Melhorar com logger posteriormente
    console.error('failed to delete', filePath, error.message)
  }
}

export async function cleanupTempImages() {
  console.log(
    '[Profile Images] Executando limpeza diária de imagens de perfil obsoletas',
  )

  let fileNames: string[] | undefined

  try {
    const entries = await listFiles(TEMP_FILES_DIRECTORY_ABSOLUTE_PATH)
    fileNames = entries
      .filter((entry) => entry.isFile())
      .map((file) => file.name)
  } catch (error) {
    console.log('Erro ao listar aquivos:', TEMP_FILES_DIRECTORY_ABSOLUTE_PATH)
  }

  for (let idx = 0; idx < fileNames.length; idx += ERASE_FILES_CONCURRENCY) {
    const deleteBatch = fileNames.slice(idx, idx + ERASE_FILES_CONCURRENCY)

    await Promise.all(
      deleteBatch.map(async (fileName) => {
        const fullFilePath = path.join(
          TEMP_FILES_DIRECTORY_ABSOLUTE_PATH,
          fileName,
        )

        let fileAgeMs: number | undefined
        try {
          fileAgeMs = await getFileAgeInMs(fullFilePath)
        } catch (error) {
          console.log(
            'Arquivo não encontrado durante o cálculo do tempo de vida:',
            fullFilePath,
          )
        }

        if (fileAgeMs <= TEMP_PROFILE_IMAGES_TTL_IN_MS) return false

        try {
          await removeFile(fullFilePath)
        } catch (error) {
          console.log('Erro durante a remoção do arquivo:', fullFilePath)
        }

        return true
      }),
    )
  }
}
