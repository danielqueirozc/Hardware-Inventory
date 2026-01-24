import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { VerifyCurrentPassword } from "../controller/verify-current-password";

export const verifyCurrentPassword: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/verify-current-password',
    {
      onRequest: [VerifyJwt],
      schema: {
        summary: 'Get items quantity',
        tags: ['auth'],
        description: 'Validates if the provided current password is correct',
        response: {
          200: z.object({
            message: z.string(),
            valid: z.boolean()
          }),
          401: z.object({
            message: z.string()
          }),
        }
      }
    },
    VerifyCurrentPassword
  )
}