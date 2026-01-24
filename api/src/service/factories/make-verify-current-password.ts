// src/service/factories/make-verify-current-password-service.ts
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { VerifyCurrentPassword } from "../verify-current-password";

export function makeVerifyCurrentPasswordService() {
  const usersRepository = new PrismaUsersRepository()
  const service = new VerifyCurrentPassword(usersRepository)
  
  return service
}