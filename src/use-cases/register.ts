// import type { UsersRepository } from '../repositories/users-repository'
// import { hash } from 'bcryptjs'
// import type { User } from '@prisma/client'
// import { UserWithSameEmailError } from './errors/user-with-same-email-error'
// import type { AddressRepository } from '@/repositories/address-repository'

// interface RegisterUseCaseRequest {
//   name: string
//   email: string
//   password: string
// }

// interface RegisterUseCaseResponse {
//   user: User
// }

// export class RegisterUseCase {
//   constructor(
//     private readonly usersRepository: UsersRepository,
//     private readonly addressRepository: AddressRepository
//   ) {}

//   async execute({
//     name,
//     email,
//     password,
//   }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
//     const userWithSameEmail = await this.usersRepository.findByEmail(email)

//     if (userWithSameEmail !== null) {
//       throw new UserWithSameEmailError()
//     }
//     const passwordDigest = await hash(password, 10)

//     const user = await this.usersRepository.create({
//       name,
//       email,
//       password_digest: passwordDigest,
//     })

//     return {
//       user,
//     }
//   }
// }
