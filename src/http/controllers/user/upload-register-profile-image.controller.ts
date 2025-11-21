import type { FastifyRequestWithFile } from '@custom-types/libs/fastify-request-with-file-type'
import { fileSchema } from '@schemas/utils/generic-components/file-schema'
import { makeUploadRegisterProfileImageUseCase } from '@use-cases/factories/user/make-upload-register-profile-image-use-case'
import type { FastifyReply } from 'fastify'

export async function uploadRegisterProfileImage(request: FastifyRequestWithFile, reply: FastifyReply) {
  const { buffer, size } = fileSchema.parse(request.file)

  const uploadRegisterProfileImageUseCase = makeUploadRegisterProfileImageUseCase()

  const { fileName } = await uploadRegisterProfileImageUseCase.execute({
    buffer,
    size,
  })

  return await reply.status(201).send({
    data: { profileImage: fileName },
  })
}
