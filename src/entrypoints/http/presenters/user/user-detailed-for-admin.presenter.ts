import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPUserWithDetailsForAdmin,
  UserDetailedPresenterForAdminInput,
} from '@custom-types/http/presenter/user/user-detailed-for-admin'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { maskIdentityDocument } from '@utils/formatters/mask-identity-document'
import { truncateDate } from '@utils/formatters/truncate-date'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserDetailedPresenterForAdmin
  implements IPresenterStrategy<UserDetailedPresenterForAdminInput, HTTPUserWithDetailsForAdmin>
{
  constructor(
    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,

    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,
  ) {}

  public toHTTP(input: UserDetailedPresenterForAdminInput): HTTPUserWithDetailsForAdmin
  public toHTTP(input: UserDetailedPresenterForAdminInput[]): HTTPUserWithDetailsForAdmin[]
  public toHTTP(
    input: UserDetailedPresenterForAdminInput | UserDetailedPresenterForAdminInput[],
  ): HTTPUserWithDetailsForAdmin | HTTPUserWithDetailsForAdmin[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    const profile = input.ResearcherProfile

    return {
      id: input.publicId,
      astrobiologyOrRelatedStartYear: input.astrobiologyOrRelatedStartYear,
      departmentName: profile?.departmentName ?? null,
      role: input.role,
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
      linkGoogleScholar: profile?.linkGoogleScholar ?? null,
      linkLattes: profile?.linkLattes ?? null,
      linkResearcherId: profile?.linkResearcherId ?? null,
      membershipStatus: input.membershipStatus,
      occupation: profile?.occupation ?? null,
      orcidNumber: profile?.orcidNumber ?? null,
      publicInformation: profile?.publicInformation ?? null,
      receiveReports: input.receiveReports,
      username: input.username,
      profileImage: this.userUrlBuilderService.buildProfileImageUrl(input.profileImage),
      interestDescription: input.interestDescription,
      birthdate: truncateDate(input.birthdate),

      institutionName: profile?.Institution?.name,

      keywords:
        profile?.Keyword && profile.Keyword.length > 0 ? profile.Keyword.map((keyword) => keyword.value) : undefined,

      mainActivityArea: profile?.ActivityArea?.area,
      subActivityArea: profile?.SubActivityArea?.area,

      address: input.Address
        ? {
            zip: input.Address.zip,
            number: input.Address.number,
            district: input.Address.district,
            street: input.Address.street,
            city: input.Address.city,
            country: input.Address.State.Country.name,
            state: input.Address.State.name,
            complement: input.Address.complement,
          }
        : undefined,

      enrolledCourse: profile?.EnrolledCourse
        ? {
            courseName: profile.EnrolledCourse.courseName,
            startGraduationDate: truncateDate(profile.EnrolledCourse.startGraduationDate),
            expectedGraduationDate: truncateDate(profile.EnrolledCourse.expectedGraduationDate),
            supervisorName: profile.EnrolledCourse.supervisorName,
            scholarshipHolder: profile.EnrolledCourse.scholarshipHolder,
            sponsoringOrganization: profile.EnrolledCourse.sponsoringOrganization,
          }
        : undefined,

      academicPublications:
        profile?.AcademicPublication && profile.AcademicPublication.length > 0
          ? profile.AcademicPublication.map((academicPublication) => ({
              title: academicPublication.title,
              authors: academicPublication.AcademicPublicationAuthors?.map((author) => author.name),
              publicationYear: academicPublication.publicationYear,
              journalName: academicPublication.journalName,
              volume: academicPublication.volume,
              editionNumber: academicPublication.editionNumber,
              startPage: academicPublication.startPage,
              linkDoi: academicPublication.linkDoi,
              area: academicPublication.ActivityArea?.area,
            }))
          : undefined,

      directorBoardInfo: input.DirectorBoard
        ? {
            linkLattes: profile?.linkLattes,
            name: input.fullName,
            profileImage: input.DirectorBoard.profileImage
              ? this.directorBoardUrlBuilderService.buildProfileImageUrl(input.DirectorBoard.profileImage)
              : this.userUrlBuilderService.buildProfileImageUrl(input.profileImage),
            position: input.DirectorBoard.DirectorPosition.position,
          }
        : undefined,
    }
  }
}
