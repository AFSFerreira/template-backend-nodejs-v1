import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { maskIdentityDocument } from '@utils/formatters/mask-identity-document'
import { truncateDate } from '@utils/formatters/truncate-date'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserDefaultPresenter implements IPresenterStrategy<UserDefaultPresenterInput, HTTPUser> {
  constructor(
    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: UserDefaultPresenterInput): HTTPUser
  public toHTTP(input: UserDefaultPresenterInput[]): HTTPUser[]
  public toHTTP(input: UserDefaultPresenterInput | UserDefaultPresenterInput[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }

    const profile = input.ResearcherProfile

    return {
      id: input.publicId,
      astrobiologyOrRelatedStartYear: input.astrobiologyOrRelatedStartYear,
      departmentName: profile?.departmentName ?? null,
      educationLevel: input.educationLevel,
      email: input.email,
      emailIsPublic: input.emailIsPublic,
      fullName: input.fullName,
      identityType: input.identityType,
      identityDocument: maskIdentityDocument({
        identityType: input.identityType,
        identityDocument: input.identityDocument,
      }),
      institutionComplement: profile?.institutionComplement ?? null,
      interestDescription: input.interestDescription,
      linkGoogleScholar: profile?.linkGoogleScholar ?? null,
      linkLattes: profile?.linkLattes ?? null,
      linkResearcherId: profile?.linkResearcherId ?? null,
      occupation: profile?.occupation ?? null,
      orcidNumber: profile?.orcidNumber ?? null,
      publicInformation: profile?.publicInformation ?? null,
      receiveReports: input.receiveReports,
      role: input.role,
      username: input.username,
      profileImage: this.userUrlBuilderService.buildProfileImageUrl(input.profileImage),
      birthdate: truncateDate(input.birthdate),
    }
  }
}
