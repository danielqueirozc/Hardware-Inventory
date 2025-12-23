import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { Authenticate } from "../authenticate";
import { FastifyJwtProvider } from "../../providers/fastify-jwt-provider";


export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const tokenProvider = new FastifyJwtProvider()
  const authenticateService = new Authenticate(usersRepository, tokenProvider)

  return authenticateService
}