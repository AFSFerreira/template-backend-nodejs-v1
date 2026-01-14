import type {
  CustomUserWithSimplifiedDetails,
  UserWithSimplifiedDetailsRaw,
} from '@custom-types/repository/prisma/adapter/user-simplified'

export function userSimplifiedAdapter(
  customSimplifiedUser: UserWithSimplifiedDetailsRaw,
): CustomUserWithSimplifiedDetails {
  return {
    id: customSimplifiedUser.id,
    publicId: customSimplifiedUser.public_id,
    role: customSimplifiedUser.role,
    fullName: customSimplifiedUser.full_name,
    profileImage: customSimplifiedUser.profile_image,
    email: customSimplifiedUser.email,
    emailIsPublic: customSimplifiedUser.email_is_public,
    institutionName: customSimplifiedUser.institution_name,
    state: customSimplifiedUser.state,
  }
}
