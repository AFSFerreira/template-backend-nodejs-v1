import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { userProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadUserProfileImageUseCase } from '@use-cases/user/upload-register-profile-image'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function uploadProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(userProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadUserProfileImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.sendResponse(formattedReply, StatusCodes.CREATED)
}
