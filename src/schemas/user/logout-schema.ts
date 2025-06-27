export const logoutSchema = {
  tags: ['authentication'],
  summary: 'Logout user',
  description: 'Logout user by clearing the refresh token cookie',
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
    400: {
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
