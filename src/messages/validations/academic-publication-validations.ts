import { allowedDocumentMimeTypes, allowedImageMimeTypes } from '@constants/static-file-constants'
import { mapMimeTypeToExtension } from '@utils/mappers/map-mime-type'

export const INVALID_DOI_FORMAT = 'Link DOI com formato inválido'

export const ALLOWED_DOCUMENT_EXTENSIONS = `Formato de arquivo inválido. Formatos suportados: ${allowedDocumentMimeTypes.map((mime) => mapMimeTypeToExtension(mime)).join(', ')}`

export const ALLOWED_IMAGE_EXTENSIONS = `Formato de imagem inválido. Formatos suportados: ${allowedImageMimeTypes.map((mime) => mapMimeTypeToExtension(mime)).join(', ')}`
