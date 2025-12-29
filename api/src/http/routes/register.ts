import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { Register } from "../controller/register";

export const register: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Register new user',
        tags: ['inventory'],
      response: {
        201: z.object({
          message: z.string('User created successfully'),
        }),
      }
      }
    },
    Register
  )
}