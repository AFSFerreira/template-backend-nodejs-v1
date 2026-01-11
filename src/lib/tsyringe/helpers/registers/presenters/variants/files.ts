import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UploadedFileDefaultPresenter } from '@presenters/file-presenter/uploaded-file-default.presenter'

export function registerFilePresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.file.fileDefault,
    container,
    target: UploadedFileDefaultPresenter,
  })
}
