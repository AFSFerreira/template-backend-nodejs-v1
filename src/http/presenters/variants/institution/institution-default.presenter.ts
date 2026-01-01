import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitution } from '@custom-types/presenter/institution/institution-default'
import type { Institution } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.institutionDefault)
export class InstitutionDefaultPresenter implements IPresenterStrategy<Institution, HTTPInstitution> {
  public toHTTP(input: Institution): HTTPInstitution {
    return {
      name: input.name,
    }
  }
}
