import path from 'node:path'

export const DEFAULT_PROFILE_IMAGE_NAME = 'default.png'

export const STATUTE_FILE_NAME = 'estatuto'

export const ELECTION_NOTICE_FILE_NAME = 'edital-eleição'

// Tipos de documentos aceitos:
export const allowedDocumentMimeTypes: readonly string[] = [
  'application/pdf', // pdf
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
]

// Tipos de formato de imagens de perfil permitidas:
export const allowedImageMimeTypes: readonly string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']

export const allowedHTMLMimeTypes: readonly string[] = ['text/html']

// Caminhos dos arquivos de presenters:
export const PRESENTERS_DIR = path.join('src', 'http', 'presenters')
export const PRESENTERS_GLOB_PATTERN = path.join(PRESENTERS_DIR, 'variants', '**', '*.presenter.{ts,js}')
export const PRESENTERS_OUTPUT_FILE = path.join(PRESENTERS_DIR, 'load-presenters.ts')

// Mensagens de cabeçalho do arquivo barril de importações de presenters:
export const PRESENTERS_AUTO_GENERATED_WARNING = `//⚠️ ARQUIVO GERADO AUTOMATICAMENTE - NÃO EDITE MANUALMENTE\n//⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY`
export const PRESENTERS_REGENERATE_COMMAND = `// Execute 'npm run generate:presenters' para atualizar\n// Run 'npm run generate:presenters' to update`

// Limite de imagens ativas no slider
export const MAX_SLIDER_IMAGES_QUANTITY = 15
