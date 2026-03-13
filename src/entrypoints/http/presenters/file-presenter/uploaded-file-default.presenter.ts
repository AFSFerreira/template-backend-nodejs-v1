import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { UploadedFileDefaultPresenterInput } from '@custom-types/http/presenter/file/uploaded-file-default'
import { singleton } from 'tsyringe'

@singleton()
export class UploadedFileDefaultPresenter implements IPresenterStrategy<UploadedFileDefaultPresenterInput, HTTPFile> {
  public toHTTP(input: UploadedFileDefaultPresenterInput): HTTPFile
  public toHTTP(input: UploadedFileDefaultPresenterInput[]): HTTPFile[]
  public toHTTP(input: UploadedFileDefaultPresenterInput | UploadedFileDefaultPresenterInput[]): HTTPFile | HTTPFile[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      filename: input.filename,
      publicUrl: input.publicUrl,
    }
  }
}
