import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { CreateItem } from "../controller/create-item";

export const createItem: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/create',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Create an item',
        tags: ['inventory'],
        response: {
          201: z.object({
            message: z.string(),
            item: z.object({
              id: z.string(),
            code: z.string(),
            name: z.string(),
            amount: z.number(),
            type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
            filters: z.array(z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware']))
            })
          }),
          409: z.object({
            message: z.string()
          })
        }
      }
    },
    CreateItem
  )
}