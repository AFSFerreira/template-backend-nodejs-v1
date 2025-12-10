import type { FastifyReply, FastifyRequest } from 'fastify'
import { profilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { getRequestUserId } from '@services/http/get-request-user-id'
import { UpdateProfileImageUseCase } from '@use-cases/user/update-profile-image'
import { container } from 'tsyringe'

export async function updateProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserId(request)
  const filePart = await request.file(profilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UpdateProfileImageUseCase)

  await useCase.execute({ userPublicId, filePart })

  return await reply.status(204).send()
}
