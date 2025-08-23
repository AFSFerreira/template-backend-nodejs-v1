import type {
  EducationLevelType,
  IdentityType,
  OccupationType,
} from '@prisma/client'
import { registerBodySchema } from '@schemas/user/register-schema'
import { InvalidInstitutionName } from '@use-cases/errors/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user-already-exists-error'
import { UserImageStorageError } from '@use-cases/errors/user-image-storage-error'
import { makeRegisterUseCase } from '@use-cases/factories/user/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body)
  const imageBuffer = (request as any).file?.buffer as Buffer | undefined

  const registerUserCase = makeRegisterUseCase()

  try {
    await registerUserCase.execute({
      ...parsedBody,
      user: {
        ...parsedBody.user,
        occupation: parsedBody.user.occupation as OccupationType,
        educationLevel: parsedBody.user.educationLevel as EducationLevelType,
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

    if (error instanceof InvalidInstitutionName) {
      return await reply.status(422).send({ message: error.message })
    }

    throw error
  }
}
