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

  const activityAreasPromise = activityAreas.map(async activityArea => {
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

  // Criando as áreas e sub-áreas de atividade:
  await Promise.all([...activityAreasPromise, ...subActivityAreasPromise])

  const userKeywords = ["PALAVRA-CHAVE 1", "PALAVRA-CHAVE 2", "PALAVRA-CHAVE 3", "PALAVRA-CHAVE 4"]

  const user = await prisma.user.upsert({
    where: { email: "ADMIN@EMAIL.COM" },
    update: {},
    create: {
      fullName: 'ADMIN',
      username: 'ADMIN.ADMIN',
      email: 'ADMIN@EMAIL.COM',
      passwordHash: await hash('123456789Az#', env.HASH_SALT_ROUNDS),
      birthdate: new Date(),
      profileImagePath: '/src/uploads/profile-images/default-profile-pic.png',
      linkLattes: 'http://lattes.cnpq.br/1234567890',
      linkGoogleScholar: 'https://scholar.google.com/admin.admin',
      linkResearcherId: null,
      orcidNumber: '0000-0001-2345-6789',
      membershipStatus: MembershipStatusType.APPROVED,
      role: UserRoleType.ADMIN,
      institutionName: 'UNIVERSIDADE FEDERAL DA LUA',
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
      activityAreaId: 1,
      identityType: IdentityType.CPF,
      identityDocument: "123.456.789-00",
      publicInformation: "ASTROBIÓLOGO",
      specificActivity: "PROFESSOR INTERINO",

      Keyword: {
        create: userKeywords.map((keyword) => ({
          value: keyword
        }))
      }
    },
  })

  await prisma.address.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      number: "111",
      zip: "12345678",
      street: 'RUA DAS GALÁXIAS',
      district: 'BAIRRO DAS ESTRELAS',
      city: 'COSMÓPOLIS',
      state: 'UNIVERSO',
      country: 'BR',
      userId: user.id
    }
  })

  await prisma.enrolledCourse.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      courseName: 'INTRODUÇÃO À ASTROBIOLOGIA',
      startGraduationDate: new Date(`${"2025-06"}-01T00:00:00Z`),
      expectedGraduationDate: new Date(`${"2029-06"}-01T00:00:00Z`),
      scholarshipHolder: true,
      sponsoringOrganization: 'UNIVERSIDADE LUNAR',
      supervisorName: 'NEEW ARMSTRONG',
      userId: user.id
    }
  })

  const academicPublicationData = {
    authors: "ADMIN",
    publicationDate: new Date(),
    title: "A ASCENSÃO DA ASTROBIOLOGIA",
    linkDOI: "https://example.com",
    editionNumber: "12",
    journalName: "ASTROBIO",
    pageInterval: "1-5",
    volume: "6",
    userId: user.id
  }

  const existingAcademicPublication = await prisma.academicPublications.findFirst({
    where: academicPublicationData
  })
  
  if (existingAcademicPublication === null) {
    await prisma.academicPublications.create({
      data: academicPublicationData
    })
  }

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
  
  const subcategoriesId = [firstSubcategory, secondSubcategory].map(subcategory => ({ id: subcategory.id }))

  const blogData = {
    content: "# HELLO WORLD",
    authorName: user.fullName,
    authorId: user.id,
    mainCategoryId: mainCategory.id
  }

  let existingBlog = await prisma.blog.findFirst({
    where: blogData
  })

  if (existingBlog === null) {
    existingBlog = await prisma.blog.create({
      data: {
        ...blogData,
        Subcategories: {
          connect: subcategoriesId
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
