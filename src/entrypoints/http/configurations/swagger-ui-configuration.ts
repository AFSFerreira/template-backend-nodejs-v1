import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

export const swaggerUiConfiguration = {
  routePrefix: '/docs',
  theme: {
    css: [{ filename: 'theme.css', content: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.DARK) }],
  },
} as const satisfies FastifySwaggerUiOptions
