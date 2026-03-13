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
  public toHTTP(input: InstitutionDefaultPresenterInput): HTTPInstitution
  public toHTTP(input: InstitutionDefaultPresenterInput[]): HTTPInstitution[]
  public toHTTP(
    input: InstitutionDefaultPresenterInput | InstitutionDefaultPresenterInput[],
  ): HTTPInstitution | HTTPInstitution[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      name: input.name,
    }
  }
}
