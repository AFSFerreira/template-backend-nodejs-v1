import { env } from '@env/index'

export function forgotPasswordTextTemplate(userName: string, token: string) {
  const url = `${env.FRONTEND_URL}/reset-password?token=${token}`
  const appName = env.APP_NAME
  return `
Olá, ${userName}!

Recebemos uma solicitação para redefinir a sua senha. 
Para continuar, clique no link abaixo:

${url}

Se preferir, copie e cole este link no seu navegador.

Se você não solicitou a recuperação de senha, por favor, ignore este e-mail. 
A sua senha não será alterada.

Atenciosamente,
Equipe ${appName}
  `.trim()
}
