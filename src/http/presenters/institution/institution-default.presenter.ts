import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitution } from '@custom-types/presenter/institution/institution-default'
import type { Institution } from '@prisma/client'

export class InstitutionDefaultPresenter implements IPresenterStrategy<Institution, HTTPInstitution> {
  public toHTTP(input: Institution): HTTPInstitution {
    return {
      name: input.name,
    }
  }
}
