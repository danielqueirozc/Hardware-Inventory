import type { UsersRepository } from "../repositories/users-repository"
import type { User } from "../generated/prisma/client"

interface ChangeEmailRequest { 
  id: string
  newEmail: string
}

interface ChangeEmailResponse {
  user: User
}

export class ChangeEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, newEmail }: ChangeEmailRequest): Promise<ChangeEmailResponse> {
    try {
      const verifyUserIdExists = await this.usersRepository.findById(id)

      if (!verifyUserIdExists) {
        throw new Error('User not found')
      }



      const user = await this.usersRepository.changeEmail(id, newEmail)


      return {
        user
      }
      
    } catch (error) {
      throw error
    }
  }
}
