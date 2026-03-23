import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { GetItemByFilter } from "../controller/get-item-by-filter";

export const getItemByFilter: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/items/filter/:type',
    {
      preHandler: VerifyJwt,
      schema: {
        summary: 'Get items by filter',
        tags: ['inventory'],
        response: {
          200: z.object({
            items: z.array(
              z.object({
                id: z.string(),
                type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
                amount: z.number(),
                code: z.string(),
                name: z.string(),
                filters: z.array(z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware']))
              })
            )
          }),
          500: z.object({
            message: z.string()
          })
        }
      }
    },
    GetItemByFilter
  )
}