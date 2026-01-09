import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z, { codec } from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { GetItemsByType } from "../controller/get-items-by-type";

export const getItemsByType: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/items/:type',
    {
      preHandler: VerifyJwt,
      schema: {
        summary: 'Get items quantity by type',
        tags: ['inventory'],
        params: z.object({
          type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables'])
        }),
        response: {
          200: z.object({
            items: z.array(
              z.object({
                id: z.string(),
                type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
                amount: z.number(),
                code: z.string(),
                name: z.string(),
                filter: z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware'])
              })
            )
          }),
          401: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string()
          })
        }
      }
    },
    GetItemsByType
  )
}