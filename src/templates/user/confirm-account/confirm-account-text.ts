import type { IConfirmAccountTextTemplate } from '@custom-types/templates/user/confirm-account'
import { APP_NAME } from '@constants/env-constants'
import { env } from '@env/index'

export function confirmAccountTextTemplate({ fullName, email, token }: IConfirmAccountTextTemplate) {
  const url = `${env.FRONTEND_URL}/confirm-account?token=${token}`

  return `
Olá, ${fullName}!

Seja bem-vindo(a) ao ${APP_NAME}!

Para concluir o seu cadastro e confirmar que este e-mail realmente pertence a você,
clique no link abaixo:

${url}

E-mail utilizado no cadastro:
• email: ${email}

Caso você não tenha criado uma conta no ${APP_NAME}, basta ignorar este e-mail.
Nenhuma ação será realizada sem a confirmação.

Atenciosamente,
Equipe ${APP_NAME}
`.trim()
}
