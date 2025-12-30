import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { ValidateToken } from "../controller/validate-token";
import { VerifyJwt } from "../../middlewares/verify-jwt";

export const validateToken: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/me',
    {
      onRequest: [VerifyJwt],
      schema: {
        summary: 'Verify token',
        tags: ['inventory'],
      response: {
        200: z.object({
          user: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            createdAt: z.coerce.string()
          })
        }),
      }
      }
    },
    ValidateToken
  )
}