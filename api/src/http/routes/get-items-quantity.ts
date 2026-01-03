import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { GetItemsQuantity } from "../controller/get-items-quantity";
import { VerifyJwt } from "../../middlewares/verify-jwt";

export const getItemsQuantity: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/items/quantity',
    {
      preHandler: VerifyJwt,
      schema: {
        summary: 'Get items quantity',
        tags: ['inventory'],
        response: {
          200: z.object({
            Component: z.number(),
            Computer: z.number(),
            Notebook: z.number(),
            Materials: z.number(),
            Cables: z.number()
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
    GetItemsQuantity
  )
}