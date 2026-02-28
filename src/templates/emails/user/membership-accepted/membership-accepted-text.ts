import type { IMembershipApprovedTextTemplate } from '@custom-types/templates/user/membership-approved'
import { APP_NAME } from '@constants/env-constants'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

export function membershipApprovedTextTemplate({ fullName, email }: IMembershipApprovedTextTemplate) {
  return `
Olá, ${toTitleCasePortuguese(fullName)}

Temos o prazer de informar que o seu pedido de associação ao ${APP_NAME}
foi aprovado com sucesso!

A partir de agora, você já pode usufruir dos recursos e funcionalidades
disponíveis para membros da nossa plataforma.

E-mail utilizado no cadastro:
• ${email}

Em caso de dúvidas ou necessidade de suporte,
nossa equipe está à disposição pelos canais oficiais.

Este e-mail tem caráter informativo e não requer nenhuma ação adicional.

Atenciosamente,
Equipe ${APP_NAME}
`.trim()
}
