import type { UsersRepository } from "../repositories/users-repository"
import type { User } from "../generated/prisma/client"

interface ChangeNameRequest { 
  id: string
  newName: string
}

interface ChangeNameResponse {
  user: User
}

export class ChangeNameService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, newName }: ChangeNameRequest): Promise<ChangeNameResponse> {
    try {
      const verifyUserIdExists = await this.usersRepository.findById(id)

      if (!verifyUserIdExists) {
        throw new Error('User not found')
      }



      const user = await this.usersRepository.changeName(id, newName)


      return {
        user
      }
      
    } catch (error) {
      throw error
    }
  }
}
