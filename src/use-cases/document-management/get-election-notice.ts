import type { GetElectionNoticeUseCaseResponse } from '@custom-types/use-cases/document-management/get-election-notice'
import path from 'node:path'
import { ELECTION_NOTICE_FILE_NAME_PATTERN } from '@constants/dynamic-file-constants'
import { getFiles } from '@services/files/get-files'
import { ElectionNoticeFileReadError } from '@use-cases/errors/document-management/election-notice-file-read-error'
import { MissingElectionNoticeFileError } from '@use-cases/errors/document-management/missing-election-notice-file-error'
import { createFileReadStream } from '@utils/files/create-file-read-stream'
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
    const stream = await createFileReadStream(filePath)

    if (!stream) {
      throw new ElectionNoticeFileReadError()
    }

    return { filename, stream }
  }
}
