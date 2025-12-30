import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUserWithDetails } from '@custom-types/presenter/user/user-detailed'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import { USER_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { truncateDate } from '@utils/formatters/truncate-date'

@RegisterPresenter(USER_DETAILED_PRESENTER_KEY)
export class UserDetailedPresenter implements IPresenterStrategy<UserWithDetails, HTTPUserWithDetails> {
  public toHTTP(input: UserWithDetails): HTTPUserWithDetails {
    const {
      id,
      passwordHash,
      publicId,
      membershipStatus,
      loginAttempts,
      lastLogin,
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
      createdAt,
      updatedAt,
      activityAreaId,
      institutionId,
      subActivityAreaId,
      fullNameUnaccent,
      interestDescription,
      Institution,
      ActivityArea,
      SubActivityArea,
      AcademicPublication,
      Keyword,
      Address,
      EnrolledCourse,
      DirectorBoard,
      ...filteredUser
    } = input

    return {
      ...filteredUser,
      id: input.publicId,
      profileImage: buildUserProfileImageUrl(input.profileImage),
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
            directorBoardProfileImage: input.DirectorBoard.directorBoardProfileImage,
            aboutMe: input.DirectorBoard.aboutMe,
            position: input.DirectorBoard.DirectorPosition.position,
          }
        : undefined,
    }
  }
}
