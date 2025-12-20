import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { ChangePasswordService } from "../change-password";

export function makeChangePasswordService() {
  const usersRepository = new PrismaUsersRepository()
  const changePasswordService = new ChangePasswordService(usersRepository)

  return changePasswordService
}