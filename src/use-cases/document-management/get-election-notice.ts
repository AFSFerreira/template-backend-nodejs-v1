import type { GetElectionNoticeUseCaseResponse } from '@custom-types/use-cases/document-management/get-election-notice'
import path from 'node:path'
import { ELECTION_NOTICE_FILE_NAME_PATTERN } from '@constants/dynamic-file-constants'
import { createFileReadStream } from '@services/files/create-file-read-stream'
import { getFiles } from '@services/files/get-files'
import { ElectionNoticeFileReadError } from '@use-cases/errors/document-management/election-notice-file-read-error'
import { MissingElectionNoticeFileError } from '@use-cases/errors/document-management/missing-election-notice-file-error'
import { ensureExists } from '@utils/validators/ensure'
import { singleton } from 'tsyringe'

@singleton()
export class GetElectionNoticeUseCase {
  async execute(): Promise<GetElectionNoticeUseCaseResponse> {
    const files = await getFiles(ELECTION_NOTICE_FILE_NAME_PATTERN)

    if (files.length === 0) {
      throw new MissingElectionNoticeFileError()
    }

    const filePath = files[0]
    const filename = path.basename(filePath)
    const stream = ensureExists({
      value: await createFileReadStream(filePath),
      error: new ElectionNoticeFileReadError(),
    })

    return { filename, stream }
  }
}
