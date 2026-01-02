import type { FastifyReply, FastifyRequest } from 'fastify'
import { userProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { UpdateProfileImageUseCase } from '@use-cases/user/update-profile-image'
import { container } from 'tsyringe'

export async function updateProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const userPublicId = getRequestUserPublicId(request)
  const filePart = await request.file(userProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UpdateProfileImageUseCase)

  await useCase.execute({ userPublicId, filePart })

  return await reply.status(204).send()
}
