import { CATEGORY_TYPE, IDENTITY_TYPE, PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {
  // Criação do usuário:
  const activityArea = await prisma.areaOfActivity.upsert({
    where: { mainAreaActivity: "PROFESSOR" },
    update: {},
    create: {
      mainAreaActivity: "PROFESSOR"
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
      birthDate: new Date(),
      profileImagePath: '/src/uploads/profile-images/default-profile-pic.png',
      lattesCVLink: 'http://lattes.cnpq.br/1234567890',
      profileGSLink: 'https://scholar.google.com/admin.admin',
      profileRIDLink: null,
      orcidNumber: '0000-0001-2345-6789',
      membershipStatus: 'APPROVED',
      userRole: 'ADMIN',
      institutionName: 'Universidade Federal da Lua',
      departmentName: 'Departamento de Astrobiologia',
      institutionComplement: 'Laboratório de Vida Extraterrestre',
      occupation: 'RESEARCHER',
      educationLevel: 'DOCTORATE',
      emailIsPublic: true,
      astrobiologyOrRelatedStartYear: 2010,
      interestDescription: 'Participo da comunidade por interesse em origens da vida e exoplanetas.',
      receiveReports: true,
      email: 'admin@email.com',
      passwordDigest: await hash('123456789Az#', env.USER_PASSWORD_HASH_NUMBER_TIMES),
      loginAttempts: 0,
      lastLogin: new Date(),
      activityAreaId: activityArea.id,
      identityType: IDENTITY_TYPE.CPF,
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
      houseNumber: "111",
      postalCode: "12345678",
      street: 'Rua das Galáxias',
      neighborhood: 'Bairro das Estrelas',
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
    where: { categoryName: "Astrobiologia" },
    update: {},
    create: {
      categoryName: "Astrobiologia",
      categoryType: CATEGORY_TYPE.MAIN_CATEGORY
    }
  })

  const firstSubcategory = await prisma.category.upsert({
    where: { categoryName: "Exobiologia" },
    update: {},
    create: {
      categoryName: "Exobiologia",
      categoryType: CATEGORY_TYPE.SUBCATEGORY
    }
  })

  const secondSubcategory = await prisma.category.upsert({
    where: { categoryName: "Geoquímica Prebiótica" },
    update: {},
    create: {
      categoryName: "Geoquímica Prebiótica",
      categoryType: CATEGORY_TYPE.SUBCATEGORY
    }
  })

  const blogData = {
    pageContent: "<h1>Hello World</h1>",
    authorName: user.fullName,
    authorId: user.id,
    mainCategoryId: mainCategory.id
  }

  let existingBlog = await prisma.blog.findFirst({
    where: blogData
  })

  if (existingBlog === null) {
    existingBlog = await prisma.blog.create({
      data: blogData
    })
  }

  const subcategories = [firstSubcategory, secondSubcategory]

  const subcategoriesPromises = subcategories.map(async subcategory => {
    return await prisma.blogCategory.upsert({
      where: {
        blogId_categoryId: {
          blogId: existingBlog.id,
          categoryId: subcategory.id
        }
      },
      update: {},
      create: {
        blogId: existingBlog.id,
        categoryId: subcategory.id
      }
    })
  })

  await Promise.all(subcategoriesPromises)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error('Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
