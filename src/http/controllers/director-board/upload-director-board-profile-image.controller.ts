import type { FileInput, HTTPFile } from '@custom-types/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { directorBoardProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@presenters/file-presenter'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadDirectorBoardProfileImageUseCase } from '@use-cases/director-board/upload-director-board-profile-image'
import { container } from 'tsyringe'

export async function uploadDirectorBoardProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(directorBoardProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadDirectorBoardProfileImageUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(201).send({
    data: formattedReply,
  })
}
