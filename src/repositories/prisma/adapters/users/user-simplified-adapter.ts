import type { UserWithSimplifiedDetailsRaw } from '@custom-types/adapter/input/user-with-simplified-details-raw-type'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/output/custom-user-with-simplified-details-type'

export function userSimplifiedAdapter(
  customSimplifiedUser: UserWithSimplifiedDetailsRaw,
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
