import type { Item, Prisma, User } from "../generated/prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    changeName(id: string, name: string): Promise<User>
    changeEmail(id: string, email: string): Promise<User>
    changePassword(id: string, hashedPassword: string): Promise<User>
    updateProfileImage(id: string, imageUrl: string): Promise<User>
    findByEmail(email:string): Promise<User | null>
    findById(id:string): Promise<User | null>
}