import { authenticateBodySchema } from '@/http/controllers/user/authenticate'
import zodToJsonSchema from 'zod-to-json-schema'
import { getUserSchemaItem } from './get-user-schema'

export const authenticateSchema = zodToJsonSchema(authenticateBodySchema)

export const authenticateSwaggerSchema = {
  tags: ['authentication'],
  summary: 'Autenticar usuário',
  description: 'Autenticar usuário com email/nome de usuário e senha',
  body: authenticateSchema,
  response: {
    200: {
      type: 'object',
      properties: {
        user: getUserSchemaItem,
        accessToken: { type: 'string' },
      },
      required: ['user', 'accessToken'],
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
