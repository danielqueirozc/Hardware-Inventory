import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { DeleteItem } from "../controller/delete-item";
import { VerifyJwt } from "../../middlewares/verify-jwt";

export const deleteItem: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/item/:id',
    {
      preHandler: [VerifyJwt],
      schema: {
        summary: 'Delete an item by ID',
        tags: ['inventory'],
      response: {
        204: z.void(),
        404: z.object({ message: z.string() })
      }
      }
    },
    DeleteItem
  )
}