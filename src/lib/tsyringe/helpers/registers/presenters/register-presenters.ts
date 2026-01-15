import type { DependencyContainer } from 'tsyringe'
import { registerAcademicPublicationPresenters } from './variants/register-academic-publication-presenters'
import { registerAddressPresenters } from './variants/register-address-presenters'
import { registerBlogPresenters } from './variants/register-blog-presenters'
import { registerDashboardMetricsPresenters } from './variants/register-dashboard-metric-presenters'
import { registerDirectorBoardPresenters } from './variants/register-director-board-presenters'
import { registerDirectorPositionPresenters } from './variants/register-director-position-presenters'
import { registerFilePresenters } from './variants/register-file-presenters'
import { registerInstitutionPresenters } from './variants/register-institution-presenters'
import { registerInstitutionalInfoPresenters } from './variants/register-institutional-info-presenters'
import { registerMeetingEnrollmentPresenters } from './variants/register-meeting-enrollment-presenters'
import { registerMeetingPresenters } from './variants/register-meeting-presenters'
import { registerNewsletterPresenters } from './variants/register-newsletter-presenters'
import { registerSliderImagePresenters } from './variants/register-slider-image-presenters'
import { registerUserPresenters } from './variants/register-user-presenters'
import { registerActivityAreaPresenters } from './variants/registeractivity-area-presenters'

export function registerPresenters(container: DependencyContainer) {
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
