import { INSTITUTION_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitution } from '@custom-types/presenter/institution/institution-default'
import { RegisterPresenter } from '@presenters/presenter-registry'
import type { Institution } from '@prisma/client'

@RegisterPresenter(INSTITUTION_DEFAULT_PRESENTER_KEY)
export class InstitutionDefaultPresenter implements IPresenterStrategy<Institution, HTTPInstitution> {
  public toHTTP(input: Institution): HTTPInstitution {
    return {
      name: input.name,
    }
  }
}
