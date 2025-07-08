export const logoutSwaggerSchema = {
  tags: ['authentication'],
  summary: 'Fazer logout do usuário',
  description: 'Fazer logout do usuário limpando o cookie do refresh token',
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
      description: 'Usuário desconectado com sucesso',
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Invalid token', 'Token expired', 'No token provided'],
        },
      },
      description: 'Requisição inválida - falha na validação do token',
    },
  },
}
