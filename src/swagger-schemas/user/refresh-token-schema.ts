export const refreshTokenSwaggerSchema = {
  tags: ['authentication'],
  summary: 'Renovar token de acesso',
  description:
    'Renovar o token de acesso usando o refresh token armazenado nos cookies',
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
      required: ['accessToken'],
      description: 'Token de acesso renovado com sucesso',
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Invalid token', 'Token expired', 'No token provided'],
        },
      },
      description: 'Não autorizado - falha na validação do token',
    },
  },
}
