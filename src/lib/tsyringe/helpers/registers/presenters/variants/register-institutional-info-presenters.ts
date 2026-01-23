import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionalInfoDefaultPresenter } from '@presenters/institutional-info/institutional-info.presenter'
import { InstitutionalInfoForAdminPresenter } from '@presenters/institutional-info/institutional-info-for-admin.presenter'

export function registerInstitutionalInfoPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.institutionalInfo.institutionalInfoDefault,
    container,
    target: InstitutionalInfoDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.institutionalInfo.institutionalInfoForAdmin,
    container,
    target: InstitutionalInfoForAdminPresenter,
  })
}
