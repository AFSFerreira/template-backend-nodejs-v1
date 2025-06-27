import { getUserSchemaItem } from './get-user-schema'

export const authenticateBodySchema = {
  type: 'object',
  properties: {
    emailOrUsername: {
      oneOf: [
        { type: 'string', format: 'email' },
        { type: 'string', minLength: 4 },
      ],
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).*$',
    },
  },
  required: ['emailOrUsername', 'password'],
  additionalProperties: false,
}

export const authenticateSchema = {
  tags: ['authentication'],
  summary: 'Authenticate user',
  description: 'Authenticate user with email/username and password',
  body: authenticateBodySchema,
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
