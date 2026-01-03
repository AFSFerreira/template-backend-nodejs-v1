import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/presenter/institutional-info/institutional-info'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.institutionalInfoDefault)
export class InstitutionalInfoDefaultPresenter
  implements IPresenterStrategy<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>
{
  public toHTTP(input: InstitutionalInfoPresenterInput): HTTPInstitutionalInfo {
    return {
      aboutImage: input.aboutImage,
      statuteFile: input.statuteFile,
      electionNoticeFile: input.electionNoticeFile,
    }
  }
}
