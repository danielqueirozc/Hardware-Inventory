import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetItemByTypeService } from "../../service/factories/make-get-item-by-type";

export async function GetItemByType(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
  })

  const { type } = paramsSchema.parse(request.params)

  try {
    request.jwtVerify()

    const getItemByTypeService = makeGetItemByTypeService()

    const { items } = await getItemByTypeService.execute({
      type
    })

    reply.status(200).send({ items })

  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
  }

  return reply.status(500).send({ message: 'Internal server error' })

} 