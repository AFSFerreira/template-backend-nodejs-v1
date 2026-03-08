import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { Prisma } from '@prisma/generated/client'
import { ActivityAreaType } from '@prisma/generated/client'
import { isRegisterUserHighLevelEducation } from '@utils/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@utils/guards/is-register-user-high-level-student-education'

export function toPrismaCreateUser(data: CreateUserQuery): Prisma.UserCreateInput {
  let keywordsConnectOrCreateData: Prisma.UserCreateInput['Keyword'] | undefined

  let academicPublicationCreateData: Prisma.UserCreateInput['AcademicPublication'] | undefined

  let enrolledCourseCreateData: Prisma.UserCreateInput['EnrolledCourse'] | undefined

  let institutionConnectOrCreateData: Prisma.UserCreateInput['Institution'] | undefined

  let activityAreaConnectData: Prisma.UserCreateInput['ActivityArea'] | undefined

  let subActivityAreaConnectData: Prisma.UserCreateInput['SubActivityArea'] | undefined

  const isUserHighLevelEducation = isRegisterUserHighLevelEducation(data)
  const isUserHighLevelStudentEducation = isRegisterUserHighLevelStudentEducation(data)

  if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
    if (isUserHighLevelStudentEducation) {
      enrolledCourseCreateData = {
        create: {
          ...data.enrolledCourse,
          startGraduationDate: new Date(data.enrolledCourse.startGraduationDate),
          expectedGraduationDate: new Date(data.enrolledCourse.expectedGraduationDate),
          scholarshipHolder: data.enrolledCourse.scholarshipHolder ?? false,
        },
      }
    }

    keywordsConnectOrCreateData = {
      connectOrCreate: data.keyword.map((value: string) => ({
        where: { value },
        create: { value },
      })),
    }

    academicPublicationCreateData = {
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

    institutionConnectOrCreateData = {
      connectOrCreate: {
        create: { name: data.institution.name },
        where: { name: data.institution.name },
      },
    }

    activityAreaConnectData = {
      connect: {
        type_area: {
          area: data.activityArea.mainActivityArea,
          type: ActivityAreaType.AREA_OF_ACTIVITY,
        },
      },
    }

    subActivityAreaConnectData = {
      connect: {
        type_area: {
          area: data.activityArea.subActivityArea,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
      },
    }
  }

  const { stateId, ...filteredAddressInfo } = data.address
  const addressCreateData: Prisma.UserCreateInput['Address'] = {
    create: {
      ...filteredAddressInfo,
      State: {
        connect: {
          id: stateId,
        },
      },
    },
  }

  return {
    ...data.user,
    birthdate: new Date(data.user.birthdate),
    emailIsPublic: data.user.emailIsPublic ?? false,
    receiveReports: data.user.receiveReports ?? false,
    Address: addressCreateData,
    EnrolledCourse: enrolledCourseCreateData,
    Institution: institutionConnectOrCreateData,
    AcademicPublication: academicPublicationCreateData,
    Keyword: keywordsConnectOrCreateData,
    ActivityArea: activityAreaConnectData,
    SubActivityArea: subActivityAreaConnectData,
  }
}
