import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { logError } from '@lib/logger/helpers/log-error'
import { INVALID_FILESYSTEM_PATHS } from '@messages/loggings/system/file-loggings'
import { InvalidFilesystemPathsError } from '@services/errors/files/invalid-filesystem-paths-error'
import { fileExistsSync } from '@utils/files/file-exists-sync'
import { IS_PROD } from './env-constants'
import { ELECTION_NOTICE_FILE_NAME, STATUTE_FILE_NAME } from './static-file-constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = IS_PROD ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..')

// Caminhos relativos de imagens de perfil de usuários:
export const REGISTER_PROFILE_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'user', 'profile-images')
export const REGISTER_TEMP_PROFILE_IMAGES_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'temp',
  'user',
  'profile-images',
)

// Caminhos relativos de imagens de blogs:
export const BLOG_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'images')
export const BLOG_TEMP_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'images')

// Caminhos relativos de banners de blogs:
export const BLOG_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'banners')
export const BLOG_TEMP_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'banners')

// Caminhos relativos de banners de reuniões:
export const MEETING_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'meeting', 'banners')
export const MEETING_TEMP_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'meeting', 'banners')

export const MEETING_AGENDAS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'meeting', 'agendas')
export const MEETING_TEMP_AGENDAS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'meeting', 'agendas')

// Caminhos relativos de documentos institucionais públicos:
export const INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'documents',
  'public',
)

// Caminhos relativos de sliders:
export const SLIDER_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'slider-image')
export const HOME_PAGE_SLIDER_IMAGES_PATH = path.resolve(SLIDER_IMAGES_PATH, 'home-page')
export const SLIDER_TEMP_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'slider-image')

// Caminhos relativos de imagens de perfil do corpo diretivo:
export const DIRECTOR_BOARD_PROFILE_IMAGES_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'director-board',
  'profile-images',
)
export const DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'temp',
  'director-board',
  'profile-images',
)

// Caminhos relativos das imagens da página institucional:
export const INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'temp',
  'institutional-info',
)

// Caminhos relativos de newsletters:
export const NEWSLETTER_HTML_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'newsletter', 'html')
export const NEWSLETTER_TEMP_HTML_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'newsletter', 'html')

// Padrão glob para identificar todos os arquivos de estatuto independentemente da extensão:
export const STATUTE_FILE_NAME_PATTERN = path.resolve(INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH, `${STATUTE_FILE_NAME}*`)

// Padrão glob para identificar todos os arquivos de edital de eleição independentemente da extensão:
export const ELECTION_NOTICE_FILE_NAME_PATTERN = path.resolve(
  INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH,
  `${ELECTION_NOTICE_FILE_NAME}*`,
)

// Verificação para assegurar que todos os caminhos
// listados acima existem antes da execução do código:
// (WARNING: MANTENHA A LISTA ATUALIZADA!)
const verifiedPaths = [
  REGISTER_PROFILE_IMAGES_PATH,
  REGISTER_TEMP_PROFILE_IMAGES_PATH,
  BLOG_BANNERS_PATH,
  BLOG_TEMP_IMAGES_PATH,
  MEETING_BANNERS_PATH,
  MEETING_TEMP_BANNERS_PATH,
  MEETING_AGENDAS_PATH,
  MEETING_TEMP_AGENDAS_PATH,
  INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH,
  SLIDER_IMAGES_PATH,
  HOME_PAGE_SLIDER_IMAGES_PATH,
  SLIDER_TEMP_IMAGES_PATH,
  DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
  DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH,
  INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
  NEWSLETTER_HTML_PATH,
  NEWSLETTER_TEMP_HTML_PATH,
].map((path) => ({ path, exists: fileExistsSync(path) }))

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
