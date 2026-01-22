import type { IDeleteUserTextTemplate } from '@custom-types/templates/user/delete-user'
import { APP_NAME } from '@constants/env-constants'

export function deleteUserTextTemplate({ fullName, email }: IDeleteUserTextTemplate) {
  return `
  Olá, ${fullName}

Confirmamos que a conta associada ao e-mail abaixo foi excluída com sucesso do ${APP_NAME}:

• email: ${email}

Agradecemos pelo tempo em que esteve conosco.
Caso decida retornar no futuro, será sempre bem-vindo(a).

Se você não solicitou a exclusão da conta, entre em contato imediatamente com nossa equipe de suporte.

Atenciosamente,
Equipe ${APP_NAME}
`.trim()
}
