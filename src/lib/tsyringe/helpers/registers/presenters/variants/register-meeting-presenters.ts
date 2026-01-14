import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { MeetingDefaultPresenter } from '@presenters/meeting/meeting-default.presenter'
import { MeetingDetailedPresenter } from '@presenters/meeting/meeting-detailed.presenter'

export function registerMeetingPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.meeting.meetingDefault,
    container,
    target: MeetingDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.meeting.meetingDetailed,
    container,
    target: MeetingDetailedPresenter,
  })
}
