import type { IApiError } from '@custom-types/custom/api-error-type'

// Blog-related responses
export const BLOG_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'BLOG_NOT_FOUND',
    message: 'O blog solicitado não foi encontrado',
  },
}
