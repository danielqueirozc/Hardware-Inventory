// routes/update-profile-image.ts
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { ChangeName } from "../controller/change-name";

export const changeName: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    '/change-name',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Change user name',
        tags: ['users'],
        response: {
          200: z.object({
            message: z.string(),
          }),
        }
      }
    },
    ChangeName
  )
}