import z from 'zod'

export const apiMessageSchema = z.object({
  code: z.string().describe('Código identificador da mensagem'),
  message: z.string().describe('Mensagem descritiva'),
})
