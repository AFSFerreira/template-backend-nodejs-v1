import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { logError } from '@lib/pino/helpers/log-error'
import { INVALID_FILESYSTEM_PATHS } from '@messages/loggings/system/file-loggings'
import { folderExistsSync } from '@services/files/folder-exists-sync'
import { InvalidFilesystemPathsError } from '@utils/errors/files/invalid-filesystem-paths-error'
import { IS_PROD } from './env-constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = IS_PROD ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..')

// Caminhos relativos de templates nunjucks:
export const NUNJUCKS_TEMPLATES_ROOT_PATH = path.resolve(BASE_PROJECT_PATH, 'src', 'templates')

// Verificação para assegurar que todos os caminhos
// listados acima existem antes da execução do código:
// (WARNING: MANTENHA A LISTA ATUALIZADA!)
const verifiedPaths = [BASE_PROJECT_PATH, NUNJUCKS_TEMPLATES_ROOT_PATH].map((path) => ({
  path,
  exists: folderExistsSync(path),
}))

const failedVerifiedPaths = verifiedPaths.filter((pathStatus) => !pathStatus.exists)

if (failedVerifiedPaths.length !== 0) {
  const failedPaths = failedVerifiedPaths.map((failedPath) => failedPath.path)

  logError({
    error: new InvalidFilesystemPathsError(failedPaths),
    context: { failedPaths, failedVerifiedPaths },
    message: INVALID_FILESYSTEM_PATHS,
  })

  process.exit(1)
}
