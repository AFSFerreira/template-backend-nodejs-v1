import type { DependencyContainer } from 'tsyringe'
import { UploadedFileDefaultPresenter } from '@http/presenters/file-presenter/uploaded-file-default.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerFilePresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.file.fileDefault,
    container,
    target: UploadedFileDefaultPresenter,
  })
}
