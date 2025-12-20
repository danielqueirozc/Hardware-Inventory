import type { Prisma, User } from "../../generated/prisma/client";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(item => item.email === email)

    if (!user ) {
      return null
    }

    return user
  }

   async findById(id: string): Promise<User | null> {
    const user = this.users.find(item => item.id === id)

    if (!user ) {
      return null
    }

    return user
  }

  async changePassword(id: string, password_hash: string): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex === -1) {
      throw new Error('User not found.')
    }

    const user = this.users[userIndex]

    user.password_hash = password_hash

    this.users[userIndex] = user

    return user
  }
}