// routes/update-profile-image.ts
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { ChangePassword } from "../controller/change-password";

export const changePassword: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/change-password',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Change user password',
        tags: ['users'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        }
      }
    },
    ChangePassword
  )
}