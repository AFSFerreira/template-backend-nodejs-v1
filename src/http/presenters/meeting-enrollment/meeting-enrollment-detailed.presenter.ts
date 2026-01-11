import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollmentDetailed,
  MeetingEnrollmentPresenterInput,
} from '@custom-types/presenter/meeting-enrollment/meeting-enrollment-detailed'

export class MeetingEnrollmentDetailedPresenter
  implements IPresenterStrategy<MeetingEnrollmentPresenterInput, HTTPMeetingEnrollmentDetailed>
{
  public toHTTP(input: MeetingEnrollmentPresenterInput): HTTPMeetingEnrollmentDetailed {
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      user: input.UserDetails
        ? {
            id: input.UserDetails.User.publicId,
            fullName: input.UserDetails.User.fullName,
            email: input.UserDetails.User.email,
            departmentName: input.UserDetails.User.departmentName,
            institutionName: input.UserDetails.User.Institution?.name,
            educationLevel: input.UserDetails.User.educationLevel,
            occupation: input.UserDetails.User.occupation,
            wantsNewsletter: input.UserDetails.User.wantsNewsletter,
          }
        : null,
      guest: input.GuestDetails
        ? {
            fullName: input.GuestDetails.fullName,
            email: input.GuestDetails.email,
            departmentName: input.GuestDetails.departmentName,
            institutionName: input.GuestDetails.institutionName,
            educationLevel: input.GuestDetails.educationLevel,
            occupation: input.GuestDetails.occupation,
            wantsNewsletter: input.GuestDetails.wantsNewsletter,
          }
        : null,
    }
  }
}
