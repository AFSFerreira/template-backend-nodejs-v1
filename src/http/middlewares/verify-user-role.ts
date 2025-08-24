import { messages } from '@constants/messages'
import type { UserRoleType } from '@prisma/client'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@use-cases/errors/user-not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyPermissions(allowedRoles: UserRoleType[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.userPublicId ?? ''

    const usersRepository = new PrismaUsersRepository()

    const user = await usersRepository.findByPublicId(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    if (!allowedRoles.includes(user.role)) {
      return await reply.status(403).send({
        message: messages.errors.forbidden,
      })
    }
  }
}
