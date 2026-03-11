import type {
  UploadInstitutionalAboutImageUseCaseRequest,
  UploadInstitutionalAboutImageUseCaseResponse,
} from '@custom-types/use-cases/institutional-info/upload-institutional-about-image'
import { INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { InstitutionalInfoUrlBuilderService } from '@services/builders/urls/build-institutional-about-image-url'
import { FileService } from '@services/files/file-service'
import { ImageTooBigError } from '@use-cases/errors/generic/image-too-big-error'
import { MissingMultipartContentFile } from '@use-cases/errors/generic/missing-multipart-content-file'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UploadInstitutionalAboutImageUseCase {
  constructor(
    @inject(FileService)
    private readonly fileService: FileService,

    @inject(InstitutionalInfoUrlBuilderService)
    private readonly institutionalInfoUrlBuilderService: InstitutionalInfoUrlBuilderService,
  ) {}

  async execute({
    filePart,
  }: UploadInstitutionalAboutImageUseCaseRequest): Promise<UploadInstitutionalAboutImageUseCaseResponse> {
    if (!filePart) {
      throw new MissingMultipartContentFile()
    }

    if (filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const { filename, success } = await this.fileService.saveAvifImage({
      filePart,
      folderPath: INSTITUTIONAL_TEMP_ABOUT_IMAGES_PATH,
      options: {
        specs: {
          chromaSubsampling: '4:4:4',
          quality: 80,
        },
      },
    })

    if (!success || filePart.file.truncated) {
      throw new ImageTooBigError()
    }

    const publicUrl = this.institutionalInfoUrlBuilderService.buildTempAboutImageUrl(filename)

    return { filename, publicUrl }
  }
}
