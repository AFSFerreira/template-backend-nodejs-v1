import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitution } from '@custom-types/presenter/institution/institution-default'
import type { Institution } from '@prisma/client'
import { INSTITUTION_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(INSTITUTION_DEFAULT_PRESENTER_KEY)
export class InstitutionDefaultPresenter implements IPresenterStrategy<Institution, HTTPInstitution> {
  public toHTTP(input: Institution): HTTPInstitution {
    return {
      name: input.name,
    }
  }
}
