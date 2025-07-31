import { BlogCategoryType, IdentityType, PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {
  // Criação do usuário:
  const activityArea = await prisma.areaOfActivity.upsert({
    where: { area: "PROFESSOR" },
    update: {},
    create: {
      area: "PROFESSOR"
    }
  })

  const userKeywords = ["PALAVRA-CHAVE 1", "PALAVRA-CHAVE 2", "PALAVRA-CHAVE 3", "PALAVRA-CHAVE 4"]

  const createdKeywords = await Promise.all(userKeywords.map(async value => {
    return await prisma.keyword.upsert({
      where: { value },
      update: {},
      create: { value }
    })
  }))

  const user = await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      fullName: 'Admin',
      username: 'admin.admin',
      email: 'admin@email.com',
      passwordHash: await hash('123456789Az#', env.HASH_SALT_ROUNDS),
      birthdate: new Date(),
      profileImagePath: '/src/uploads/profile-images/default-profile-pic.png',
      linkLattes: 'http://lattes.cnpq.br/1234567890',
      linkGoogleScholar: 'https://scholar.google.com/admin.admin',
      linkResearcherId: null,
      orcidNumber: '0000-0001-2345-6789',
      membershipStatus: 'APPROVED',
      role: 'ADMIN',
      institutionName: 'Universidade Federal da Lua',
      departmentName: 'Departamento de Astrobiologia',
      institutionComplement: 'Laboratório de Vida Extraterrestre',
      occupation: 'RESEARCHER',
      educationLevel: 'DOCTORATE',
      emailIsPublic: true,
      astrobiologyOrRelatedStartYear: 2010,
      interestDescription: 'Participo da comunidade por interesse em origens da vida e exoplanetas.',
      receiveReports: true,
      loginAttempts: 0,
      lastLogin: new Date(),
      activityAreaId: activityArea.id,
      identityType: IdentityType.CPF,
      identityDocument: "12345678900",
      publicInformation: "Astrobiólogo",
      specificActivity: "Professor Interino",

      keyword: {
        connect: createdKeywords.map(keyword => ({ id: keyword.id }))
      }
    },
  })

  await prisma.address.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      number: "111",
      zip: "12345678",
      street: 'Rua das Galáxias',
      district: 'Bairro das Estrelas',
      city: 'Cosmópolis',
      state: 'Universo',
      country: 'BR',
      userId: user.id
    }
  })

  await prisma.enrolledCourse.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      courseName: 'Introdução à Astrobiologia',
      startGraduationDate: new Date(`${"2025-06"}-01T00:00:00Z`),
      expectedGraduationDate: new Date(`${"2029-06"}-01T00:00:00Z`),
      scholarshipHolder: true,
      sponsoringOrganization: 'Universidade Lunar',
      supervisorName: 'Neew Armstrong',
      userId: user.id
    }
  })

  const academicPublicationData = {
    authors: "Admin",
    publicationDate: new Date(),
    title: "A Ascensão da Astrobiologia",
    doiLink: "https://example.com",
    editionNumber: "12",
    journalName: "astrobio",
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
    where: { name: "Astrobiologia" },
    update: {},
    create: {
      name: "Astrobiologia",
      type: BlogCategoryType.MAIN_CATEGORY
    }
  })

  const firstSubcategory = await prisma.category.upsert({
    where: { name: "Exobiologia" },
    update: {},
    create: {
      name: "Exobiologia",
      type: BlogCategoryType.SUBCATEGORY,
    }
  })

  const secondSubcategory = await prisma.category.upsert({
    where: { name: "Geoquímica Prebiótica" },
    update: {},
    create: {
      name: "Geoquímica Prebiótica",
      type: BlogCategoryType.SUBCATEGORY
    }
  })

  const blogData = {
    htmlContent: "<h1>Hello World</h1>",
    authorName: user.fullName,
    authorId: user.id,
    mainCategoryId: mainCategory.id
  }

  let existingBlog = await prisma.blog.findFirst({
    where: blogData
  })

  const subcategoriesId = [firstSubcategory, secondSubcategory].map(subcategory => ({ id: subcategory.id }))

  if (existingBlog === null) {
    existingBlog = await prisma.blog.create({
      data: {
        ...blogData,
        subcategories: {
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
