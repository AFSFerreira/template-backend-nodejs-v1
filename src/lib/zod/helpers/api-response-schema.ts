import { z } from 'zod'

export const apiErrorResponseSchema = z.object({
  code: z.string().describe('Código interno de erro da aplicação.'),
  message: z.string().describe('Mensagem legível para o usuário.'),
})
