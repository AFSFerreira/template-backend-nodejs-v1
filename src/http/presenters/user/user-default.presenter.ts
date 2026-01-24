import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import { truncateDate } from '@utils/formatters/truncate-date'

export class UserDefaultPresenter implements IPresenterStrategy<UserDefaultPresenterInput, HTTPUser> {
  public toHTTP(input: UserDefaultPresenterInput): HTTPUser {
    return {
      id: input.publicId,
      astrobiologyOrRelatedStartYear: input.astrobiologyOrRelatedStartYear,
      departmentName: input.departmentName,
      educationLevel: input.educationLevel,
      email: input.email,
      emailIsPublic: input.emailIsPublic,
      fullName: input.fullName,
      identityDocument: input.identityDocument,
      identityType: input.identityType,
      institutionComplement: input.institutionComplement,
      interestDescription: input.interestDescription,
      linkGoogleScholar: input.linkGoogleScholar,
      linkLattes: input.linkLattes,
      linkResearcherId: input.linkResearcherId,
      occupation: input.occupation,
      orcidNumber: input.orcidNumber,
      publicInformation: input.publicInformation,
      receiveReports: input.receiveReports,
      role: input.role,
      username: input.username,
      profileImage: input.profileImage,
      birthdate: truncateDate(input.birthdate),
    }
  }
}
