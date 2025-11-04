import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = path.resolve(__dirname, '..', '..')
export const REGISTER_PROFILE_IMAGES_PATH = 'uploads/user/profile-images'
export const REGISTER_TEMP_PROFILE_IMAGES_PATH = 'uploads/temp/user/profile-images'
export const DEFAULT_PROFILE_IMAGE_PATH = REGISTER_PROFILE_IMAGES_PATH + '/default-profile-pic.png'

export const MB_IN_BYTES = 1024 * 1024

export const MAX_IMAGE_FILE_SIZE_BYTES = 2 * MB_IN_BYTES // Tamanho limite de 2Mb
