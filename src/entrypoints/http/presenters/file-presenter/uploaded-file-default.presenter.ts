import type { HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { UploadedFileDefaultPresenterInput } from '@custom-types/http/presenter/file/uploaded-file-default'

export const UploadedFileDefaultPresenter = {
  toHTTP(input: UploadedFileDefaultPresenterInput): HTTPFile {
    return {
      filename: input.filename,
      publicUrl: input.publicUrl,
    }
  },

  toHTTPList(inputs: UploadedFileDefaultPresenterInput[]): HTTPFile[] {
    return inputs.map(this.toHTTP)
  },
}
