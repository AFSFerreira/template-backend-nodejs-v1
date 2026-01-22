import type { IMembershipRejectedTextTemplate } from '@custom-types/templates/user/membership-rejected'
import { APP_NAME } from '@constants/env-constants'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

export function membershipRejectedTextTemplate({ fullName, email }: IMembershipRejectedTextTemplate) {
  return `
Olá, ${toTitleCasePortuguese(fullName)}

Informamos que o seu pedido de associação ao ${APP_NAME}
foi analisado e, neste momento, não pôde ser aprovado.

A decisão segue critérios internos de avaliação e não impede
que você realize uma nova solicitação futuramente, se desejar.

E-mail utilizado no cadastro:
• ${email}

Em caso de dúvidas ou necessidade de esclarecimentos adicionais,
entre em contato com nossa equipe de suporte pelos canais oficiais.

Este e-mail tem caráter informativo e não requer nenhuma ação adicional.

Atenciosamente,
Equipe ${APP_NAME}
`.trim()
}
