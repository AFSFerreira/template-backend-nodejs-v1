import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionalInfoDefaultPresenter } from '@presenters/institutional-info/institutional-info.presenter'
import { InstitutionalInfoForAdminPresenter } from '@presenters/institutional-info/institutional-info-for-admin.presenter'

export function registerInstitutionalInfoPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.institutionalInfo.institutionalInfoDefault,
    container,
    target: InstitutionalInfoDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.institutionalInfo.institutionalInfoForAdmin,
    container,
    target: InstitutionalInfoForAdminPresenter,
  })
}
