import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitution,
  InstitutionDefaultPresenterInput,
} from '@custom-types/http/presenter/institution/institution-default'
import { singleton } from 'tsyringe'

@singleton()
export class InstitutionDefaultPresenter
  implements IPresenterStrategy<InstitutionDefaultPresenterInput, HTTPInstitution>
{
  public toHTTP(input: InstitutionDefaultPresenterInput): HTTPInstitution {
    return {
      id: input.publicId,
      name: input.name,
    }
  }

  toHTTPList(inputs: InstitutionDefaultPresenterInput[]): HTTPInstitution[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
