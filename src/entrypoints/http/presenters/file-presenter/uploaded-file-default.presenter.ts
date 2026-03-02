import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { UploadedFileDefaultPresenterInput } from '@custom-types/http/presenter/file/uploaded-file-default'

export class UploadedFileDefaultPresenter implements IPresenterStrategy<UploadedFileDefaultPresenterInput, HTTPFile> {
  public toHTTP(input: UploadedFileDefaultPresenterInput): HTTPFile {
    return {
      filename: input.filename,
      publicUrl: input.publicUrl,
    }
  }
}
