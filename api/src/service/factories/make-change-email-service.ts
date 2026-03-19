import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { ChangeEmailService } from "../change-email";
import { ChangeNameService } from "../change-name";

export function makeChangeEmailService() {
  const usersRepository = new PrismaUsersRepository()
  const changeEmailService = new ChangeEmailService(usersRepository)

  return changeEmailService
}