import type {
  UploadDirectorBoardProfileImageUseCaseRequest,
  UploadDirectorBoardProfileImageUseCaseResponse,
} from '@custom-types/use-cases/director-board/upload-director-board-profile-image'
import { DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UploadDirectorBoardProfileImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,

    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,
  ) {}

  async execute({
    filePart,
  }: UploadDirectorBoardProfileImageUseCaseRequest): Promise<UploadDirectorBoardProfileImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    // Verificação preventiva:
    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart: filePart,
      folderPath: DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH,
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const publicUrl = this.directorBoardUrlBuilderService.buildTempProfileImageUrl(filename)

    return { filename, publicUrl }
  }
}
