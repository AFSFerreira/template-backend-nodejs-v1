import { verify } from 'jsonwebtoken'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../env'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

interface IPayload {
  sub: string
}

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const headerAuthorization = request.headers.authorization
    if (headerAuthorization === undefined) {
      throw new Error()
    }

    const [, token] = headerAuthorization.split(' ')

    const { sub: userId } = verify(token, env.JWT_SECRET) as IPayload

    const usersRepository = new PrismaUsersRepository()

    const user = await usersRepository.findById(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    request.userId = userId
  } catch (error) {
    return await reply.status(401).send({ message: 'Usuário não autenticado.' })
  }
}
