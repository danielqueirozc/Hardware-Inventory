import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z, { codec } from "zod";
import { VerifyJwt } from "../../middlewares/verify-jwt";
import { GetItemsByType } from "../controller/get-items-by-type";
import { SearchItem } from "../controller/search-item";

export const searchItem: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/items/search',
    {
      preHandler: VerifyJwt,
      schema: {
        summary: 'Get items by search',
        tags: ['inventory'],
        querystring: z.object({
          q: z.string(),
          type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']).optional()
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
    SearchItem
  )
}