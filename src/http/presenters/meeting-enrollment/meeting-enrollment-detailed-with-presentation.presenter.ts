import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollmentDetailedWithPresentation,
  MeetingEnrollmentWithPresentationPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed-with-presentation'

export class MeetingEnrollmentDetailedWithPresentationPresenter
  implements
    IPresenterStrategy<MeetingEnrollmentWithPresentationPresenterInput, HTTPMeetingEnrollmentDetailedWithPresentation>
{
  public toHTTP(input: MeetingEnrollmentWithPresentationPresenterInput): HTTPMeetingEnrollmentDetailedWithPresentation {
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
      presentation: input.MeetingPresentation
        ? {
            title: input.MeetingPresentation.title,
            description: input.MeetingPresentation.description,
            presentationType: input.MeetingPresentation.presentationType,
            authors: input.MeetingPresentation.Authors.map((author) => ({
              name: author.name,
            })),
            affiliations: input.MeetingPresentation.Affiliations.map((affiliation) => ({
              name: affiliation.name,
            })),
          }
        : null,
    }
  }
}
