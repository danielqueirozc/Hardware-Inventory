import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { Authenticate } from "../controller/authenticate";

export const authenticate: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/sessions',
    {
      schema: {
        summary: 'Authenticate user',
        tags: ['inventory'],
      response: {
        201: z.object({
          message: z.string('User authenticated successfully'),
          token: z.string(),
          user: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            password_hash: z.string(),
            created_at: z.string(),
          })
        }),
      }
      }
    },
    Authenticate
  )
}