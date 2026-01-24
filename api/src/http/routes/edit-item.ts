import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { EditItem } from "../controller/edit-item";

export const editItem: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/edit',
    {
      onRequest: [VerifyJwt], // Middleware de autenticação
      schema: {
        summary: 'Edit item',
        tags: ['inventory'],
        response: {
          201: z.object({
            id: z.string(),
            code: z.string(),
            name: z.string(),
            amount: z.number(),
            type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
            filters: z.array(z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware']))
          }),
          404: z.object({
            message: z.string()
          })
        }
      }
    },
    EditItem
  )
}