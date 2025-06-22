import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { type USER_ROLE } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyPermissions(allowedRoles: USER_ROLE[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.userId ?? ''

    const usersRepository = new PrismaUsersRepository()

    const user = await usersRepository.findById(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    if (!allowedRoles.includes(user.userRole)) {
      return await reply.status(403).send({
        message: 'User does not have permission to use this resource.',
      })
    }
  }
}
