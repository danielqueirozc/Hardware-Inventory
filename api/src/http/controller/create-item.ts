import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MakeCreateItemService } from "../../service/factories/make-create-item-service";
import { generateCode } from "../../utils/code-generator";

export async function Createitem(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    amount: z.number(),
    type: z.enum(['Component', 'Computer', 'Notebook', 'Materials', 'Cables']),
    filter: z.enum(['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware'])
  })

  const { name, amount, type, filter} = bodySchema.parse(request.body)

  try {
    request.jwtVerify()

    const createItemService = MakeCreateItemService()

    const code = generateCode()
    
    const { item } = await createItemService.execute({
      name,
      amount,
      code,
      type,
      filter
    })

    reply.status(201).send({ message: 'Item criado com sucesso', item })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ message: "Invalid request body", issues: error.issues })
    }

    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }

}