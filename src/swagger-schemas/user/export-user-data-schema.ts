export const exportUserDataSwaggerSchema = {
  tags: ['users'],
  summary: 'Exportar dados de todos os usuários CSV',
  description:
    'Exporta todos os dados de todos os usuários como arquivo CSV. Requer permissões de administrador.',
  response: {
    200: {
      description: 'Conteúdo do arquivo CSV com dados de todos os usuários',
      content: {
        'text/csv': {
          schema: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Não autorizado - autenticação obrigatória',
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description:
        'Proibido - permissões insuficientes (função de administrador obrigatória)',
    },
  },
}
