import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { Prisma } from '@prisma/generated/client'
import { ActivityAreaType } from '@prisma/generated/client'
import { isUpdateUserHighLevelEducation } from '@utils/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@utils/guards/is-update-user-high-level-student-education'

export function toPrismaUpdateUser(data: UpdateUserQuery['data']): Prisma.UserUpdateInput {
  let researcherProfileUpdateData: Prisma.UserUpdateInput['ResearcherProfile'] | undefined

  const userData = data.user ?? {}

  const {
    activityAreaDescription,
    subActivityAreaDescription,
    occupation,
    linkLattes,
    linkGoogleScholar,
    linkResearcherId,
    orcidNumber,
    departmentName,
    institutionComplement,
    publicInformation,
    ...filteredUserData
  } = userData

  const isUserHighLevelEducation = isUpdateUserHighLevelEducation(data)
  const isUserHighLevelStudentEducation = isUpdateUserHighLevelStudentEducation(data)

  if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
    const researcherProfileUpdatePayload: Prisma.ResearcherProfileUpdateWithoutUserInput = {}

    if (activityAreaDescription) {
      researcherProfileUpdatePayload.activityAreaDescription = activityAreaDescription
    }

    if (subActivityAreaDescription) {
      researcherProfileUpdatePayload.subActivityAreaDescription = subActivityAreaDescription
    }

    if (occupation) {
      researcherProfileUpdatePayload.occupation = occupation
    }

    if (linkLattes) {
      researcherProfileUpdatePayload.linkLattes = linkLattes
    }

    if (linkGoogleScholar) {
      researcherProfileUpdatePayload.linkGoogleScholar = linkGoogleScholar
    }

    if (linkResearcherId) {
      researcherProfileUpdatePayload.linkResearcherId = linkResearcherId
    }

    if (orcidNumber) {
      researcherProfileUpdatePayload.orcidNumber = orcidNumber
    }

    if (departmentName) {
      researcherProfileUpdatePayload.departmentName = departmentName
    }

    if (institutionComplement) {
      researcherProfileUpdatePayload.institutionComplement = institutionComplement
    }

    if (publicInformation) {
      researcherProfileUpdatePayload.publicInformation = publicInformation
    }

    if (isUserHighLevelStudentEducation) {
      researcherProfileUpdatePayload.EnrolledCourse = data.enrolledCourse
        ? {
            upsert: {
              create: {
                ...data.enrolledCourse,
                scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
              },
              update: {
                ...data.enrolledCourse,
                scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
              },
            },
          }
        : researcherProfileUpdatePayload.EnrolledCourse
    }

    researcherProfileUpdatePayload.Keyword = data.keyword
      ? {
          set: [],
          connectOrCreate: data.keyword.map((value) => ({
            where: { value },
            create: { value },
          })),
        }
      : researcherProfileUpdatePayload.Keyword

    researcherProfileUpdatePayload.AcademicPublication = data.academicPublication
      ? {
          deleteMany: {},
          create: data.academicPublication.map((academicPublication) => {
            const { area, authors, ...filteredAcademicPublicationData } = academicPublication

            // Removendo elementos duplicados de authors:
            const nonRepeatingAuthors = Array.from<string>(new Set<string>(authors))

            return {
              ...filteredAcademicPublicationData,
              AcademicPublicationAuthors: {
                create: nonRepeatingAuthors.map((author) => ({
                  name: author,
                })),
              },
              ActivityArea: {
                connect: {
                  type_area: {
                    area,
                    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
                  },
                },
              },
            }
          }),
        }
      : researcherProfileUpdatePayload.AcademicPublication

    researcherProfileUpdatePayload.Institution = data.institution
      ? {
          connect: { name: data.institution.name },
        }
      : researcherProfileUpdatePayload.Institution

    researcherProfileUpdatePayload.ActivityArea = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        }
      : researcherProfileUpdatePayload.ActivityArea

    researcherProfileUpdatePayload.SubActivityArea = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        }
      : researcherProfileUpdatePayload.SubActivityArea

    if (Object.keys(researcherProfileUpdatePayload).length > 0) {
      researcherProfileUpdateData = {
        update: researcherProfileUpdatePayload,
      }
    }
  }

  const addressUpsertData: Prisma.UserUpdateInput['Address'] = data.address
    ? {
        upsert: {
          create: data.address,
          update: data.address,
        },
      }
    : undefined

  return {
    ...(Object.keys(filteredUserData).length > 0 ? filteredUserData : undefined),
    Address: addressUpsertData,
    ResearcherProfile: researcherProfileUpdateData,
  }
}
