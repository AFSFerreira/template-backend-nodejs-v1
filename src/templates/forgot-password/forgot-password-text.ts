import { env } from '@env/index'

interface IForgotPasswordTextTemplate {
  fullName: string
  token: string
  email: string
  username: string
}

export function forgotPasswordTextTemplate({ fullName, username, token, email }: IForgotPasswordTextTemplate) {
  const url = `${env.FRONTEND_URL}/reset-password?token=${token}`
  const appName = env.APP_NAME

  return `
Olá, ${fullName}!

Recebemos uma solicitação para redefinir a sua senha.
Para continuar, clique no link abaixo:

${url}

Informações de Login:
• email: ${email}
• username: ${username}

Se preferir, copie e cole este link no seu navegador.

Se você não solicitou a recuperação de senha, por favor, ignore este e-mail e a sua senha não será alterada.

Atenciosamente,
Equipe ${appName}
  `.trim()
}
