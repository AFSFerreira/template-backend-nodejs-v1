import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: "email@example.com" },
    update: {},
    create: {
      cpf: "12345678901",
      username: "adminuser",
      name: "Admin User",
      birthDate: new Date('1990-01-01'),
      profileImagePath: "uploads/profile-images/dummy-profile-pic.png",
      curriculumPath: "uploads/curriculums/dummy-curriculum.txt",
      email: "email@example.com",
      passwordDigest: await hash("12345678", 10),
      universityName: "Example University",
      departmentName: "Astrobiology",
      institutionComplement: "Research Center",
      address: "123 Main St, City, Country",
      // Optional fields
      // lastLogin: null,
      // departmentRoleId: null,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
