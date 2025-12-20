import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateItemService } from "../../service/factories/make-create-item-service";
import { generateCode } from "../../utils/code-generator";

export async function CreateItem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    amount: z.number(),
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
    filter: z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware'])
  })

  try {
    await request.jwtVerify()

    const { name, amount, type, filter } = bodySchema.parse(request.body)

    const code = generateCode()

    const makeCreateItemService = MakeCreateItemService()

    const { item } =await makeCreateItemService.execute({ name, amount, type, filter, code })
  
    return reply.status(201).send({ item })
    
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }

  }
}