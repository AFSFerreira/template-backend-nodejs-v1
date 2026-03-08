import { z } from 'zod'

export const apiErrorResponseSchema = z.object({
  code: z.string().describe('Código interno de erro da aplicação.'),
  message: z.string().describe('Mensagem legível para o usuário.'),
  issues: z
    .array(
      z.object({
        field: z.string().describe('Caminho do campo que originou o erro de validação (ex: "body.email").'),
        message: z.string().describe('Descrição legível do erro de validação para o campo informado.'),
      }),
    )
    .optional()
    .describe('Lista de erros de validação detalhados por campo. Presente apenas em respostas 422.'),
})
