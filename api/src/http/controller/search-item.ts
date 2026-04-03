import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeSearchItemService } from "../../service/factories/make-search-item-service";

export async function SearchItem(request: FastifyRequest, reply: FastifyReply) {
  const querystringSchema = z.object({
    q: z.string(),
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']).optional()
  })

  try {
    const { q, type } = querystringSchema.parse(request.query)

    const searchItemService = makeSearchItemService()

    
    const result = await searchItemService.execute({ q, type })


    return reply.status(200).send(result)
  } catch (error) {

    return reply.status(500).send({ message: 'Erro in search item controller', error })
  }
}