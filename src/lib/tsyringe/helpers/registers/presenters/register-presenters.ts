import type { DependencyContainer } from 'tsyringe'
import { registerAcademicPublicationPresenters } from './variants/academic-publications'
import { registerActivityAreaPresenters } from './variants/activity-areas'
import { registerAddressPresenters } from './variants/addresses'
import { registerBlogPresenters } from './variants/blogs'
import { registerDashboardMetricsPresenters } from './variants/dashboard-metrics'
import { registerDirectorBoardPresenters } from './variants/director-boards'
import { registerDirectorPositionPresenters } from './variants/director-positions'
import { registerFilePresenters } from './variants/files'
import { registerInstitutionalInfoPresenters } from './variants/institutional-info'
import { registerInstitutionPresenters } from './variants/institutions'
import { registerMeetingEnrollmentPresenters } from './variants/meeting-enrollments'
import { registerMeetingPresenters } from './variants/meetings'
import { registerNewsletterPresenters } from './variants/newsletters'
import { registerSliderImagePresenters } from './variants/slider-images'
import { registerUserPresenters } from './variants/users'

export function registerPresenterServices(container: DependencyContainer) {
  registerUserPresenters(container)
  registerAcademicPublicationPresenters(container)
  registerActivityAreaPresenters(container)
  registerAddressPresenters(container)
  registerBlogPresenters(container)
  registerDashboardMetricsPresenters(container)
  registerDirectorBoardPresenters(container)
  registerDirectorPositionPresenters(container)
  registerFilePresenters(container)
  registerInstitutionalInfoPresenters(container)
  registerInstitutionPresenters(container)
  registerMeetingEnrollmentPresenters(container)
  registerMeetingPresenters(container)
  registerNewsletterPresenters(container)
  registerSliderImagePresenters(container)
}
