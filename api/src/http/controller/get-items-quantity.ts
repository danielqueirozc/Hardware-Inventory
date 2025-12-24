import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetItemsQuantityService } from "../../service/factories/make-get-items-quantity"

export async function GetItemsQuantity(request: FastifyRequest, reply: FastifyReply) {
  try {
    request.jwtVerify()

    const getItemsQuantityService = makeGetItemsQuantityService()

    const { Component, Computer, Notebook, Materials, Cables } = await getItemsQuantityService.execute()
    
    return reply.status(200).send({ Component, Computer, Notebook, Materials, Cables })

  } catch (error) {
      return reply.status(401).send({ message: 'Unauthorized' })
  }
  
}