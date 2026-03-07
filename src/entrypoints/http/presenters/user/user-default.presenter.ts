import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { maskIdentityDocument } from '@utils/formatters/mask-identity-document'
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
      identityType: input.identityType,
      identityDocument: maskIdentityDocument({
        identityType: input.identityType,
        identityDocument: input.identityDocument,
      }),
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
      profileImage: buildUserProfileImageUrl(input.profileImage),
      birthdate: truncateDate(input.birthdate),
    }
  }
}
