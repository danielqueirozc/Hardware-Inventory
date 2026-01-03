import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetItemsQuantityService } from "../../service/factories/make-get-items-quantity"

export async function GetItemsQuantity(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getItemsQuantityService = makeGetItemsQuantityService()

    const response = await getItemsQuantityService.execute()

    return reply.status(200).send(response)

  } catch (error) {
    console.error('Erro em GetItemsQuantity:', error)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}