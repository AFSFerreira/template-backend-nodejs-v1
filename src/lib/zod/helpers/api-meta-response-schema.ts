import { z } from 'zod'

export const apiMetaResponseSchema = z.object({
  totalItems: z.number().describe('Total de registros disponíveis.'),
  totalPages: z.number().describe('Total de páginas disponíveis.'),
  currentPage: z.number().describe('Página atual.'),
  pageSize: z.number().describe('Quantidade de registros por página.'),
})
