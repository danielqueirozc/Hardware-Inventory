import { compare } from "bcryptjs"
import type { User } from "../generated/prisma/client"
import type { UsersRepository } from "../repositories/users-repository"
import type { TokenProvider } from "../@types/token-provider"

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
  token: string
}

export class Authenticate {
  constructor (
    private usersRepository: UsersRepository,
    private tokenProvider: TokenProvider
  ) {}

  async execute({email, password}: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new Error('Invalid password')
    }

    const token = this.tokenProvider.sign({ sub: user.id })
    
    return {
      user,
      token
    }
  }
}