// service/factories/make-update-profile-image-service.ts
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UpdateProfileImageService } from "../update-profile-image";

export function makeUpdateProfileImageService() {
  const usersRepository = new PrismaUsersRepository()
  const updateProfileImageService = new UpdateProfileImageService(usersRepository)

  return updateProfileImageService
}