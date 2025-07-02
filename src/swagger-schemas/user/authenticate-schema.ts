import { authenticateBodySchema } from '@/http/controllers/user/authenticate'
import zodToJsonSchema from 'zod-to-json-schema'
import { getUserJsonSchema } from './get-user-schema'

const authenticateJsonSchema = zodToJsonSchema(authenticateBodySchema)

export const authenticateSwaggerSchema = {
  tags: ['authentication'],
  summary: 'Autenticar usuário',
  description: 'Autenticar usuário com email/nome de usuário e senha',
  body: authenticateJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: {
        user: getUserJsonSchema,
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
