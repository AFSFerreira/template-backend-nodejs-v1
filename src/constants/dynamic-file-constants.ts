import path from 'path'
import { fileURLToPath } from 'url'
import { IS_PROD } from './env-constants'
import { ELECTION_NOTICE_FILE_NAME, STATUTE_FILE_NAME } from './static-file-constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = IS_PROD ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..')

export const PARTIAL_REGISTER_PROFILE_IMAGES_PATH = 'uploads/user/profile-images'
export const REGISTER_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, PARTIAL_REGISTER_PROFILE_IMAGES_PATH)
export const REGISTER_TEMP_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/temp/user/profile-images')

export const BLOG_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/blog/images')
export const BLOG_TEMP_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/temp/blog/images')

export const PARTIAL_BLOG_BANNERS_PATH = 'uploads/blog/banners'
export const BLOG_BANNERS_PATH = path.join(BASE_PROJECT_PATH, PARTIAL_BLOG_BANNERS_PATH)

export const BLOG_TEMP_BANNERS_PATH = path.join(BASE_PROJECT_PATH, '/uploads/temp/blog/banners')

export const PARTIAL_MEETING_BANNERS_IMAGE_PATH = 'uploads/meeting/banners'

export const DOCUMENTS_PATH = path.join(BASE_PROJECT_PATH, 'uploads/documents')

export const STATUTE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, STATUTE_FILE_NAME + '*')

export const ELECTION_NOTICE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, ELECTION_NOTICE_FILE_NAME + '*')
