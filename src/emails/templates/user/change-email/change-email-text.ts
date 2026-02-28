import type { IChangeEmailTextTemplate } from '@custom-types/templates/user/change-email'
import { APP_NAME } from '@constants/env-constants'
import { env } from '@env/index'

export function changeEmailTextTemplate({ fullName, oldEmail, newEmail, token }: IChangeEmailTextTemplate) {
  const url = `${env.FRONTEND_URL}/confirmar-alteracao-email/${token}`

  return `
Olá, ${fullName}!

Recebemos uma solicitação de alteração do e-mail associado à sua conta no ${APP_NAME}.

Para confirmar esta alteração e garantir que este novo e-mail realmente pertence a você,
clique no link abaixo:

${url}

Detalhes da alteração:
• E-mail antigo: ${oldEmail}
• Novo e-mail: ${newEmail}

⚠️ IMPORTANTE: Se você não solicitou esta alteração de e-mail, por favor, ignore este e-mail
e entre em contato imediatamente com nossa equipe de suporte. Sua conta permanecerá com o
e-mail atual até que a alteração seja confirmada.

Atenciosamente,
Equipe ${APP_NAME}
`.trim()
}
