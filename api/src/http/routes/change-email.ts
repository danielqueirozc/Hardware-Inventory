// routes/update-profile-image.ts
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { ChangePassword } from "../controller/change-password";
import { ChangeEmail } from "../controller/change-email";

export const changeEmail: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/change-email',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Change user email',
        tags: ['users'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        }
      }
    },
    ChangeEmail
  )
}