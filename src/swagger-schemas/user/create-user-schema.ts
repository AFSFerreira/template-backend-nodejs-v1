import zodToJsonSchema from 'zod-to-json-schema'
import { getUserJsonSchema } from './get-user-schema'
import { registerBodySchema } from '@/http/controllers/user/register'

const createUserBodyJsonSchema = zodToJsonSchema(registerBodySchema) as any

export const createUserSwaggerSchema = {
  tags: ['users'],
  summary: 'Criar um novo usuário',
  description:
    'Cria uma nova conta de usuário com todas as informações obrigatórias. A imagem de perfil pode ser incluída no formulário de envio em formatos JPEG, JPG, PNG e WebP.',
  body: createUserBodyJsonSchema,
  response: {
    201: {
      ...getUserJsonSchema,
      description: 'Usuário criado com sucesso',
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description:
        'Requisição inválida - erros de validação ou usuário já existe',
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Erro interno do servidor',
    },
  },
}
