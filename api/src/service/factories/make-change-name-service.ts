import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { ChangeNameService } from "../change-name";

export function makeChangeNameService() {
  const usersRepository = new PrismaUsersRepository()
  const changeNameService = new ChangeNameService(usersRepository)

  return changeNameService
}