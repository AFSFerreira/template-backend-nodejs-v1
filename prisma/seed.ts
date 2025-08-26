import { ActivityAreaType, BlogCategoryType, EducationLevelType, IdentityType, MembershipStatusType, OccupationType, PrismaClient, UserRoleType } from '@prisma/client'
import { hash } from 'bcryptjs'
import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {
  const activityAreas = [
    "ASTRONOMIA",
    "BIOLOGIA",
    "QUÍMICA",
    "FÍSICA",
    "GEOCIÊNCIAS",
    "ASTRONÁUTICA",
    "ENGENHARIAS",
    "MATEMÁTICA",
    "HUMANIDADES",
    "ENSINO",
    "DIVULGAÇÃO DA CIÊNCIA",
    "OUTRA"
  ]

  const subActivityAreas = [
    "EXOPLANETAS",
    "MICROBIOLOGIA AMBIENTAL",
    "EXTREMÓFILOS",
    "HABITABILIDADE",
    "BIOASSINATURAS",
    "GEOBIOLOGIA",
    "MARTE",
    "LUAS GELADAS",
    "QUÍMICA PREBIÓTICA",
    "PEQUENOS CORPOS DO SISTEMA SOLAR",
    "CIÊNCIAS PLANETÁRIAS",
    "ORIGEM DA VIDA",
    "EVOLUÇÃO",
    "SETI",
    "EXPLORAÇÃO ESPACIAL",
    "AGRICULTURA ESPACIAL",
    "OUTRA"
  ]

  const activityAreasPromise = activityAreas.map(async (activityArea) => {
    await prisma.activityArea.upsert({
      where: { type_area: { area: activityArea, type: ActivityAreaType.AREA_OF_ACTIVITY } },
      update: {},
      create: {
        area: activityArea,
        type: ActivityAreaType.AREA_OF_ACTIVITY
      }
    })
  })

  const subActivityAreasPromise = subActivityAreas.map(async subActivityArea => {
    await prisma.activityArea.upsert({
      where: { type_area: { area: subActivityArea, type: ActivityAreaType.SUB_AREA_OF_ACTIVITY } },
      update: {},
      create: {
        area: subActivityArea,
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY
      }
    })
  })

  // Criando as áreas e subáreas de atividade:
  await Promise.all([...activityAreasPromise, ...subActivityAreasPromise])

  // Criando Usuários:
  const institutionData = {
    name: "UNIVERSIDADE FEDERAL FLUMINENTE",
  }
  
  const adminAddressData = {
    number: "800",
    zip: "06210-138",
    street: 'RUA ARMÊNIA',
    district: 'PRESIDENTE ALTINO',
    city: 'OSASCO',
    state: 'SÃO PAULO',
    country: 'BRASIL',
  }

  const userAddressData = {
    number: "50",
    zip: "22290-240",
    street: 'AVENIDA PASTEUR',
    district: 'URCA',
    city: 'RIO DE JANEIRO',
    state: 'RIO DE JANEIRO',
    country: 'BRASIL',
  }

  const enrolledCourseData = {
    courseName: 'INTRODUÇÃO À ASTROBIOLOGIA',
    startGraduationDate: new Date(`${"2025-06"}-01T00:00:00Z`),
    expectedGraduationDate: new Date(`${"2029-06"}-01T00:00:00Z`),
    scholarshipHolder: true,
    sponsoringOrganization: 'UNIVERSIDADE LUNAR',
    supervisorName: 'NEEW ARMSTRONG',
  }

  const academicPublicationsData = [
    {
      authors: "USER",
      publicationDate: new Date(),
      title: "A ASCENSÃO DA ASTROBIOLOGIA - PARTE 1",
      linkDOI: "https://example.com",
      editionNumber: "12",
      journalName: "ASTROBIO",
      pageInterval: "1-5",
      volume: "6",
      ActivityArea: {
        connect: {
          type_area: {
            area: subActivityAreas[0],
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY
          }
        }
      },
    },
    {
      authors: "USER",
      publicationDate: new Date(),
      title: "A ASCENSÃO DA ASTROBIOLOGIA - PARTE 2",
      linkDOI: "https://example.com",
      editionNumber: "12",
      journalName: "ASTROBIO",
      pageInterval: "5-10",
      volume: "6",
      ActivityArea: {
        connect: {
          type_area: {
            area: subActivityAreas[0],
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY
          }
        }
      },
    }
  ]
  
  const userKeywords = ["PALAVRA-CHAVE 1", "PALAVRA-CHAVE 2", "PALAVRA-CHAVE 3", "PALAVRA-CHAVE 4"]

  const userAdmin = await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      fullName: 'ADMIN',
      username: 'ADMIN.ADMIN',
      email: 'admin@email.com',
      passwordHash: await hash('123456789Az#', env.HASH_SALT_ROUNDS),
      birthdate: new Date(),
      profileImage: '/src/uploads/profile-images/default-profile-pic.png',
      linkLattes: 'http://lattes.cnpq.br/1234567890',
      linkGoogleScholar: 'https://scholar.google.com/admin.admin',
      linkResearcherId: null,
      orcidNumber: '0000-0001-2345-6789',
      membershipStatus: MembershipStatusType.APPROVED,
      role: UserRoleType.ADMIN,
      departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
      institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
      occupation: OccupationType.RESEARCHER,
      educationLevel: EducationLevelType.DOCTORATE,
      emailIsPublic: true,
      astrobiologyOrRelatedStartYear: 2010,
      interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
      receiveReports: true,
      loginAttempts: 0,
      lastLogin: new Date(),
      identityType: IdentityType.CPF,
      identityDocument: "123.456.789-00",
      publicInformation: "ASTROBIÓLOGO",

      ActivityArea: {
        connect: {
          type_area: {
            area: activityAreas[0],
            type: ActivityAreaType.AREA_OF_ACTIVITY
          }
        }
      },

      SubActivityArea: {
        connect: {
          type_area: {
            area: subActivityAreas[0],
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY
          }
        }
      },

      Address: { create: adminAddressData },

      EnrolledCourse: { create: enrolledCourseData },
      
      AcademicPublication: {
        create: academicPublicationsData
      },

      Institution: {
        connectOrCreate: {
          where: institutionData,
          create: institutionData
        }
      },

      Keyword: {
        connectOrCreate: userKeywords.map((keyword) => ({
          where: { value: keyword },
          create: { value: keyword }
        }))
      }
    },
  })

  await prisma.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      fullName: 'COMMON USER',
      username: 'USER.USER',
      email: 'user@email.com',
      passwordHash: await hash('123456789Az#', env.HASH_SALT_ROUNDS),
      birthdate: new Date(),
      profileImage: '/src/uploads/profile-images/default-profile-pic.png',
      linkLattes: 'http://lattes.cnpq.br/1234567890',
      linkGoogleScholar: 'https://scholar.google.com/admin.admin',
      linkResearcherId: null,
      orcidNumber: '0000-0001-2345-6789',
      membershipStatus: MembershipStatusType.PENDING,
      role: UserRoleType.DEFAULT,
      departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
      institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
      occupation: OccupationType.RESEARCHER,
      educationLevel: EducationLevelType.DOCTORATE,
      emailIsPublic: true,
      astrobiologyOrRelatedStartYear: 2010,
      interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
      receiveReports: true,
      loginAttempts: 0,
      lastLogin: new Date(),
      identityType: IdentityType.CPF,
      identityDocument: "123.456.789-00",
      publicInformation: "ASTROBIÓLOGO",

      ActivityArea: {
        connect: {
          type_area: {
            area: activityAreas[0],
            type: ActivityAreaType.AREA_OF_ACTIVITY
          }
        }
      },

      SubActivityArea: {
        connect: {
          type_area: {
            area: subActivityAreas[0],
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY
          }
        }
      },

      Address: { create: userAddressData },

      EnrolledCourse: { create: enrolledCourseData },
      
      AcademicPublication: {
        create: academicPublicationsData
      },

      Institution: {
        connectOrCreate: {
          where: institutionData,
          create: institutionData
        }
      },

      Keyword: {
        connectOrCreate: userKeywords.map((keyword) => ({
          where: { value: keyword },
          create: { value: keyword }
        }))
      }
    },
  })

  // Criação dos blogs:
  const mainCategory = await prisma.category.upsert({
    where: { name: "ASTROBIOLOGIA" },
    update: {},
    create: {
      name: "ASTROBIOLOGIA",
      type: BlogCategoryType.MAIN_CATEGORY
    }
  })

  const firstSubcategory = await prisma.category.upsert({
    where: { name: "EXOBIOLOGIA" },
    update: {},
    create: {
      name: "EXOBIOLOGIA",
      type: BlogCategoryType.SUBCATEGORY,
    }
  })

  const secondSubcategory = await prisma.category.upsert({
    where: { name: "GEOQUÍMICA PREBIÓTICA" },
    update: {},
    create: {
      name: "GEOQUÍMICA PREBIÓTICA",
      type: BlogCategoryType.SUBCATEGORY
    }
  })
  
  const subcategoriesIds = [firstSubcategory, secondSubcategory].map(subcategory => ({ id: subcategory.id }))

  const blogData = {
    htmlContent: "<h1>HELLO WORLD</h1>",
    authorName: userAdmin.fullName,
    authorId: userAdmin.id,
    mainCategoryId: mainCategory.id
  }

  let existingBlog = await prisma.blog.findFirst({
    where: blogData
  })

  if (!existingBlog) {
    existingBlog = await prisma.blog.create({
      data: {
        ...blogData,
        Subcategories: {
          connect: subcategoriesIds
        }
      }
    })
  }
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error('Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
