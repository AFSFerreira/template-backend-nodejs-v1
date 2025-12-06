import path from 'node:path'

import { ELECTION_NOTICE_FILE_NAME_PATTERN } from '@constants/file-constants'
import type { GetElectionNoticeUseCaseResponse } from '@custom-types/use-cases/document-management/get-election-notice'
import { getFiles } from '@services/get-files'
import { MissingElectionNoticeFileError } from '@use-cases/errors/document-management/missing-election-notice-file-error'
import fs from 'fs-extra'
import { injectable } from 'tsyringe'

@injectable()
export class GetElectionNoticeUseCase {
  async execute(): Promise<GetElectionNoticeUseCaseResponse> {
    const files = await getFiles(ELECTION_NOTICE_FILE_NAME_PATTERN)

    if (files.length === 0) {
      throw new MissingElectionNoticeFileError()
    }

    const filePath = files[0]
    const filename = path.basename(filePath)
    const stream = fs.createReadStream(filePath)

    return { filename, stream }
  }
}
