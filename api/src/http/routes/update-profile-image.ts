// routes/update-profile-image.ts
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { UpdateProfileImage } from "../controller/update-profile-image";
import { VerifyJwt } from "../../middlewares/verify-jwt";

export const updateProfileImage: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/users/profile-image',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Update user profile image',
        tags: ['users'],
        response: {
          200: z.object({
            message: z.string(),
          }),
          // 500: z.string({
            // message: z.string()
          // })
        }
      }
    },
    UpdateProfileImage
  )
}