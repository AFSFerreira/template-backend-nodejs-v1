import { profilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { makeUploadRegisterProfileImageUseCase } from '@use-cases/factories/user/make-upload-register-profile-image-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadRegisterProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(profilePictureFileConfig)

  imageSchema.parse(filePart)

  const buffer = await filePart.toBuffer()

  const useCase = makeUploadRegisterProfileImageUseCase()

  const { fileName } = await useCase.execute({
    buffer,
    sizeInBytes: buffer.length,
  })

  return await reply.status(201).send({
    data: { profileImage: fileName },
  })
}
