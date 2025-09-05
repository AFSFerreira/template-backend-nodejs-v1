import type { FileRequest } from '@custom-types/file-request-type'
import { fileSchema } from '@schemas/utils/components/file-schema'
import { makeUploadRegisterProfileImageUseCase } from '@use-cases/factories/user/make-upload-register-profile-image-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadRegisterProfileImage(
  request: FastifyRequest & FileRequest,
  reply: FastifyReply,
) {
  const { buffer, size } = fileSchema.parse(request.file)

  const uploadRegisterProfileImageUseCase =
    makeUploadRegisterProfileImageUseCase()

  const { fileName } = await uploadRegisterProfileImageUseCase.execute({
    buffer,
    size,
  })

  return await reply.status(201).send({
    data: { profileImage: fileName },
  })
}
