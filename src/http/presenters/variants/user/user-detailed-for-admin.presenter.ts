import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUserWithDetailsForAdmin } from '@custom-types/presenter/user/user-detailed-for-admin'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import { USER_DETAILED_FOR_ADMIN_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_USER_PROFILE_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { truncateDate } from '@utils/formatters/truncate-date'
import urlJoin from 'url-join'

@RegisterPresenter(USER_DETAILED_FOR_ADMIN_PRESENTER_KEY)
export class UserDetailedPresenter implements IPresenterStrategy<UserWithDetails, HTTPUserWithDetailsForAdmin> {
  public toHTTP(input: UserWithDetails): HTTPUserWithDetailsForAdmin {
    const {
      id,
      passwordHash,
      publicId,
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

    const backendBaseUrl = getBackendBaseUrl()

    return {
      ...filteredUser,
      id: input.publicId,
      profileImage: urlJoin(backendBaseUrl, STATIC_USER_PROFILE_IMAGE_ROUTE, input.profileImage),
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
            directorBoardProfileImage: input.DirectorBoard.directorBoardProfileImage,
            aboutMe: input.DirectorBoard.aboutMe,
            position: input.DirectorBoard.DirectorPosition.position,
          }
        : undefined,
    }
  }
}
