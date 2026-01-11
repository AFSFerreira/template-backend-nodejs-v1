import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { FileInput, HTTPFile } from '@custom-types/presenter/file/file-default'

export class UploadedFileDefaultPresenter implements IPresenterStrategy<FileInput, HTTPFile> {
  public toHTTP(input: FileInput): HTTPFile {
    return {
      filename: input.filename,
      publicUrl: input.publicUrl,
    }
  }
}
