import path from 'path'
import { fileURLToPath } from 'url'
import { IS_PROD } from './env-constants'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const BASE_PROJECT_PATH = IS_PROD ? path.resolve(__dirname, '..') : path.resolve(__dirname, '..', '..')

export const DEFAULT_PROFILE_IMAGE_NAME = 'default.png'

export const REGISTER_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/user/profile-images')
export const REGISTER_TEMP_PROFILE_IMAGES_PATH = path.join(BASE_PROJECT_PATH, 'uploads/temp/user/profile-images')

export const DOCUMENTS_PATH = path.join(BASE_PROJECT_PATH, 'uploads/documents')

export const STATUTE_FILE_NAME = 'estatuto'
export const STATUTE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, STATUTE_FILE_NAME + '*')

export const ELECTION_NOTICE_FILE_NAME = 'edital-eleição'
export const ELECTION_NOTICE_FILE_NAME_PATTERN = path.join(DOCUMENTS_PATH, ELECTION_NOTICE_FILE_NAME + '*')

export const MB_IN_BYTES = 1024 * 1024

export const MAX_IMAGE_FILE_SIZE_BYTES = 5 * MB_IN_BYTES // Tamanho limite de 5mb para as imagens de perfil dos usuários comuns
export const MAX_DOCUMENT_FILE_SIZE_BYTES = 20 * MB_IN_BYTES // Tamanho limite de 20mb para os documentos enviados

// Tipos de documentos aceitos:
export const allowedDocumentMimeTypes: readonly string[] = [
  'application/pdf', // pdf
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
]

// Tipos de formato de imagens de perfil permitidas:
export const allowedImageMimeTypes: readonly string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
