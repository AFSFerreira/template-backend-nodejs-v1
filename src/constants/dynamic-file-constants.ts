import path from 'path'
import { fileURLToPath } from 'url'
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
export const BLOG_TEMP_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'images')
export const BLOG_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'images')

// Caminhos relativos de banners de blogs:
export const BLOG_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'blog', 'banners')
export const BLOG_TEMP_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'blog', 'banners')

// Caminhos relativos de banners de reuniões:
export const MEETING_BANNERS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'meeting', 'banners')

// Caminhos relativos de documentos:
export const DOCUMENTS_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'documents')

// Caminhos relativos de sliders:
export const HOME_PAGE_SLIDER_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'slider-image', 'home')
export const TEMP_SLIDER_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'slider-image')

// Caminhos relativos de imagens de perfil do corpo diretivo:
export const DIRECTOR_BOARD_PROFILE_IMAGES_PATH = path.resolve(
  BASE_PROJECT_PATH,
  'uploads',
  'director-board',
  'profile-images',
)

// Caminhos relativos para imagens de carousel:
export const SLIDER_IMAGES_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'slider-banner')

// Caminhos relativos de newsletters:
export const NEWSLETTER_TEMP_HTML_PATH = path.resolve(BASE_PROJECT_PATH, 'uploads', 'temp', 'newsletter', 'html')

// Padrão glob para identificar todos os arquivos de estatuto independentemente da extensão:
export const STATUTE_FILE_NAME_PATTERN = path.resolve(DOCUMENTS_PATH, STATUTE_FILE_NAME + '*')

// Padrão glob para identificar todos os arquivos de edital de eleição independentemente da extensão:
export const ELECTION_NOTICE_FILE_NAME_PATTERN = path.resolve(DOCUMENTS_PATH, ELECTION_NOTICE_FILE_NAME + '*')
