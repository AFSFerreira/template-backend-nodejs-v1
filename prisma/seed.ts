import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
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
      publicEmail: true,
      astrobiologyOrRelatedStartYear: 2010,
      interestDescription: 'Participo da comunidade por interesse em origens da vida e exoplanetas.',
      receiveReports: true,
      email: 'admin.admin@ufl.br',
      passwordDigest: await hash('123456789', env.HASH_NUMBER_TIMES),
      loginAttempts: 0,
      lastLogin: null,
      activityArea: {
        create: {
          mainActivity: 'Astrobiologia Geral',
        },
      },
      address: {
        create: {
          houseNumber: "111",
          street: 'Rua das Galáxias',
          cityName: 'Cosmópolis',
          stateName: 'Universo',
          countryName: 'BR',
        },
      },
      identityDocument: {
        create: {
          cpf: '123.456.789-00',
        },
      },
      enrolledCourse: {
        create: {
          courseName: 'Introdução à Astrobiologia',
          startGraduationDate: new Date(),
          expectedGraduationDate: new Date(),
          scholarshipHolder: true,
          sponsoringOrganization: 'Universidade Lunar',
          supervisorName: 'Neew Armstrong'
        },
      },
    },
  })
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error('Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
