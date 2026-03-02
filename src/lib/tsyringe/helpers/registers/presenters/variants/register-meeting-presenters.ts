import type { DependencyContainer } from 'tsyringe'
import { MeetingDefaultPresenter } from '@http/presenters/meeting/meeting-default.presenter'
import { MeetingDetailedPresenter } from '@http/presenters/meeting/meeting-detailed.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerMeetingPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.meeting.meetingDefault,
    container,
    target: MeetingDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.meeting.meetingDetailed,
    container,
    target: MeetingDetailedPresenter,
  })
}
