import type { FastifyReply, FastifyRequest } from 'fastify'
import { userProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadRegisterProfileImageUseCase } from '@use-cases/user/upload-register-profile-image'
import { container } from 'tsyringe'

export async function uploadRegisterProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(userProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadRegisterProfileImageUseCase)

  const { filename } = await useCase.execute({ filePart })

  return await reply.status(201).send({
    data: { profileImage: filename },
  })
}
