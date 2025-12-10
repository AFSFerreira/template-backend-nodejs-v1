import path from 'path'
import { fileURLToPath } from 'url'
import { IS_PROD } from './env-constants'
import { ELECTION_NOTICE_FILE_NAME, STATUTE_FILE_NAME } from './static-file-constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = IS_PROD ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..')

export const REGISTER_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/user/profile-images')
export const REGISTER_TEMP_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/temp/user/profile-images')

export const DOCUMENTS_PATH = path.join(BASE_PROJECT_PATH, 'uploads/documents')

export const STATUTE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, STATUTE_FILE_NAME + '*')

export const ELECTION_NOTICE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, ELECTION_NOTICE_FILE_NAME + '*')
