import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetItemByTypeService } from "../../service/factories/make-get-item-by-type";

export async function GetItemsByType(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
  })

  const { type } = paramsSchema.parse(request.params)

  try {
    const getItemByTypeService = makeGetItemByTypeService()

    const result = await getItemByTypeService.execute({
      type
    })

    console.log('Service result:', JSON.stringify(result, null, 2))

    return reply.status(200).send(result)

  } catch (error) {
    console.error('Erro em GetItemsByType:', error)
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }

} 

