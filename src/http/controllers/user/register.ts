import type { EducationLevel, IdentityType, Occupation } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerBodySchema } from '@/schemas/user/register-schema'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { UserImageStorageError } from '@/use-cases/errors/user-image-storage-error'
import { makeRegisterUseCase } from '@/use-cases/factories/user/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body)
  const imageBuffer = (request as any).file?.buffer as Buffer | undefined

  const registerUserCase = makeRegisterUseCase()

  try {
    await registerUserCase.execute({
      ...parsedBody,
      user: {
        ...parsedBody.user,
        occupation: parsedBody.user.occupation as Occupation,
        educationLevel: parsedBody.user.educationLevel as EducationLevel,
        identityType: parsedBody.user.identityType as IdentityType,
      },
      imageBuffer,
    })

    return await reply.status(201).send()
  } catch (error) {
    if (error instanceof UserImageStorageError) {
      return await reply.status(500).send({ message: error.message })
    }

    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
