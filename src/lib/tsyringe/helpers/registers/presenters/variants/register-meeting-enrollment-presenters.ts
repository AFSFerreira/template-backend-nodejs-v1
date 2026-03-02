import type { DependencyContainer } from 'tsyringe'
import { MeetingEnrollmentDefaultPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-default.presenter'
import { MeetingEnrollmentDetailedPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed.presenter'
import { MeetingEnrollmentDetailedWithPresentationPresenter } from '@http/presenters/meeting-enrollment/meeting-enrollment-detailed-with-presentation.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerMeetingEnrollmentPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDefault,
    container,
    target: MeetingEnrollmentDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDetailed,
    container,
    target: MeetingEnrollmentDetailedPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.meetingEnrollment.meetingEnrollmentDetailedWithPresentation,
    container,
    target: MeetingEnrollmentDetailedWithPresentationPresenter,
  })
}
