import type { GetStatuteUseCaseResponse } from '@custom-types/use-cases/document-management/get-statute'
import path from 'node:path'
import { STATUTE_FILE_NAME_PATTERN } from '@constants/dynamic-file-constants'
import { getFiles } from '@services/files/get-files'
import { MissingStatuteFileError } from '@use-cases/errors/document-management/missing-statute-file-error'
import fs from 'fs-extra'
import { injectable } from 'tsyringe'

@injectable()
export class GetStatuteUseCase {
  async execute(): Promise<GetStatuteUseCaseResponse> {
    const files = await getFiles(STATUTE_FILE_NAME_PATTERN)

    if (files.length === 0) {
      throw new MissingStatuteFileError()
    }

    const file = files[0]
    const filename = path.basename(file)
    const stream = fs.createReadStream(files[0])

    return { filename, stream }
  }
}
