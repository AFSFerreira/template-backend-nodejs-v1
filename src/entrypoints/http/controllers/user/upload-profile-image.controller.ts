import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { userProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { FilePresenter } from '@presenters/file-presenter'
import { UploadUserProfileImageUseCase } from '@use-cases/user/upload-register-profile-image'
import { container } from 'tsyringe'

export async function uploadProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(userProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadUserProfileImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(201).send({
    data: formattedReply,
  })
}
