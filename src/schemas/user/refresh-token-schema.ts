export const refreshTokenSchema = {
  tags: ['authentication'],
  summary: 'Refresh access token',
  description: 'Refresh the access token using the refresh token stored in cookies',
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
      required: ['accessToken'],
    },
    401: {
      type: 'object',
      properties: {
        message: { 
          type: 'string',
          enum: ['Invalid token', 'Token expired', 'No token provided'],
        },
      },
    },
  },
}
