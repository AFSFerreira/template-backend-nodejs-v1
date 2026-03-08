import path from 'node:path'

export const DEFAULT_PROFILE_IMAGE_NAME = 'default.png'

// TIP: Considerar adotar a convenção de sempre nomear as variantes de templates com 'template.html.njk' e 'template.text.njk'
// e apenas atribuir o nome do novo template à pasta que irá conter o template em si (e.g.: 'template-evento', 'template-natal', etc)

// Caminhos para templates de renderer a partir da pasta de `src/templates`:
export const NEWSLETTER_BASE_TEMPLATE_FOLDER = path.join('newsletter', 'newsletter-email', 'default')
export const NEWSLETTER_EMAIL_HTML_TEMPLATE = path.join(NEWSLETTER_BASE_TEMPLATE_FOLDER, 'template.html.njk')
export const NEWSLETTER_EMAIL_TEXT_TEMPLATE = path.join(NEWSLETTER_BASE_TEMPLATE_FOLDER, 'template.text.njk')

// Caminhos de templates Nunjucks de e-mails de usuário (HTML e texto):
export const CONFIRM_ACCOUNT_HTML_TEMPLATE = path.join('user', 'confirm-account', 'confirm-account.html.njk')
export const CONFIRM_ACCOUNT_TEXT_TEMPLATE = path.join('user', 'confirm-account', 'confirm-account.text.njk')

export const CHANGE_EMAIL_HTML_TEMPLATE = path.join('user', 'change-email', 'change-email.html.njk')
export const CHANGE_EMAIL_TEXT_TEMPLATE = path.join('user', 'change-email', 'change-email.text.njk')

export const FORGOT_PASSWORD_HTML_TEMPLATE = path.join('user', 'forgot-password', 'forgot-password.html.njk')
export const FORGOT_PASSWORD_TEXT_TEMPLATE = path.join('user', 'forgot-password', 'forgot-password.text.njk')

export const MEMBERSHIP_ACCEPTED_HTML_TEMPLATE = path.join(
  'user',
  'membership-accepted',
  'membership-accepted.html.njk',
)
export const MEMBERSHIP_ACCEPTED_TEXT_TEMPLATE = path.join(
  'user',
  'membership-accepted',
  'membership-accepted.text.njk',
)

export const MEMBERSHIP_REJECTED_HTML_TEMPLATE = path.join(
  'user',
  'membership-rejected',
  'membership-rejected.html.njk',
)
export const MEMBERSHIP_REJECTED_TEXT_TEMPLATE = path.join(
  'user',
  'membership-rejected',
  'membership-rejected.text.njk',
)

export const DELETE_USER_HTML_TEMPLATE = path.join('user', 'delete-user', 'delete-user.html.njk')
export const DELETE_USER_TEXT_TEMPLATE = path.join('user', 'delete-user', 'delete-user.text.njk')

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
export const PRESENTERS_DIR = path.resolve('src', 'http', 'presenters')
export const PRESENTERS_GLOB_PATTERN = path.resolve(PRESENTERS_DIR, 'variants', '**', '*.presenter.{ts,js}')
export const PRESENTERS_OUTPUT_FILE = path.resolve(PRESENTERS_DIR, 'load-presenters.ts')

// Mensagens de cabeçalho do arquivo barril de importações de presenters:
export const PRESENTERS_AUTO_GENERATED_WARNING = `//⚠️ ARQUIVO GERADO AUTOMATICAMENTE - NÃO EDITE MANUALMENTE\n//⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY`
export const PRESENTERS_REGENERATE_COMMAND = `// Execute 'npm run generate:presenters' para atualizar\n// Run 'npm run generate:presenters' to update`

// Limite de imagens ativas no slider:
export const MAX_SLIDER_IMAGES_QUANTITY = 15

// Tipos de formatos de arquivo de exportações:
export const EXPORT_FILE_FORMATS = ['xlsx', 'csv'] as const
