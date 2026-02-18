import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPUserWithDetailsForAdmin,
  UserDetailedPresenterForAdminInput,
} from '@custom-types/http/presenter/user/user-detailed-for-admin'
import { maskIdentityDocument } from '@utils/formatters/mask-identity-document'
import { truncateDate } from '@utils/formatters/truncate-date'

export class UserDetailedPresenterForAdmin
  implements IPresenterStrategy<UserDetailedPresenterForAdminInput, HTTPUserWithDetailsForAdmin>
{
  public toHTTP(input: UserDetailedPresenterForAdminInput): HTTPUserWithDetailsForAdmin {
    return {
      id: input.publicId,
      astrobiologyOrRelatedStartYear: input.astrobiologyOrRelatedStartYear,
      departmentName: input.departmentName,
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
      institutionComplement: input.institutionComplement,
      linkGoogleScholar: input.linkGoogleScholar,
      linkLattes: input.linkLattes,
      linkResearcherId: input.linkResearcherId,
      membershipStatus: input.membershipStatus,
      occupation: input.occupation,
      orcidNumber: input.orcidNumber,
      publicInformation: input.publicInformation,
      receiveReports: input.receiveReports,
      username: input.username,
      profileImage: input.profileImage,
      interestDescription: input.interestDescription,
      birthdate: truncateDate(input.birthdate),

      institutionName: input.Institution?.name,

      keywords: input.Keyword && input.Keyword.length > 0 ? input.Keyword?.map((keyword) => keyword.value) : undefined,

      mainActivityArea: input.ActivityArea?.area,
      subActivityArea: input.SubActivityArea?.area,

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

      enrolledCourse: input.EnrolledCourse
        ? {
            courseName: input.EnrolledCourse.courseName,
            startGraduationDate: truncateDate(input.EnrolledCourse.startGraduationDate),
            expectedGraduationDate: truncateDate(input.EnrolledCourse.expectedGraduationDate),
            supervisorName: input.EnrolledCourse.supervisorName,
            scholarshipHolder: input.EnrolledCourse.scholarshipHolder,
            sponsoringOrganization: input.EnrolledCourse.sponsoringOrganization,
          }
        : undefined,

      academicPublications:
        input.AcademicPublication && input.AcademicPublication.length > 0
          ? input.AcademicPublication.map((academicPublication) => ({
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
            linkLattes: input.linkLattes,
            name: input.fullName,
            profileImage: input.DirectorBoard.profileImage ?? input.profileImage,
            position: input.DirectorBoard.DirectorPosition.position,
          }
        : undefined,
    }
  }
}
