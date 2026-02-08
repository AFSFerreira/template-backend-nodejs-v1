import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { Prisma } from '@prisma/generated/client'
import { ActivityAreaType } from '@prisma/generated/client'
import { isUpdateUserHighLevelEducation } from '@services/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@services/guards/is-update-user-high-level-student-education'

export function toPrismaUpdateUser(data: UpdateUserQuery['data']): Prisma.UserUpdateInput {
  let keywordsConnectOrCreateData: Prisma.UserUpdateInput['Keyword'] | undefined

  let academicPublicationCreateData: Prisma.UserUpdateInput['AcademicPublication'] | undefined

  let enrolledCourseUpsertData: Prisma.UserUpdateInput['EnrolledCourse'] | undefined

  let institutionConnectData: Prisma.UserUpdateInput['Institution'] | undefined

  let activityAreaConnectData: Prisma.UserUpdateInput['ActivityArea'] | undefined

  let subActivityAreaConnectData: Prisma.UserUpdateInput['SubActivityArea'] | undefined

  const isUserHighLevelEducation = isUpdateUserHighLevelEducation(data)
  const isUserHighLevelStudentEducation = isUpdateUserHighLevelStudentEducation(data)

  if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
    if (isUserHighLevelStudentEducation) {
      enrolledCourseUpsertData = data.enrolledCourse
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
        : undefined
    }

    keywordsConnectOrCreateData = data.keyword
      ? {
          set: [],
          connectOrCreate: data.keyword.map((value: string) => ({
            where: { value },
            create: { value },
          })),
        }
      : undefined

    academicPublicationCreateData = data.academicPublication
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
      : undefined

    institutionConnectData = data.institution
      ? {
          connect: { name: data.institution.name },
        }
      : undefined

    activityAreaConnectData = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined

    subActivityAreaConnectData = data.activityArea
      ? {
          connect: {
            type_area: {
              area: data.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          },
        }
      : undefined
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
    ...data.user,
    Address: addressUpsertData,
    EnrolledCourse: enrolledCourseUpsertData,
    Institution: institutionConnectData,
    AcademicPublication: academicPublicationCreateData,
    Keyword: keywordsConnectOrCreateData,
    ActivityArea: activityAreaConnectData,
    SubActivityArea: subActivityAreaConnectData,
  }
}
