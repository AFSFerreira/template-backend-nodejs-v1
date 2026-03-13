import type { CreateUserQuery } from '@custom-types/repository/prisma/user/create-user-query'
import type { Prisma } from '@prisma/generated/client'
import { ActivityAreaType } from '@prisma/generated/client'
import { isRegisterUserHighLevelEducation } from '@utils/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@utils/guards/is-register-user-high-level-student-education'

export function toPrismaCreateUser(data: CreateUserQuery): Prisma.UserCreateInput {
  let researcherProfileCreateData: Prisma.UserCreateInput['ResearcherProfile'] | undefined

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
  } = data.user

  const isUserHighLevelEducation = isRegisterUserHighLevelEducation(data)
  const isUserHighLevelStudentEducation = isRegisterUserHighLevelStudentEducation(data)

  if (isUserHighLevelEducation || isUserHighLevelStudentEducation) {
    let enrolledCourseCreateData: Prisma.ResearcherProfileCreateWithoutUserInput['EnrolledCourse'] | undefined

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

    const keywordsConnectOrCreateData: Prisma.ResearcherProfileCreateWithoutUserInput['Keyword'] = {
      connectOrCreate: data.keyword.map((value: string) => ({
        where: { value },
        create: { value },
      })),
    }

    const academicPublicationCreateData: Prisma.ResearcherProfileCreateWithoutUserInput['AcademicPublication'] = {
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

    const institutionConnectOrCreateData: Prisma.ResearcherProfileCreateWithoutUserInput['Institution'] = {
      connectOrCreate: {
        create: { name: data.institution.name },
        where: { name: data.institution.name },
      },
    }

    const activityAreaConnectData: Prisma.ResearcherProfileCreateWithoutUserInput['ActivityArea'] = {
      connect: {
        type_area: {
          area: data.activityArea.mainActivityArea,
          type: ActivityAreaType.AREA_OF_ACTIVITY,
        },
      },
    }

    const subActivityAreaConnectData: Prisma.ResearcherProfileCreateWithoutUserInput['SubActivityArea'] = {
      connect: {
        type_area: {
          area: data.activityArea.subActivityArea,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
      },
    }

    if (occupation && departmentName) {
      researcherProfileCreateData = {
        create: {
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
          Institution: institutionConnectOrCreateData,
          ActivityArea: activityAreaConnectData,
          SubActivityArea: subActivityAreaConnectData,
          Keyword: keywordsConnectOrCreateData,
          AcademicPublication: academicPublicationCreateData,
          EnrolledCourse: enrolledCourseCreateData,
        },
      }
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
    ...filteredUserData,
    birthdate: new Date(filteredUserData.birthdate),
    emailIsPublic: filteredUserData.emailIsPublic ?? false,
    receiveReports: filteredUserData.receiveReports ?? false,
    Address: addressCreateData,
    ResearcherProfile: researcherProfileCreateData,
  }
}
