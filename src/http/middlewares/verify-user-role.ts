import type { UserRoleType } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { messages } from '@/constants/messages'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'

export function verifyPermissions(allowedRoles: UserRoleType[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.userId ?? ''

    const usersRepository = new PrismaUsersRepository()

    const user = await usersRepository.findByPublicId(userId)

    if (user === null) {
      throw new UserNotFoundError()
    }

    if (!allowedRoles.includes(user.role)) {
      return await reply.status(403).send({
        message: messages.errors.forbbiden,
      })
    }
  }
}
