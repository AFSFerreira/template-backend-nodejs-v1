import type { CustomUserWithSimplifiedDetailsRaw } from '@custom-types/custom-user-with-simplified-details-raw-type'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'

export function customUserSimplifiedAdapter(
  customSimplifiedUser: CustomUserWithSimplifiedDetailsRaw,
): CustomUserWithSimplifiedDetails {
  return {
    id: customSimplifiedUser.id,
    publicId: customSimplifiedUser.public_id,
    fullName: customSimplifiedUser.full_name,
    email: customSimplifiedUser.email,
    emailIsPublic: customSimplifiedUser.email_is_public,
    institutionName: customSimplifiedUser.institution_name,
    state: customSimplifiedUser.state,
  }
}
