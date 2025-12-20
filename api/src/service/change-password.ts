import { hash } from "bcryptjs"
import type { UsersRepository } from "../repositories/users-repository"
import type { User } from "../generated/prisma/client"

interface ChangePasswordRequest { 
  id: string
  newPassword: string
}

interface ChangePasswordResponse {
  user: User
}

export class ChangePasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, newPassword }: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      const verifyUserIdExists = await this.usersRepository.findById(id)

      if (!verifyUserIdExists) {
        throw new Error('User not found')
      }

      const password_hash = await hash(newPassword, 7)

      const user = await this.usersRepository.changePassword(id, password_hash)

      return {
        user
      }
      
    } catch (error) {
      console.log('ERROR IN SERVICE CHANGE PASSWORD:', error)
      throw error
    }
  }
}
