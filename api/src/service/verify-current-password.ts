import { compare } from "bcryptjs"
import type { UsersRepository } from "../repositories/users-repository"

interface VerifyCurrentPasswordRequest {
  id: string
  currentPassword: string
}

export class VerifyCurrentPassword {
  constructor (private userRepository: UsersRepository) {}

  async execute ({ id, currentPassword }: VerifyCurrentPasswordRequest): Promise<boolean> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return false

      console.log('USER DOES NOT EXIST')
    }

    const isPasswordValid = compare(currentPassword, user.password_hash)

    return isPasswordValid
  }
}