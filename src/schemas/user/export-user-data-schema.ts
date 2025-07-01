export const exportUserDataSchema = {
  tags: ['users'],
  summary: 'Export all users data as CSV',
  description:
    'Export all users data as a CSV file. Requires admin permissions.',
  response: {
    200: {
      description: 'CSV file content with all users data',
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
      description: 'Unauthorized - authentication required',
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Forbidden - insufficient permissions (admin role required)',
    },
  },
}
