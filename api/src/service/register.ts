import type { User } from "../generated/prisma/client"
import type { UsersRepository } from "../repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterServiceequet {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({name, email, password}: RegisterServiceequet): Promise<RegisterServiceResponse> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email)

      if (userAlreadyExists) {
        throw new Error('User already exists')
      }

      const password_hash = await hash(password, 7)
      
      const user = await this.usersRepository.create({
        name,
        email,
        password_hash
      })

      return {
        user
      }

    } catch (error) {
        console.log('ERROR IN SERVICE REGISTER:', error)
        throw error
    }
  }
}