import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollmentDetailed,
  MeetingEnrollmentDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed'
import { singleton } from 'tsyringe'

@singleton()
export class MeetingEnrollmentDetailedPresenter
  implements IPresenterStrategy<MeetingEnrollmentDetailedPresenterInput, HTTPMeetingEnrollmentDetailed>
{
  public toHTTP(input: MeetingEnrollmentDetailedPresenterInput): HTTPMeetingEnrollmentDetailed {
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      user: input.UserDetails
        ? {
            id: input.UserDetails.User.publicId,
            fullName: input.UserDetails.User.fullName,
            email: input.UserDetails.User.email,
            departmentName: input.UserDetails.User.ResearcherProfile?.departmentName ?? null,
            institutionName: input.UserDetails.User.ResearcherProfile?.Institution?.name,
            educationLevel: input.UserDetails.User.educationLevel,
            occupation: input.UserDetails.User.ResearcherProfile?.occupation,
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

  toHTTPList(inputs: MeetingEnrollmentDetailedPresenterInput[]): HTTPMeetingEnrollmentDetailed[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
