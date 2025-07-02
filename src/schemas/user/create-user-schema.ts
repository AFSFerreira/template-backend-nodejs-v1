import { registerBodySchema } from '@/http/controllers/user/register'
import zodToJsonSchema from 'zod-to-json-schema'
import { getUserSchemaItem } from './get-user-schema'

export const createUserBodyJsonSchema = zodToJsonSchema(
  registerBodySchema,
) as any

export const createUserBodySchemaWithFile = {
  ...createUserBodyJsonSchema,
  properties: {
    profileImage: {
      type: 'string',
      format: 'binary',
      description: 'Imagem de perfil do usuário (JPEG, JPG, PNG, WebP)',
    },
    ...createUserBodyJsonSchema.properties,
  },
}

export const createUserSwaggerSchema = {
  tags: ['users'],
  summary: 'Criar um novo usuário',
  description:
    'Cria uma nova conta de usuário com todas as informações obrigatórias incluindo upload de imagem de perfil',
  consumes: ['multipart/form-data'],
  body: createUserBodySchemaWithFile,
  response: {
    201: {
      ...getUserSchemaItem,
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
