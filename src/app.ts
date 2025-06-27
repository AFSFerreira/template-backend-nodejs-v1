import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { userRoutes } from './http/controllers/user/routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify()

app.register(fastifyCookie)
app.register(multipart)

app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '2h',
  },
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Astrobiologia Backend',
      description: 'Documentação do Consumo da API Astrobio com Fastify-Swagger',
      version: '1.0.0',
    },
    tags: [{ name: 'users', description: 'Operações de usuário' }],
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
})

app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error!', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Send error to monitoring service
  }

  reply.status(500).send({ message: 'Internal server error' })
})
