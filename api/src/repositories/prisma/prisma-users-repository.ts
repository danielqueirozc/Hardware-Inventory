import type { Prisma, User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async changePassword(id: string, hashedPassword: string): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: { password_hash: hashedPassword }
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    return user
  }

   async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })
    
    return user
  }
}
