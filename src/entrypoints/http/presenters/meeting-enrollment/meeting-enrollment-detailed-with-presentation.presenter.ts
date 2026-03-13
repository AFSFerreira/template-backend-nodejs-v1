import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollmentDetailedWithPresentation,
  MeetingEnrollmentDetailedWithPresentationPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-detailed-with-presentation'
import { singleton } from 'tsyringe'

@singleton()
export class MeetingEnrollmentDetailedWithPresentationPresenter
  implements
    IPresenterStrategy<
      MeetingEnrollmentDetailedWithPresentationPresenterInput,
      HTTPMeetingEnrollmentDetailedWithPresentation
    >
{
  public toHTTP(
    input: MeetingEnrollmentDetailedWithPresentationPresenterInput,
  ): HTTPMeetingEnrollmentDetailedWithPresentation {
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

  toHTTPList(
    inputs: MeetingEnrollmentDetailedWithPresentationPresenterInput[],
  ): HTTPMeetingEnrollmentDetailedWithPresentation[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
